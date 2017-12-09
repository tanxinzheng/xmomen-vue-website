<template>

</template>

<script>
  export default {
    name: '',
    data () {
      return {}
    },
    created: function () {
      this.axios.post('/login', null, {
        params: {
          username: 'admin',
          password: '111111'
        }
      }).then(function (data) {
        console.log(data)
        window.localStorage.setItem('loginUserBaseInfo', data.token)
      })
    },
    methods: {}
  }
</script>

<style>

</style>
