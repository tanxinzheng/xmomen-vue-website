// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Login from './login'
import Vuetify from 'vuetify'
import VueMo from './components/index'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueMo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Login/>',
  components: {Login}
})
