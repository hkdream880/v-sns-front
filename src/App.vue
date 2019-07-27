<template>
  <div id="app">
    <Header v-bind:common="commonData"></Header>
    <Alert></Alert>
    <Modal></Modal>
    <Login 
      v-bind:commondata="commonData"
      v-on:commonmethod="commonMethod"
      ></Login>
    <router-view 
      v-bind:commondata="commonData"
      v-on:commonmethod="commonMethod"
    />
  </div>
</template>
<script>
/*eslint-disable*/
import data from '@/common/data';
import methods from '@/common/methods';
export default {
  name: 'app',
  data : function(){
    return {
      commonData: data.commonData,
      appData: data.appData
    };
  },
  methods : methods,
  created: function(){
    console.log('created called in main.js');
    this.isLogin(this.getRoomList);
  },
  mounted: function(){
    console.log('mounted called in main.js');
  },
}
</script>

<style>
#app {
   width: 100%;
   height: 100%;
}

.v-home {
   text-align: center;  
   margin-top: 5%;
}
.v-home-chat {
   margin-top: 5%;
}
.v-home-chat .v-chat-btn{
   
   margin-left: 5px;
}


.v-reply-others {
   text-align: left;
}

.v-reply-mine {
   text-align: right;
}

.v-time-line-wraper {
   margin-top: 20px;
}

.v-friend-tab-list {
   display: inline-block;
}

.v-friend-list {
   margin-top: 20px;
   width: 45%;
   display: inline-block;
}
.v-profile {
   width: 45px;
   height: 45px;
}
.v-chat-btn {
   float: right;
}

.hide {
   display: none !important;
}

.v-text-input {
   height: 100px;
}

.v-content-list {
   list-style: none;
}

.v-content {
   text-align: left;
   font-size: 250%;
}

.v-content-info {
   text-align: right;
}
</style>
