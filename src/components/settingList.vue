<template>
  <div>
    <el-dialog title="修改歌单名称" width="4rem" :visible.sync="dialogFormVisible" @close="cancelEvent">
      <el-form :model="form">
        <el-form-item label="歌单名称" :label-width="formLabelWidth">
      <el-input v-model="form.musicListName" autocomplete="off"></el-input>
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
    props:["musicListId"],
    data() {
        return {
            dialogFormVisible: true,
            form:{
                musicListName: "",
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
            
            console.log("musicListId")
            console.log(this.musicListId)
            await axios.put(api.UpdateList,{
                musicListName: this.form.musicListName,
                musicListId: this.musicListId
            })
            .then(res=>{
                console.log("设置歌单名称")
                if(res.data.code === 201){
                    console.log(this.form.musicListName)
                    this.$store.commit("setListName",this.form.musicListName)
                    this.$emit("toggleShow")
                    alert("歌单修改成功 TODO(数据没有刷新)")
                }
                
                
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
};
</script>