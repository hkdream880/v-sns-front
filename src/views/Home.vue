<template>
  <main role="main" class="container">
      <div class="starter-template v-home">
        <div class="card">
          <img src="@/assets/main.jpg" class="card-img-top v-main-img" alt="...">
          <div class="card-body">
            <h5 class="card-title">V - SNS.</h5>
            <div class="v-btn-container" v-if="!commondata.loginState">
              <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">로그인</button> method 연결 없이 출력 가능-->
              <button type="button" class="btn btn-primary" @click="$EventBus.$emit('showLogin')">로그인</button>
              <router-link to="/join" class="btn btn-primary" exact>회원가입</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>
<script>
/*eslint-disable*/
export default {
  data: function(){
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    showLogin: function(){
      console.log('showLogin');
      this.$EventBus.$emit('showLogin');
      console.log(this.$EventBus);
    },
  },
  props: ['commondata'],
  mounted: function(){
    console.log(this);
  },
  // mixins: [mixins],
  beforeRouteEnter (to, from, next) {
    next();
  },
  beforeRouteLeave (to, from, next) {
    next();
  }
}
</script>
<style>

</style>
