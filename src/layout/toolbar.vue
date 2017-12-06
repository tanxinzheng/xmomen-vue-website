<template>
  <v-toolbar
    color="blue darken-3"
    dark
    app
    clipped-left
    fixed
  >
    <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'"
                     class="ml-0 pl-3">
      <v-toolbar-side-icon @click="toggleSide()"></v-toolbar-side-icon>
      <span class="hidden-xs-only">Google Contacts</span>
    </v-toolbar-title>
    <v-text-field
      light
      solo
      prepend-icon="search"
      placeholder="Search"
      style="max-width: 500px; min-width: 128px"
    ></v-text-field>
    <div class="d-flex align-center" style="margin-left: auto">
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://vuetifyjs.com/static/doc-images/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
  import Bus from '../components/bus.js'
  export default {
    name: 'app-toolbar',
    data () {
      return {
        drawer: true,
        items: [
          {icon: 'contacts', text: 'Contacts'},
          {icon: 'history', text: 'Frequently contacted'},
          {icon: 'content_copy', text: 'Duplicates'},
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'Labels',
            model: true,
            children: [
              {icon: 'add', text: 'Create label'}
            ]
          },
          {
            icon: 'keyboard_arrow_up',
            'icon-alt': 'keyboard_arrow_down',
            text: 'More',
            model: false,
            children: [
              {text: 'Import'},
              {text: 'Export'},
              {text: 'Print'},
              {text: 'Undo changes'},
              {text: 'Other contacts'}
            ]
          },
          {icon: 'settings', text: 'Settings'},
          {icon: 'chat_bubble', text: 'Send feedback'},
          {icon: 'help', text: 'Help'},
          {icon: 'phonelink', text: 'App downloads'},
          {icon: 'keyboard', text: 'Go to the old version'}
        ]
      }
    },
    methods: {
      toggleSide: function () {
        this.drawer = !this.drawer
        Bus.$emit('toggleNav', this.drawer)
      }
    }
  }
</script>

<style>

</style>
