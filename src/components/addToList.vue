<template>
  <div>
    <el-dialog title="添加音乐到歌单" width="4rem" :visible.sync="dialogFormVisible" @close="cancelEvent">
      <el-form :model="form">
        <el-form-item label="歌单" :label-width="formLabelWidth">
          <el-select v-model="form.musicListId" placeholder="请选择添加到的歌单">
            <el-option
              v-for="item in this.$store.state.userMusicList"
              :key="item.musicListId"
              :label="item.musicListName"
              :value="item.musicListId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEvent">取 消</el-button>
        <el-button type="primary" @click="confirmEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios"
import api from "../assets/config/api"
export default {
    props:["musicId"],
    data() {
        return {
            dialogFormVisible: true,
            form: {
                musicListId: "",
                musicListName: ""
            },
            formLabelWidth: '1rem'
        }
    },
    methods:{
        cancelEvent(){
            this.dialogFormVisible = false;
            this.$emit("toggleShow");
        },
        async confirmEvent(){
            this.dialogFormVisible = false;
            this.$emit("toggleShow");
            console.log(this.musicId)
            console.log(this.form.musicListId)
            await axios.post(api.AddMusicToList,{
                musicId: this.musicId,
                musicListId: this.form.musicListId
            })
            .then(res=>{
                console.log(res)
                if(res.data.code === 400){
                  alert("歌曲已存在")
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
};
</script>