<template>
  <div class="hearder-item">
    <div class="headerDiv">
      <!-- Logo -->
      <div class="logo">
        <span>CloudMusicPlayer</span>
      </div>
      <!-- 搜索框 -->
      <el-input placeholder="请输入完整的歌名或歌手" @input="searchEvent" v-model="songInfo" clearable></el-input>

      <!-- 用户个人信息 -->
      <div class="userInfo" v-if="this.$store.getters.getIsLogin">
        <!-- 用户名称 -->
        <span @click="stateEvent">{{this.$store.getters.getUserName}}</span>
        <!-- 换肤按钮 -->
        <img id="huanfu" src="../assets/img/huanfu.png" alt />
        <!-- 上传音乐 -->
        <img id="upload" src="@/assets/img/upload.png" @click="uploadAlertShow" />
      </div>

      <!-- 上传音乐的弹窗 -->
      <Header-alert :show.sync="dialogVisible"></Header-alert>
      <!-- <el-dialog :visible.sync="dialogVisible" >
        <el-upload
          class="upload-demo"
          ref="upload"
          action= "http://47.95.229.102:8081/music/upload"
          :on-success="handleSuccess"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="musicFile"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">上传你喜欢的音乐❤</div>
      </el-upload>-->

      <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="uploadAlert = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>-->
      <!-- </el-dialog> -->

      <!-- 未登录 -->
      <div class="noLogin" v-if="!this.$store.getters.getIsLogin">
        <span class="noLogin-login" @click="toLogin">登录</span> |
        <span class="noLogin-register" @click="toRegister">注册</span>
      </div>
    </div>

    <!-- 退出登录 -->
    <div class="state" v-show="stateCode">
      <div id="logout" class="state-item" @click="logoutEvent">
        <img class="logoutItem" src="../assets/img/logout.png" alt />
        <span>退出登录</span>
      </div>

      <div id="setting" class="state-item" @click="toModifyInfo">
        <img class="settingItem" src="../assets/img/setting.png" alt />
        <span>设置</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../assets/config/api";
import HeaderAlert from "./HeaderAlert";

export default {
  data() {
    return {
      // userName: this.$store.getters.getUserName,
      songInfo: "", //按歌名搜索
      //isLogin: this.$store.,
      stateCode: false,
      dialogVisible: false,
      musicFile: [],
      // UploadAlertShow: false,
      BgAlertShow: false,
    };
  },
  components: {
    HeaderAlert
  },
  methods: {
    clearEvent() {
      this.songInfo = "";
    },
    async searchEvent() {
      //搜索事件
      console.log(this.songInfo);
      //按歌名搜索
      let httpUrl = api.SearchMusic + "?musicName=" + this.songInfo;
      console.log(httpUrl);
      await axios
        .get(httpUrl)
        .then(res => {
          console.log(res);

          let dataObj = res.data.data;
          this.SearchList = dataObj;
          // let arr = Array.from(dataObj);
          // for (let key in dataObj) {
          //   arr.push(key);
          // }
          // let i = 0;
          // for (var item in dataObj) {
          //   arr[i] = dataObj[item];
          //   i++;
          // }
          

          console.log(dataObj);
          //console.log(JSON.parse(arr))
          if (dataObj.length) {
            this.$emit("getSearchList",dataObj)
          }
        })
        .catch(err => {
          console.log(err);
        });
      //按歌手名搜索
    },

    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    stateEvent() {//需要登录与在线状态转换
      this.stateCode = !this.stateCode;
    },
    logoutEvent() {//退出登录
      //this.isLogin = false;
      this.$router.go(0);
      //this.$store.commit("setIsLogin", false);
      //this.$store.commit("delToken");
      this.delUserInfo();
      sessionStorage.removeItem("token");
      this.stateCode = false;
    },
    delUserInfo() {
      this.$store.commit("delIsLogin");
      this.$store.commit("delToken");
      //this.$store.commit("delUserId");
      //this.$store.commit("delUserName");
      this.$store.commit("delUserEmail");
      //this.$store.commit("delUserPassword");
    },
    toModifyInfo() {
      this.$router.push("/account-setting");
    },
    uploadAlertShow() {//上传音乐弹框
      this.dialogVisible = !this.dialogVisible;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(response) {
      console.log(response);
    },
    uploadEvent() {
      // await axios.post(api.Upload,this.form)
      //       .then(res=>{
      //           if(res.data.code == 201) {
      //               this.$router.push("/");
      //           }
      //           else if(res.data.code == 400){
      //               alert("用户名或者邮箱已存在");
      //           }
      //       })
      //       .catch(err=>{
      //           console.log(err)
      //       })
    }
  },
  async mounted()  {
    if(this.$store.state.isLogin){
      console.log("berofe")
      let dataObj = {
        userName: sessionStorage.getItem('userName'),
        userPassword: sessionStorage.getItem('userPassword')
      }
      await axios.post(api.Login,dataObj)
      .then(res=>{
        console.log(res)
        let userId = res.data.data.userId;
        let username = res.data.data.userName;
        //设置用户ID
        this.$store.commit('setUserId',userId);
        //设置用户登录状态
        this.$store.commit('setIsLogin',true);
        //设置用户名
        this.$store.commit('setUserName',username);
        //设置邮箱
        this.$store.commit('setUserEmail',res.data.data.userEmail);
        //设置密码
        this.$store.commit("setUserPassword",dataObj.userPassword);
        //设置token
        // this.$store.commit("delToken")
        this.$store.commit('setToken', res.headers.token);
      })
    }
  },

};
</script>

