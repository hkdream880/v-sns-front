import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueRouter from 'vue-router';
import axios from 'axios';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import mixins from './common/mixin';
import Header from '@/components/header.vue';
import Alert from '@/components/alert.vue';
import Modal from '@/components/modal.vue';
import Login from '@/components/login.vue';

/*eslint-disable*/
Vue.prototype.$http = axios;
Vue.prototype.$EventBus = new Vue();  //이벤트 버스
//Vue.config.productionTip = false; //console.log tip 출력 여부

/*set component */
Vue.component('Header',Header);
Vue.component('Alert',Alert);
Vue.component('Modal',Modal);
Vue.component('Login',Login);

/*set mixins */
Vue.mixin(mixins);

Vue.use(VueRouter);
new Vue({
  router: router,
  render:  function(h) { return h(App); }
}).$mount('#app');

