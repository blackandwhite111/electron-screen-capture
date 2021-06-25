import VueRouter from 'vue-router';
import Capture from '../capture/capture.vue';
import Home from '../home/home';
import HomeFunctions from '../home/home_functions/homeFunctions.vue';
import FunCapture from '../home/home_functions/home_capture/home_capture.vue';

const routes = [
  { path: '/home', component: Home },
  { path: '/capture', component: Capture },
  { path: '/homeFunctions', component: HomeFunctions, children: [
      {
        path: 'funCapture',
        component: FunCapture
      },
    ]
  },
  { path: '/', redirect: '/home' },
  // { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router