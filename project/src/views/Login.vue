<template>
    <div class="login">
        <div class="main">
            <div class="header">
                <!-- <a href="/">
                    <img class="logo" src=""/>
                </a> -->
                <h1>用户登录</h1>
            </div>

            <div>
                <form id="login_form" action="">
                    <div class="form-group">
                        <label class="form_text">邮箱</label>
                    <input class="from_control" type="email" placeholder="Email" name="email" id="email" v-model="email" />
                    </div>
                    
                    <div class="form-group">
                        <label class="form_text">密码</label>
                    <a class="forgetPwd" href="/account-setting">忘记密码？</a>
                    <input class="from_control" type="password" placeholder="Password" name="password" id="password" v-model="password"/>
                    </div>

                    <div class="checkbox">
                        <label for="">
                            <input type="checkbox"/>
                            <span>记住我</span>
                        </label>
                    </div>
                    
                    <button type="submit" class="button" @click="loginEvent">登录</button>
                </form>
            </div>
            <div class="message">
                <p>没有账号? <a href="/register">点击创建</a></p>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'

export default {
    data(){
        return{
            email: "",
            password: "",
            isRemeber: false,
        }
    },
    async created(){
        //let res = await axios.get("")//请求数据 获取邮箱与密码
    },
    methods:{
        loginEvent(){
            if(!this.email){
                alert("请输入邮箱！");
                return;
            }
            if(!this.password){
                alert("请输入密码！");
                return;
            }

            //还有邮箱与密码校验没有写
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
    body{
        background-image: url("../assets/img/login_bg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .login{
        height: 100vh;
        margin-top: 100px;
        .main{
            width: 400px;
            height: 600px;
            //opacity: 0.9;
            margin: 0 auto;
            .header{
                height: 100px;
                width: 400px;
                background-color: palevioletred;
                border-radius: 20px;
                margin: 0 auto;
                line-height: 100px;
                color: #efefef;
                margin-bottom: 10px;
            }

            .form-group{
                height: 100px;
                width: 400px;
                border-radius: 20px;
                margin-bottom: 10px;
                background-color: #fff;
                .form_control{
                    text-align: center;
                }
            }
            .form_text{
                font-size: 20px;
                
                text-align: left;
                padding: 10px 0 0 20px;
            }
            .from_control{
                display: block;
            }
            #email{

            }
            #password{

            }
            .forgetPwd{

            }
            .checkbox{

            }
            .button{

            }
            
        }

       

        
    }
</style>