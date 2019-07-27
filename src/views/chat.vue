<template>
  <div class="container">
    <h3 class=" text-center">{{roomId}}</h3>
    <div class="messaging">
          <div class="inbox_msg">
            <div class="inbox_people">
              <div class="headind_srch">
                <div class="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div class="srch_bar">
                  <div class="stylish-input-group">
                    <input type="text" class="search-bar"  placeholder="Search" >
                    <span class="input-group-addon">
                    <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
                    </span> </div>
                </div>
              </div>
              <div class="inbox_chat">
              <router-link :to="{ name: 'chat', params: {roomId: room.id} }" v-for="room in commondata.chatRoomList">
                <div class="chat_list" v-bind:class="{ active_chat: room.id==roomId }" >
                  <div class="chat_people">
                    <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div class="chat_ib">
                      <h5>{{room.chats[0]?room.chats[0].chat:'대화가 없습니다.'}} 
                        <span class="chat_date">{{room.chats[0]?room.chats[0].createdAt:''}}</span>
                      </h5>
                      <p>{{room.users[0].email}}</p>
                    </div>
                  </div>
                </div>
              </router-link>
              </div>
            </div>
            <div class="mesgs">
              <div class="msg_history">
                <div class="incoming_msg">
                  <div v-for="chat in chatList">

                  <div v-if="chat.userId !== commondata.userInfo.id" class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                    <div v-if="chat.userId !== commondata.userInfo.id" class="received_msg">
                      <div class="received_withd_msg">
                        <p>
                          {{chat.chat}}
                        </p>
                        <span class="time_date"> {{chat.createdAt}} </span></div>
                    </div>
                  
                    <div v-if="chat.userId === commondata.userInfo.id" class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        {{chat.chat}}
                      </p>
                      <span class="time_date"> {{chat.createdAt}} </span> </div>
                  </div>
                  </div>

                  
                  </div>
                </div>
                <div class="type_msg">
                  <div class="input_msg_write">
                    <input v-model="chat" v-bind:disabled="roomId==='none'" type="text"  v-on:keyup.enter="sendChat" class="write_msg" v-bind:placeholder="chatPlaceHolder" />
                    <button class="msg_send_btn" type="button" v-on:click="sendChat" ><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </div>
                </div>
              </div>
            </div>  
          <p class="text-center top_spac"> Design by <a target="_blank" href="#">Sunil Rajput</a></p>
        </div>
      </div>
</template>
<script>
/*eslint-disable*/
import consts from '@/common/const.string';
export default {
  props: ['commondata','roomId'],
  data: function(){
    return {
      socket: null,
      chatList: [],
      chat: '',
    }
  },
  methods: {
    init: function(vm){
      console.log('chat component init');
      this.getChat();
    },
    getChat: function(){
      if(this.roomId==='none'){
        this.chatList = [];
        return;
      }
      console.log('getChat called res: ');
      this.$http({
        url: this.commondata.requestUrl + '/v1/chat-contents',
        headers: this.getHeader(),
        method: 'get',
        params: {roomId: this.roomId}
      }).then($.proxy(function(res){
        console.log(res.data);
        this.chatList = res.data.data;
        this.refreshScroll();
      },this));
    },
    getNewChat: function(chatObj){
      console.log('getNewChat called');
      console.log(chatObj)
      if(chatObj.roomId==this.roomId){
        this.chatList.push(chatObj);
      }
      for(var i=0;i<this.commondata.chatRoomList.length;i++){
        if(this.commondata.chatRoomList[i].id==chatObj.roomId){
          if(this.commondata.chatRoomList[i].chats.length<=0){
            this.commondata.chatRoomList[i].chats.push(chatObj);
          }else{
            //this.commondata.chatRoomList[i].chats[0] = chatObj;  동적 변환 안됨
            this.commondata.chatRoomList[i].chats.splice(0, 1, chatObj);
          }
          break;
        }
      }
      this.refreshScroll();
    },
    sendChat: function(){
      console.log('sendChat called');
      if(this.chat.length<=0){
        return;
      }
      this.$http({
        url: this.commondata.requestUrl + '/v1/chat',
        headers: this.getHeader(),
        method: 'post',
        data: {chat: this.chat,roomId: this.roomId}
      }).then($.proxy(function(res){
        console.log(res);
        console.log(this.chatList);
        this.chat = '';
      },this)).catch($.proxy(function(err){
        console.log(err);
      },this));
    },
    refreshScroll: function(){
      setTimeout(function(){
        $('.msg_history').scrollTop($('.incoming_msg').height());
      },0);
    },
  },
  computed: {
    chatPlaceHolder : function(){
      return this.roomId==='none'?'채팅방을 선택 해 주세요':'메세지를 입력 해 주세요';
    }
  },
  watch : {
    roomId : function(data){
      console.log('room changed!! roomId : ',data);
      this.getChat();
    }
  },
  created: function(){
    //getNewChat
    this.$EventBus.$on('newchat',this.getNewChat);
  },
  mounted: function(){
    
  },
  beforeRouteEnter (to, from, next) {
    next(function(vm){
      vm.init();
    });
  },
  beforeRouteLeave (to, from, next) {
    next();
  }   
}
</script>
<style>
.container{max-width:1170px; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%; 
  /*padding:*/
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}
.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both;}
.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.active_chat{ background:#ebebeb;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
}
.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 57%;}
.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

 .sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:100%;
}
.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}
.sent_msg {
  float: right;
  width: 46%;
}
.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}
.msg_history {
  height: 516px;
  overflow-y: auto;
}
</style>
