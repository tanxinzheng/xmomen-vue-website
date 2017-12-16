<template>
  <v-layout>
    <v-flex>
      <v-tabs fixed centered class="login-center">
        <v-toolbar color="primary" dark>
          <v-tabs-bar color="transparent" dark>
            <v-tabs-slider color="yellow"></v-tabs-slider>
            <!--<v-tabs-item :href="'#tab-phone'" @click="switchType(1)">手机找回</v-tabs-item>-->
            <v-tabs-item :href="'#tab-email'" @click="switchType(2)">邮箱找回</v-tabs-item>
          </v-tabs-bar>
        </v-toolbar>
        <v-tabs-items>
          <!--<v-tabs-content :id="'tab-phone'">-->
            <!--<v-card>-->
              <!--<v-card-text>-->
                <!--<v-form v-model="valid" ref="form" lazy-validation>-->
                  <!--<v-text-field-->
                    <!--label="手机号码"-->
                    <!--v-if="formData.type === 1"-->
                    <!--v-model="formData.phone"-->
                    <!--:rules="[v => !!v || '请输入注册时使用的手机号码']"-->
                    <!--required-->
                  <!--&gt;</v-text-field>-->
                  <!--<v-text-field-->
                    <!--label="新密码"-->
                    <!--v-model="formData.password"-->
                    <!--:rules="[v => !!v || '请输入新密码']"-->
                    <!--:append-icon="e1 ? 'visibility' : 'visibility_off'"-->
                    <!--:append-icon-cb="() => (e1 = !e1)"-->
                    <!--:type="e1 ? 'password' : 'text'"-->
                    <!--required-->
                  <!--&gt;</v-text-field>-->
                  <!--<v-layout row>-->
                    <!--<v-flex xs9>-->
                      <!--<v-text-field-->
                        <!--label="验证码"-->
                        <!--v-model="formData.code"-->
                        <!--:rules="[v => !!v || '请输入验证码']"-->
                        <!--:counter="6"-->
                        <!--required-->
                      <!--&gt;</v-text-field>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs3>-->
                      <!--<v-btn flat @click="sendCode()" :disabled="disabledSendCode">{{sendText}}</v-btn>-->
                    <!--</v-flex>-->
                  <!--</v-layout>-->
                  <!--<v-btn color="primary" style="width: 100%;margin: 6px 2px;font-size: 16px;"-->
                         <!--:loading="isLoading"-->
                         <!--@click="resetPassword()"-->
                         <!--:disabled="!valid">重置密码</v-btn>-->
                  <!--<div class="login-right">-->
                    <!--<router-link :to="{name:'Login'}">我要登录</router-link>-->
                    <!--<router-link :to="{name:'Register'}">我要注册</router-link>-->
                  <!--</div>-->
                <!--</v-form>-->
              <!--</v-card-text>-->
            <!--</v-card>-->
          <!--</v-tabs-content>-->
          <v-tabs-content :id="'tab-email'">
            <v-card>
              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    label="邮箱"
                    v-if="formData.type === 2"
                    v-model="formData.email"
                    :rules="[v => !!v || '请输入邮箱']"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="新密码"
                    v-model="formData.password"
                    :rules="[v => !!v || '请输入新密码']"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    required
                  ></v-text-field>
                  <v-layout row>
                    <v-flex xs9>
                      <v-text-field
                        label="验证码"
                        v-model="formData.code"
                        :rules="[v => !!v || '请输入验证码']"
                        :counter="6"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn flat @click="sendCode()" :disabled="disabledSendCode">{{sendText}}</v-btn>
                    </v-flex>
                  </v-layout>
                  <v-btn color="primary" style="width: 100%;margin: 6px 2px;font-size: 16px;"
                         :loading="isLoading"
                         @click="resetPassword()"
                         :disabled="!valid">重置密码</v-btn>
                  <div class="login-right">
                    <router-link :to="{name:'Login'}">我要登录</router-link>
                    <router-link :to="{name:'Register'}">我要注册</router-link>
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
  let vm
  export default {
    data () {
      return {
        formData: {
          type: 2
        },
        disabledSendCode: false,
        isLoading: false,
        valid: false,
        e1: true,
        sendText: '发送验证码'
      }
    },
    methods: {
      switchType (type) {
        vm.formData.type = type
      },
      resetPassword () {
        if (!vm.$refs.form.validate()) {
          return
        }
        let receiver = null
        if (vm.formData.type === 1) {
          if (!vm.formData.phone) {
            vm.$alert('请输入手机号码')
            return
          }
          receiver = vm.formData.phone
        } else if (vm.formData.type === 2) {
          if (!vm.formData.email) {
            vm.$alert('请输入邮箱')
            return
          }
          receiver = vm.formData.email
        }
        vm.isLoading = true
        vm.axios.put('/access/find_password', null, {
          params: {
            type: vm.formData.type,
            receiver: receiver,
            code: vm.formData.code,
            password: vm.formData.password
          }
        }).then(function (data) {
          vm.$alert('重置密码成功')
        }).finally(function () {
          vm.isLoading = false
        })
      },
      sendCode () {
        let receiver = null
        if (vm.formData.type === 1) {
          if (!vm.formData.phone) {
            vm.$alert('请输入手机号码')
            return
          }
          receiver = vm.formData.phone
        }
        if (vm.formData.type === 2) {
          if (!vm.formData.email) {
            vm.$alert('请输入Email')
            return
          }
          receiver = vm.formData.email
        }
        if (!receiver) {
          return
        }
        vm.axios.post('/access/code', null, {
          params: {
            type: vm.formData.type,
            receiver: receiver
          }
        }).then(function (data) {
          let i = 60
          let intervalCode = setInterval(function () {
            i--
            vm.sendText = i + '秒'
            if (i <= 0) {
              intervalCode.cancel(intervalCode)
              vm.disabledSendCode = false
              vm.sendText = '发送验证码'
            }
          }, 1000)
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
