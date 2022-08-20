import Layout from './components/layout/Layout.vue'
import TablePanel from './components/tablePanel/TablePanel.vue'

const components = [
  Layout,
  TablePanel
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  Layout,
  TablePanel
}
