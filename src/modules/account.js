/**
 * Created by tanxinzheng on 18/5/13.
 */
const Admin = () => import('@/modules/admin/admin.vue')
const User = () => import('@/modules/admin/user.vue')
const ActionLog = () => import('@/modules/admin/actionLog.vue')
const Dictionary = () => import('@/modules/admin/dictionary.vue')
const UserGroup = () => import('@/modules/admin/userGroup.vue')
const Job = () => import('@/modules/admin/job.vue')
const Permission = () => import('@/modules/admin/permission.vue')

export default {
  name: 'admin',
  path: '/admin',
  meta: {
    title: '管理中心'
  },
  component: Admin,
  children: [
    {
      path: '/admin/user',
      name: 'User',
      text: '用户',
      component: User
    },
    {
      path: '/admin/group',
      name: 'Group',
      text: '用户组',
      component: UserGroup
    },
    {
      path: '/job',
      name: 'Job',
      text: '定时任务',
      component: Job
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
    },
    {
      path: '/permission',
      name: 'permission',
      text: '权限',
      component: Permission
    }
  ]
}
