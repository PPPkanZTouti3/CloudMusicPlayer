import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    isLogin: sessionStorage.getItem('isLogin')?sessionStorage.getItem('isLogin'):'',
    userName: "",
    userPassword: "",
    userEmail: "",
    userId: "",
    userMusicList: "", //用户自己创建的歌单
    userAllMusic: "",//用户已上传的所有音乐
    isPause: true,
    musicName: "",
    musicSinger: "",
    currentList: "",
    currentPlayingMusic: "",
    ListName: "",//当前歌单的名字
    SearchRes: "", //搜索结果
  },
  mutations: {
    setSearchRes(state,res){
      state.SearchRes = res;
    },

    setListName(state,name){
      state.ListName = name;
    },

    setIsPause(state,status){
      state.isPause = status;
    },

    setToken(state,token){
      state.token = token;
      sessionStorage.setItem('token',token);
    },
    delToken(state){
      state.token = '';
      sessionStorage.removeItem('token');
    },

    setIsLogin(state,status){
      state.isLogin = status;
      sessionStorage.setItem('isLogin',status); //记录登录状态
    },
    delIsLogin(state){
      state.isLogin = false;
      sessionStorage.removeItem('isLogin');
    },

    setUserId(state,userId){
      state.userId = userId;
      sessionStorage.setItem('userId',userId);
    },
    delUserId(state){
      state.userId = "";
      sessionStorage.removeItem('userId');
    },

    setUserName(state,userName){
      state.userName = userName;
      sessionStorage.setItem('userName',userName); //记录用户名
    },
    delUserName(state){
      state.userName = "",
      sessionStorage.removeItem('userName');
    },

    setUserPassword(state,password){
      state.userPassword = password; 
      sessionStorage.setItem('userPassword',password); //记录用户密码
    },
    delUserPassword(state){
      state.userPassword = "",
      sessionStorage.removeItem('userPassword');
    },

    setUserEmail(state,email){
      state.userEmail = email;
      sessionStorage.setItem('userEmail',email); //记录用户邮箱
    },
    delUserEmail(state){
      state.userEmail = "";
      sessionStorage.removeItem("userEmail");
    },

    setUserMusicList(state,arr){
      state.userMusicList = arr;
    },
    setMusicName(state,name){
      state.musicName = name;
    },
    setMusicSinger(state,singer){
      state.musicSinger = singer;
    },
    setCurrentList(state,list){
      state.currentList = list;
    },
    setUserAllMusic(state,music){
      state.userAllMusic = music;
    }
  },
  getters: {
    getToken(state){
      return state.token;
    },
    getIsLogin(state){
      return state.isLogin;
    },
    getUserId(state){
      return state.userId;
    },
    getUserName(state){
      return state.userName;
    },
    getUserMusicList(state){
      return state.userMusicList;
    },
    getIsPause(state){
      return state.isPause;
    },
    getMusicName(state){
      return state.musicName;
    },
    getMusicSinger(state){
      return state.musicSinger;
    },
    getCurrentList(state){
      return state.currentList;
    }
  },
  actions: {
  },
  modules: {
  }
})
