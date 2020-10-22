import InfiniteScroll from './src/main'

InfiniteScroll.install = function (Vue) {
  Vue.directive(InfiniteScroll.name, InfiniteScroll)
}

export default InfiniteScroll
