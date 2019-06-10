<template>
    <div class="head-root">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style='font-size: 16px ;' :to="{ path: '/manager' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown style="font-size: 12px">
            <i class="el-icon-setting admin-tv" style="margin-right: 30px;">
              <span>{{info.nickname}}</span>
          </i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { getStore } from '@/utils/utils'
import { USER_INFO_KEY } from '@/config/env'
export default {
    created() {
        console.log(this.$route.meta);
        this.initUserInfo();
    },
    data() {
        return {
            info: null,
        }

    },
    methods: {
        initUserInfo() {
            let data = JSON.parse(getStore(USER_INFO_KEY));
            this.info=data.userBean;
            console.log(this.info.nickname);
        }
    }
}
</script>
<style>
.head-root {
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
}

.admin-tv {
    font-size: 14px;
}
</style>