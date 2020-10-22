

## InfiniteScroll 无限滚动
滚动至底部时，加载更多数据。

### 基础用法
在要实现滚动加载的列表上上添加 `v-infinite-scroll`，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。

::: demo
```html
<template>
  <div
    class="infinite-list"
    v-infinite-scroll="test"
    infinite-scroll-delay="20"
    infinite-scroll-distance="10"
  >
    <div
      class="infinite-list_item"
      v-for="item in num"
      :key="item">{{item}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'InfiniteScroll',
  data () {
    return {
      num: 40
    }
  },
  methods: {
    test () {
      console.log('test-----------', this)
      this.num += 10
    }
  }
}
</script>

<style>
.infinite-list {
  height: 300px;
  overflow-y: auto;
}

.infinite-list_item {
  margin-top: 10px;
  background-color: #e8f3fe;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```
:::

### 禁用加载
::: demo
```html
<template>
  <div>
    <div
      class="infinite-list"
      v-infinite-scroll="test"
      :infinite-scroll-disabled="disabled"
      infinite-scroll-delay="200"
      infinite-scroll-distance="10"
    >
      <div
        class="infinite-list_item"
        v-for="item in num"
        :key="item">{{item}}
      </div>
    </div>
    <p style="text-align: center" v-if="disabled">没有更多了</p>
  </div>

</template>

<script>

export default {
  name: 'InfiniteScroll',
  data () {
    return {
      num: 40,
      disabled: false
    }
  },
  methods: {
    test () {
      console.log('test-----------', this)
      if (this.num >= 50) {
        this.disabled = true
        return
      }
      this.num += 10
    }
  }
}
</script>

<style>
.infinite-list {
  height: 300px;
  overflow-y: auto;
}

.infinite-list_item {
  margin-top: 10px;
  background-color: #e8f3fe;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```
:::


### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| infinite-scroll-disabled | 是否禁用           | boolean      | - |false |
| infinite-scroll-delay   | 节流时延，单位为ms   | number       |   - |200   |
| infinite-scroll-distance| 触发加载的距离阈值，单位为px | number   |- |0 |

