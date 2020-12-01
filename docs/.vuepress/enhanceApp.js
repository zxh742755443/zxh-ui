import ZUI from '../../src/components/index'
import '../../src/theme/index.scss'
import compress from '../../src/utils/compress'

export default ({Vue}) => {
  Vue.use(ZUI)
  window.compress = compress
}
