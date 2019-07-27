/*eslint-disable*/
//common data
let data = {
  commonData : {
    loginState: false,
    chatRoomList: [],
    chatSocket: null,
    roomSocket: null,
    userInfo: null,
    requestUrl : 'http://localhost:3000'
  },
  appData : {
    commonMethodList : [
      'setCommon','showAlert','showLogin','getRoomList','setLocalStorage',
      'getLocalStorage','isLogin']
  }
};



export default data;