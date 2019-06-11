<template>
    <div class="fillcontain edit-root">
        <headTop></headTop>
        <el-col :span="15" :offset="4">
            <header class="form-header">新增段子</header>
            <el-form label-width="110px" class="demo-formData" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="段子标题" prop="title">
                    <el-input v-model="ruleForm.title" placeholder="请输入标题" style='width: 500px'></el-input>
                </el-form-item>
                <el-form-item label="段子种类">
                    <el-select v-model="ruleForm.type" placeholder="ruleForm.type">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传首页图片">
                    <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleShopAvatarScucess" :before-upload="beforeAvatarUpload">
                        <el-image style="width: 120px; height: 120px" class="avatar" v-if="ruleForm.image_path" :src="ruleForm.image_path"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选择标签" prop='tags'>
                    <el-checkbox-group v-model="ruleForm.tags">
                        <el-checkbox name='tags' label="金典" border size="medium"></el-checkbox>
                        <el-checkbox name='tags' label="荤笑话" border size="medium"></el-checkbox>
                        <el-checkbox name='tags' label="精分" border size="medium"></el-checkbox>
                        <div style="margin-top: 10px">
                            <el-checkbox name='tags' label="脑残" border size="medium"></el-checkbox>
                            <el-checkbox name='tags' label="冷笑话" border size="medium"></el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class='edit-btn'>
                    <el-button @click="submitForm('ruleForm')" type="primary">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="edit-area">
                <div ref="editor" style="text-align:left"></div>
            </div>
        </el-col>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import E from 'wangeditor'
import { baseUrl, baseImgPath } from '@/config/env'

export default {
    name: 'editor',
    components: {
        headTop
    },
    data() {
        return {
            baseUrl,
            input: '',
            editorContent: '',
            options: [{
                value: '选项1',
                label: '网络'
            }, {
                value: '选项2',
                label: '自创'
            }, {
                value: '选项3',
                label: '听说'
            }],
            value: '',
            ruleForm: {
                title: '',
                type: '网络',
                tags: ['金典'],
                image_path: 'https://upload-images.jianshu.io/upload_images/2518499-ac8c6a0db917e181.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
            },
            rules: {
                title: [
                    { required: true, message: '请输入段子标题', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                tags: [
                    { type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        getContent: function() {
            alert(this.editorContent)
        },
        beforeAvatarUpload() {},
        handleShopAvatarScucess() {},
        resetForm(formName) {
            // this.$refs['formName'].resetFields();
            this.ruleForm = {
                title: '',
                type: '网络',
                tags: ['金典'],
                image_path: '',
            };
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('提交');
                } else {
                    this.openToast('请填写完整信息');
                    return false;
                }
            });
        },
        openToast(msg) {
            this.$notify.error({
                title: '错误',
                message: msg
            });
        },
    },
    mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
            this.editorContent = html
        }
        editor.create()
    }

}
</script>
<style>
.edit-root {
    text-align: center;
}

.edit-area {
    text-align: left;
}

.demo-formData {
    text-align: left;
}

.edit-btn {
    text-align: left;
    margin: 20px 0;
}

.form-header {
    margin: 20px auto;
    font-size: 20px;
}

.avatar-uploader .el-upload {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
</style>