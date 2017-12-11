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

      <v-menu
        offset-y
        :close-on-content-click="false"
        bottom
        v-model="showAccount"
      >
        <v-btn icon slot="activator">
          <v-avatar size="26px">
            <img src="/src/assets/logo.png" alt="John">
          </v-avatar>
        </v-btn>
        <v-card>
          <v-toolbar flat class="transparent" height="43px">
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>John Leider</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-divider></v-divider>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title @click="logout()">退出</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
  import Bus from '../components/factory/bus.js'
  import Access from '../components/factory/access'
  export default {
    name: 'app-toolbar',
    data () {
      return {
        drawer: true,
        showAccount: false
      }
    },
    methods: {
      logout: function () {
        this.axios.post('/logout').then(() => {
          Access.logout()
          Access.redirectLoginPage()
        })
      },
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
