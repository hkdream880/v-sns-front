<template>
  <div class="alert" v-bind:class="colorObj[colorTarget]" role="alert" style="display:none" ref="alert" @click="closeEvent">
    <a class="alert-link">{{code}}</a> {{msg}} 
  </div>  
</template>
<script>
/*eslint-disable*/
import 'expose-loader?$!expose-loader?jQuery!jquery';
export default {
  data: function(){
    return {
      $alert: null,
      msg: '',
      code: '',
      colorObj: {
        red: 'alert-danger',
        blue: 'alert-primary',
        green: 'alert-success',
        yellow: 'alert-warning'
      },
      colorTarget: 'red',
      timeout: null,
      option: null,
    };
  },
  methods: {
    showAlert: function(paramObj){
      clearInterval(this.timeout);
      this.msg = paramObj.msg;
      if(paramObj.color){
        this.colorTarget = paramObj.color;
      }
      if(paramObj.option){
        this.option = paramObj.option;
      }
      if(paramObj.code){
        this.code = paramObj.code;
      }
      console.log('showAlert called ',paramObj.msg,paramObj.code);
      this.$alert.fadeIn();
      this.timeout = setTimeout($.proxy(function(){
        this.$alert.fadeOut();
      },this),3000);
    },
    closeEvent: function(){
      clearInterval(this.timeout);
      this.$alert.fadeOut();
      console.log(this.option)
      console.log(this.colorTarget);
      if(this.colorTarget=='blue'){
        //this.$EventBus.$emit('moveChat',this.option);
        this.$router.push('/chat/'+this.option);
        this.option = null;
      }
    }
  },
  created: function () {
    this.$EventBus.$on('showAlert',this.showAlert);
  },
  mounted: function () {
    this.$alert  = $(this.$el);
    //this.showAlert('test','test','yellow');
  },
}
/* <div class="alert alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
  A simple secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
  A simple info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
  A simple light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
  A simple dark alert—check it out!
</div> */
</script>
<style>

</style>

