<template>
    <div class="fillcontain">
        <headTop></headTop>
        <div>
            <el-table :data="talkData">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
                <el-table-column prop="sendTime" label="日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="dealDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-col :span="15" :offset="0">
                <header class="form-header" style="text-align: left ;margin:50px 30px 30px 30px">新增公告</header>
                <el-form label-width="110px" class="demo-formData" :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="内容" prop="title">
                        <el-input v-model="ruleForm.title" placeholder="请输入公告内容" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" maxlength="150" show-word-limit style='width: 500px' clearable></el-input>
                    </el-form-item>
                    <el-form-item class='edit-btn'>
                        <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
                <span>确定删除《{{selectTable.content}}》这条公告吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePlank(selectIndex,selectTable.plankId)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import { mapState } from 'vuex'
export default {
    components: {
        headTop
    },
    computed: {
        ...mapState(['adminId'])
    },
    created() {
        this.getPlankList();
    },
    data() {
        return {
            talkData: [],
            page: 1,
            row: 10,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            selectTable: {},
            selectIndex: -1,
            ruleForm: {
                title: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入公告内容', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        dealEdit(index, row) {

        },
        dealDelete(index, row) {
            this.selectTable = row;
            this.selectIndex = index;
            this.dialogVisible = true;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(val);
            this.currentPage = val;
            this.page = val;
            this.getUsers()
        },

        getPlankList() {
            this.$axios.get(`/plank/planktalk/list`, {
                    params: {
                        page: this.page,
                        row: this.row
                    }
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data;
                    this.count = result.total;
                    this.talkData = [];
                    data.forEach(item => {
                        const talkItem = {};
                        talkItem.plankId = item.plankId;
                        talkItem.content = item.content;
                        talkItem.sendTime = item.sendTime;
                        this.talkData.push(talkItem);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },

        deletePlank(index, id) {
            this.dialogVisible = false
            this.$axios.post(`/admin/planktalk/delete`,
                    this.$qs.stringify({
                        'id': id,
                        'adminId': this.adminId
                    }))
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，删除成功!');
                        this.talkData.splice(index, 1);
                    } else if (result.msg) {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addPlank();
                } else {
                    this.openToast('请填写完整信息');
                    return false;
                }
            });
        },

        addPlank(content) {
            this.$axios.post(`/admin/planktalk/add`,
                    this.$qs.stringify({
                        'content': this.ruleForm.title,
                        'adminId': this.adminId
                    }))
                .then((response) => {
                    const result = response.data;
                    const data = result.data[0];
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，新增成功!');
                        let talkItem = {};
                        talkItem.plankId = data.plankId;
                        talkItem.content = data.content;
                        talkItem.sendTime = data.sendTime;
                        this.talkData.unshift(talkItem);
                        this.ruleForm.title = '';
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        openToast(msg) {
            this.$notify.error({
                title: '错误',
                message: msg
            });
        },
        openSuccess(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
    }
}
</script>
<style>
.fillcontain {
    height: 100%;
    width: 100%;
}
</style>