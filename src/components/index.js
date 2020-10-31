import InfiniteScroll from './infinite-scroll';
import NumberKeyboard, {NumberKeyboardService} from './number-keyboard';

const components = [
  NumberKeyboard
];

function install(Vue) {
  Vue.use(InfiniteScroll);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.$numberkeyboard = NumberKeyboardService;
}

export default {
  install,
  InfiniteScroll,
  NumberKeyboard
};
