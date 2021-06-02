<template>
    <div class="header-alert" v-if="show">
        <div class="main">
            <div class="top">
                <span>上传你喜欢的音乐❤</span>
                <img id="cancel" src="../assets/img/cancel.png" @click="closeEvent">
            </div>
            <div class="content">
                <form>
                    <!-- <input type="text" value="" v-model="type" placeholder="1"> -->
                    <input type="file" @change="getFile($event)">
                    <!-- <img id="loading" v-show="isLoading" src="../assets/img/loading.gif" alt=""> -->
                </form>
                

                <div>音乐名称：<input class="music-input" v-model="musicName" type="text" placeholder="在这里输入音乐名称"></div>
                <div>歌手名称：<input class="music-input" v-model="musicSinger" type="text" placeholder="在这里输入歌手名称"></div>
                <input id="uploadByUrl" v-model="musicUrl" type="text" placeholder="在这里可以输入音乐连接进行上传">
                    <!-- <img id="loading" v-show="isLoading" src="../assets/img/loading.gif" alt="">                 -->
                <!-- <el-progress :percentage="100" :format="format"></el-progress> -->

            </div>
            <div class="btn">
                <button class="submit" @click="submitForm($event)">上传至服务器</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../assets/config/api';
import axios from "axios";
//import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
export default {
    props:["show"],
    data() {
        return {
            // isLoading: false,
            type: 1,
            musicFile: "",
            musicName: "",
            musicSinger: "",
            musicUrl: ""
        }
    },
    methods: {
        closeEvent(){
            console.log(this.show)
            this.$emit("update:show",false)
        },
        getFile(event) {
            this.musicFile = event.target.files[0];
            console.log(this.musicFile);
          },
        async submitForm(event) {
            event.preventDefault();
            // if(this.musicFile!=""){
            //     this.isLoading = true;
            // }
            
            let formData = new FormData();
            formData.append('type', this.type);
            formData.append('musicFile', this.musicFile);
            console.log(formData);
            
            if(this.musicUrl !== ''){
                let dataObj = {
                    "musicName": this.musicName,
                    "musicSinger": this.musicSinger,
                    "musicPath": this.musicUrl
                }
                await axios.post(api.UploadByUrl, dataObj ,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then(function (res) {
                    
                    console.log(res);
                    if(res.data.code === 201){
                        // this.isLoading = false;
                        alert("url上传成功")
                        window.location.reload();
                    }
                    else{
                        alert("url上传失败")
                    }
                
                })
            }
            // let config = {
              // headers: { 
              //   'Content-Type': 'multipart/form-data'
              // }
            // }
            
            if(this.musicFile !== ""){
                await axios.post(api.Upload, formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(function (res) {
                    
                    console.log(res);
                    if(res.data.code === 201){
                        // this.isLoading = false;
                        alert("文件上传成功")
                        window.location.reload();
                    }
                    else{
                        alert("文件上传失败")
                    }
                
                })
            }
            
          }
    }

}
</script>

<style lang="less" scoped>
    .header-alert{
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        //opacity: 0.3;
        z-index: 9999;
        font-size: 0.14rem;
        .main{
            width: 5rem;
            height: 3rem;
            margin: 1rem auto;
            background-color: #F6F6F6;
            display: flex;
            flex-direction: column;
            border-radius: 0.2rem;
            .top{
                margin-bottom: 0.1rem;
                width: 100%;
                height: 0.4rem;
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                span{
                    font-size: 0.16rem;
                    font-weight: bold;
                    margin: 0.1rem 0 0 0.2rem;
                }
                #cancel{
                    //text-align: right;
                    margin: 0.1rem 0.2rem 0 0;
                    width: 0.2rem;
                    height: 0.2rem;
                }
                #cancel:hover{
                    cursor: pointer;
                    box-shadow: 0 0 0.1rem blue;
                }
                
            }

            .content{
                box-sizing: border-box;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                input{
                    // margin: 0 auto;
                    padding-left: 0.8rem;
                    width: 100%;
                    margin-bottom: 0.1rem;
                    // cursor: pointer;
                }
                #loading{
                    width: 1.8rem;
                    height: 1.4rem;
                    z-index: 333;
                    position: absolute;
                    left: 1.55rem;
                    top: 0.7rem;
                    
                }

                .music-input{
                    width: 70%;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    font-size: 0.14rem;
                    text-align: left;
                    padding: 0;
                    margin-bottom: 0.1rem;
                }

                #uploadByUrl{
                    width: 60%;
                    height: 0.3rem;
                    line-height: 0.3rem;
                    font-size: 0.14rem;
                    text-align: left;
                    padding: 0;
                    // margin-top: 0.3rem; 
                }
            }

            .btn{
                height: 0.7rem;
                margin-bottom: 0.1rem;
                .submit{
                    border: none;
                    outline: none;
                    width: 2rem;
                    height: 0.5rem;
                    border-radius: 0.2rem;
                    background-color: rgb(9, 189, 9);
                    font-weight: bold;
                    //color: #fff;
                    font-size: 0.16rem;
                    
                    transition: 0.3s;
                }
                .submit:hover{
                //box-shadow: 0px 5px 0px #ccc;
                cursor: pointer;
                background-color: rgb(0, 204, 0) ;
            }
            }
        }
    }
</style>