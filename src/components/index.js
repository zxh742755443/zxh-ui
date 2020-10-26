import InfiniteScroll from './infinite-scroll'
import Keyboard from './number-keyboard'

const components = [
  Keyboard
]

function install (Vue) {
  Vue.use(InfiniteScroll)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install,
  InfiniteScroll,
  Keyboard
}
