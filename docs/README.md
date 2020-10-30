### 简介

#### npm 安装

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

```
npm i zxh-ui -S
```

#### CDN
目前可以通过 [unpkg.com/zxh-ui](https://unpkg.com/browse/zxh-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/zxh-ui/lib/styles/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/zxh-ui/lib/index.js"></script>
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
