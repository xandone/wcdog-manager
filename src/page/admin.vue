<template>
    <div>
        <headTop></headTop>
        <div>
            <header class="admin_title">管理员信息</header>
            <ul class="admin_set">
                <li><span>用户名：</span><span>{{info.nickname}}</span></li>
                <li><span>ID：</span><span>{{info.adminId}}</span></li>
                <li><span>注册时间：</span><span>{{info.registTime}}</span></li>
                <li><span>头像：</span>
                    <div>
                        <el-image style="width: 120px; height: 120px; margin-top:10px;" class="avatar" v-if="info.adminIcon" :src="info.adminIcon"></el-image>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import { getStore } from '@/utils/utils'
import { USER_INFO_KEY } from '@/config/env'
export default {
    name: 'admin',
    components: {
        headTop
    },
    created() {
        this.initUserInfo();
    },
    data() {
        return {
            info: {
                nickname: '未登录'
            },
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
            console.log(this.info);
        },
    }
}
</script>
<style>
.admin_title {
    margin-top: 20px;
    font-size: 24px;
    color: #666;
    text-align: center;
}

.admin_set {
    list-style: none;
    font-size: 18px;
    color: #666;
    width: 60%;
    margin: 20px auto 0;
    background-color: #F9FAFC;
    border-radius: 10px;
    min-height: 400px;
    padding: 0;
}

.admin_set li {
    padding: 20px;
    text-align: left;
}
</style>