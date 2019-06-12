<template>
    <div>
        <headTop></headTop>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="100">
                </el-table-column>
                <el-table-column property="title" label="标题" width="200">
                </el-table-column>
                <el-table-column property="upTime" label="日期" width="200">
                </el-table-column>
                <el-table-column label="文章链接" width="250">
                    <template slot-scope="scope">
                        <el-link :href='scope.row.articleUrl' type="primary" target='_blank'>{{scope.row.articleUrl}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <el-image @click="showImg(scope.$index,scope.row)" style="width: 120px; height: 120px; margin-top:10px;" class="avatar" :src="scope.row.imgUrl">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click='dealEdit(scope.$index,scope.row)'>编辑</el-button>
                        <el-button size="mini" @click='dealDelete(scope.$index,scope.row)' type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="15" :offset="0">
                <header class="form-header" style="text-align: left ;margin:50px 30px 30px 30px">新增轮播图</header>
                <el-form label-width="110px" class="demo-formData" :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="段子标题" prop="title">
                        <el-input v-model="ruleForm.title" placeholder="请输入标题" style='width: 500px' clearable></el-input>
                    </el-form-item>
                    <el-form-item label="文章地址" style="margin-top: 10px" prop="articleUrl">
                        <el-input v-model="ruleForm.articleUrl" placeholder="请填写文章地址" style='width: 500px;margin-bottom: 10px' clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="上传首页图片">
                        <el-input placeholder="请在这里粘贴图片地址" v-model="ruleForm.imgUrl" style='width: 500px;margin-bottom: 10px'>
                        </el-input>
                        <div>
                            <el-image style="width: 120px; height: 120px" class="avatar" v-if="ruleForm.imgUrl" :src="ruleForm.imgUrl">
                            </el-image>
                        </div>
                    </el-form-item>
                    <el-form-item class='edit-btn'>
                        <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-dialog title="预览" :visible.sync="dialogImgVisible" width="50%">
                <el-image style="width: 90%; height: auto; margin-top:10px;" class="avatar" v-if="selectTable.imgUrl" :src="selectTable.imgUrl"></el-image>
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
        this.getBanners();
    },
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            dialogImgVisible: false,
            selectTable: {},
            selectIndex: -1,
            ruleForm: {
                title: '',
                imgUrl: '',
                articleUrl: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入文章标题', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                articleUrl: [
                    { required: true, message: '请填写文章地址', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        getBanners() {
            this.$axios.get(`/banner/list`)
                .then((response) => {
                    const joker = response.data;
                    const data = joker.data;
                    this.count = joker.total;
                    this.tableData = [];
                    data.forEach(item => {
                        const tableData = {};
                        tableData.imgUrl = item.imgUrl;
                        tableData.upTime = item.upTime;
                        tableData.title = item.title;
                        tableData.articleUrl = item.articleUrl;
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
            this.selectIndex = index;
        },
        deleteJoke(index, jokeId) {
            this.dialogVisible = false
            this.openSuccess('删除测试中..');
        },
        resetForm(formName) {
            this.ruleForm = {
                title: '',
                imgUrl: '',
                articleUrl: ''
            };
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.addBanner();
                } else {
                    this.openToast('请填写完整信息');
                    return false;
                }
            });
        },
        addBanner() {
            this.$axios.post(`/banner/add`, {
                    title: this.ruleForm.title,
                    userId: '250',
                    imgUrl: this.ruleForm.imgUrl,
                    articleUrl: this.ruleForm.articleUrl
                })
                .then((response) => {
                    const result = response.data;
                    const data = result.data;
                    console.log(result.code);
                    if (result && result.code === 200) {
                        this.openSuccess('恭喜，新增成功!');
                        const tableData = {};
                        tableData.imgUrl = this.ruleForm.imgUrl;
                        tableData.upTime = "刚刚";
                        tableData.title = this.ruleForm.title;
                        tableData.articleUrl = this.ruleForm.articleUrl;
                        this.tableData.unshift(tableData);
                        this.resetForm();
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