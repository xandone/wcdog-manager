<template>
    <div class="fillcontain">
        <headTop></headTop>
        <div class="search-root">
            <el-form :model="ruleForm" label-width="110px" class="demo-formData" style="margin-top: 10px">
                <el-form-item label="关键字" prop="title">
                    <el-input v-model="keyWords" placeholder="请输入关键字" style='width: 600px' clearable>
                        <el-select v-model="ruleForm.keySelect" slot="prepend" placeholder="ruleForm.keySelect" style="width: 130px;">
                            <el-option label="全部" value="0"></el-option>
                            <el-option label="用户ID" value="1"></el-option>
                            <el-option label="用户账号" value="2"></el-option>
                            <el-option label="用户昵称" value="3"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: left;padding-left: 110px;">
                <el-button @click="dealSearchUser()" type="primary" size="small">确定</el-button>
                <el-button @click="resetForm()" size="small">重置</el-button>
            </div>
        </div>
        <div>
            <el-table :data="tableData">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="userId" label="用户ID">
                </el-table-column>
                <el-table-column prop="name" label="用户名">
                </el-table-column>
                <el-table-column prop="password" label="用户密码">
                </el-table-column>
                <el-table-column prop="nickname" label="用户昵称">
                </el-table-column>
                <el-table-column prop="registTime" label="注册时间">
                </el-table-column>
                <el-table-column prop="lastLoginTime" label="最近登录日期">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-switch @change="changeBanned(scope.row)" v-model="tableData[scope.$index].banned" active-value="0" inactive-value="1">
                        </el-switch>
                        <el-button size="mini" type="danger" @click="dealDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="row" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
                <span>确定删除ID：{{selectTable.userId}}  昵称:{{selectTable.nickname}}这个用户吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteUser(selectIndex,selectTable.userId)">确 定</el-button>
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
        this.getUsers();
    },
    data() {
        const item = {};
        return {
            tableData: Array(0).fill(item),
            page: 1,
            row: 10,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            selectTable: {},
            selectIndex: -1,
            keyWords: '',
            ruleForm: {
                keySelect: '0',
            },
            banned: "0"
        }
    },
    methods: {
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

        getUsers() {
            this.$axios.get(`/admin/userlist`, {
                    params: {
                        page: this.page,
                        row: this.row
                    }
                })
                .then((response) => {
                    const users = response.data;
                    const data = users.data;
                    this.count = users.total;
                    this.tableData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.userId = item.userId;
                        tableData.name = item.name;
                        tableData.nickname = item.nickname;
                        tableData.password = item.password;
                        tableData.registTime = item.registTime;
                        tableData.lastLoginTime = item.lastLoginTime;
                        tableData.userIcon = item.userIcon;
                        this.tableData.push(tableData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteUser(index, userId) {
            this.dialogVisible = false
            this.$axios.post(`/admin/user/delete`, {
                    userId: userId,
                    adminId: this.adminId
                })
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，删除成功!');
                        this.tableData.splice(index, 1);
                    } else if (result.msg) {
                        this.$message.error(result.msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        dealSearchUser() {
            let params = {
                page: this.page,
                row: this.row,
            };
            if (this.ruleForm.keySelect === "1") {
                params.userId = encodeURI(this.keyWords);
            } else if (this.ruleForm.keySelect === "2") {
                params.name = encodeURI(this.keyWords);
            } else if (this.ruleForm.keySelect === "3") {
                params.nickname = encodeURI(this.keyWords);
            }

            this.$axios.get(`/admin/userlist/search`, {
                    params
                })
                .then((response) => {
                    const users = response.data;
                    const data = users.data;
                    this.count = users.total;
                    this.tableData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.userId = item.userId;
                        tableData.name = item.name;
                        tableData.nickname = item.nickname;
                        tableData.password = item.password;
                        tableData.registTime = item.registTime;
                        tableData.lastLoginTime = item.lastLoginTime;
                        tableData.userIcon = item.userIcon;
                        this.tableData.push(tableData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resetForm() {
            this.keyWords = '';
            this.ruleForm.keySelect = '0';
        },
        changeBanned(bean) {
            
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