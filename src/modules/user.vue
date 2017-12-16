<template>
  <div>
    <mo-table
      :url="url"
      @add="openAdd"
      :columns="columns">
    </mo-table>
    <mo-form-data
      ref="formData"
      :url="url"
      :form-columns="formColumns"
    >
    </mo-form-data>
  </div>
</template>

<script>
  let vm
  export default {
    name: '',
    data () {
      return {
        url: '/user',
        columns: [
          {name: 'username', label: '用户名', link: true},
          {name: 'nickname', label: '姓名'},
          {name: 'email', label: '邮箱'},
          {name: 'phoneNumber', label: '手机号码'},
          {name: 'createdTime', label: '注册时间'},
          {name: 'lastLoginTime', label: '最后登录时间'},
          {name: 'locked', label: '锁定', type: 'checkbox'}
        ],
        formColumns: [
          {name: 'username', label: '用户名', type: 'text'},
          {name: 'nickname', label: '姓名', type: 'text'},
          {name: 'email', label: '邮箱', type: 'text'},
          {name: 'phoneNumber', label: '手机号码', type: 'text'},
          {name: 'locked', label: '锁定', type: 'checkbox'}
        ]
      }
    },
    created: function () {
      vm = this
    },
    methods: {
      openAdd () {
        vm.$refs.formData.open()
      }
    }
  }
</script>

<style>

</style>
