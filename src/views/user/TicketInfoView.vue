<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>车票信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表卡片 -->
        <el-card class="box-card">
            <el-form :inline="true"  class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="12"><div class="grid-content bg-purple" style="text-align: left">
                        <el-form-item label-width="70px">
                            <div class="block">
                                <el-date-picker
                                        v-model="quary.value"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd HH-mm-ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item style="margin-left: 10px">
                            <el-button type="primary" icon="el-icon-search" plain @click="search" >查询</el-button>
                        </el-form-item>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content bg-purple" style="text-align: right">
                        <el-form-item style="margin-left: 10px">
                            <el-button type="success" icon="el-icon-plus" plain @click="add">新增</el-button>
                            <el-button type="danger" icon="el-icon-delete" plain @click="del">删除</el-button>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>
            <!-- 表格内容显示区域   -->
            <el-table
                    :data="ticketList"
                    border
                    height="450"
                    style="width: 100%; height: 450px"
                    @select="selectRow"
                    @select-all="selectAll"
            >
                <!--  type="selection" 复选框   -->
                <el-table-column
                        type="selection"
                        align="center"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="tid"
                        label="车票编号"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型"
                        align="center"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="startposition"
                        label="出发地点"
                        align="center"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="endposition"
                        label="到达地点"
                        align="center"
                        width="120"
                >
                </el-table-column>
                <el-table-column
                        prop="startTime"
                        label="出发时间"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="endTime"
                        label="到达时间"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="vname"
                        label="交通工具"
                        align="center"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="车票金额"
                        align="center"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="image"
                        label="照片"
                        align="center"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        prop="travelinfo"
                        label="出差说明"
                        align="center"
                >
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
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "TicketInfoView",
        data () {
            return {
                //查询条件
                quary: {
                    empno: sessionStorage.getItem("empno"),
                    value: '',
                    page: 1,
                    limit: 10
                },
                ticketList:[],
                total:0,
                ename: sessionStorage.getItem("ename"),
                //被选中的项的集合
                selectionItems:[],
                //禁止面板重叠
                notifyPromise: Promise.resolve(),
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        methods: {
            //条件查询车票信息
            getTicketList() {
                this.$http.post("/getticketlist",this.quary).then(res => {
                    let temp = res.data.data
                    for (let i = 0; i < temp.length; i++) {
                        res.data.data[i].startTime = temp[i].startTime.substr(0,16)
                        res.data.data[i].endTime = temp[i].endTime.substr(0,16)
                        if(res.data.data[i].image != null && res.data.data[i].image != ''){
                            res.data.data[i].image = '有'
                        }else {
                            res.data.data[i].image = '无'
                        }
                    }
                    this.ticketList = res.data.data;
                    this.total = res.data.count
                }).catch(() => {
                    this.$message.error("车票信息加载失败，请联系管理员")
                })
            },
            //点击查询按钮
            search() {
                this.quary.page = 1;
                this.getTicketList()
            },
            handleSizeChange (val) {
                this.quary.limit = val;
                this.search()
            },
            handleCurrentChange (val) {
                this.quary.page = val;
                this.getTicketList()
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
            //跳转新增页面
            add() {
                this.$router.push("/addticket")
            },
            del() {
                let selection = this.selectionItems;
                let isContact = false;

                //判断被选中的条数
                if (selection.length == 0) {
                    this.$message.warning("请至少选择一条数据");
                    return
                }
                //判断车票是否关联差旅信息
                for (let i = 0; i < selection.length ; i++) {
                    if(selection[i].tno != '0'){
                        this.notifyPromise = this.notifyPromise.then(() =>{
                            this.$notify({
                                title: '不可删除',
                                message: "编号为"+selection[i].tid+"的车票已关联差旅信息",
                                type: 'warning',
                                duration: 1500
                            });
                        });
                        isContact = true
                    }
                }
                if(isContact){
                    return
                }
                //要求用户确认
                this.$confirm('确定要删除所选车票吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的tid
                    let arr = [];
                    for (let i = 0; i < selection.length ; i++) {
                        arr.push(selection[i].tid)
                    }
                    this.$http.post("/delticket",arr).then(res => {
                        if (res.data == "success") {
                            this.$message.success("删除成功");
                            //刷新表格
                            this.search()
                        } else {
                            this.$message.error("删除失败")
                        }
                    }).catch(() => {
                        this.$message.error("删除失败，请联系管理员")
                    })

                })
            },
        },
        created() {
            this.search()
        }
    }
</script>

<style scoped>

</style>