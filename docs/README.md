### 简介

#### npm 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```
npm i zxh-ui -S
```

#### 完整引入

在 main.js 中写入以下内容：

```
import Vue from 'vue';
import ZUI from 'zxh-ui';
import 'zxh-ui/lib/styles/index.css'
import App from './App.vue';

Vue.use(ZUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
```
