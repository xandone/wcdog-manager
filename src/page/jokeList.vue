<template>
    <div class="fillcontain">
        <headTop></headTop>
        <div class="search-root">
            <el-form :model="ruleForm" label-width="110px" class="demo-formData" style="margin-top: 10px">
                <el-form-item label="关键字" prop="title">
                    <el-input v-model="keyWords" placeholder="请输入关键字" style='width: 600px' clearable>
                        <el-select v-model="ruleForm.keySelect" slot="prepend" placeholder="ruleForm.keySelect" style="width: 130px;">
                            <el-option label="标题名称" value="1"></el-option>
                            <el-option label="文章ID" value="2"></el-option>
                            <el-option label="作者ID" value="3"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-form :model="ruleForm" :inline="true" label-width="110px" class="demo-formData" style="margin-top: 10px">
                <el-form-item label="种类">
                    <el-select v-model="ruleForm.selectType" placeholder="ruleForm.selectType">
                        <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-select v-model="ruleForm.selectTag" placeholder="ruleForm.selectTag">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="text-align: left;padding-left: 110px;">
                <el-button @click="dealSearchJokes()" type="primary" size="small">确定</el-button>
                <el-button @click="resetForm()" size="small">重置</el-button>
            </div>
        </div>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row>
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
                <el-table-column type="index">
                </el-table-column>
                <el-table-column property="title" label="标题">
                </el-table-column>
                <el-table-column property="jokeUserNick" label="段子作者">
                </el-table-column>
                <el-table-column property="postTime" label="发布时间" sortable>
                </el-table-column>
                <el-table-column property="jokeId" label="段子ID">
                </el-table-column>
                <el-table-column property="city" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click='dealComment(scope.$index,scope.row)'>评论</el-button>
                        <el-button size="mini" @click='dealDelete(scope.$index,scope.row)' type="danger">
                            删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="row" layout="total, prev, pager, next" :total="count">
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
            <el-dialog title="评论列表" :visible.sync="dialogCommentVisible" width="60%">
                <comment :jokeId="selectTable.jokeId" :isShowComment='dialogCommentVisible'></comment>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop'
import comment from '@/components/comment'
import { mapState } from 'vuex'

const JOKE_CATEGORY = { "0": "网络", "1": "自创", "2": "听说" };
const JOKE_TAGS = { "0": "经典", "1": "荤笑话", "2": "精分", "3": "脑残", "4": "冷笑话" };
export default {
    components: {
        headTop,
        comment
    },
    computed: {
        ...mapState([
            'adminId'
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
            row: 10,
            count: 0,
            currentPage: 1,
            dialogVisible: false,
            dialogImgVisible: false,
            dialogCommentVisible: false,
            selectTable: {},
            selectIndex: -1,
            options1: [{
                value: '-1',
                label: '全部'
            }, {
                value: '0',
                label: '网络'
            }, {
                value: '1',
                label: '自创'
            }, {
                value: '2',
                label: '听说'
            }],
            options2: [{
                value: '-1',
                label: '全部'
            }, {
                value: '0',
                label: '经典'
            }, {
                value: '1',
                label: '荤笑话'
            }, {
                value: '2',
                label: '精分'

            }, {
                value: '3',
                label: '脑残'
            }, {
                value: '4',
                label: '冷笑话'
            }],
            value: '',
            keyWords: '',
            ruleForm: {
                keySelect: '1',
                selectType: '-1',
                selectTag: '-1',
            },
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
                        tableData.postTime = item.postTime;
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
        dealComment(index, row) {
            this.dialogCommentVisible = true;
            this.selectTable = row;
            this.selectIndex = index;
        },
        dealDelete(index, row) {
            this.dialogVisible = true;
            this.selectTable = row;
            this.selectIndex = index;
        },
        deleteJoke(index, jokeId) {
            this.dialogVisible = false
            this.$axios.post(`/admin/joke/delete`, {
                    jokeId: jokeId,
                    adminId: this.adminId
                })
                .then((response) => {
                    const result = response.data;
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，删除成功!');
                        this.tableData.splice(index, 1);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        resetForm() {
            this.ruleForm = {
                keySelect: '1',
                selectType: '-1',
                selectTag: '-1',
            };
            this.keyWords = '';
        },

        dealSearchJokes() {
            let params = {
                page: this.page,
                row: this.row,
                category: encodeURI(this.ruleForm.selectType),
                tags: encodeURI(this.ruleForm.selectTag)
            };
            if (this.ruleForm.keySelect === "1") {
                params.key = encodeURI(this.keyWords);
            } else if (this.ruleForm.keySelect === "2") {
                params.jokeId = encodeURI(this.keyWords);
            } else if (this.ruleForm.keySelect === "3") {
                params.jokeUserId = encodeURI(this.keyWords);
            }
            this.$axios.get(`/joke/jokelist/search`, {
                    params
                })
                .then((response) => {
                    const joker = response.data;
                    if (joker.code === 200) {
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
                            tableData.postTime = item.postTime;
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
                        window.scrollTo(0, 0);
                    } else {
                        this.openToast(joker.msg);
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


.input-with-select .el-input-group__prepend {
    background-color: #fff;
}

.search-root {
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    border: 0.5px solid #f0f0f0;
}
</style>