<template>
  <div>
    <v-snackbar
      :timeout="timeout"
      :color="color"
      :top="position === 'top'"
      :bottom="position === 'bottom'"
      :right="position === 'right'"
      :left="position === 'left'"
      :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'"
      v-model="show">
      <v-icon icon dark>info</v-icon>
      {{ text }}
      <v-btn dark icon @click.native="close()">
        <v-icon icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import Bus from '../factory/bus'
  import Constant from '../factory/constant'
  let vm
  export default {
    name: 'mo-alert',
    data () {
      return {
        show: false,
        color: '',
        mode: '',
        position: 'right',
        timeout: 1800,
        text: ''
      }
    },
    created () {
      vm = this
      Bus.$on(Constant.eventKeyAlert, function (data) {
        vm.show = true
        vm.text = data.text
        vm.color = 'info'
        vm.option = data
      })
    },
    methods: {
      close () {
        vm.show = false
        vm.option.resolve(false)
      }
    }
  }
</script>

<style>
</style>
