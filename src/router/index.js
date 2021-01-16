import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: 'modify',
      name: 'Modify',
      component: () => import( /* webpackChunkName: "about" */ '../components/Modify.vue'),
    }, {
      path: 'pay',
      name: "Pay",
      component: () => import('../components/Pay')
    }]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search')
  }, {
    path: '/comicDetails',
    name: "ComicDetails",
    component: () => import('../views/ComicDetails')
  }, {
    path: '/more',
    name: 'More',
    component: () => import('../components/More')
  }, {
    path: '/influence',
    name: 'InFluence',
    component: () => import('../views/InFluence')
  }, {
    path: '/read',
    name: 'Read',
    component: () => import("../views/Read")
  }, {
    path: '/sort',
    name: 'Sort',
    component: () => import('../components/Sort')
  }, {
    path: '/type',
    name: 'Type',
    component: () => import('../views/Type')
  }, {
    path: '/update',
    name: 'Update',
    component: () => import('../views/Update')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router