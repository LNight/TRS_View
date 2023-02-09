<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item :to="{ path: '/financeindex'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>审批</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <el-row :gutter="20">
                <el-col :span="12" style="text-align: left"><div class="grid-content bg-purple">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item label="员工姓名" label-width="70px">
                            <el-input clearable v-model="quary.ename" placeholder="请输入员工姓名"></el-input>
                        </el-form-item>
                        <el-form-item style="margin-left: 10px">
                            <el-button type="primary" icon="el-icon-search" plain @click="search" >查询</el-button>
                        </el-form-item>
                    </el-form>
                </div></el-col>
                <el-col :span="12" style="text-align: right"><div class="grid-content bg-purple">
                    <el-button type="primary" plain icon="el-icon-edit" @click="passAll">一键通过</el-button>
                </div></el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col ><div class="grid-content bg-purple">
                    <el-table
                            :data="approvalData"
                            border
                            height="440"
                            @select="selectRow"
                            @select-all="selectAll"
                            style="width: 100%">
                        <el-table-column
                                type="selection"
                                align="center"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                prop="tno"
                                align="center"
                                label="单据序号"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="ename"
                                align="center"
                                label="报销人"
                                width="90">
                        </el-table-column>
                        <el-table-column
                                prop="travelinfo"
                                align="center"
                                label="出差事由"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="totalrei"
                                align="center"
                                label="报销金额"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="reidate"
                                align="center"
                                label="报销提交时间">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" icon="el-icon-view" @click="handleClick(scope.$index,scope.row)" plain>查看</el-button>
                                <el-button type="success" size="mini" icon="el-icon-check" @click="handlePass(scope.$index,scope.row)" plain>通过</el-button>
                                <el-button type="danger" size="mini"  icon="el-icon-close" @click="handleOverrule(scope.$index,scope.row)" plain>驳回</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div></el-col>
            </el-row>
            <!--   分页 -->
            <el-pagination
                    style="padding-top: 15px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="quary.page"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="quary.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <el-dialog title="驳回" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="驳回原因" :label-width="formLabelWidth">
                    <el-input v-model="form.rejectreason" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sure" type="primary" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FinanceApprovalView",
        data () {
            return {
                //查询条件
                quary: {
                    ename: '',
                    state: 2,
                    page: 1,
                    limit: 10
                },total:0,

                approvalData:[],
                queryData:[],
                //被选中的项的集合
                selectionItems:[],
                dialogFormVisible: false,
                form: {
                    tno:'',
                    rejectreason: ''
                },
                formLabelWidth: '120px',
            }
        },
        methods: {
            //条件查询审批信息
            getApprovalList() {
                this.$http.post("/getapprovallist",this.quary).then(res => {
                    this.queryData = res.data.data
                    this.approvalData = res.data.data;
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("审批列表加载失败，请联系管理员")
                })
            },
            //点击查询按钮
            search() {
                this.quary.page = 1;
                this.getApprovalList()
            },
            handleSizeChange (val) {
                this.quary.limit = val;
                this.search()
            },
            handleCurrentChange (val) {
                this.quary.page = val;
                this.getApprovalList()
            },
            handleClick(index,row) {
                this.$router.push({
                    name:"FViewApproval",
                    query: {
                        tInfo: this.queryData[index],
                    }
                })
            },selectRow(selection, row) {
                this.selectionItems = selection
            },
            //全选
            selectAll(selection) {
                this.selectionItems = selection
            },
            passAll(){
                let arr = []
                for (let i = 0; i < this.approvalData.length; i++) {
                    var tno = this.approvalData[i].tno;
                    var state = 3
                    var person = {tno:tno, state:state};
                    arr.push(person);
                }
                this.$http.post("/passallapproval",arr).then(res => {
                    if (res.data == "success") {
                        this.$message.success("通过成功")
                        this.search()
                    } else  {
                        this.$message.error("通过失败")
                    }
                }).catch(() => {
                    this.$message.error("通过失败,请联系管理员")
                })
            },
            handlePass(index,row){
                this.$http.get('/passapproval',{
                    params:{
                        tno: row.tno,
                        state: 3,
                        rejectreason:'',
                        process:''
                    }}).then(res => {
                    if (res.data == "success") {
                        this.$message.success("通过成功")
                        this.search()
                    } else  {
                        this.$message.error("通过失败")
                    }
                }).catch(() => {
                    this.$message.error("通过失败,请联系管理员")
                })
            },
            handleOverrule(index,row) {
                //打开弹出层
                this.dialogFormVisible = true
                this.form.tno = row.tno
            },
            sure(){
                this.$http.get('/passapproval',{
                    params:{
                        tno: this.form.tno,
                        state: 2,
                        rejectreason: this.form.rejectreason,
                        process:'error'
                    }}).then(res => {
                    if (res.data == "success") {
                        this.$message.success("驳回成功")
                        //关闭弹出层
                        this.dialogFormVisible = false
                        this.search()
                    } else  {
                        this.$message.error("驳回失败")
                    }
                }).catch(() => {
                    this.$message.error("驳回失败,请联系管理员")
                })
            },
        },
        created() {
            this.search()
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    h3 {
        display: table-cell;
        height: 39px;
        vertical-align: middle;
        color: gray;
    }
</style>