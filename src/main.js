import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
import './styles/listItemVant.css';
import './assets/iconfont/iconfont.css'
import {
  Lazyload
} from 'vant';
import {
  VueJsonp
} from 'vue-jsonp'


Vue.use(Vant);
Vue.use(VueJsonp);
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: 'http://localhost:8080/loading.png'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')