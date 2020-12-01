<template>
    <div class="login">
        <div class="main">
            <div class="header">
                <!-- <a href="/">
                    <img class="logo" src=""/>
                </a> -->
                <h1>找回密码</h1>
            </div>

            <div>
                <form id="login_form" action="">
                    <div class="form-group">
                        <div class="form_text">用户名</div>
                    <input class="form_control" type="text" placeholder="Nickname" name="username" id="username" v-model="form.userName" />
                    </div>

                    <div class="form-group">
                        <div class="form_text">邮箱</div>
                        <input class="form_control" type="email" placeholder="Email" name="email" id="email" v-model="form.userEmail" />
                    </div>
                    
                    <div class="form-group">
                        <div class="form_text">
                            设置新密码
                            <!-- <a class="forgetPwd" href="/account-setting">忘记密码？</a> -->
                        </div>
                    
                    <input class="form_control" type="password" placeholder="Password" name="password" id="password" v-model="form.userPassword"/>
                    </div>

                    <!-- <div class="checkbox">
                        
                            <input id="square" type="checkbox" @click="RememberMe"/>
                            <span>记住我</span>
                        
                    </div> -->
                    
                    <input type="button" class="button" @click="loginEvent" value="设 置">
                </form>
            </div>
            <!-- <div class="message">
                <p>没有账号? <a id="register" href="/register">点击创建</a></p>
            </div> -->
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
                userName: "cgc123456",
                userEmail: "cgc@test.com",
                userPassword: "987654321",
           },
        }
    },
    created(){
        
       
       
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
            if(!this.form.userEmail){
                alert("请输入邮箱！");
                return;
            }
            await axios.put(api.FindPassword, this.form)
            .then(res=>{
                console.log(res.data)
                if(res.data.code === 201){
                    //弹窗TODO
                    alert("新密码设置成功，即将前往主页")
                    this.$router.push("/")
                }
                else if(res.data.code === 400){
                    alert("用户名或者密码错误")

                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        
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
                height: 4rem;
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