import InfiniteScroll from './infinite-scroll';
import NumberKeyboard from './number-keyboard';

const components = [
  NumberKeyboard.component
];

function install(Vue) {
  Vue.use(InfiniteScroll);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$numberkeyboard = NumberKeyboard.service;
}

export default {
  install,
  InfiniteScroll,
  NumberKeyboard
};
