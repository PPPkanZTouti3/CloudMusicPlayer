<template>
    <div class="has-upload" @click="showDetailMusic">
        <img src="../assets/img/music.png" alt="">
        <span>已上传的音乐</span>
        <!-- <img class="del" src="../assets/img/delete.png" alt="" @click="delMusicList"> -->
    </div>
</template>

<script>
import axios from "axios"
import api from "../assets/config/api"
export default {
    props:["musicList"],
    methods: {
        showDetailMusic(){
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
                    console.log("music")
                    console.log(res)
                    let allMusic = res.data.data.list;
                    this.$emit("sendAllMusic",allMusic)
                    console.log(allMusic)
                    console.log("end")
                    
                })
            }
            
        }
    },
    async created() {
        
    },
}
</script>

<style lang="less" scoped>
.has-upload{
    position: relative;
    display: flex;
    padding: 0 0.2rem;   
    height: 0.4rem;
    line-height: 0.35rem; 
    background-color:	#333;
    // border-bottom: 0.5px solid #ccc;
    img{
        width: 0.2rem;
        height: 0.2rem;
        margin: auto 0;
        opacity: 0.6;
    }
    span{
        flex: 1;
        margin: auto 0;
        text-align: left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 0.16rem;
        padding-left: 0.1rem;
        color: #ccc;
    }
    
}

.has-upload:hover{
    background-color: rgb(73, 73, 73);
    
}
/* .songsListItem:nth-child(even){
    background-color: #333;
} */


</style>