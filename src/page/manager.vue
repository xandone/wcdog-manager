<template>
    <div class="fillcontain ">
        <headTop></headTop>
        <header class="title">数据统计</header>
        <v-chart :options="data1" style="width: 70%;height:450px;" />
        <v-chart :options="data2" />
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
            'userId'
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
                        text: '柱形图',
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
                        text: '饼状图',
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
                            { value: 8, name: '荤笑话' },
                            { value: 13, name: '精分' },
                            { value: 18, name: '脑残' },
                            { value: 5, name: '冷笑话' },
                            { value: 39, name: '经典' },
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
                        adminId: this.userId
                    }
                })
                .then((response) => {
                    const data = response.data;
                    const flowBean = data.data[0];
                    if (flowBean) {
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
</style>