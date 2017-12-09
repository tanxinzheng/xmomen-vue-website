<template>
  <v-app id="inspire">
    <!--  头部导航  -->
    <app-toolbar></app-toolbar>
    <!--  左侧菜单  -->
    <app-navigation></app-navigation>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <!--<v-btn-->
      <!--fab-->
      <!--bottom-->
      <!--right-->
      <!--color="pink"-->
      <!--dark-->
      <!--fixed-->
      <!--@click.stop="dialog = !dialog">-->
      <!--<v-icon>add</v-icon>-->
    <!--</v-btn>-->
    <v-snackbar
      :timeout="globalToaster.timeout"
      :color="globalToaster.color"
      :top="globalToaster.position === 'top'"
      :bottom="globalToaster.position === 'bottom'"
      :right="globalToaster.position === 'right'"
      :left="globalToaster.position === 'left'"
      :multi-line="globalToaster.mode === 'multi-line'"
      :vertical="globalToaster.mode === 'vertical'"
      v-model="globalToaster.snackbar">
      {{ globalToaster.text }}
      <v-btn dark flat @click.native="globalToaster.snackbar = false">
        <v-icon icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppToolbar from './layout/toolbar'
import AppNavigation from './layout/navigation'
import Bus from './components/bus'
export default {
  components: {
    AppNavigation,
    AppToolbar},
  data: () => ({
    dialog: false,
    globalToaster: {
      snackbar: false,
      color: '',
      mode: '',
      position: 'right',
      timeout: 6000,
      text: ''
    }
  }),
  props: {
    source: String
  },
  created: function () {
    let vm = this
    Bus.$on('global-message', function (data) {
      vm.globalToaster.text = data.text
      vm.globalToaster.color = 'info'
      vm.globalToaster.snackbar = true
    })
  }
}
</script>

<style>
</style>
