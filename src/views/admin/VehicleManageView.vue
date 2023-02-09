<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>交通工具管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表卡片 -->
        <el-card class="box-card">

            <el-form :inline="true"  class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="12"><div class="grid-content bg-purple" style="text-align: left">
                        <el-form-item label="交通工具" label-width="70px">
                            <el-input clearable v-model="quary.vname" placeholder="请输入交通工具"></el-input>
                        </el-form-item>
                        <el-form-item style="margin-left: 10px">
                            <el-button type="primary" icon="el-icon-search" plain @click="search" >查询</el-button>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple" style="text-align: right">
                        <el-form-item style="margin-left: 10px">
                            <el-button type="success" icon="el-icon-plus" plain @click="add">新增</el-button>
                            <el-button icon="el-icon-edit" plain @click="update">修改</el-button>
                            <el-button type="danger" icon="el-icon-delete" plain @click="del">删除</el-button>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>
            <!-- 表格内容显示区域   -->
            <el-table
                    :data="vehicles"
                    border
                    height="478"
                    style="width: 100%; height: 450px"
                    @select="selectRow"
                    @select-all="selectAll"
            >
                <!--  type="selection" 复选框   -->
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <!--   type="index" 索引列    -->
<!--                <el-table-column-->
<!--                        type="index"-->
<!--                        width="85"-->
<!--                        label="序号"-->
<!--                >-->
<!--                </el-table-column>-->
                <el-table-column
                        prop="vno"
                        label="编号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="vname"
                        label="名称"
                        width="180">
                </el-table-column>
            </el-table>
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
            <!--弹出层-->
            <el-dialog width="33%" :title="title" :visible.sync="dialogFormVisible">
                <el-form ref="vehForm" :model="vehForm" :rules="rules">
                    <el-form-item v-if="vehForm.vno != ''" style="width: 400px" label="编号" :label-width="formLabelWidth" prop="vno">
                        <el-input v-model="vehForm.vno" autocomplete="off" readonly :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item style="width: 400px" label="名称" :label-width="formLabelWidth" prop="vname">
                        <el-input v-model="vehForm.vname" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveVehicle">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "VehicleManageView",
        data () {
            return {
                rules: {
                    vname: [
                        {required: true, message: "名称不能为空",trigger:"blur"}
                    ]
                },
                //查询条件
                quary: {
                    vname: '',
                    page: 1,
                    limit: 10
                },
                vehicles:[],
                total:0,
                //弹出层是否显示
                dialogFormVisible: false,
                //弹出层表单的左侧提示文字的宽度
                formLabelWidth: '120px',
                //被选中的项的集合
                selectionItems:[],
                //弹出层标题
                title: '',
                //新增的表单数据源
                vehForm: {
                    vno: '',
                    vname: '',
                },
                //禁止面板重叠
                notifyPromise: Promise.resolve(),
            }
        },
        methods: {
            handleSizeChange (val) {
                this.quary.limit = val
                this.search()
            },
            handleCurrentChange (val) {
                this.quary.page = val
                this.getVehList()
            },
            //条件查询员工信息
            getVehList() {
                this.$http.post("/vehlist",this.quary).then(res => {
                    this.vehicles = res.data.data
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("员工信息加载失败，请联系管理员")
                })
            },
            //点击查询按钮
            search() {
                this.quary.page = 1
                this.getVehList()
            },
            //当对某行数据选中或取消选中时
            //selection 被选中项的集合
            //row 当前行
            selectRow(selection, row) {
                this.selectionItems = selection
            },
            //全选
            selectAll(selection) {
                this.selectionItems = selection
            },
            //打开弹出层
            add() {
                //打开弹出层
                this.dialogFormVisible = true
                //修改标题
                this.title = "新增交通工具"
                //重置表单
                if ( this.$refs["vehForm"] != null) {
                    this.$refs["vehForm"].resetFields()
                }
                this.vehForm = {
                    vno: '',
                    vname: ''
                }
            },
            update() {
                //判断是否只选中了一条
                let selections = this.selectionItems
                if (selections.length != 1) {
                    this.$message.warning("请选择一条数据")
                    return
                }
                //打开弹出层
                this.dialogFormVisible = true
                //修改标题
                this.title = "修改信息"
                //重置表单
                if (this.$refs["vehForm"] != null) {
                    this.$refs["vehForm"].resetFields()
                }
                //给表单元素赋值
                this.vehForm = selections[0]
            },
            del() {
                let selection = this.selectionItems
                let varr = []
                //判断被选中的条数
                if (selection.length == 0) {
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                //判断交通工具是否关联车票信息
                for (let i = 0; i < selection.length ; i++) {
                    this.$http.get('/getvnoinfo',{
                        params:{
                            vno:selection[i].vno
                        }
                    }).then(res => {
                        let str = res.data.split(',')
                        if (str[0] == "success") {
                            varr.push(str[1])
                            this.notifyPromise = this.notifyPromise.then(() =>{
                                this.$notify({
                                    title: '不可删除',
                                    message: "编号为"+selection[i].vno+"的交通工具已关联车票信息",
                                    type: 'warning',
                                    duration: 2000
                                });
                            });
                        }else {
                            //要求用户确认
                            this.$confirm('确定要删除所选交通工具吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                //获取被选中项的vno
                                let arr = [];
                                for (let i = 0; i < selection.length ; i++) {
                                    arr.push(selection[i].vno)
                                }
                                this.$http.post("/delVehicles",arr).then(res => {
                                    if (res.data == "success") {
                                        this.$message.success("删除成功")
                                        //刷新表格
                                        this.search()
                                    } else {
                                        this.$message.error("删除失败")
                                    }
                                }).catch(() => {
                                    this.$message.error("删除失败，请联系管理员")
                                })

                            })
                        }
                        console.log(varr)
                    })
                }
            },
            //保存交通工具信息
            saveVehicle() {
                //表单校验
                this.$refs["vehForm"].validate(valid => {
                    if (valid) {
                        let url = '/updateVehicle'; //默认路径为修改
                        let msg = "修改";
                        //判断是在新增还是在修改
                        if (this.vehForm.vno == '') {
                            url = "/addVehicle"
                            msg = "新增"
                        }
                        this.$http.post(url,this.vehForm).then(res => {
                            if (res.data == "success") {
                                this.$message.success(msg+"成功")
                            } else  {
                                this.$message.error(msg + "失败")
                            }
                            //关闭弹出层
                            this.dialogFormVisible = false
                            //重新加载表格
                            this.search()
                            //清空选项集合
                            this.selectionItems = []
                        }).catch(() => {
                            this.$message.error(msg + "失败,请联系管理员")
                        })
                    }
                })
            }
        },
        created() {
            this.search()
        }
    }
</script>

<style scoped>

</style>