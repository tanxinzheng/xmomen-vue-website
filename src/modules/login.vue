<template>
  <div>
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>登录</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field
            label="用户名"
            v-model="username"
            :rules="[v => !!v || '请输入用户名']"
            :counter="16"
            required
          ></v-text-field>
          <v-text-field
            label="密码"
            v-model="password"
            :rules="[v => !!v || '请输入密码']"
            :append-icon="e1 ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (e1 = !e1)"
            :type="e1 ? 'password' : 'text'"
            required
          ></v-text-field>
          <v-btn color="primary" @click="submit()"  :disabled="!valid">登录</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  let vm
  export default {
    data () {
      return {
        e1: true,
        valid: true,
        username: '',
        password: ''
      }
    },
    methods: {
      submit: function () {
        if (this.$refs.form.validate()) {
          vm.login()
        }
      },
      login () {
        vm.axios.post('/login', null, {
          params: {
            username: vm.username,
            password: vm.password
          }
        }).then(function (data) {
          if (data.data && data.data.token) {
            window.localStorage.setItem('token', data.data.token)
            vm.$router.push('/')
          }
        })
      }
    },
    created: function () {
      vm = this
    }
  }
</script>

<style>

</style>
