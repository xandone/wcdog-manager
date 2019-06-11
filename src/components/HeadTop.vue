<template>
    <div class="head-root">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style='font-size: 16px ;' :to="{ path: '/manager' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="dealCommand" style="font-size: 12px">
            <i class="el-icon-setting admin-tv" style="margin-right: 30px;">
              <span>{{info.nickname}}</span>
          </i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="userInfo">查看</el-dropdown-item>
                <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="25%">
            <span>是否退出登录？</span>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="clearUserData">确 定</el-button>
           </span>
        </el-dialog>
    </div>
</template>
<script>
import { getStore } from '@/utils/utils'
import { USER_INFO_KEY } from '@/config/env'
import { removeStore } from '@/utils/utils.js'
export default {
    created() {
        // console.log(this.$route.meta);
        this.initUserInfo();
    },
    data() {
        return {
            info: {
                nickname: '未登录'
            },
            dialogVisible: false,
        }

    },
    methods: {
        initUserInfo() {
            let data = JSON.parse(getStore(USER_INFO_KEY));
            if (!data) {
                this.$router.push('login');
                return;
            }
            this.info = data;
            console.log(this.info.nickname);
        },
        dealCommand(command) {
            if (command == 'exit') {
                this.exitDialog();
            } else if (command == 'userInfo') {
                this.$router.push('admin');
            }

        },
        exitDialog() {
            this.dialogVisible = true;
        },

        clearUserData() {
            this.dialogVisible = false;
            removeStore(USER_INFO_KEY);
            this.$router.push('login');
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