<template>
  <div class="home" style="overflow:hidden">
    <div class="header">
      <Header-item @getSearchList="setSearchList"></Header-item>
    </div>

    <div class="main">
      <!-- 歌单 -->
      <div class="songsList">
        <label id="hasUpload" @click="trueShowAllMusic">
          <Has-upload  @sendAllMusic="getAllMusic"></Has-upload>
        </label>

        <div class="createSongsList">
          <span>创建歌单</span>
          <img
            class="add"
            @click="showCreateMusicList"
            style="cursor:pointer;"
            src="../assets/img/add.png"
            alt
          />
        </div>
        <Create-musiclist @addClick="MusicListReload" :show.sync="isCreateMusicList"></Create-musiclist>

        <div>
          <ul class="songs-list">
            <li
              v-for="(item,index) in UserMusicList"
              :key="index"
              @click="getDetailMusic(item.musicListId),changeListName(item.musicListName),falseShowAllMusic()"
            >
              <Music-list-item
                :title="item.musicListName"
                :index="index"
                @delClick="MusicListReload"
              ></Music-list-item>
            </li>
          </ul>
        </div>
      </div>
      <!-- 上传音乐的弹窗 -->
      <!-- <Header-alert :show.sync="dialogVisible"></Header-alert> -->
      <!-- 歌单里的所有歌曲 -->
      <div class="songs">
        <div class="songs-title">
          <label style="font-family:'heiti'">{{ListName}}</label>

          <img v-if="ListName!='欢迎回来~'&&ListName!='欢迎使用CloudMusic~ (Tips：请先登录哦~)'&&ListName!='已上传的音乐'" id="settingName" src="../assets/img/setting.png" alt="" @click="showDialog">
        </div>
        <setting-list v-if="isShowSetting" @setName="setNewName" @toggleShow="falseShow" :musicListId="this.musicListId"></setting-list>
        <div class="songs-content">
          <div class="songs-property">
            <span class="music-title">音乐标题</span>
            <span class="music-singer">歌手</span>
            <span class="music-time">时长</span>
          </div>
          <ul class="songs-item">
            <!-- 所有歌曲 -->
            <li v-show="showAllMusic&&closeShowSearch" v-for="(item2,index2) in AllMusic" :key="index2+'yy'">
              <Music-item
                :index="index2+1"
                :title="item2.musicName"
                :singer="item2.musicSinger"
                :time="timeFormat(item2.musicTime)"
                :id="item2.musicId"
                :type="'AllMuisc'"
                @getIndex="setPlayingIndex"
                @setMusicInfo="getMusicInfo(item2)"
                @delClick="AllMusicReload"
              ></Music-item>
            </li>
            <!-- 歌单歌曲 -->
            <li v-show="!showAllMusic && closeShowSearch" v-for="(item1,index1) in DetailMusic" :key="index1">
              <Music-item
                :index="index1+1"
                :title="item1.music.musicName"
                :singer="item1.music.musicSinger"
                :time="timeFormat(item1.music.musicTime)"
                :id="item1.music.musicId"
                :type="'DetailMusic'"
                @getIndex="setPlayingIndex"
                @setMusicInfo="getMusicInfo(item1)"
                @delClick="DetailMusicReload"
              ></Music-item>
            </li>
            <!-- 搜索的歌曲 -->
            <li v-show="!closeShowSearch" v-for="(item3,index3) in SearchList" :key="index3+'y'">
              <Music-item
                :index="index3+1"
                :title="item3.musicName"
                :singer="item3.musicSinger"
                :time="timeFormat(item3.musicTime)"
                :id="item3.musicId"
                :type="'SearchMusic'"
                @getIndex="setPlayingIndex"
                @setMusicInfo="getMusicInfo(item3)"
                @delClick="AllMusicReload"
              ></Music-item>
            </li>

          </ul>
        </div>
      </div>
    </div>

    <!-- 播放器 -->
    <!-- <audio src=""></audio> -->
    <div class="player">
      <Player
        :musiclist="PlayingMusicList"
        :playingIndex="PlayingMusicIndex"
        :title="musicInfo.musicName"
        :singer="musicInfo.singer"
        :path="musicInfo.path"
      ></Player>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
import Player from "../components/Player";
import MusicItem from "../components/MusicItem";
import MusicListItem from "../components/MusicListItem";
import HeaderItem from "../components/HeaderItem";
import CreateMusiclist from "../components/CreateMusiclist";
import HasUpload from "../components/hasUpload";
import settingList from "../components/settingList"
//import index from "../components/index"
// import HeaderAlert from "../components/HeaderAlert"
export default {
  name: "Home",
  data() {
    return {
      // isLogin: this.$store.getters.getIsLogin,
      musicInfo: {
        musicName: "",
        singer: "",
        path: ""
      },
      musicListId: "",
      showIndex: true,
      showAllMusic: false,
      dialogVisible: false,
      isCreateMusicList: false, //创建歌单
      UserMusicList: [], //用户的歌单
      AllMusic: [], //用户所有已上传的音乐
      DetailMusic: [], //用户每个自定义的歌单下的音乐
      PlayingMusicList: "", //正在播放的歌单
      PlayingMusicIndex: "", //播放选中歌单的对应索引号的音乐
      ListName: this.$store.getters.getIsLogin
        ? "欢迎回来~"
        : "欢迎使用CloudMusic~ (Tips：请先登录哦~)",
      isShowSetting: false,
      SearchList: "",
      closeShowSearch: true
      //搜索结果
      //修改歌单名称
      //用户信息
      //用户创建的歌单
      //每个歌单中的音乐
    };
  },
  methods: {
    showCreateMusicList() {
      if (this.$store.getters.getIsLogin === false) {
        //TODO
        alert("请先登录！");
      } else {
        this.isCreateMusicList = !this.isCreateMusicList;
      }
    },
    showDialog(){
      this.isShowSetting = !this.isShowSetting;
    },
    setSearchList(data){
      this.closeShowSearch = false;
      this.SearchList = data;
      this.PlayingMusicList = this.SearchList;
      console.log('HOME');
      console.log(this.SearchList)
    },
    async falseShow(){
            //console.log("hahahhahaah")
            this.isShowSetting = false;
            //没啥用 下面的axios
            await axios.get(api.GetUserMusicList+this.$store.state.userId)
            .then(res=>{
              if(res.data.code === 201){
                let arr = res.data.data;
              for(let item in arr){
                if(item.musicListId === this.musicListId){
                  item.musicListName = this.$store.state.ListName;
                  console.log("gmx")
                  alert("歌单修改成功 TODO(数据没有刷新)")
                }
              }
              }

              
              
            })
            .catch(err=>{
              console.log(err)
            })   
        },
    setNewName(){
      
    },
    async MusicListReload() {
      let userId = sessionStorage.getItem('userId');
      console.log("用户ID")
      console.log(userId)
      console.log(api.GetUserMusicList + userId)
      let res = await axios.get(api.GetUserMusicList + userId,{
        headers: {
          token: sessionStorage.getItem("token")
        }
      });
      console.log(res);
      console.log("PASSWORD");
      console.log(this.$store.state.userPassword)
      this.$store.commit("setUserMusicList", res.data.data);
      this.UserMusicList = this.$store.state.userMusicList;
    },
    //TODO
    async AllMusicReload() {
      console.log("all");
      let curList = axios.get(api.AllMusic, {
        headers: {
          token: sessionStorage.getItem("token")
        }
      });
      this.$store.commit("setCurrentList",curList);
      this.AllMusic = this.$store.getters.getCurrentList;
      //document.querySelector("#hasUpload").click();
    },
    async DetailMusicReload() {
      console.log("detail");
      let id = this.$store.state.currentList[0].musicListId;
      console.log(id)
      let curList = axios.get(api.GetDetailMusic+id);
      this.$store.commit("setCurrentList",curList);
      this.DetailMusic = this.$store.getters.getCurrentList;
    },
    uploadAlertShow() {
      this.dialogVisible = !this.dialogVisible;
    },
    async getDetailMusic(id) {
      // console.log(id);
      this.musicListId = id;
      this.closeShowSearch = true;
      console.log("choose DetailList");
      //根据歌单ID获取歌单中的音乐
      let res = await axios.get(api.GetDetailMusic, {
        params: { musicListId: id }
      });
      console.log(res);
      this.DetailMusic = res.data.data;
      this.PlayingMusicList = this.DetailMusic;
      this.$store.commit("setCurrentList", this.DetailMusic);
      console.log("detail");
      console.log(this.DetailMusic);
      console.log("playing2");
      console.log(this.PlayingMusicList);
    },
    changeListName(name) {
      console.log(name);
      this.ListName = name;
    },
    getAllMusic(data) {
      this.closeShowSearch = true;
      this.AllMusic = data;
      this.PlayingMusicList = data;
      this.$store.commit("setCurrentList", data);
      console.log("hxy");
      console.log(this.AllMusic);
      console.log("playing");
      console.log(this.PlayingMusicList);
      //this.DetailMusic.push(this.AllMusic)
    },
    falseShowAllMusic() {
      this.showAllMusic = false;
    },
    trueShowAllMusic() {
      this.showAllMusic = true;
      console.log(this.$refs.child)
      //this.$refs.child.showDetailMusic();
      this.ListName = "已上传的音乐";
    },
    timeFormat(time) {
      var minutes = time < 60 ? "00" : "0" + Math.floor(time / 60);
      var seconds = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      // 拼接
      return minutes + ":" + seconds;
    },
    // setPlayingMusicList(musiclist) {
    //   this.PlayingMusicList = this.AllMusic;
    //   console.log("playing");
    //   console.log(this.AllMusic);
    //   console.log(musiclist);
    // },
    setPlayingIndex(index) {
      this.PlayingMusicIndex = index - 1;
      const audio = document.querySelector("audio");
      //console.log(this.PlayingMusicList == this.AllMusic)
      if (this.PlayingMusicList == this.AllMusic) {
        audio.src = this.PlayingMusicList[this.PlayingMusicIndex].musicPath;
        //console.log("sdfasdf")
      } 
      else if (this.PlayingMusicList == this.SearchList) {
        audio.src = this.PlayingMusicList[this.PlayingMusicIndex].musicPath;
        //console.log("sdfasdf")
      } 
      
      else
        audio.src = this.PlayingMusicList[
          this.PlayingMusicIndex
        ].music.musicPath;
      this.$store.commit("setIsPause", false);
      audio.play();
    },
    getMusicInfo(item) {
      console.log(this.PlayingMusicList)
      if(this.PlayingMusicList === this.SearchList){
        console.log("seracg")
        this.musicInfo.musicName = item.musicName;
        this.musicInfo.singer = item.musicSinger;
        this.musicInfo.path = item.musicPath;
        this.$store.commit("setMusicName", item.musicName);
        console.log(this.$store.state.musicName);
        this.$store.commit("setMusicSinger", item.musicSinger);
      }
      else if (this.PlayingMusicList == this.AllMusic) {
        this.musicInfo.musicName = item.musicName;
        this.musicInfo.singer = item.musicSinger;
        this.musicInfo.path = item.musicPath;
        this.$store.commit("setMusicName", item.musicName);
        console.log(this.$store.state.musicName);
        this.$store.commit("setMusicSinger", item.musicSinger);
      } 
      else {
        this.musicInfo.musicName = item.music.musicName;
        this.musicInfo.singer = item.music.musicSinger;
        this.musicInfo.path = item.music.musicPath;
        this.$store.commit("setMusicName", item.music.musicName);
        this.$store.commit("setMusicSinger", item.music.musicSinger);
      }
    }
  },
  components: {
    Player,
    MusicItem,
    MusicListItem,
    HeaderItem,
    CreateMusiclist,
    HasUpload,
    settingList,
    //index
  },
  async mounted() {
    // let userInfo = await axios
    // let userMusicListInfo = await axios.get(api.GetUserMusicList+)
    console.log("登录状态")
    console.log(this.$store.state.isLogin)
    if (this.$store.state.isLogin) {
      this.MusicListReload();
      let userId = this.$store.getters.getUserId;
    console.log(userId)
    // console.log(sessionStorage.getItem("token"))
    if(userId != ""){
        axios.get(api.AllMusic,{
            headers:{
                'token': sessionStorage.getItem("token")
            }
        })
        .then(res=>{
            this.getAllMusic(res.data.data.list)
            
        })
    }
      
    }
  },
  
  computed: {
    getAllMusics(){
      return this.AllMusic;
    },
    getDetailMusics(){
      return this.DetailMusic;
    },
    getListName(){
      return this.ListName;
    },
    getSearchRes(){
      return this.$store.state.SearchRes;
    }
  },
  watch: {
    
  },
  async created() {
    let userId = this.$store.getters.getUserId;
    console.log(userId)
    // console.log(sessionStorage.getItem("token"))
    if(userId != ""){
        axios.get(api.AllMusic,{
            headers:{
                'token': sessionStorage.getItem("token")
            }
        })
        .then(res=>{
            this.getAllMusic(res.data.data.list)
            
        })
    }
  },
};
</script>

<style>
* {
  cursor: default;
}
.add {
  opacity: 0.7;
}
.add:hover {
  opacity: 1;
}
.stateDiv {
  width: 0.3rem;
  height: 0.2rem;
  position: fixed;
  right: 0.2rem;
  top: 6rem;
  background-color: #ccc;
  z-index: 10;
}
.stateDiv span {
  font-size: 0.12rem;
  color: #ccc;
}
.logout {
  width: 0.2rem;
  height: 0.2rem;
}

@import "../assets/css/home-header.css";
@import "../assets/css/home-songsList.css";
@import "../assets/css/home-songs.css";
@import "../assets/css/home-player.css";
</style>
