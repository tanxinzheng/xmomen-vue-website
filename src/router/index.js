import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/modules/login'

Vue.use(Router)

// const Table = () => import('@/components/tables.vue')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Login
    }
  ]
})
