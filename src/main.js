// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import zxh from '@/components';
// import '@/theme/number-keyboard.scss';

Vue.config.productionTip = false;
// Vue.use(zxh);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
