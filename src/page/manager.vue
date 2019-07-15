<template>
    <div class="fillcontain ">
        <headTop></headTop>
        <header class="title">数据统计</header>
        <div class="data-tag-root">
            <el-tag effect="dark" color="#18A689" class="data-el-tag" style="height: 50px;">
                <div class="data-tag"><span>{{flowBean.allUserCount}}</span><span>用户总数</span></div>
            </el-tag>
            <el-tag effect="dark" color="#99CC00" class="data-el-tag" style="height: 50px;">
                <div class="data-tag"><span>{{flowBean.allAdminCount}}</span><span>帖子总数</span></div>
            </el-tag>
            <el-tag effect="dark" color="#3B5999" class="data-el-tag" style="height: 50px;">
                <div class="data-tag"><span>{{flowBean.allJokeCount}}</span><span>留言总数</span></div>
            </el-tag>
            <el-tag effect="dark" color="#33CC99" class="data-el-tag" style="height: 50px;">
                <div class="data-tag"><span>{{flowBean.allCommentCount}}</span><span>点赞总数</span></div>
            </el-tag>
            <el-tag effect="dark" color="#0099CC" class="data-el-tag" style="height: 50px;">
                <div class="data-tag"><span>{{flowBean.allThumbCount}}</span><span>管理员数</span></div>
            </el-tag>

        </div>
        <div class="chart-root">
            <v-chart :options="data1" style="width: 50%;height:450px;" />
            <v-chart :options="data2"  />
        </div>
    </div>
</template>
<script>
import headTop from '@/components/HeadTop.vue'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';
import "echarts/lib/chart/pie";
import { mapState } from 'vuex'

export default {
    components: {
        headTop,
    },
    computed: {
        ...mapState([
            'adminId'
        ])
    },
    mounted() {
        this.getFlowData();
    },
    data() {
        return {
            data1: {},
            data2: {},
            flowBean: {}
        }
    },
    methods: {
        initData(flowBean) {
            this.data1 = {
                    color: ["#64CDF0", "#F5686F"],
                    title: {
                        text: '帖子类型分布',
                    },
                    xAxis: [{
                        type: "category",
                        data: ["经典", "荤笑话", "精分", "脑残", "冷笑话"],
                        // 修改文本的颜色
                        axisLabel: {
                            color: "#666",
                            fontSize: 12
                        },
                        // 修改轴线的颜色
                        axisLine: {
                            lineStyle: {
                                color: "#999"
                            }
                        }
                    }],
                    yAxis: [{
                        type: "value",
                        axisLabel: {
                            color: "#333",
                            fontSize: 10
                        },
                        // 修改y轴横向分割线的颜色
                        splitLine: {
                            lineStyle: {
                                color: ["#FFC9CB"]
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#999"
                            }
                        }
                    }],
                    series: [{
                        name: "访问",
                        type: "bar",
                        barWidth: "40%",
                        label: {
                            show: true,
                            position: "top",
                            color: "#666",
                            formatter: "{c}"
                        },
                        data: [flowBean.classicCount, flowBean.yellowCount, flowBean.mindCount, flowBean.shiteCount, flowBean.coldCount]
                    }]
                },
                this.data2 = {
                    title: {
                        text: '帖子类型饼图',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: flowBean.classicCount, name: '经典' },
                            { value: flowBean.yellowCount, name: '荤笑话' },
                            { value: flowBean.mindCount, name: '精分' },
                            { value: flowBean.shiteCount, name: '脑残' },
                            { value: flowBean.coldCount, name: '冷笑话' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
                }
        },
        getFlowData() {
            this.$axios.get(`/flow/flowData`, {
                    params: {
                        adminId: this.adminId
                    }
                })
                .then((response) => {
                    const data = response.data;
                    const flowBean = data.data[0];
                    if (flowBean) {
                        this.flowBean=flowBean;
                        this.initData(flowBean);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },
    }
}
</script>
<style>
.title {
    margin-top: 20px;
    font-size: 24px;
    color: #666;
    text-align: center;
}

.data-tag-root {
    margin: 50px;
    text-align: left;
}

.data-el-tag {
    width: 100px;
    margin-left: 10px;
}

.data-tag {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
}

.data-tag span {
    color: white;
    font-size: 15px;
    line-height: 20px;
}

.chart-root {
    display: flex;
    margin-top:50px;
}
</style>