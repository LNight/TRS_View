<template>
    <div style="height: 650px">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card" style="height: 600px">
            <el-row :gutter="20" class="cardline">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-badge :value="total" style="float: left;" class="item">
                                <el-button  type="info" @click="jump" round>流程待办</el-button>
                            </el-badge>
                        </div>
                        <div>
                            <el-alert
                                    v-if="total != 0"
                                    :title="title"
                                    type="warning"
                                    eccect = "dark"
                                    :closable="false"
                                    show-icon>
                            </el-alert>
                            <el-empty v-if="total == 0" description="暂无待审批信息" :image-size="70"></el-empty>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-badge :value="0" style="float: left;" class="item">
                                <el-button  type="info" round>超预期扣款</el-button>
                            </el-badge>
                        </div>
                        <div>
                            <el-empty description="暂无超预期扣款信息" :image-size="70"></el-empty>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="cardline">
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-badge :value="0" style="float: left;" class="item">
                                <el-button  type="info" round>催&emsp;&emsp;办</el-button>
                            </el-badge>
                        </div>
                        <div>
                            <el-empty description="暂无催办信息" :image-size="70"></el-empty>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <el-badge :value="0" style="float: left;" class="item">
                                <el-button  type="info" round>提&emsp;&emsp;醒</el-button>
                            </el-badge>
                        </div>
                        <div>
                            <el-empty description="暂无提醒信息" :image-size="70"></el-empty>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "LeaderShipIndexView",
        data() {
            return {
                quary: {
                    ename: '',
                    state: 3,
                    page: 1,
                    limit: 10
                },
                total:0,
                title:''
            }
        },
        methods: {
            getApprovalList() {
                this.$http.post("/getapprovallist",this.quary).then(res => {
                    console.log(res.data.data)
                    this.total = res.data.count
                    this.title = "您有"+this.total+"条信息待审批"
                }).catch(() => {
                    this.$message.error("审批列表加载失败，请联系管理员")
                })
            },
            jump(){
                this.$router.push('/leadershipapproval')
            }
        },
        created() {
            this.getApprovalList()
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .cardline .el-card {
        height: 260px;
    }
    .cardline>>>.el-card__header {
        background: #f4f4f5;
        padding: 10px 20px;
    }
    .clearfix {
        height: 40px;
    }

</style>