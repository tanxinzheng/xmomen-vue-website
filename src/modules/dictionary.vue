<template>
  <mo-table
    :url="'/dictionary'"
    :columns="columns">
  </mo-table>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        columns: [
          {name: 'groupCode', text: '类型代码'},
          {name: 'groupName', text: '类型描述'},
          {name: 'dictionaryName', text: '字典名称'},
          {name: 'dictionaryCode', text: '字典代码'},
          {name: 'sort', text: '排序'},
          {name: 'active', text: '激活', type: 'checkbox'},
          {name: 'isShow', text: '显示', type: 'checkbox'},
          {name: 'createdTime', text: '创建时间'}
        ]
      }
    },
    created: function () {
    },
    methods: {
    }
  }
</script>

<style>

</style>
