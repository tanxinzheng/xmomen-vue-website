<template>
  <v-breadcrumbs divider="/">
    <v-breadcrumbs-item
      v-for="item in items"
      :key="item.text"
      :disabled="item.disabled">
      {{ item.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>

<script>
  let vm
  export default {
    name: 'mo-breadcrumb',
    data () {
      return {
        items: [ ]
      }
    },
    created () {
      vm = this
      let item = JSON.parse(window.localStorage.getItem('breadcrumbs-data'))
      vm.items.push(item)
    },
    methods: {
    }
  }
</script>

<style>
</style>
