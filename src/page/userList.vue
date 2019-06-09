<template>
    <div class="fillcontain">
        <headTop></headTop>
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
                        <el-button size="mini" @click="dealEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="dealDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="25%" :before-close="handleClose">
                <span>确定删除ID：{{tableData[0].id}}昵称:{{tableData[0].nickname}}这个用户吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import { getUserList } from '@/api/getData'
export default {
    components: {
        headTop
    },
    created() {
        this.getUsers();
    },
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(5).fill(item),
            page: 0,
            row: 15,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            dealIndex: 0
        }
    },
    methods: {
        dealEdit(index, row) {

        },
        dealDelete(index, row) {
            this.dealIndex = index;
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
            this.currentPage = val;
            this.page = (val - 1) * this.row;
            this.getUsers()
        },
        async getUsers() {
            const Users = await getUserList({ page: this.page, row: this.row });
            const data = Users.data;
            this.count = Users.total;
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
                console.log(tableData.nickname);
            })
        }
    }
}
</script>
<style>
.fillcontain {
    height: 100%;
    width: 100%;
}
</style>