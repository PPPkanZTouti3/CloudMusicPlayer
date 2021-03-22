<template>
    <div id="music-item-c">
        <span class="index">{{index}}</span>
        <img class="play" src="../assets/img/play.png" alt="" @click="playEvent">
        <span class="music-title-c">{{title}}</span>
        <span class="music-singer-c">{{singer}}</span>
        <span class="music-time-c">{{time}}</span>
        <img class="delete" src="../assets/img/delete.png" alt="" @click="delEvent(id)">
        <img class="addMusic" src="../assets/img/addMusic.png" alt="" @click="showDialog">
        <add-music v-if="isShowAdd" :musicId="this.id" @toggleShow="falseShow"></add-music>
    </div>
</template>

<script>
import axios from "axios"
import api from "../assets/config/api"
import addMusic from "./addToList"
export default {
    props:["index","title","singer","time","id"],
    data() {
        return {
            isShowAdd: false,//添加歌单弹框显示
        }
    },
    methods: {
        playEvent(){
            console.log(this.index)
            this.$emit("getIndex",this.index)
            this.$emit("setMusicInfo")
            console.log("asdf2312adf")
        },
        async delEvent(id){
            console.log(id)
            await axios.delete(api.DeleteMusicById+id)
            .then(res=>{
                console.log(res)
                const code = res.data.code;
                if(code == 200){
                    this.$emit("delClick")
                }
            })
            .catch(err=>{
                console.log(err)
            })
            if(this.type === "AllMusic"){
                console.log("AllMusicDel");
                this.$emit("AllMusicReload");
            }
            else{
                console.log("DetailMusicDel");
                this.$emit("DetailMusicReload");
            }
        },
        showDialog(){
            this.isShowAdd = !this.isShowAdd;
        },
        
        falseShow(){
            console.log("hahahhahaah")
            this.isShowAdd = false;
        }
    },
    components: {
            addMusic
        }
}
</script>

<style lang="less">
    #music-item-c{
        width: 100%;
        height: 0.35rem;
        padding-left: 0.2rem;;
        // padding: 0;
        display: flex;
        align-content: center;
        
        span{
            font-size: 0.16rem;
            color: #999;
            margin: auto 0;
            cursor: default;
        }
        .index{
            padding-left: 0.2rem;
            width: 5%;
            margin: auto 0;
            text-align: left;
        }

        img{
            width: 5%;
            width: 0.2rem;
            height: 0.2rem;
            margin: auto 0 auto 0.1rem;
            opacity: 0.6;
            // width: 10%;
        }
        .play:hover{
            opacity: 1;
            cursor: pointer;
        }
        .delete:hover{
            opacity: 1;
            cursor: pointer;
        }
        .addMusic:hover{
            opacity: 1;
            cursor: pointer;
        }

        .music-title-c{
            width: 30%;
            text-align: left;
            padding-left: 0.3rem;
        }

        .music-singer-c{
            width: 27%; 
        }

        .music-time-c{
            padding-left: 1.12rem;
            width: 25%;
        }
    }
    #music-item-c:hover{
        background-color: rgb(73, 73, 73);
    }

    
</style>