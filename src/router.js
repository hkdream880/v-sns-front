import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home.vue';
import Timeline from '@/views/timeLine.vue';
import FriendList from '@/views/friendList.vue';
import Chat from '@/views/chat.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', 
      component:  Home,
      props: true,
    },
    {
      path: '/timeLine', 
      component:  Timeline,
      props: true,
    },
    {
      path: '/friends', 
      component:  FriendList,
      props: true,
    },
    {
      path: '/chat/:roomId', 
      component: Chat,
      props: true,
      name: 'chat'
    },
  ]
});

/*
{
      path: '/',
      name: 'home',
      component: Home
    },
{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () { 
        return import(/* webpackChunkName: "about" *//* './views/About.vue')
      }
    }

*/