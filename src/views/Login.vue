<template>
    <div class="login">
        <div class="main">
            <div class="header">
                <!-- <a href="/">
                    <img class="logo" src=""/>
                </a> -->
                <h1>欢迎来到 CloudMusic</h1>
            </div>

            <div>
                <form id="login_form" action="">
                    <div class="form-group">
                        <div class="form_text">用户名</div>
                    <input class="form_control" type="text" placeholder="Nickname" name="username" id="username" v-model="form.userName" />
                    </div>
                    
                    <div class="form-group">
                        <div class="form_text">
                            密码
                            <a class="forgetPwd" href="/find-password">忘记密码？</a>
                        </div>
                    
                    <input class="form_control" type="password" placeholder="Password" name="password" id="password" v-model="form.userPassword"/>
                    </div>

                    <!-- <div class="checkbox">
                        
                            <input id="square" type="checkbox" @click="RememberMe"/>
                            <span>记住我</span>
                        
                    </div> -->
                    
                    <input type="button" class="button" @click="loginEvent" value="登 录">
                </form>
            </div>
            <div class="message">
                <p>没有账号? <a id="register" href="/register">点击创建</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import api from '../assets/config/api'
export default {
    data(){
        return{
           form: {
                userName: "",//test339
                userPassword: "",//password
                
           },
        }
    },
    created(){
        // let checkboxDom = document.getElementById('square');
        // if(localStorage!=null&&checkboxDom.checked){
        //     this.form.userName = localStorage.lastUserName;
        //     this.form.userPassword = localStorage.lastPassword;
        // }
       
       
    },
    methods:{
        async loginEvent(){
            if(!this.form.userName){
                alert("请输入用户名！");
                return;
            }
            if(!this.form.userPassword){
                alert("请输入密码！");
                return;
            }
            await axios.post(api.Login, this.form)
            .then(res=>{
                // user_id在 res.data.data.user_id 放在store中使用全局变量
                console.log(res)
                if(res.data.code === 200){
                    this.delUserInfo();
                    let userId = res.data.data.userId;
                    let username = res.data.data.userName;
                    //console.log(username)
                    //console.log(userId)
                    //设置用户ID
                    this.$store.commit('setUserId',userId);
                    //设置用户登录状态
                    this.$store.commit('setIsLogin',true);
                    //设置用户名
                    this.$store.commit('setUserName',username);
                    //设置邮箱
                    this.$store.commit('setUserEmail',res.data.data.userEmail);
                    //设置密码
                    this.$store.commit("setUserPassword",this.form.userPassword);
                    //设置token
                    // this.$store.commit("delToken")
                    this.$store.commit('setToken', res.headers.token);
                    console.log(this.$store.state.token)
                    this.$router.push("/")
                }
                else if(res.data.code === 400){
                    alert("用户名或者密码错误")

                }
            })
            .catch(err=>{
                console.log(err)
                //return err;
            })
        },
        //记住账号密码功能TODO
        // RememberMe(){
        //     let checkboxDom = document.getElementById('square');
        //     if(checkboxDom.checked){
        //         console.log("yes")
        //         //this.saveUserInfo();
        //         // this.$store.commit("setUserName",this.form.userName);
        //         // this.$store.commit("setUserPassword",this.form.userPassword)
        //         // document.getElementById('username').value = this.$store.state.userName;
        //         // document.getElementById('password').value = this.$store.state.userPassword;
        //     }
        
        delUserInfo(){
            this.$store.commit("delIsLogin");
            this.$store.commit("delToken");
            this.$store.commit("delUserId");
            this.$store.commit("delUserName");
            this.$store.commit("delUserEmail");
            this.$store.commit("delUserPassword");
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
    
    .login{
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
            //justify-content: space-evenly;
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
            #login_form{
                display: flex;
                flex-direction: column;
                //justify-content: center;
                height: 3rem !important;
            }
            
            
            .forgetPwd{
                font-weight: 500;
                font-size: 14px;
                text-decoration: none;
            }
            .forgetPwd:hover{
                text-decoration: underline;
            }
            .checkbox{
                margin: 0 auto;
                opacity: 0.7;
                width: 4rem;
                height: 0.3rem;
                background-color: #fff;
                align-items: center;
                text-align: center;
                border-radius: 0.1rem;
                display: flex;
                align-content: center;
                margin-bottom: 0.2rem;
                font-size: 16px;
                padding: 0 0 0 0.2rem;
                #square{
                   width: 0.16rem;
                   height: 0.16rem; 
                }
                span{
                    padding-left: 0.08rem;
                    font-weight: bold;
                }
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
                margin: 0 auto;
                width: 4rem;
                height: 0.3rem;
                border-radius: 0.1rem;
                line-height: 0.3rem;
                font-size: 0.18rem;
                font-weight: bold;
                //background-color: rgb(226, 36, 226);
                #register{
                    color: blue;
                    text-decoration: none;
                }
                #register:hover{
                    text-decoration: underline;
                }
            }
            
        }

       

        
    }
</style>