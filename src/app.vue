<template>
  <v-app id="inspire">
    <!--  头部导航  -->
    <app-toolbar></app-toolbar>
    <!--  左侧菜单  -->
    <app-navigation></app-navigation>
    <v-content>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>
    <mo-alert></mo-alert>
    <mo-dialog></mo-dialog>
  </v-app>
</template>

<script>
import AppToolbar from './layout/toolbar'
import AppNavigation from './layout/navigation'
export default {
  components: {
    AppNavigation,
    AppToolbar
  },
  data: () => ({
  }),
  props: {
    source: String
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
