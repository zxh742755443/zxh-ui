import InfiniteScroll from './infinite-scroll';
import NumberKeyboard from './number-keyboard';

const components = [
  NumberKeyboard
];

function install(Vue) {
  Vue.use(InfiniteScroll);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
}

export default {
  install,
  InfiniteScroll,
  NumberKeyboard
};
