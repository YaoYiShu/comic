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
  VueJsonp
} from 'vue-jsonp'

Vue.use(Vant);
Vue.use(VueJsonp);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')