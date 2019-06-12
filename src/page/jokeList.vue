<template>
    <div>
        <headTop></headTop>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type='expand'>
                    <el-form slot-scope="props" label-position="left" inline class="demo-table-expand">
                        <el-form-item label="作者ID">
                            <span>{{ props.row.jokeUserId }}</span>
                        </el-form-item>
                        <el-form-item label="评论数">
                            <span>{{ props.row.articleCommentCount }}</span>
                        </el-form-item>
                        <el-form-item label="点赞数">
                            <span>{{ props.row.articleLikeCount }}</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="标签">
                            <el-tag v-for='i in props.row.tags' size='small' type="success" style="margin-right: 10px">{{JOKE_TAGS[i]}}</el-tag>
                        </el-form-item>
                        <el-form-item label="首页图片">
                            <el-image @click='showImg(props.$index,props.row)' style="width: 120px; height: 120px; margin-top:10px;" class="avatar" v-if="props.row.coverImg" :src="props.row.coverImg"></el-image>
                        </el-form-item>
                        <el-form-item label="文章地址">
                            <el-link href="http://www.baidu.com" target='_blank' type="primary">{{ props.row.title }}</el-link>
                        </el-form-item>
                    </el-form>
                </el-table-column>
                <el-table-column type="index" width="100">
                </el-table-column>
                <el-table-column property="title" label="标题" width="250">
                </el-table-column>
                <el-table-column property="jokeUserNick" label="段子作者" width="220">
                </el-table-column>
                <el-table-column property="postTimeStr" label="发布时间">
                </el-table-column>
                <el-table-column property="jokeId" label="段子ID">
                </el-table-column>
                <el-table-column property="city" label="操作" width='250'>
                    <template slot-scope="scope">
                        <el-button size="mini" @click='dealEdit(scope.$index,scope.row)'>编辑</el-button>
                        <el-button size="mini" @click='dealDelete(scope.$index,scope.row)' type="danger">
                            删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="15" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <el-dialog title="预览" :visible.sync="dialogImgVisible" width="50%">
                <el-image style="width: 90%; height: auto; margin-top:10px;" class="avatar" v-if="selectTable.coverImg" :src="selectTable.coverImg"></el-image>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
                <span>确定删除《{{selectTable.title}}》这个段子吗？</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteJoke(selectIndex,selectTable.jokeId)">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import { mapState } from 'vuex'

const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };
export default {
    components: {
        headTop
    },
    computed: {
        ...mapState([
            'userId'
        ])
    },
    created() {
        this.getJokes();
    },
    data() {
        return {
            JOKE_TAGS: JOKE_TAGS,
            tableData: [],
            page: 1,
            row: 15,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            dialogImgVisible: false,
            selectTable: {},
            selectIndex: -1,
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.page = val;
            this.getJokes()
        },
        getJokes() {
            this.$axios.get(`/joke/jokelist`, {
                    params: {
                        page: this.page,
                        row: this.row
                    }
                })
                .then((response) => {
                    const joker = response.data;
                    const data = joker.data;
                    this.count = joker.total;
                    this.tableData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.articleCommentCount = item.articleCommentCount;
                        tableData.articleLikeCount = item.articleLikeCount;
                        tableData.content = item.content;
                        tableData.contentHtml = item.contentHtml;
                        tableData.coverImg = item.coverImg;
                        tableData.jokeId = item.jokeId;
                        tableData.jokeUserIcon = item.jokeUserIcon;
                        tableData.jokeUserId = item.jokeUserId;
                        tableData.jokeUserNick = item.jokeUserNick;
                        tableData.postTimeStr = item.postTimeStr;
                        tableData.title = item.title;
                        if (item.category) {
                            tableData.category = JOKE_CATEGORY[item.category];
                        } else {
                            tableData.category = JOKE_CATEGORY['0'];
                        }
                        if (item.tags) {
                            tableData.tags = JSON.parse(item.tags);
                        } else {
                            tableData.tags = ['0'];
                        }

                        this.tableData.push(tableData);
                    })
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        showImg(index, row) {
            this.dialogImgVisible = true;
            this.selectTable = row;
        },
        dealEdit(index, row) {
            // this.dialogImgVisible = true;
            // this.selectTable = row;
        },
        dealDelete(index, row) {
            this.dialogVisible = true;
            this.selectTable = row;
            this.selectIndex=index;
        },
        deleteJoke(index,jokeId) {
            this.dialogVisible = false
            this.$axios.post(`/joke/delete`, {
                    jokeId: jokeId,
                    adminId: this.userId
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data;
                    console.log(result.code);
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，删除成功!');
                        this.tableData.splice(index, 1);
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
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>