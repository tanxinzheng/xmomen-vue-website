/**
 * Created by tanxinzheng on 17/12/7.
 */

const Home = () => import('@/modules/home.vue')
const User = () => import('@/modules/user.vue')
const ActionLog = () => import('@/modules/actionLog.vue')
const Dictionary = () => import('@/modules/dictionary.vue')

export default [
  {
    icon: 'contacts',
    path: '/',
    name: 'Home',
    text: '个人中心',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    text: '用户',
    component: User
  },
  {
    path: '/dictionary',
    name: 'Dictionary',
    text: '数据字典',
    component: Dictionary
  },
  {
    path: '/action_log',
    name: 'action_log',
    text: '操作日志',
    component: ActionLog
  }
]
