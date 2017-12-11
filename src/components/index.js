import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from './api'
import underscore from 'underscore'

import Table from './table/Table.vue'
import Dialog from './dialog/Dialog.vue'
import Alert from './alert/Alert.vue'
import FormData from './form/FormData.vue'

import utils from './factory/utils'

const VueMo = {
  components: [
    Table,
    Dialog,
    Alert,
    FormData
  ],
  factorys: [
    utils
  ]
}

Vue.use(VueAxios, axios)

VueMo.install = function (Vue) {
  for (let component of VueMo.components) {
    Vue.component(component.name, component)
  }
  Vue.prototype._ = underscore
  for (let factory of VueMo.factorys) {
    for (let prop in factory) {
      Vue.prototype[prop] = factory[prop]
    }
  }
}
export default VueMo
