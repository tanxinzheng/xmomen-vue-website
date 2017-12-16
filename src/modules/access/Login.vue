<template>
  <v-layout>
    <v-flex>
      <v-tabs fixed centered  class="login-center">
        <v-toolbar color="primary" dark>
          <v-tabs-bar color="transparent" dark>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <v-tabs-item :href="'#tab-login'">登录</v-tabs-item>
          </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <v-tabs-content :id="'tab-login'" is-active="true">
            <v-card>
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
                  <v-btn color="primary" style="width: 100%;margin: 6px 2px;font-size: 16px;"
                         :loading="isLoading"
                         @click="submit()"
                         :disabled="!valid">登录</v-btn>
                  <div class="login-right">
                    <router-link :to="{name:'FindPassword'}">忘记密码</router-link>
                    <router-link :to="{name:'Register'}">我要注册</router-link>
                  </div>
                  <!--<v-divider></v-divider>-->
                  <div class="login-footer">
                    <v-flex row>
                      <span>第三方快捷登录</span>
                    </v-flex>
                    <v-flex row>
                      <v-btn icon>
                        <v-icon>fa-weibo</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>fa-weixin</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>fa-qq</v-icon>
                      </v-btn>
                    </v-flex>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
  import Access from '../../components/factory/access'
  let vm
  export default {
    data () {
      return {
        isLoading: false,
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
        }).catch(() => {
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

</style>
