<template>
  <v-dialog
    v-model="isOpen"
    fullscreen
    transition="dialog-bottom-transition"
    :overlay=false
    scrollable
  >
    <v-card>
      <v-toolbar style="flex: 0 0 auto;" dark class="primary">
        <v-toolbar-title>数据字典</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form v-model="formValid" ref="form" lazy-validation>
          <div v-for="column in formColumns">
            <v-flex v-if="column.type === 'checkbox'">
              <v-checkbox
                primary
                :label="column.label"
                v-model="formData[column.name]"
              ></v-checkbox>
            </v-flex>
            <v-flex v-if="column.type === 'select'">
              <v-select
                :label="column.label"
                v-model="select"
                :items="columns.options"
                required
              ></v-select>
            </v-flex>
            <v-flex v-if="column.type === 'text'">
              <v-text-field
                :label="column.label"
                v-model="formData[column.name]"
              ></v-text-field>
            </v-flex>
          </div>
          <v-btn color="primary"
                 @click="submit()"
                 :loading="buttons.saveLoading"
                 :disabled="!formValid">保存</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import _ from 'underscore'
  let vm
  export default {
    name: 'mo-form-data',
    props: {
      url: {
        require: true
      },
      formColumns: {
        require: true,
        type: Array,
        default: function () {
          return []
        },
        validator (items) {
          for (let i = 0; i < items.length; i++) {
            if (!_.property('label')(items[i])) {
              throw new Error('The [form-columns] must be have \'label\' property')
            }
            if (!_.property('name')(items[i])) {
              throw new Error('The [form-columns] must be have \'name\' property')
            }
            if (!_.property('type')(items[i])) {
              throw new Error('The [form-columns] must be have \'type\' property')
            }
          }
          return true
        }
      }
    },
    created () {
      vm = this
    },
    data () {
      return {
        buttons: {
          saveLoading: false
        },
        isOpen: false,
        formValid: true,
        formData: {}
      }
    },
    methods: {
      open () {
        vm.isOpen = true
      },
      close () {
        vm.isOpen = false
      },
      submit () {
        if (!vm.$refs.form.validate()) {
          return
        }
        vm.buttons.saveLoading = true
        if (vm.formData.id) {
          vm.axios.put(vm.url, vm.formData).then((data) => {
            vm.close()
            vm.$alert('修改成功')
          }).finally(() => {
            vm.buttons.saveLoading = false
          })
        } else {
          vm.axios.post(vm.url, vm.formData).then((data) => {
            vm.close()
            vm.$alert('保存成功')
          }).finally(() => {
            vm.buttons.saveLoading = false
          })
        }
      }
    }
  }
</script>

<style>

</style>
