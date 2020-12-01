<template>
    <div class="register">
        <div class="main">
            <div class="header">
                <!-- <a href="/">
                    <img class="logo" src=""/>
                </a> -->
                <h1>注册账号</h1>
            </div>

            <div>
                <form id="register_form" method="post">
                    <div class="form-group">
                        <div class="form_text">邮箱</div>
                        <input class="form_control" type="email" placeholder="Email" name="email" id="email" v-model="form.userEmail" />
                    </div>

                    <div class="form-group">
                        <div class="form_text">用户名</div>
                        <input class="form_control" type="text" placeholder="Nickname" name="username" id="username" v-model="form.userName" />
                    </div>
                    
                    <div class="form-group">
                        <div class="form_text">密码</div>
                    
                        <input class="form_control" type="password" placeholder="Password" name="password" id="password" v-model="form.userPassword"/>
                    </div>
                    <div class="form-group">
                        <div class="form_text">确认密码</div>
                    
                        <input class="form_control" type="password" placeholder="ConfirmPassword" name="Confirmpassword" id="Confirmpassword" v-model="userConfirmPassword"/>
                    </div>
                    
                    <input type="button" class="button" @click="registerEvent" value="注 册">
                </form>
            </div>
            <div class="message">
                <p>已有账号? <a id="login" href="/login">点击登录</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import api from "../assets/config/api"
export default {
    data(){
        return{
           form:{
                userEmail: "yagazmi_234@163.com",
                userName: "yyyyyyyy",
                userPassword: "yasnfjadjofaf",
           },
           userConfirmPassword:"",
           token:""
        }
    },
    async created() {
        
    },
    methods:{
        saveUserInfo(){
            this.$store.commit("setIsLogin",true);
            this.$store.commit("setUserEmail",this.form.userEmail);
            this.$store.commit("setUserName",this.form.userName);
            this.$store.commit("setUserPassword",this.form.userPassword);
        },
        delUserInfo(){
            this.$store.commit("delIsLogin");
            this.$store.commit("delToken");
            this.$store.commit("delUserId");
            this.$store.commit("delUserName");
            this.$store.commit("delUserEmail");
            this.$store.commit("delUserPassword");
        },
        async registerEvent(){
            if(this.userConfirmPassword != this.form.userPassword){
                alert("两次密码不一致!")
            }
            //提示信息alert后期改为输入即可看到的一行小字
            await axios.post(api.Register,this.form)
            .then(res=>{
                console.log(res)
                if(res.data.code == 201) {
                    this.delUserInfo();
                    this.token = res.config.headers.token;
                    this.$store.commit("setToken",this.token)
                    this.saveUserInfo();
                    this.$router.push("/");
                }
                else if(res.data.code == 400){
                    alert("用户名或者邮箱已存在");
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
            

            //处理注册事件
        }
    },
    computed:{

    }
}
</script>

<style lang="less">
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .register{
        background-image: url("../assets/img/login_bg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 100vh;
        .main{
            padding-top: 0.6rem;
            width: 8rem;
            height: 6rem;
            //opacity: 0.9;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            .header{
                margin: 0 auto;
                height: 0.8rem;
                font-size: 0.26rem;
                font-family: "Microsoft YaHei","微软雅黑";
                
                width: 8rem;
                background-color: transparent;
                border: none;
                border-radius: 0.2rem;
                margin: 0 auto;
                line-height: 0.8rem;
                color: palevioletred;
                margin-bottom: 0.1rem;
            }

            .form-group{
                margin: 0 auto;
                opacity: 0.7;
                height: 1rem;
                width: 4rem;
                border-radius: 0.2rem;
                margin-bottom: 0.1rem;
                background-color: #fff;
                display: flex;
                flex-direction: column;                  
                .form_control{
                    width: 90%;
                    display: block;
                    height: 0.4rem;
                    margin: 0.1rem auto;
                    border-radius: 0.2rem;
                    padding: 0.1rem;
                    border: 2px solid #ccc;
                    outline: none;
                    font-size: 0.14rem;
                }
            }
            .form_text{
                font-weight: bold;
                font-size: 0.2rem;
                display: flex;
                justify-content: space-between;
                padding: 0.1rem 0.1rem 0 0.2rem;
            }
            
            
            #register_form{
                display: flex;
                flex-direction: column;
                //justify-content: center;
                height: 5rem;
            }
            
            .button{
                margin: 0 auto;
                opacity: 0.7;
                width: 4rem;
                height: 0.5rem;
                border-radius: 0.1rem;
                outline: none;
                border:none;
                background-color: rgb(9, 189, 9);
                color: #fff;
                font-size: 0.2rem;
                font-weight: bold;
                margin-bottom: 0.1rem;
                transition: 0.3s;
            }
            .button:hover{
                //box-shadow: 0px 5px 0px #ccc;
                background-color: rgb(0, 204, 0) ;
            }
            .message{
                margin: 0.2rem auto;
                width: 4rem;
                height: 0.3rem;
                border-radius: 0.1rem;
                line-height: 0.3rem;
                font-size: 0.18rem;
                font-weight: bold;
                //background-color: rgb(226, 36, 226);
                #login{
                    color: blue;
                    text-decoration: none;
                }
                #login:hover{
                    text-decoration: underline;
                }
            }
            
        }

       

        
    }
</style>