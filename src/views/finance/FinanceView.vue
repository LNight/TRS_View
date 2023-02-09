<template>
    <div>
        <el-container>
            <el-header >
                欢迎你 {{ename}}
                <div style="float:right">
                    <el-dropdown @command="command" trigger="click">
                        <span class="el-dropdown-link" style="color: white;">
                            {{ename}}      <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="2">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <!--   :router="true" 开启vue-router ，以index的值作为path进行路由跳转               -->
                    <el-menu
                            default-active="/financeindex"
                            class="el-menu-vertical-demo"
                            :router="true"
                    >
                        <el-menu-item index="/financeindex">
                            <!-- 通过修改class可以修改图标 -->
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首&emsp;&emsp;页</span>
                        </el-menu-item>

                        <el-menu-item index="/financeapproval">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">审&emsp;&emsp;批</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
        <!--弹出层-->
        <el-dialog width="33%" :title="title" :visible.sync="dialogFormVisible">
            <el-form ref="adminForm" :model="adminForm" :rules="rules">
                <el-form-item style="width: 400px" label="用户名" :label-width="formLabelWidth" prop="ename">
                    <el-input v-model="adminForm.ename" autocomplete="off" readonly :disabled="true"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px" label="原密码" :label-width="formLabelWidth" prop="fpassword">
                    <el-input v-model="adminForm.fpassword" show-password autocomplete="off" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item style="width: 400px" label="新密码" :label-width="formLabelWidth" prop="spassword">
                    <el-input v-model="adminForm.spassword" show-password autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button  plain @click="dialogFormVisible = false">取 消</el-button>
                <el-button  plain type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FinanceView",
        data() {
            return {
                ename: sessionStorage.getItem("ename"),
                adminForm:{
                    ename:'',
                    fpassword: '',
                    spassword: ''
                },
                rules: {
                    fpassword: [
                        {required: true, message: "原密码不能为空",trigger:"blur"}
                    ],
                    spassword: [
                        {required: true, message: "新密码不能为空",trigger:"blur"}
                    ],
                },
                //弹出层标题
                title: '',
                //弹出层是否显示
                dialogFormVisible: false,
                //弹出层表单的左侧提示文字的宽度
                formLabelWidth: '120px',
            }
        },
        methods: {
            command(index){
                switch(index){
                    case '1':
                        this.toClick()
                        break;
                    case '2':
                        this.exit()
                        break
                }
            },
            toClick(){
                //打开弹出层
                this.dialogFormVisible = true
                //修改标题
                this.title = "修改密码"
                //重置表单
                if (this.$refs["adminForm"] != null) {
                    this.$refs["adminForm"].resetFields()
                }
                //给表单元素赋值
                this.adminForm.ename = sessionStorage.getItem('ename')

            },
            save() {
                //表单校验
                this.$refs["adminForm"].validate(valid => {
                    if (valid) {
                        let url = '/updPassword'; //默认路径为修改员工
                        let msg = "修改";
                        // console.log(this.adminForm)
                        this.$http.post(url,this.adminForm).then(res => {
                            if (res.data == "success") {
                                this.$message.success(msg+"成功")
                            }
                            else if(res.data == "oldPasswordError"){
                                this.$message.error("原密码错误")
                            }
                            else  {
                                this.$message.error(msg + "失败")
                            }
                            //关闭弹出层
                            this.dialogFormVisible = false
                        }).catch(() => {
                            this.$message.error(msg + "失败,请联系管理员")
                        })
                    }
                })
            },
            exit(){
                //跳转登录页面
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #373d41;
    }
    .el-header i{
        font-size: 20px;
        cursor:pointer;
    }
    .el-main {
        background-color: #eaedf1;
    }
    .el-container {
        height: 100%;
    }
    /*头部样式*/
    .el-header {
        background-color: #373d41;
        display: flex;
        /*左右贴边*/
        justify-content: space-between;
        padding-left: 20px;
        align-items: center;
        color: #fff;
        font-size: 20px;
    }
    .el-header>div {
        display: flex;
        align-items: center;
    }
    .el-header>div>span {
        cursor: pointer;
    }
    .el-header span {
        margin-left: 15px;
    }
    .el-aside {
        height: 500px;
    }
</style>