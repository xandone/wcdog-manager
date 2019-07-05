<template>
    <div class="fillcontain">
        <headTop></headTop>
        <div>
            <el-table :data="talkData">
                <el-table-column type="index">
                </el-table-column>
                <el-table-column prop="userNick" label="用户">
                </el-table-column>
                <el-table-column prop="userId" label="ID">
                </el-table-column>
                <el-table-column prop="talk" label="内容">
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
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
                <span>确定删除《{{selectTable.talk}}》这条说说吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteTalk(selectIndex,selectTable.talkId)">确 定</el-button>
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
        this.getTalkList();
    },
    data() {
        return {
            talkData: [],
            page: 1,
            row: 15,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            selectTable: {},
            selectIndex: -1,
        }
    },
    methods: {
        dealDelete(index, row) {
            this.selectTable = row;
            this.selectIndex = index;
            this.dialogVisible = true;
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

        getTalkList() {
            this.$axios.get(`/plank/talkList`, {
                    params: {
                        page: this.page,
                        row: this.row
                    }
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data;
                    this.talkData = [];
                    this.count=result.total;
                    data.forEach(item => {
                        const talkItem = {};
                        talkItem.talkId = item.talkId;
                        talkItem.talk = item.talk;
                        talkItem.userIcon = item.userIcon;
                        talkItem.userId = item.userId;
                        talkItem.userNick = item.userNick;
                        talkItem.sendTime = item.sendTime;
                        talkItem.sendTimeStr = item.sendTimeStr;
                        this.talkData.push(talkItem);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },

       deleteTalk(index, id) {
            this.dialogVisible = false
            this.$axios.post(`/admin/talk/delete`,
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