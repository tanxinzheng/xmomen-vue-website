import Vue from 'vue'
import Router from 'vue-router'
import routerItem from './route.conf'
import Access from '../components/factory/access'

Vue.use(Router)

const routers = new Router({
  mode: 'history',
  base: __dirname,
  routes: routerItem
})

routers.beforeEach((to, from, next) => {
  Access.isAuthenticated()
})

export default routers
