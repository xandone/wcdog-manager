import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './api/api'
import ECharts from 'vue-echarts'


Vue.config.productionTip = false

Vue.use(elementUi);
Vue.component('v-chart', ECharts)

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')