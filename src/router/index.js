import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search')
  },
  {
    path: '/comicDetails',
    name: "ComicDetails",
    component: () => import('../views/ComicDetails')
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('../components/More')
  },
  {
    path: '/influence',
    name: 'InFluence',
    component: () => import('../views/InFluence')
  }
]

const router = new VueRouter({
  routes
})

export default router