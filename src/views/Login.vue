<template>
    <div class="login">
        <div class="mylogin" align="center">
            <h3>差旅报销系统</h3>
            <el-form :model="loginForm" :rules="loginRules" ref="form" label-width="0px">
                <el-form-item label="" prop="empno" style="margin-top: 10px">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-s-custom"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input
                                    class="inps"
                                    placeholder="账号"
                                    v-model="loginForm.empno"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-row>
                        <el-col :span="2">
                            <span class="el-icon-lock"></span>
                        </el-col>
                        <el-col :span="22">
                            <el-input
                                    class="inps"
                                    type="password"
                                    placeholder="密码"
                                    v-model="loginForm.password"
                            ></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item style="margin-top: 55px">
                    <el-button type="primary" round class="submitBtn" @click="submitForm"
                    >登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from "vuex";

    export default {
        name: "Login",
        data: function () {
            return {
                loginForm: {
                    empno: "",
                    password: "",
                },
                loginRules: {
                    // empno: [{ required: true, message: "请输入账号", trigger: "blur" }],
                    // password: [{ required: true, message: "请输入密码", trigger: "blur" }],
                },
            };
        },

        methods: {
            ...mapMutations(["changeLogin"]),
            submitForm() {
                const userAccount = this.loginForm.empno;
                const userPassword = this.loginForm.password;
                if (!userAccount) {
                    return this.$message({
                        type: "error",
                        message: "账号不能为空！",
                    });
                }
                if (!userPassword) {
                    return this.$message({
                        type: "error",
                        message: "密码不能为空！",
                    });
                }
                this.$refs["form"].validate((valid)=> {
                    //valid为boolean类型，通过校验valid值为true，未通过，值为false
                    if (!valid) {
                        return //结束方法
                    }
                    this.$http.post("/login",this.loginForm).then((res) => {
                        var str = res.data.split(',')
                        if (str[0] == "0") {
                            //将用户名存储在store
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            this.$store.dispatch("setEmpno",str[2])
                            sessionStorage.setItem("empno",str[2])
                            //跳到用户页面
                            this.$router.push("/userhome")
                        } else if(str[0] == "1"){
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            //跳到管理员页面
                            this.$router.push("/adminhome")
                        }
                        else if(str[0] == "2"){
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            //跳到管理员页面
                            this.$router.push("/managerhome")
                        }
                        else if(str[0] == "3"){
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            //跳到管理员页面
                            this.$router.push("/financehome")
                        }
                        else if(str[0] == "4"){
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            //跳到管理员页面
                            this.$router.push("/leadershiphome")
                        }
                        else if(str[0] == "5"){
                            //通过分发的方式修改state中uname的值
                            this.$store.dispatch("setEname",str[1])
                            //将用户名存储在session中
                            sessionStorage.setItem("ename",str[1])
                            //跳到管理员页面
                            this.$router.push("/cashierhome")
                        }
                        else {
                            this.$message.error('账号或密码错误');
                        }
                    })
                })
            },
        },
    };
</script>

<style scoped>
    .login {
        width: 100vw;
        padding: 0;
        margin: 0;
        height: 100vh;
        font-size: 16px;
        background-position: left top;
        /*background-color: #242645;*/
        background-image: url("../assets/loginbg.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #fff;
        font-family: "Source Sans Pro";
        position: relative;
    }

    .mylogin {
        width: 240px;
        height: 240px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 50px 40px 40px 40px;
        box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
        opacity: 1;
        background: linear-gradient(
                230deg,
                rgba(53, 57, 74, 0) 0%,
                rgb(0, 0, 0) 100%
        );
    }

    .inps input {
        border: none;
        color: #fff;
        background-color: transparent;
        font-size: 12px;
    }

    .submitBtn {
        background-color: transparent;
        color: #39f;
        width: 200px;
    }
</style>