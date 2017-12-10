<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    clipped-left
    fixed
  >
    <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 220px; min-width: 200px' : 'min-width: 72px'"
                     class="ml-0 pl-3">
      <v-toolbar-side-icon @click="toggleSide()"></v-toolbar-side-icon>
      <span class="hidden-xs-only">Momen</span>
    </v-toolbar-title>
    <v-text-field
      light
      solo
      prepend-icon="search"
      placeholder="Search"
      style="max-width: 280px; min-width: 128px"
    ></v-text-field>
    <div class="d-flex align-center" style="margin-left: auto">
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn @click="openNotification()" icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify">
        </v-avatar>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
  import Bus from '../components/factory/bus.js'
  export default {
    name: 'app-toolbar',
    data () {
      return {
        drawer: true
      }
    },
    methods: {
      openNotification: function () {
        this.$alert('测是')
      },
      toggleSide: function () {
        this.drawer = !this.drawer
        Bus.$emit('toggleNav', this.drawer)
      }
    }
  }
</script>

<style>

</style>
