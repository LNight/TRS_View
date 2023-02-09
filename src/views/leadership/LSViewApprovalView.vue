<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item :to="{ path: '/leadershipindex'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/leadershipapproval' }">审批</el-breadcrumb-item>
            <el-breadcrumb-item>差旅详细信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card" style="height: 625px">
            <div style="padding: 0px;margin: 0px">
                <el-row class="content">
                    <el-col :span="12" align="left"><div>
                        <h3 style="display: table-cell;height: 40px;vertical-align: middle">差旅报销</h3>
                    </div></el-col>
                    <el-col :span="12" align="right"><div>
                        <el-button type="success" icon="el-icon-check" plain @click="pass">通过</el-button>
                        <el-button type="danger" icon="el-icon-close" plain @click="overrule">驳回</el-button>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div class="inputDeep">
                        <el-form ref="travelReiForm" :model="travelReiForm" label-width="0px">
                            <el-row>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>单据序号</h5>
                                </div></el-col>
                                <el-col :span="7"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="tno">
                                        <el-input v-model="travelReiForm.tno" :disabled="true" clearable></el-input>
                                    </el-form-item>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>报&nbsp;&nbsp;销&nbsp;&nbsp;人</h5>
                                </div></el-col>
                                <el-col :span="11"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="ename">
                                        <el-input v-model="travelReiForm.ename"  :disabled="true"></el-input>
                                    </el-form-item>
                                </div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>出发时间</h5>
                                </div></el-col>
                                <el-col :span="7"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="startdate">
                                        <el-input v-model="travelReiForm.startdate" :disabled="true" clearable ></el-input>
                                    </el-form-item>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>到达时间</h5>
                                </div></el-col>
                                <el-col :span="11"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="enddate">
                                        <el-input v-model="travelReiForm.enddate" :disabled="true" clearable></el-input>
                                    </el-form-item>
                                </div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>天&emsp;&emsp;数</h5>
                                </div></el-col>
                                <el-col :span="7"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="tdays">
                                        <el-input v-model="travelReiForm.tdays" :disabled="true" clearable></el-input>
                                    </el-form-item>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>报销金额</h5>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="totalrei">
                                        <el-input v-model="travelReiForm.totalrei" :disabled="true" clearable ></el-input>
                                    </el-form-item>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>大&emsp;&emsp;写</h5>
                                </div></el-col>
                                <el-col :span="5"><div class="grid-content bg-purple-light">
                                    <el-form-item >
                                        <el-input v-model="travelReiForm.big"  :disabled="true" clearable></el-input>
                                    </el-form-item>
                                </div></el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>出差事由</h5>
                                </div></el-col>
                                <el-col :span="7"><div class="grid-content bg-purple-light">
                                    <el-form-item prop="travelinfo">
                                        <el-input v-model="travelReiForm.travelinfo" :disabled="true" clearable></el-input>
                                    </el-form-item>
                                </div></el-col>
                                <el-col :span="3"><div class="grid-content bg-purple">
                                    <h5>报销时间</h5>
                                </div></el-col>
                                <el-col :span="11"><div class="grid-content bg-purple-light">
                                    <el-form-item >
                                        <el-input v-model="travelReiForm.reidate" :disabled="true"></el-input>
                                    </el-form-item>
                                </div></el-col>
                            </el-row>
                        </el-form>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div>
                        <div>
                            <el-row :gutter="10">
                                <el-col :span="12" align="left"><div>
                                    <h3 style="display: table-cell;height: 31px;vertical-align: middle">差旅信息</h3>
                                </div></el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div>
                        <div>
                            <el-row :gutter="10">
                                <el-col :span="24"><div>
                                    <el-table
                                            :data="ticketInfo"
                                            border
                                            height="140"
                                            size="mini"
                                            style="width: 100%;">
                                        <el-table-column
                                                type="index"
                                                width="85"
                                                align="center"
                                                label="序号"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="type"
                                                label="类型"
                                                align="center"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="startposition"
                                                label="出发地点"
                                                align="center"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="endposition"
                                                align="center"
                                                label="到达地点">
                                        </el-table-column>
                                        <el-table-column
                                                prop="startTime"
                                                align="center"
                                                label="出发时间">
                                        </el-table-column>
                                        <el-table-column
                                                prop="endTime"
                                                align="center"
                                                label="到达时间">
                                        </el-table-column>
                                        <el-table-column
                                                prop="vname"
                                                align="center"
                                                label="交通工具">
                                        </el-table-column>
                                        <el-table-column
                                                prop="money"
                                                align="center"
                                                label="车票金额">
                                        </el-table-column>
                                    </el-table>
                                </div></el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div>
                        <div>
                            <el-row :gutter="10">
                                <el-col :span="12" align="left"><div>
                                    <h3 style="display: table-cell;height: 31px;vertical-align: middle">补助信息</h3>
                                </div></el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div>
                        <div>
                            <el-row :gutter="10">
                                <el-col :span="24"><div>
                                    <el-table
                                            :data="subsidyInfo"
                                            border
                                            height="116"
                                            size="mini"
                                            style="width: 100%;">
                                        <el-table-column
                                                type="index"
                                                width="85"
                                                align="center"
                                                label="序号"
                                        >
                                        </el-table-column>
                                        <el-table-column
                                                prop="position"
                                                label="工作地"
                                                align="center"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="startTime"
                                                label="起始时间"
                                                align="center"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="endTime"
                                                align="center"
                                                label="截止时间">
                                        </el-table-column>
                                        <el-table-column
                                                prop="tdays"
                                                align="center"
                                                label="补助天数">
                                        </el-table-column>
                                        <el-table-column
                                                prop="subsidy"
                                                align="center"
                                                label="补助金额">
                                        </el-table-column>
                                    </el-table>
                                </div></el-col>
                            </el-row>
                        </div>
                    </div></el-col>
                </el-row>
            </div>
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
        name: "LSViewApprovalView",
        data (){
            return {
                //报销信息
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
                },
                ticketInfo:[],
                quary2: {
                    tno: ''
                },
                dialogFormVisible: false,
                form: {
                    rejectreason: ''
                },
                formLabelWidth: '120px',
                subsidyInfo:[],
            }
        },
        methods:{
            getTInfo(){
                let list = this;
                list.travelReiForm = this.$route.query.tInfo;
                this.smallToBig(this.travelReiForm.totalrei)

                this.quary2.tno = list.travelReiForm.tno
                this.$http.post('/getselectticketlist',this.quary2).then(res => {
                    this.ticketInfo = res.data;

                    let selections = res.data;

                    let arr = [];
                    let totalSubsidy = 0;
                    let totalMoney = 0;
                    for (let i = 0; i < selections.length-1; i++) {
                        if(selections[i].startposition == selections[i+1].endposition){
                            let temp = {};
                            temp.position = selections[i].endposition;
                            temp.startTime = selections[i].startTime;
                            temp.endTime = selections[i+1].endTime
                            temp.tdays = this.DateDiff(selections[i].startTime,selections[i+1].endTime)
                            temp.subsidy = 200*temp.tdays
                            arr[i] = temp
                        }else {
                            let temp = {};
                            temp.position = selections[i].endposition;
                            temp.startTime = selections[i].startTime;
                            temp.endTime = selections[i+1].startTime
                            if(i+1 == selections.length - 1){
                                temp.endTime = selections[i+1].endTime
                            }
                            temp.tdays = this.DateDiff(temp.startTime,temp.endTime)
                            temp.subsidy = 200*temp.tdays
                            arr[i] = temp
                        }
                    }
                    this.subsidyInfo = arr
                    for (let i = 0; i < arr.length; i++) {
                        totalSubsidy += arr[i].subsidy
                    }
                    for (let i = 0; i < selections.length; i++) {
                        totalMoney += selections[i].money
                    }
                    this.travelReiForm.totalrei = totalSubsidy + totalMoney
                    this.smallToBig(this.travelReiForm.totalrei)
                }).catch(() => {
                    this.$message.error("车票信息加载失败，请联系管理员")
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
            //计算日期间隔天数
            DateDiff(Date_start, Date_end){    //sDate1和sDate2是2006-12-18格式
                let sDate = new Date(Date_start)
                let eDate = new Date(Date_end)
                let sHour = sDate.getHours()
                let eHour = eDate.getHours()
                let sTime = sDate.getTime()
                let eTime = eDate.getTime()
                let Time = eTime-sTime
                let iDays = 0

                if(sHour < 12){
                    if(eHour < 12){
                        iDays = Math.floor(((Time/1000/60/60) - (24-sHour) - eHour)/24) + 1 + 0.5
                    } else {
                        iDays = Math.floor(((Time/1000/60/60) - (24-sHour) - eHour)/24) + 1 + 1
                    }
                }else {
                    if(eHour < 12){
                        iDays = Math.floor(((Time/1000/60/60) - (24-sHour) - eHour)/24) + 0.5 + 0.5
                    } else {
                        iDays = Math.floor(((Time/1000/60/60) - (24-sHour) - eHour)/24) + 0.5 + 1
                    }
                }
                return iDays
            },
            pass(){
                this.$http.get('/passapproval',{
                    params:{
                        tno: this.travelReiForm.tno,
                        state: 4,
                        rejectreason:'',
                        process:''
                    }}).then(res => {
                    if (res.data == "success") {
                        this.$message.success("通过成功")
                        this.$router.push('/leadershipapproval')
                    } else  {
                        this.$message.error("通过失败")
                    }
                }).catch(() => {
                    this.$message.error("通过失败,请联系管理员")
                })
            },
            overrule(){
                //打开弹出层
                this.dialogFormVisible = true
            },
            sure(){
                this.$http.get('/passapproval',{
                    params:{
                        tno: this.travelReiForm.tno,
                        state: 3,
                        rejectreason: this.form.rejectreason,
                        process:'error'
                    }}).then(res => {
                    if (res.data == "success") {
                        this.$message.success("驳回成功")
                        this.$router.push('/leadershipapproval')
                    } else  {
                        this.$message.error("驳回失败")
                    }
                }).catch(() => {
                    this.$message.error("驳回失败,请联系管理员")
                })
            },
        },
        created(){
            this.getTInfo()
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
        padding-left: 50px;
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