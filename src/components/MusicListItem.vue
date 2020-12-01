<template>
    <div class="music-list-item">
        <img src="../assets/img/MusicList.png" alt="">
        <span>{{this.title}}</span>
        <img class="del" src="../assets/img/delete.png" alt="" @click="delMusicList">
    </div>
</template>

<script>
import axios from "axios"
import api from "../assets/config/api"
export default {
    props:["title","index"],
    methods: {
        async delMusicList(){
            let list = this.$store.getters.getUserMusicList;
            let listId = list[this.index].musicListId;
            console.log(listId)
            await axios.delete(api.DeleteListById+listId)
            .then(res=>{
                this.$emit("delClick")
                console.log(res)
            })
        },
       
    },
    
}
</script>

<style lang="less" scoped>
.music-list-item{
    position: relative;
    display: flex;
    padding: 0 0.2rem;   
    height: 0.4rem;
    line-height: 0.35rem; 
    background-color:	#333;
    img{
        width: 0.2rem;
        height: 0.2rem;
        margin: auto 0;
        opacity: 0.6;
    }
    span{
        width: 1rem;
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
.del{
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        cursor: pointer;
    }

.music-list-item:hover{
    background-color: rgb(73, 73, 73);
    
}
/* .songsListItem:nth-child(even){
    background-color: #333;
} */


</style>