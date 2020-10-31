import Vue from 'vue';
import Main from './main.vue';

let MainConstructor = Vue.extend(Main);
let instance;

const defaultCallback = () => {};

const NumberKeyboardService = function(options) {
  if (Vue.prototype.$isServer) return;

  let propsData = {};
  if (options.extraKey) {
    propsData.extraKey = options.extraKey;
  }

  instance = new MainConstructor({
    propsData: propsData
  });

  if (options.callback === undefined || typeof options.callback !== 'function') {
    instance.callback = defaultCallback;
  }
  instance.callback = options.callback;
  let oldCb = instance.callback;
  instance.callback = (action, value) => {
    if (action === 'blur') {
      instance.show = false;
    }
    oldCb(action, value);
  };

  instance.$mount();
  document.body.appendChild(instance.$el);

  return instance;
};

export default NumberKeyboardService;
