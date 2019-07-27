<template>
  <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title h4" id="mySmallModalLabel">Small modal</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="login_close_btn">
          <span aria-hidden="true">×</span>
          </button>
          </div>
            <div class="modal-body">
            <form v-on:submit.prevent="doLogin">
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input value="test@test.com" v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input value="1111" v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
              </div>
              <button id="submit_btn" type="submit" class="btn btn-primary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="test">Submit</button>
            </form>
          </div>
      </div>
  </div>
</div>
</template>
<script>
/*eslint-disable*/
import consts from '@/common/const.string';
export default {
  props: ['commondata'],
  data: function(){
    return {
      $login: null,
      email: '',
      password: '',
    };
  },
  methods: {
    showLogin: function(){
      this.$login.modal('show');
    },
    doLogin: function(){
      let axiocConfig = {
        url: this.commondata.requestUrl+'/login',
        headers: this.getHeader(),
        method: 'post',
        data: {email: this.email, password: this.password }
      };

      this.$http(axiocConfig).
      then(this.loginCallback).
      catch($.proxy(function(err){
        this.$emit(consts.commonMethod,'showAlert',{msg : err});
      },this));

    },
    loginCallback:function(response){
      //var response = res.data;
      console.log('loginCallback response:', response);
      if(response.data.code===consts.successCode){
        //console.log(this.loginState);
        //this.loginState = true;
        //this.$emit(consts.commonMethod,'setLocalStorage',{ name: 'authorizationToken', value: response.data.response.token});
        this.setLocalStorage('authorizationToken',response.data.response.token);
        this.$emit(consts.commonMethod,'setCommon',{ name: 'loginState', value: true});
        this.$emit(consts.commonMethod,'setCommon',{ name: 'userInfo', value: response.data.response.userInfo});
        this.$emit(consts.commonMethod,'getRoomList');
        this.closeLogin();
      }else{
        this.$emit(consts.commonMethod,'showAlert',{msg : response.data.response, code : response.data.code});
      }
    },
    closeLogin: function(){
      this.$login.modal('hide');
    },
  },
  created: function () {
    this.$EventBus.$on('showLogin',this.showLogin);
  },
  mounted: function (event) {
    this.$login = $(this.$el);
  },
}
</script>
<style>

</style>
