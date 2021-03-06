

### LazyLoading 懒加载
图片懒加载。

#### 基础用法
在图片标签上添加 `v-lazy-loading`，并赋值相应的图片地址，可实现图片懒加载。

::: demo
```html
<template>
  <div class="demo-image__lazy">
    <img v-for="url in urls" :key="url"  v-lazy-loading="url"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      ]
    };
  },
  methods: {}
};
</script>

<style>
.demo-image__lazy {
  height: 500px;
  overflow: auto;
}
img {
  width: 100%;
  height: 500px;
}
</style>
```
:::

#### 渐变色背景
当网速慢的时候，图片还没加载完之前，用户会看到一段空白的时间，在这段空白时间，可以使用渐变色背景。`v-lazy-loading` 值添加 `background`，可仔细观察 `demo` 最后一张图片

::: demo
```html
<template>
  <div class="demo-image__lazy">
    <img v-for="url in urls" :key="url"  v-lazy-loading="{src:url,background:'linear-gradient(to bottom,#46698e 0%,#12243d 100%)'}"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      ]
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.demo-image__lazy {
  height: 500px;
  overflow: auto;
}
img {
  width: 100%;
  height: 500px;
}
</style>
```
:::


#### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| v-lazy-loading | 懒加载指令           | object / string      | - | |

