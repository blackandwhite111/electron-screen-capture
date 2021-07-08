import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueRouter)
Vue.use(ElementUI)

axios.defaults.withCredentials = true
Vue.prototype.$http = axios;
Vue.prototype.isDev = process.env.NODE_ENV === 'development';
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')