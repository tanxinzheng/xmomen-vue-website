// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import router from './router/router'
import Vuetify from 'vuetify'
import VueMo from './components/index'
import Access from './components/factory/access'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueMo)

/* eslint-disable no-new */
if (Access.isAuthenticated()) {
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
  })
}
