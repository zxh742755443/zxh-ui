### 简介

#### npm 安装

推荐使用 `npm` 的方式安装，它能更好地和 `webpack` 打包工具配合使用。

```
npm i zxh-ui -S
```

#### CDN
目前可以通过 [unpkg.com/zxh-ui](https://unpkg.com/browse/zxh-ui/) 获取到最新版本的资源，在页面上引入 `js` 和 `css` 文件即可开始使用。

```
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/zxh-ui/lib/styles/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/zxh-ui/lib/index.js"></script>
```

#### 完整引入

在 `main.js` 中写入以下内容：

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

#### 按需引入
借助 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) ，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 `babel-plugin-component`：

```
npm install babel-plugin-component -D
```

然后，将 `.babelrc` 修改为：

```
{
  "plugins": [
      ["component", {
        "libraryName": "zxh-ui",
        "styleLibrary": {
          "name": "styles",
          "base": false
        }
      }]
  ]
}
```

接下来，如果你只希望引入部分组件，比如 `NumberKeyboard`，那么需要在 `main.js` 中写入以下内容：

```
import Vue from 'vue'
import {
  NumberKeyboard
  // ...
} from 'zxh-ui'

Vue.use(NumberKeyboard)

new Vue({
  el: '#app',
  render: h => h(App)
});
```
