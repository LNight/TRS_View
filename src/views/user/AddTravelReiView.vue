<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/travelrei' }">差旅报销</el-breadcrumb-item>
            <el-breadcrumb-item>差旅信息填写</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div style="padding: 0px;margin: 0px">
                <el-row class="content">
                    <el-col :span="12" align="left"><div>
                        <h3 style="display: table-cell;height: 40px;vertical-align: middle">差旅报销</h3>
                    </div></el-col>
                    <el-col :span="12" align="right"><div>
                        <el-button type="primary" icon="el-icon-check" plain @click="save">保存</el-button>
                        <el-button type="success" icon="el-icon-position" plain @click="submit">提交</el-button>
                    </div></el-col>
                </el-row>
                <el-row class="content">
                    <el-col><div class="inputDeep">
                            <el-form ref="travelReiForm" :rules="rules" :model="travelReiForm" label-width="0px">
                                <el-row>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>单据序号</h5>
                                    </div></el-col>
                                    <el-col :span="7"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="tno">
                                            <el-input v-model="travelReiForm.tno" clearable></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>报&nbsp;&nbsp;销&nbsp;&nbsp;人</h5>
                                    </div></el-col>
                                    <el-col :span="11"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="ename">
                                            <el-input v-model="travelReiForm.ename" :disabled="true"></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>出发时间</h5>
                                    </div></el-col>
                                    <el-col :span="7"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="startdate">
                                            <el-input v-model="travelReiForm.startDate" clearable ></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>到达时间</h5>
                                    </div></el-col>
                                    <el-col :span="11"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="enddate">
                                            <el-input v-model="travelReiForm.endDate" clearable></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>天&emsp;&emsp;数</h5>
                                    </div></el-col>
                                    <el-col :span="7"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="tdays">
                                            <el-input v-model="travelReiForm.tdays" clearable></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>报销金额</h5>
                                    </div></el-col>
                                    <el-col :span="3"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="totalrei">
                                            <el-input v-model="travelReiForm.totalrei" clearable @input="smallToBig(travelReiForm.totalrei)"></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>大&emsp;&emsp;写</h5>
                                    </div></el-col>
                                    <el-col :span="5"><div class="grid-content bg-purple-light">
                                        <el-form-item >
                                            <el-input v-model="travelReiForm.big" clearable></el-input>
                                        </el-form-item>
                                    </div></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="3"><div class="grid-content bg-purple">
                                        <h5>出差事由</h5>
                                    </div></el-col>
                                    <el-col :span="7"><div class="grid-content bg-purple-light">
                                        <el-form-item prop="travelinfo">
                                            <el-input v-model="travelReiForm.travelinfo" clearable></el-input>
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
                                <el-col :span="12" align="right"><div>
                                    <el-button type="primary" icon="el-icon-check" size="small" plain @click="selectTicket">选择车票信息</el-button>
                                    <el-button type="warning" icon="el-icon-delete" size="small" plain @click="deleteAll">清空</el-button>
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
                                <el-col :span="12" align="right"><div>
                                    <el-button type="primary" icon="el-icon-check" size="small" plain @click="countSubsidy">计算补助</el-button>
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
        <el-dialog title="车票信息选择" :visible.sync="dialogTableVisible" class="tableDialog">
            <el-row style="margin-bottom: 5px">
                <el-col :span="24" align="right">
                    <el-button type="primary" icon="el-icon-check" size="small" plain @click="sure">确定</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px">
                <el-col :span="24">
                    <el-table :data="ticketList" size="mini" height="300" @select="selectRow" @select-all="selectAll">
                        <!--  type="selection" 复选框   -->
                        <el-table-column type="selection"></el-table-column>
                        <!--   type="index" 索引列    -->
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column property="type" label="类型"></el-table-column>
                        <el-table-column property="startposition" label="出发地点"></el-table-column>
                        <el-table-column property="endposition" label="到达地点"></el-table-column>
                        <el-table-column property="startTime" label="出发时间"></el-table-column>
                        <el-table-column property="endTime" label="到达时间"></el-table-column>
                        <el-table-column property="vname" label="交通工具"></el-table-column>
                        <el-table-column property="money" label="车票金额"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row style="margin-bottom: 5px">
                <el-col :span="24" align="left" style="margin-bottom: 5px">
                    <h3>注意事项</h3>
                </el-col>
                <el-col :span="24" align="left">
                    <span>所选车票需要是一个从工作地开始，回到工作地的闭合回路</span>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "AddTravelReiView",
        data (){
            return {
                rules: {
                    travelinfo: [
                        {required: true, message: "出差事由不能为空",trigger:"blur"}
                    ]
                },
                //报销信息
                travelReiForm:{
                    tno:'',
                    ename: sessionStorage.getItem('ename'),
                    empno: sessionStorage.getItem('empno'),
                    startDate: '',
                    endDate: '',
                    tdays: '',
                    totalrei:'',
                    big:'',
                    travelinfo:'',
                    reidate:'',
                },
                ticketInfo:[],
                quary: {
                    empno: sessionStorage.getItem("empno"),
                    value: '',
                    page: 1,
                    limit: 10
                },
                ticketList:[],
                //被选中的项的集合
                selectionItems:[],
                dialogTableVisible: false,
                subsidyInfo:[],
                isSave: false,
            }
        },
        methods:{
            getSystemTime(){
                this.travelReiForm.reidate = sessionStorage.getItem("reidate")
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
            selectTicket() {
                //打开弹出层
                this.dialogTableVisible = true;
                //获取车票信息
                this.$http.post("/getticketlists",this.quary).then(res => {
                    this.ticketList = res.data.data;
                }).catch(() => {
                    this.$message.error("车票信息加载失败，请联系管理员")
                })
            },
            sortBy(filed){
                return (x,y) => {
                    return x[filed] - y[filed]
                }
            },
            sure(){
                //判断是否只选中了一条
                let selections = this.selectionItems;
                //判断被选中的条数
                if (selections.length == 0) {
                    this.$message.warning("请至少选择一条数据");
                    return
                }
                selections.sort(this.sortBy('tid'))
                let length = selections.length - 1
                if (selections[0].startposition != '济南' || selections[length].endposition != '济南') {
                    this.$message.warning("请选择合理的车票!")
                    return
                }
                let count = 0
                for (let i=0;i<selections.length-1;i++) {
                    if(selections[i].endposition == '济南'){
                        count++
                    }
                    if (selections[i].endposition != selections[i+1].startposition) {
                        this.$message.warning("请选择合理的车票!")
                        return
                    }
                    if(selections[i+1].startTime < selections[i].endTime){
                        this.$message.warning("请选择合理的车票!")
                        return
                    }
                }
                if(count > 1){
                    this.$message.warning("请选择合理的车票!")
                    return
                }
                this.ticketInfo = selections;
                this.dialogTableVisible = false;

                for (let i = 0; i < selections.length; i++) {
                    if(i == 0){
                        this.travelReiForm.startDate = selections[i].startTime
                    }
                    if(i == (selections.length-1)){
                        this.travelReiForm.endDate = selections[i].endTime
                    }
                }
                this.travelReiForm.tdays = this.DateDiff(this.travelReiForm.startDate,this.travelReiForm.endDate)
            },
            countSubsidy(){
                let selections = this.selectionItems;
                let arr = [];
                let totalSubsidy = 0;
                let totalMoney = 0;
                for (let i = 0; i < selections.length-1; i++) {
                    if(selections[i].startposition == selections[i+1].endposition){
                        let temp = {};
                        temp.position = selections[i].endposition;
                        temp.startTime = selections[i].startTime;
                        temp.endTime = selections[i+1].startTime
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
            },
            deleteAll(){
                this.ticketInfo = []
                this.subsidyInfo = []
                this.travelReiForm = {}
                this.travelReiForm.ename = sessionStorage.getItem("ename")
                this.travelReiForm.reidate = sessionStorage.getItem("reidate")

            },
            save(){
                //表单校验
                this.$refs["travelReiForm"].validate(valid => {
                    if (valid) {
                        let selections = this.selectionItems;
                        let arr = [];
                        let arr2 = [];
                        let totalSubsidy = 0;
                        for (let i = 0; i < selections.length-1; i++) {
                            if(selections[i].startposition == selections[i+1].endposition){
                                let temp = {};
                                temp.tdays = this.DateDiff(selections[i].startTime,selections[i+1].endTime)
                                temp.subsidy = 200*temp.tdays
                                arr2[i] = temp
                            }else {
                                let temp = {};
                                temp.tdays = this.DateDiff(selections[i].startTime,selections[i+1].endTime)
                                temp.subsidy = 200*temp.tdays
                                arr2[i] = temp
                            }
                        }
                        for (let i = 0; i < selections.length; i++) {
                            arr[i] = selections[i].tid
                        }
                        for (let i = 0; i < arr2.length; i++) {
                            totalSubsidy += arr2[i].subsidy
                        }
                        this.travelReiForm.tid = arr
                        this.travelReiForm.subsidy = totalSubsidy
                        this.$http.post('/addtravelrei',this.travelReiForm).then(res => {
                            let info = res.data.split(',')
                            if (info[0] == "success") {
                                this.$message.success("新增成功")
                                this.travelReiForm.tno = info[1]
                                this.isSave = true
                            } else  {
                                this.$message.error("新增失败")
                            }
                        }).catch(() => {
                            this.$message.error("新增失败,请联系管理员")
                        })
                    }
                })
            },
            submit(){
                if(this.isSave){
                    this.$http.get('/submittravel',{
                        params:{
                            tno: this.travelReiForm.tno
                        }}).then(res => {
                        if (res.data == "success") {
                            this.$message.success("提交成功")
                            this.$router.push('/travelrei')
                        } else  {
                            this.$message.error("提交失败")
                        }
                    }).catch(() => {
                        this.$message.error("提交失败,请联系管理员")
                    })
                }else {
                    this.$message.warning('差旅信息未保存')
                }
            }
        },
        mounted() {
            this.getSystemTime()
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