<template>
  <v-app id="inspire">
    <!--  头部导航  -->
    <app-toolbar></app-toolbar>
    <!--  左侧菜单  -->
    <app-navigation></app-navigation>
    <v-content>
      <v-container fluid fill-height>
      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import AppToolbar from './layout/toolbar'
import AppNavigation from './layout/navigation'
export default {
  components: {
    AppNavigation,
    AppToolbar},
  data: () => ({
    dialog: false
  }),
  props: {
    source: String
  }
}
</script>

<style>
</style>
