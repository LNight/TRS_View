<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/ticketinfo' }">车票信息</el-breadcrumb-item>
            <el-breadcrumb-item>车票信息填写</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div>
                <el-row>
                    <el-col :span="24" align="right"><div>
                        <el-button type="primary" icon="el-icon-check" plain @click="resetForm">重置</el-button>
                        <el-button type="success" icon="el-icon-position" plain @click="submit">提交</el-button>
                    </div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="16" align="left"><div><i class="el-icon-edit"> 车票信息</i></div></el-col>
                    <el-col :span="8" align="left"><div><i class="el-icon-picture-outline" > 车票图片</i></div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="16"><div>
                        <el-form ref="ticketForm" :model="ticketData" :rules="rules" label-width="150px">
                            <el-form-item label="员工姓名" prop="ename">
                                <el-input v-model="ticketData.ename"></el-input>
                            </el-form-item>
                            <el-form-item label="出差类型" prop="type">
                                <el-select v-model="ticketData.type" style="width: 100%;" :disabled="this.tdisabled" @change="changeEnd" clearable placeholder="请选择出差类型">
                                    <el-option label="出差" value="出差"></el-option>
                                    <el-option label="返回" value="返回"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="出发地点" prop="startposition">
                                <el-input v-model="ticketData.startposition" :disabled="this.tdisabled" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="到达地点" prop="endposition">
                                <el-input v-model="ticketData.endposition" :disabled="this.edisabled" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="出发及到达时间" prop="value">
                                <div class="block">
                                    <el-date-picker
                                            v-model="ticketData.value"
                                            type="datetimerange"
                                            style="width: 100%;"
                                            range-separator="-"
                                            format="yyyy-MM-dd HH:mm"
                                            value-format="yyyy-MM-dd HH:mm"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="交通工具" prop="vno">
                                <el-select v-model="ticketData.vno" style="width: 100%;" clearable placeholder="请选择交通工具">
                                    <el-option v-for="vehicle in vehicleList" :label="vehicle.vname" :value="vehicle.vno"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="车票金额" prop="money">
                                <el-input v-model="ticketData.money" :min="0" :controls="false" :precision="2" placeholder="请输入车票金额" clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </div></el-col>
                    <el-col :span="8"><div>
                        <el-upload
                                ref="upload"
                                action=""
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-remove="handleRemove"
                                :on-change="UploadImage"
                                :limit="1"
                                :file-list="fileList"
                                :auto-upload="false"
                        >
                            <i class="el-icon-plus"></i>
                            <template #tip>
                                <div style="font-size: 12px;color: #919191;">
                                    单次限制上传一张图片
                                </div>
                            </template>
                        </el-upload>
                        <el-dialog v-model="dialogVisible" style="line-height: 0;">
                            <img style="width: 100%;height: 100%"  :src="dialogImageUrl" alt="" />
                        </el-dialog>
                    </div></el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "AddTicketView",
        data (){
            return {
                rules: {
                    ename: [
                        {required: true, message: "员工姓名不能为空",trigger:"blur"}
                    ],
                    type: [
                        {required: true, message: "出差类型不能为空",trigger:"change"}
                    ],
                    startposition: [
                        {required: true, message: "出发地点不能为空",trigger:"blur"}
                    ],
                    endposition: [
                        {required: true, message: "到达地点不能为空",trigger:"blur"}
                    ],
                    value: [
                        {required: true, message: "出发时间及到达时间不能为空",trigger:"change"}
                    ],
                    vno: [
                        {required: true, message: "交通工具不能为空",trigger:"change"}
                    ],
                    money: [
                        {required: true, message: "车票金额不能为空",trigger:"blur"},
                        { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确额格式,可保留两位小数' }
                    ],
                },
                ticketData:{
                    ename: sessionStorage.getItem('ename'),
                    empno: sessionStorage.getItem('empno'),
                    type: '',
                    startposition: '',
                    endposition: '',
                    value: '',
                    vno: '',
                    money: '',
                    image:''
                },
                query: {
                    empno: sessionStorage.getItem('empno')
                },
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                tdisabled: false,
                edisabled: false,
                vehicleList:[],
                fileList:[]
            }
        },
        methods: {
            //上传图片的方法
            UploadImage(file,filelist) {
                //console.log(file);
                let fd = new FormData()
                fd.append('file', file.raw) //传给后台接收的名字 file
                this.$http.post('/uploadimage', fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                    //上传成功后返回的数据,
                    console.log("上传图片到:"+response.data);
                    // 将图片地址给到表单.
                    this.ticketData.image=response.data
                })
            },
            //移除图片功能
            handleRemove(file, fileList) {
                console.log(file, fileList)

            },
            //预览图片功能
            handlePictureCardPreview(file) {
                console.log(file.url);
                this.dialogVisible = true
                this.dialogImageUrl = file.url

            },
            getVehicleList() {
                this.$http.post("/getvehicle").then(res => {
                    this.vehicleList = res.data
                }).catch(() => {
                    this.$message.error("部门信息加载失败，请联系管理员")
                })
            },
            resetForm(){
                this.ticketData = {}
                this.ticketData.ename = sessionStorage.getItem('ename')
            },
            getType(){
                this.$http.post("/gettype",this.query).then(res => {
                    if(res.data == "返回" ){
                        this.ticketData.type = "出差"
                        this.ticketData.startposition = "济南"
                        this.tdisabled = true
                    }else if(res.data == null || res.data == ''){
                        this.ticketData.type = "出差"
                        this.ticketData.startposition = "济南"
                        this.tdisabled = true
                    }
                    else{
                        this.ticketData.type = ''
                        this.tdisabled = false
                    }
                }).catch(() => {
                    this.$message.error("出差类型加载失败，请联系管理员")
                })
            },
            changeEnd(val){
                if(val == '返回'){
                    this.ticketData.endposition = "济南"
                    this.edisabled = true
                } else{
                    this.ticketData.endposition = ""
                    this.edisabled = false
                }
            },
            submit() {
                //表单校验
                this.$refs["ticketForm"].validate(valid => {
                    if (valid) {
                        for (let i = 0; i < this.ticketData.value.length-1; i++) {
                            if(this.ticketData.value[i] == this.ticketData.value[i+1]){
                                this.$message.warning("出发时间不能等于到达时间!")
                                return
                            }
                        }
                        this.$http.post('/addticket',this.ticketData).then(res => {
                            if (res.data == "success") {
                                this.$message.success("新增成功")
                                this.$router.push('/ticketinfo')
                            } else  {
                                this.$message.error("新增失败")
                            }
                        }).catch(() => {
                            this.$message.error("新增失败,请联系管理员")
                        })
                    }else {
                        this.$message.error('请完善表单相关信息！');
                        return false;
                    }
                })
            }
        },
        created() {
            this.getVehicleList()
            this.getType()
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>