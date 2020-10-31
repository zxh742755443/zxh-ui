import component from './src/main.vue';
import service from './src/main.js';

export default {
  install(Vue) {
    Vue.component(component.name, component);
    Vue.prototype.$numberkeyboard = service;
  },
  component,
  service
};
