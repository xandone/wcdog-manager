/*引入Vue框架*/
import Vue from 'vue';
/*引入资源请求插件*/
import axios from 'axios';

import { baseUrl } from '@/config/env'

/*使用axios插件*/
Vue.prototype.$axios = axios;
axios.defaults.baseURL = baseUrl;
export default ({

});