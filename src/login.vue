<template>
  <v-app class="login-app">
    <v-layout>
      <v-flex xs12 sm6 class="login-center">
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
                @keyup.enter="submit()"
                required
              ></v-text-field>
              <v-btn color="primary" :loading="isLoading" @click="submit()"  :disabled="!valid">登录</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <mo-alert></mo-alert>
  </v-app>
</template>

<script>
  import Access from './components/factory/access'
  import MoAlert from './components/alert/Alert'
  let vm
  export default {
    components: {MoAlert},
    data () {
      return {
        isLoading: false,
        e1: true,
        valid: true,
        error: '',
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
        vm.isLoading = true
        vm.axios.post('/login', null, {
          ignoreTip: true,
          params: {
            username: vm.username,
            password: vm.password
          }
        }).then(function (data) {
          if (data.data && data.data.token) {
            Access.loginHandler(data.data.token)
          }
        }).catch((error) => {
          vm.$alert('用户名或密码错误', {
            position: 'top',
            color: 'red'
          })
        }).finally(() => {
          vm.isLoading = false
        })
      }
    },
    created: function () {
      vm = this
    }
  }
</script>

<style>
  html {
    background: url(assets/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }

  #app {
     background: none;
  }
  .login-center {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -250px;
    width: 500px;
    height: 200px;
    font-size: 16px;
    text-align: center;
    z-index: 99;
  }
  .outline-error {
   margin-top: -26px;
  }
</style>
