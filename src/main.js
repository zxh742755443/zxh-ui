// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ZUI from 'zxh-ui';
import 'zxh-ui/lib/styles/index.css';

Vue.config.productionTip = false;
Vue.use(ZUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
