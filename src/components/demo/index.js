
import VDataTable from './VDataTable'

export { VDataTable }

/* istanbul ignore next */
VDataTable.install = function install (Vue) {
  Vue.component(VDataTable.name, VDataTable)
}

export default VDataTable
