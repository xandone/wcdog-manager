<template>
    <div class="fillcontain edit-root">
        <headTop></headTop>
        <el-col :span="15" :offset="4">
            <header class="form-header">新增段子</header>
            <el-form label-width="110px" class="demo-formData">
                <el-form-item label="段子标题">
                    <el-input v-model="input" placeholder="请输入标题" style='width: 500px'></el-input>
                </el-form-item>
                <el-form-item label="段子种类">
                    <el-select v-model="activityValue"  placeholder="activityValue">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上传首页图片">
                    <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleShopAvatarScucess" :before-upload="beforeAvatarUpload">
                        <el-image style="width: 120px; height: 120px" class="avatar" v-if="formData.image_path" :src="formData.image_path" :fit="cover"></el-image>
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选择标签">
                    <div>
                        <el-checkbox v-model="checked1" label="金典" border size="medium"></el-checkbox>
                        <el-checkbox v-model="checked2" label="荤笑话" border size="medium"></el-checkbox>
                        <el-checkbox v-model="checked3" label="精分" border size="medium"></el-checkbox>
                    </div>
                    <div style="margin-top: 10px">
                        <el-checkbox v-model="checked4" label="脑残" border size="medium"></el-checkbox>
                        <el-checkbox v-model="checked5" label="冷笑话" border size="medium"></el-checkbox>
                    </div>
                </el-form-item>
            </el-form>
            <div class="edit-area">
                <div ref="editor" style="text-align:left"></div>
            </div>
            <el-row class='edit-btn'>
                <el-button type="primary">提交</el-button>
                <el-button>重置</el-button>
            </el-row>
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
            activityValue: '选项1',
            formData: {
                image_path: 'https://upload-images.jianshu.io/upload_images/2518499-ac8c6a0db917e181.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
            },
            checked1: true,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
        }
    },
    methods: {
        getContent: function() {
            alert(this.editorContent)
        },
        beforeAvatarUpload() {},
        handleShopAvatarScucess() {},
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