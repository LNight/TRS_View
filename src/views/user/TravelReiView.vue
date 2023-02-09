<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item>差旅报销</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 用户列表卡片 -->
        <el-card class="box-card">
            <el-form :inline="true"  class="demo-form-inline">
                <el-row :gutter="20">
                    <el-col :span="12"><div style="text-align: left">
                        <el-form-item label="报销日期" style="margin-bottom: 20px;" label-width="70px">
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
                    <el-col :span="12"><div style="text-align: right">
                        <el-form-item style="margin-left: 10px">
                            <el-button type="text" @click="historyList">历史记录</el-button>
                            <el-button type="success" icon="el-icon-plus" plain @click="add">新增</el-button>
                            <el-button type="danger" icon="el-icon-delete" plain @click="del">删除</el-button>
                        </el-form-item>
                    </div></el-col>
                </el-row>
            </el-form>
            <!-- 表格内容显示区域   -->
            <el-table
                    :data="travelrei"
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
                <!--   type="index" 索引列    -->
                <el-table-column
                        type="index"
                        width="60"
                        align="center"
                        label="序号"
                >
                </el-table-column>
                <el-table-column
                        prop="tno"
                        label="单据序号"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="travelinfo"
                        label="出差事由"
                        align="center"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="totalrei"
                        label="报销金额"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="reidate"
                        label="报销提交时间"
                        align="center"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="报销进度"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-steps :space="200" :active="scope.row.state" :process-status = "scope.row.process" align-center finish-status="success">
                            <el-step title="员工填写"></el-step>
                            <el-step title="部门审批"></el-step>
                            <el-step title="财务审批"></el-step>
                            <el-step title="领导审批"></el-step>
                            <el-step title="出纳付款"></el-step>
                        </el-steps>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center" width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleClick1(scope.$index,scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="handleClick(scope.$index,scope.row)" :disabled="scope.row.isSubmit" type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--   分页 -->
            <el-pagination
                    style="padding-top: 15px"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="quary.page"
                    :page-sizes="[5, 10, 15]"
                    :page-size="quary.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-card>
        <el-dialog title="差旅信息" :visible.sync="dialogFormVisible">
            <el-row class="content">
                <el-col><div class="inputDeep">
                    <el-form ref="travelReiForm" :model="travelReiForm" label-width="0px">
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>单据序号</h5>
                            </div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">
                                <el-form-item prop="tno">
                                    <el-input v-model="travelReiForm.tno" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>报&nbsp;&nbsp;销&nbsp;&nbsp;人</h5>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item prop="ename">
                                    <el-input v-model="travelReiForm.ename" :disabled="true"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>出发时间</h5>
                            </div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">
                                <el-form-item prop="startdate">
                                    <el-input v-model="travelReiForm.startdate" :disabled="true" clearable ></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>到达时间</h5>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item prop="enddate">
                                    <el-input v-model="travelReiForm.enddate" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>天&emsp;&emsp;数</h5>
                            </div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">
                                <el-form-item prop="tdays">
                                    <el-input v-model="travelReiForm.tdays" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>报销金额</h5>
                            </div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple-light">
                                <el-form-item prop="totalrei">
                                    <el-input v-model="travelReiForm.totalrei" :disabled="true" clearable @input="smallToBig(travelReiForm.totalrei)"></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="2"><div class="grid-content bg-purple">
                                <h5 style="padding-left: 10px;">大&emsp;写</h5>
                            </div></el-col>
                            <el-col :span="7"><div class="grid-content bg-purple-light">
                                <el-form-item >
                                    <el-input v-model="travelReiForm.big" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>出差事由</h5>
                            </div></el-col>
                            <el-col :span="6"><div class="grid-content bg-purple-light">
                                <el-form-item prop="travelinfo">
                                    <el-input v-model="travelReiForm.travelinfo" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>报销时间</h5>
                            </div></el-col>
                            <el-col :span="12"><div class="grid-content bg-purple-light">
                                <el-form-item >
                                    <el-input v-model="travelReiForm.reidate" :disabled="true"></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                        <el-row v-if="travelReiForm.rejectreason != null">
                            <el-col :span="3"><div class="grid-content bg-purple">
                                <h5>驳回原因</h5>
                            </div></el-col>
                            <el-col :span="21"><div class="grid-content bg-purple-light">
                                <el-form-item prop="rejectreason">
                                    <el-input v-model="travelReiForm.rejectreason" :disabled="true" clearable></el-input>
                                </el-form-item>
                            </div></el-col>
                        </el-row>
                    </el-form>
                </div></el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "TravelReimbursementView",
        data () {
            return {
                //查询条件
                quary: {
                    empno: sessionStorage.getItem("empno"),
                    value: '',
                    page: 1,
                    limit: 10
                },
                travelrei:[],
                total:0,
                ename: sessionStorage.getItem("ename"),
                //弹出层是否显示
                dialogFormVisible: false,
                //被选中的项的集合
                selectionItems:[],
                //弹出层标题
                title: '',
                //查看的表单数据源
                travelReiForm:{
                    tno:'',
                    ename: sessionStorage.getItem('ename'),
                    empno: sessionStorage.getItem('empno'),
                    startdate: '',
                    enddate: '',
                    tdays: '',
                    totalrei:'',
                    big:'',
                    travelinfo:'',
                    reidate:'',
                    rejectreason: ''
                },
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
                },
                active: 0,
                queryData:[],
                //禁止面板重叠
                notifyPromise: Promise.resolve(),
            }
        },
        methods: {
            handleClick(index,row) {
                this.$router.push({
                    name:"EditTravel",
                    query: {
                        tInfo: this.queryData[index],
                    }
                })
            },
            handleClick1(index,row){
                //打开弹出层
                this.dialogFormVisible = true
                this.travelReiForm = row
                this.travelReiForm.ename = sessionStorage.getItem('ename')
                this.smallToBig(row.totalrei)

            },
            //条件查询员工信息
            getTravelReiList() {
                // alert(this.quary.value)
                this.$http.post("/travelreilist",this.quary).then(res => {
                    this.queryData = res.data.data
                    this.total = res.data.count
                    let arr = {}
                    let arrs = []
                    var jsonObj = JSON.parse(JSON.stringify(res.data.data));
                    for (let i = 0; i < this.queryData.length; i++) {
                        jsonObj[i].isSubmit = (this.queryData[i].state != 0 && this.queryData[i].process == 'process')
                    }
                    this.travelrei = jsonObj
                }).catch(() => {
                    this.$message.error("差旅信息加载失败，请联系管理员")
                })
            },
            //历史记录查询
            historyList(){
                this.$http.post("/historylist",this.quary).then(res => {
                    this.queryData = res.data.data
                    this.total = res.data.count
                    let arr = {}
                    let arrs = []
                    var jsonObj = JSON.parse(JSON.stringify(res.data.data));
                    for (let i = 0; i < this.queryData.length; i++) {
                        jsonObj[i].isSubmit = (this.queryData[i].state != 0 && this.queryData[i].process == 'process')
                    }
                    this.travelrei = jsonObj
                }).catch(() => {
                    this.$message.error("差旅信息加载失败，请联系管理员")
                })
            },
            //点击查询按钮
            search() {
                this.quary.page = 1
                this.getTravelReiList()
            },
            handleSizeChange (val) {
                this.quary.limit = val
                this.search()
            },
            handleCurrentChange (val) {
                this.quary.page = val
                this.getTravelReiList()
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
            add() {
                this.$router.push("/addtravel")
                this.$store.dispatch("setReiDate",this.getSystemTime())
                sessionStorage.setItem("reidate",this.getSystemTime())
            },
            getSystemTime(){
                var date = new Date();
                return date.toLocaleString()
            },
            del() {
                let selection = this.selectionItems
                let isSubmit = false;
                //判断被选中的条数
                if (selection.length == 0) {
                    this.$message.warning("请至少选择一条数据")
                    return
                }
                //判断差旅信息是否提交
                for (let i = 0; i < selection.length ; i++) {
                    if(selection[i].state != '0'){
                        this.notifyPromise = this.notifyPromise.then(() =>{
                            this.$notify({
                                title: '不可删除',
                                message: "编号为"+selection[i].tno+"的差旅信息已提交",
                                type: 'warning',
                                duration: 1500
                            });
                        });
                        isSubmit = true
                    }
                }
                if(isSubmit){
                    return;
                }

                // 要求用户确认
                this.$confirm('确定要删除所选差旅信息吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //获取被选中项的tno
                    let arr = [];
                    for (let i = 0; i < selection.length ; i++) {
                        arr.push(selection[i].tno)
                    }
                    this.$http.post("/deltravelrei",arr).then(res => {
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
            },
            smallToBig(money) {
                //  将数字金额转换为大写金额
                var cnNums = ["零",
                    "壹",
                    "贰",
                    "叁",
                    "肆",
                    "伍",
                    "陆",
                    "柒",
                    "捌",
                    "玖"]; //汉字的数字
                var cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
                var cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
                var cnDecUnits = ["角", "分", "毫", "厘"]; //对应小数部分单位
                var cnInteger = "整"; //整数金额时后面跟的字符
                var cnIntLast = "元"; //整数完以后的单位
                //最大处理的数字
                var maxNum = 999999999999999.9999;
                var integerNum; //金额整数部分
                var decimalNum; //金额小数部分
                //输出的中文金额字符串
                var chineseStr = "";
                var parts; //分离金额后用的数组，预定义
                if (money == "") {
                    return "";
                }

                money = parseFloat(money);
                if (money >= maxNum) {
                    //超出最大处理数字
                    return "超出最大处理数字";
                }
                if (money == 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }

                //四舍五入保留两位小数,转换为字符串
                money = Math.round(money * 100).toString();
                integerNum = money.substr(0, money.length - 2);
                decimalNum = money.substr(money.length - 2);

                //获取整型部分转换
                if (parseInt(integerNum, 10) > 0) {
                    var zeroCount = 0;
                    var IntLen = integerNum.length;
                    for (var i = 0; i < IntLen; i++) {
                        var n = integerNum.substr(i, 1);
                        var p = IntLen - i - 1;
                        var q = p / 4;
                        var m = p % 4;
                        if (n == "0") {
                            zeroCount++;
                        } else {
                            if (zeroCount > 0) {
                                chineseStr += cnNums[0];
                            }
                            //归零
                            zeroCount = 0;
                            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                        }
                        if (m == 0 && zeroCount < 4) {
                            chineseStr += cnIntUnits[q];
                        }
                    }
                    chineseStr += cnIntLast;
                }
                //小数部分
                if (decimalNum != "") {
                    var decLen = decimalNum.length;
                    for (var i = 0; i < decLen; i++) {
                        var n = decimalNum.substr(i, 1);
                        if (n != "0") {
                            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                        }
                    }
                }
                if (chineseStr == "") {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum == "" || /^0*$/.test(decimalNum)) {
                    chineseStr += cnInteger;
                }
                this.travelReiForm.big = chineseStr
            },
        },
        mounted() {
            this.search()
        }
    }
</script>

<style scoped>
    .tableDialog>>>.el-dialog__body {
        padding: 10px 20px 30px 20px;
    }
    .inputDeep>>>.el-input__inner {
        border-radius:0;
        border: 0px;
    }
    .el-form-item {
        /*margin-bottom: 0px;*/
        margin: 0px;
        padding: 0px;
    }
    .content{
        margin-bottom: 5px;
    }
    h5 {
        display: table-cell;
        padding-left: 20px;
        height: 39px;
        vertical-align: middle;
        color: gray;
    }
    .el-col {
        border-collapse:collapse;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #fafafa;
    }
    .bg-purple-light {
        background: #ffffff;
    }
    .grid-content {
        border: 1px solid #eef0f4;
        border-collapse:collapse;
        min-height: 36px;
        height: 40px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>