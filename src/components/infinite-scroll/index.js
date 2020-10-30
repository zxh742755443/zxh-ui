import ZInfiniteScroll from './src/main';

ZInfiniteScroll.install = function(Vue) {
  Vue.directive(ZInfiniteScroll.name, ZInfiniteScroll);
};

export default ZInfiniteScroll;
