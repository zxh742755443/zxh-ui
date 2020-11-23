import LazyLoading from './src/main';

LazyLoading.install = function(Vue) {
  Vue.directive(LazyLoading.name, LazyLoading);
};

export default LazyLoading;
