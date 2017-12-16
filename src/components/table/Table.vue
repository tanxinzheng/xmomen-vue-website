<template>
  <div>
    <div class="card" data-ripple="false" style="height: auto;">
      <v-toolbar color="primary" dark>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-if="showSearch"
          light
          solo
          prepend-icon="search"
          @keyup.enter="loadData()"
          @blur="loadData()"
          v-model="filterParams.keyword"
          placeholder="请输入用户名，姓名，邮箱，手机号码过滤"
          :append-icon="filterParams.keyword ? 'clear' : ''"
          :append-icon-cb="() => (filterParams.keyword = '')"
        ></v-text-field>
        <v-btn icon v-if="!showSearch" @click="showSearch=true">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>attach_file</v-icon>
        </v-btn>
        <v-tooltip bottom>
          <v-btn icon
                 slot="activator"
                 @click="remove()"
                 :disabled="selected.length === 0">
            <v-icon>delete</v-icon>
          </v-btn>
          <span>删除</span>
        </v-tooltip>
        <v-btn icon>
          <v-icon>description</v-icon>
        </v-btn>
        <v-tooltip bottom>
          <v-btn icon
                 @click="add()"
                 slot="activator">
            <v-icon>add</v-icon>
          </v-btn>
          <span>新增</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn icon
                 slot="activator"
                 :loading="buttons.search.loading"
                 :disabled="buttons.search.loading"
                 @click.native="loadData()"
          >
            <v-icon>refresh</v-icon>
          </v-btn>
          <span>刷新</span>
        </v-tooltip>

        <!--<v-btn icon>-->
          <!--<v-icon>more_vert</v-icon>-->
        <!--</v-btn>-->
      </v-toolbar>
      <!--<div class="card__title">-->
        <!--&lt;!&ndash;<v-form v-model="searchFormValid">&ndash;&gt;-->
        <!--&lt;!&ndash;<v-flex xs12 sm3>&ndash;&gt;-->
          <!--&lt;!&ndash;<v-text-field&ndash;&gt;-->
            <!--&lt;!&ndash;solo&ndash;&gt;-->
            <!--&lt;!&ndash;class="input-group&#45;&#45;hide-details"&ndash;&gt;-->
            <!--&lt;!&ndash;label="关键词"&ndash;&gt;-->
            <!--&lt;!&ndash;:append-icon="'search'"&ndash;&gt;-->
            <!--&lt;!&ndash;@keyup.enter="loadData()"&ndash;&gt;-->
            <!--&lt;!&ndash;@blur="loadData()"&ndash;&gt;-->
            <!--&lt;!&ndash;v-model="filterParams.keyword"&ndash;&gt;-->
          <!--&lt;!&ndash;&gt;</v-text-field>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-flex>&ndash;&gt;-->
        <!--&lt;!&ndash;</v-form>&ndash;&gt;-->
      <!--</div>-->
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
            </th>
            <th class="column sortable"
                v-bind:class="{'text-xs-right': column.type !== 'checkbox'}"
                v-for="column in columns">
              <!--<i aria-hidden="true" class="material-icons icon">arrow_upward</i>-->
              {{column.label}}
            </th>
          </tr>
          <tr class="datatable__progress">
            <th colspan="100%" class="column"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in datasource"
                v-if="datasource && datasource.length > 0"
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
                  v-for="col in columns">
                <div v-if="!col.type || col.type === 'text'">
                  <a v-if="col.link" @click="view(item)">{{item[col.name]}}</a>
                  <span v-if="!col.link">{{item[col.name]}}</span>
                </div>
                <div v-if="col.type === 'checkbox'" class="checkbox">
                  <v-checkbox
                    disabled
                    v-model="item[col.name]"
                  ></v-checkbox>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="100%" class="text-xs-center" v-if="!buttons.search.loading && datasource && datasource.length === 0">
                <mo-empty-state></mo-empty-state>
              </td>
              <td colspan="100%" class="text-xs-center" v-if="buttons.search.loading">
                <div class="mo-table-loading">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
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
                      v-bind:items="pagingSizeOption"
                      v-model="maxSize"
                      single-line
                      bottom
                    ></v-select>
                  </div>
                  <div class="datatable__actions__pagination">
                    From {{pagingInfo.startRow}} to {{pagingInfo.endRow}}
                  </div>
                  <button type="button" class="btn btn--flat btn--icon"
                          v-bind:class="{'btn--disabled': !pagingInfo.hasPreviousPage}"
                          @click="skipPage(pagingInfo.prePage)">
                    <div class="btn__content"><i aria-hidden="true" class="material-icons icon">chevron_left</i></div>
                  </button>
                  <button type="button" class="btn btn--flat btn--icon"
                          v-bind:class="{'btn--disabled': !pagingInfo.hasNextPage}"
                          @click="skipPage(pagingInfo.nextPage)">
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
  import _ from 'underscore'
  import MoEmptyState from './EmptyState'
  let vm
  export default {
    components: {
      MoEmptyState},
    name: 'mo-table',
    created () {
      vm = this
      if (!!this.pagingSizeOption && this.pagingSizeOption.length > 0) {
        vm.pagingInfo.pageSize = this.pagingSizeOption[0]
      }
      vm.loadData()
    },
    props: {
      url: {
        require: true
      },
      filterParams: {
        require: false,
        default () {
          return {}
        }
      },
      title: {
        require: false,
        default: ''
      },
      columns: {
        require: true,
        type: Array,
        validator (items) {
          for (let i = 0; i < items.length; i++) {
            if (!_.property('label')(items[i])) {
              return false
            }
            if (!_.property('name')(items[i])) {
              return false
            }
          }
          return true
        }
      },
      pagingSizeOption: {
        type: Array,
        require: false,
        default () {
          return [
            10, 30, 50, 100, 200, 300, 500
          ]
        }
      }
    },
    data () {
      return {
        datasource: [],
        checkboxAll: {
          selected: false
        },
        pagingInfo: {
          pageNum: 1
        },
        selected: [],
        maxSize: this.pagingSizeOption[0],
        buttons: {
          search: {
            loading: false
          }
        },
        showSearch: false
      }
    },
    watch: {
      maxSize (data) {
        vm.pagingInfo.pageSize = data
        vm.loadData()
      },
      filterParams: function (data) {
        if (data.keyword) {
          vm.showSearch = true
        } else {
          vm.showSearch = false
        }
        vm.loadData()
      }
    },
    methods: {
      toggleAll () {
        if (!vm.datasource) {
          return
        }
        vm.selected = []
        for (var i = 0; i < vm.datasource.length; i++) {
          vm.datasource[i].checked = vm.checkboxAll.selected
          if (vm.datasource[i].checked) {
            vm.selected.push(vm.datasource[i])
          }
        }
        if (vm.selected.length > 0 && vm.selected.length === vm.datasource.length) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', true)
        }
      },
      unCheckedAll () {
        if (!vm.datasource) {
          return
        }
        let num = 0
        vm.selected = []
        for (let i = 0; i < vm.datasource.length; i++) {
          if (vm.datasource[i].checked) {
            num++
            vm.selected.push(vm.datasource[i])
          }
        }
        // 子集勾选数量等于集合总数则勾选全选，否则取消全选
        if (num === 0) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', false)
        } else if (num === vm.datasource.length) {
          vm.$set(vm.checkboxAll, 'indeterminate', false)
          vm.$set(vm.checkboxAll, 'selected', true)
        } else {
          vm.$set(vm.checkboxAll, 'indeterminate', true)
          vm.$set(vm.checkboxAll, 'selected', false)
        }
      },
      view () {
      },
      add () {
        vm.$emit('add')
      },
      remove () {
        vm.$confirm('是否删除所选数据？').then((data) => {
          let ids = []
          for (let i = 0; i < vm.selected.length; i++) {
            ids.push(vm.selected[i].id)
          }
          if (ids.length === 0) {
            return
          }
          vm.button.remove.loading = true
          vm.axios.delete(vm.url, {
            params: {
              ids: ids
            },
            disableGetBracketNotation: false
          }).then(() => {
            vm.$alert('删除成功')
            vm.loadData()
          }).finally(() => {
            vm.button.remove.loading = false
          })
        })
      },
      clearCheckState () {
        vm.$set(vm.checkboxAll, 'indeterminate', false)
        vm.$set(vm.checkboxAll, 'selected', false)
      },
      skipPage: function (num) {
        vm.pagingInfo.pageNum = num
        vm.loadData()
      },
      loadData () {
        if (vm.buttons.search.loading) {
          return
        }
        if (vm.filterParams.keyword) {
          vm.showSearch = true
        } else {
          vm.showSearch = false
        }
        // clear checkbox state
        vm.clearCheckState()
        vm.filterParams.pageSize = vm.pagingInfo.pageSize
        vm.filterParams.pageNum = vm.pagingInfo.pageNum
        vm.buttons.search.loading = true
        vm.datasource = []
        vm.axios.get(vm.url, {
          params: vm.filterParams
        }).then((response) => {
          // 还是由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除，所以必须使用 vm.$set()或者Vue.set()
//          vm.$set(vm.tableOptions, 'datasource', response.data.data)
//          vm.$set(vm.tableOptions, 'pagingInfo', response.data.pageInfo)
          vm.datasource = response.data.data
          vm.pagingInfo = response.data.pageInfo
        }).finally(function () {
          vm.buttons.search.loading = false
        })
      }
    }
  }
</script>

<style>
  .mo-table-loading {
    top: 50%;
    left: 50%;
    height: 200px;
    font-size: 16px;
    text-align: center;
  }
  .mo-table-loading .progress-circular {
    margin-top: 75px;
  }
</style>
