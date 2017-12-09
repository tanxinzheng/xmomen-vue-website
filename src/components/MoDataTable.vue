<template>
  <div>
    <div class="card" data-ripple="false" style="height: auto;">
      <v-toolbar color="primary" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{tableOptions.headerTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>attach_file</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn icon
               :loading="tableOptions.buttons.search.loading"
               :disabled="tableOptions.buttons.search.loading"
               @click.native="loadData()"
               >
          <v-icon>refresh</v-icon>
        </v-btn>
        <!--<v-btn icon>-->
          <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
      </v-toolbar>
      <div class="card__title">
        <!--<v-form v-model="tableOptions.searchFormValid">-->
        <v-flex xs12 sm3>
          <v-text-field
            class="input-group--hide-details"
            label="关键词"
            :append-icon="'search'"
            @keyup.enter="loadData()"
            @blur="loadData()"
            v-model="params.keyword"
          ></v-text-field>
        </v-flex>
        <!--</v-form>-->
      </div>
      <div class="table__overflow">
        <table class="datatable table">
          <thead>
          <tr>
            <th>
              <v-checkbox
                primary
                hide-details
                @change="toggleAll()"
                v-model="checkboxAll.selected"
                :indeterminate="checkboxAll.indeterminate"
              ></v-checkbox>
              <!--<input type="checkbox" v-model="checkboxAll.selected" @change="toggleAll()" />-->
            </th>
            <th class="column sortable"
                v-bind:class="{'text-xs-right': column.type !== 'checkbox'}"
                v-for="column in tableOptions.columns">
              <!--<i aria-hidden="true" class="material-icons icon">arrow_upward</i>-->
              {{column.text}}
            </th>
          </tr>
          <tr class="datatable__progress">
            <th colspan="100%" class="column"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableOptions.datasource"
                v-if="tableOptions.datasource && tableOptions.datasource.length > 0"
                >
              <td>
                <v-checkbox
                  primary
                  hide-details
                  v-model="item.checked"
                  @change="unCheckedAll()"
                ></v-checkbox>
              </td>
              <td v-bind:class="{'text-xs-right': col.type !== 'checkbox'}"
                  v-for="col in tableOptions.columns">
                <div v-if="!col.type || col.type === 'text'">
                  {{item[col.name]}}
                </div>
                <div v-if="col.type === 'checkbox'" class="checkbox">
                  <v-checkbox
                    disabled
                    v-model="item[col.name]"
                  ></v-checkbox>
                </div>
              </td>
            </tr>
            <tr v-if="!tableOptions.datasource || tableOptions.datasource.length == 0">
              <td colspan="100%" class="text-xs-center">
                No Result
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="100%">
                <div class="datatable__actions">
                  <div class="datatable__actions__select">Rows per page:
                    <v-select
                      class="input-group--hide-details "
                      v-bind:items="tableOptions.pagingSizeOption"
                      v-model="maxSize"
                      single-line
                      bottom
                    ></v-select>
                  </div>
                  <div class="datatable__actions__pagination">
                    From {{tableOptions.pagingInfo.startRow}} to {{tableOptions.pagingInfo.endRow}}
                  </div>
                  <button type="button" class="btn btn--flat btn--icon"
                          v-bind:class="{'btn--disabled': !tableOptions.pagingInfo.hasPreviousPage}"
                          @click="skipPage(tableOptions.pagingInfo.prePage)">
                    <div class="btn__content"><i aria-hidden="true" class="material-icons icon">chevron_left</i></div>
                  </button>
                  <button type="button" class="btn btn--flat btn--icon"
                          v-bind:class="{'btn--disabled': !tableOptions.pagingInfo.hasNextPage}"
                          @click="skipPage(tableOptions.pagingInfo.nextPage)">
                    <div class="btn__content">
                      <i aria-hidden="true" aria-disabled="true" class="material-icons icon">chevron_right</i>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  let vm
  export default {
    name: 'md-data-table',
    data () {
      return {
        checkboxAll: {
          selected: false
        },
        selected: [],
        maxSize: 10,
        params: {},
        tableOptions: {}
      }
    },
    watch: {
      maxSize: function (data) {
        vm.tableOptions.pagingInfo.pageSize = data
        vm.loadData()
      },
      params: function () {
        vm.loadData()
      }
    },
    created: function () {
      vm = this
      let options = {
        headerTitle: '数据字典',
        filters: [
          {name: 'keyword', title: '关键字', placeholder: '请输入用户名/姓名/邮箱/手机号码'}
        ],
        datasource: [],
        pagingSizeOption: [
          10, 30, 50, 100, 200, 300, 500
        ],
        pagingInfo: {
          pageSize: 10,
          pageNum: 1
        },
        // 定义列
        columns: [
          {name: 'groupCode', text: '字典类型'},
          {name: 'groupName', text: '类型描述'},
          {name: 'dictionaryName', text: '字典名称'},
          {name: 'dictionaryCode', text: '字典代码'},
          {name: 'sort', text: '排序'},
          {name: 'active', text: '激活', type: 'checkbox'},
          {name: 'isShow', text: '显示', type: 'checkbox'},
          {name: 'createdTime', text: '创建时间'}
        ],
        buttons: {
          search: {
            loading: false
          }
        },
        params: {
          pageSize: 10,
          pageNum: 1
        }
      }
      vm.tableOptions = options
      vm.loadData()
    },
    methods: {
      toggleAll: function () {
        if (!vm.tableOptions.datasource) {
          return
        }
        let selected = []
        for (var i = 0; i < vm.tableOptions.datasource.length; i++) {
          vm.tableOptions.datasource[i].checked = vm.checkboxAll.selected
          if (vm.tableOptions.datasource[i].checked) {
            selected.push(vm.tableOptions.datasource[i])
          }
        }
        if (selected.length > 0 && selected.length === vm.tableOptions.datasource.length) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', true)
        }
      },
      unCheckedAll: function () {
        if (!vm.tableOptions.datasource) {
          return
        }
        let num = 0
        for (let i = 0; i < vm.tableOptions.datasource.length; i++) {
          if (vm.tableOptions.datasource[i].checked) {
            num++
          }
        }
        // 子集勾选数量等于集合总数则勾选全选，否则取消全选
        if (num === 0) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', false)
        } else if (num === vm.tableOptions.datasource.length) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', true)
        } else {
          vm.$set(vm.checkboxAll, 'indeterminate', true)
          vm.$set(vm.checkboxAll, 'selected', false)
        }
      },
      clearCheckState: function () {
        vm.$set(vm.checkboxAll, 'indeterminate', false)
        vm.$set(vm.checkboxAll, 'selected', false)
      },
      skipPage: function (num) {
        vm.tableOptions.pagingInfo.pageNum = num
        vm.loadData()
      },
      loadData: function () {
        // clear checkbox state
        vm.clearCheckState()
        vm.params.pageSize = vm.tableOptions.pagingInfo.pageSize
        vm.params.pageNum = vm.tableOptions.pagingInfo.pageNum
        vm.tableOptions.buttons.search.loading = true
        vm.axios.get('/dictionary', {
          params: vm.params
        }).then((response) => {
          // 还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除，所以必须使用 vm.$set()或者Vue.set()
          vm.$set(vm.tableOptions, 'datasource', response.data.data)
          vm.$set(vm.tableOptions, 'pagingInfo', response.data.pageInfo)
        }).finally(function () {
          vm.tableOptions.buttons.search.loading = false
        })
      }
    }
  }
</script>

<style>

</style>
