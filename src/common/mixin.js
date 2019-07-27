let mixins = {
  // data: function(){
  //   return {
  //     //loginState: false,
  //   };
  // },
  methods: {
    setLocalStorage: function(name, value){
      localStorage.setItem(name, value);
    },
    getLocalStorage: function(name){
      return localStorage.getItem(name);
    },
    deleteSessionStorage: function(name){
      localStorage.removeItem(name);
    },
    getHeader : function(headerObj){
      if(!headerObj){
        headerObj = {};
      }
      headerObj.authorization = this.getLocalStorage('authorizationToken');
      return headerObj;
    }   
  }
};

export default mixins;