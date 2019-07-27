/*eslint-disable*/
import consts from '@/common/const.string';
import io from 'socket.io-client';

const methods = {
  setCommon: function(paramObj){
    this.commonData[paramObj.name] = paramObj.value;
  },
  showAlert: function(paramObj){
    this.$EventBus.$emit('showAlert',paramObj);
  },
  showLogin: function(){
    this.$EventBus.$emit('showLogin');
  },
  commonMethod: function(methodName, param){
    console.log('commonMethod called');
    console.log(methodName);
    console.log(param);
    var isValid = this.appData.commonMethodList.indexOf(methodName);
    if(isValid<0){
      //TODO 얼럿창 출력
      return this.showAlert({
        msg: '허용되지 않은 메서드 입니다.'
      });
    }
    return this[methodName](param);
  },
  isLogin : function(callback,fail){
    console.log('_isLogin check called');
    this.$http({
      url: this.commonData.requestUrl+'/login-check',
      headers: this.getHeader(),
      method: 'get'
    }).then($.proxy(function(res){
      console.log(res);
      if(res.data.code!=consts.successCode){
        this.commonData.loginState = false;
        this.commonData.chatRoomList = [];
        return this.showAlert({
          msg: res.data.response.msg?res.data.response.msg:'login check fail',
          code: res.data.code
        });
      }
      this.commonData.loginState = res.data.response.info!==null;
      this.commonData.userInfo = res.data.response.userInfo;
      if(callback){
        callback();
      }
    },this)).catch($.proxy(function(err){
      this.commonData.chatRoomList = [];
      this.commonData.loginState = false;
      this.showAlert({msg: err});
      if(fail){
        fail();
      }
    },this));
  },
  getRoomList: function(callback){
    console.log('getRoomList')
      this.$http({
        url: this.commonData.requestUrl+'/v1/room-list',
        headers: this.getHeader(),
        method: 'get'
      }).then($.proxy(function(res){
        this.commonData.chatRoomList = res.data.data;
        console.log(this.commonData.chatRoomList);
        //TODO 소켓 연결
        //global.socketManager.socketInit(res.data,callback);
        this.socketInit(this.commonData.chatRoomList);
      },this)).catch($.proxy(function(err){
        console.log(err);
      },this));
  },

  socketInit: function(roomList,callback){
    console.log('socketInit called');
    console.log(roomList);
    roomList.forEach($.proxy(function(data,idx){
      console.log('roomList.forEach idx : '+idx+' room id : '+data.id);
      this.connectChatSocket(data.id);
      this.bindSocketEvetn(this.chatSocket);
    },this));
    console.log('this.roomSocket test');  
    this.connectRoomSocket();
    if(callback){
      callback();
    }
  },
  connectRoomSocket: function(){
    this.roomSocket = io.connect(this.commonData.requestUrl+'/room', {
      path: '/v-chat',
    });
    this.roomSocket.on('new',$.proxy(function(data){
      console.log('new room !!!!!!');
      console.log(this.chatRoomList);
      console.log(data);
      this.chatRoomList.push(data);
      console.log('new room added!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(this.chatRoomList);
      this.connectChatSocket(data.id);
      this.bindSocketEvetn(this.chatSocket);
    },this));
  },
  connectChatSocket: function(roomId){
    console.log('connectSocket called : '+roomId);
    this.chatSocket = io(this.commonData.requestUrl+'/chat?roomId='+roomId,{
      query: 'roomId='+roomId,
      path: '/v-chat',
    });
  },
  bindSocketEvetn: function(socket){
    socket.on('new',$.proxy(function(data){
    },this));
    socket.on('join',$.proxy(function(data){
    },this));
    socket.on('chat',$.proxy(function(data,user){
      console.log('new chat !!!!');
      console.log(data);
      console.log(user);
      if(this.$router.currentRoute.path.indexOf('/chat/')>=0){
        this.$EventBus.$emit('newchat',data);
      }else{
        //show modal or toast
        //this.$EventBus.$emit('showAlert',data.chat,user.email, 'blue',user.id);
        this.showAlert({
          msg: data.chat,
          code : user.email,
          color: 'blue',
          option: user.id,
        });
      }
    },this));
  }
  
};

export default methods;