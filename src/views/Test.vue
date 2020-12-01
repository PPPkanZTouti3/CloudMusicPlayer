<template>
    <div id="test">
        <form>
            <input type="text" value="" v-model="type" placeholder="1">
            <input type="file" @change="getFile($event)">
            <button @click="submitForm($event)">提交</button>
        </form>
        <!-- <button @click="alertShow">上传</button> -->
    </div>
</template>

<script>
import api from '../assets/config/api';
import axios from "axios";
export default {
    data() {
        return {
            type: "1",
            musicFile: "",
            alertShow: false,
        }
    },
    methods: {
        getFile(event) {
            this.musicFile = event.target.files[0];
            console.log(this.musicFile);
          },
          submitForm(event) {
            event.preventDefault();
            let formData = new FormData();
            formData.append('type', this.type);
            formData.append('musicFile', this.musicFile);
            console.log(formData.get('musicFile'));
 
            // let config = {
              // headers: {
              //   'Content-Type': 'multipart/form-data'
              // }
            // }
 
            axios.post(api.Upload, formData,{
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(function (response) {
              
                console.log(response.data);
              
            })
          }
    }
}
</script>

<style lang="less">
#test{
    font-size: 14px;
}
    
</style>