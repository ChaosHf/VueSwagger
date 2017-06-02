import Vue from 'vue';
import VueRouter from 'vue-router';
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue';
// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
// import Flex from 'lib-flexible';
// 引用路由配置文件
import routes from './config/routes';
// 引入api.js
import api from './config/api';
import axios from 'axios';
// 绑定api 到全局
Vue.prototype.$api = api;
Vue.prototype.$ajax = axios;

Vue.use(VueRouter);
// Vue.use(MintUI);
// Vue.use(Flex);
// 使用配置文件规则
const router = new VueRouter({
  routes
});
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
});
