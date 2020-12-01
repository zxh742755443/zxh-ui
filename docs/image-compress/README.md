

### Compress 图片压缩
目前只支持 `png、jpg、jpeg` 类型图片，图片越大压缩越明显。`png` 类型图片压缩后会转变成 `jpeg`

#### 基础用法
单独引入 `compress`：
```
import compress from 'zxh-ui/lib/utils/compress
```

在需要调用时：
```
compress(file)
```
参数是 `File` 实例，返回值是一个 `promise`，resolve 的数据是 File 类型

#### 原理：
 1. 缩：基于 1080px 缩放图片，小于该值图片高宽不做处理
 2. 压：修改图片质量

::: demo
```html
<template>
  <div class="demo-compress">
    <input type="file" @change="upload"/>
    <table class="demo-table" v-show="nowSize">
      <thead>
      <tr>
        <th>文件名</th>
        <th>压缩前大小</th>
        <th>压缩后大小</th>
        <th>压缩比</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>u=504110440,1027090340&fm=26&gp=0.jpg</td>
        <td>{{oldSize}} KB</td>
        <td>{{nowSize}} KB</td>
        <td>{{ ((oldSize-nowSize)/oldSize*100).toFixed(1)}}%</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      oldSize: '',
      fileName: '',
      nowSize: ''
    };
  },
  methods: {
    async upload(e) {
      let file = e.target.files[0];
      this.oldSize = (file.size / 1024).toFixed(1);
      this.fileName = file.name;
      let res = await compress(file);
      window.open(window.URL.createObjectURL(res));
      this.nowSize = (res.size / 1024).toFixed(1);
    }
  }
};
</script>

<style>
.demo-compress{
  margin-top: 30px;
}

td,th {
  padding: 0;
}

.demo-table {
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #cbcbcb;
  margin-top: 20px;
}

.demo-table caption {
  color: #000;
  font: italic 85%/1 arial,sans-serif;
  padding: 1em 0;
  text-align: center;
}

.demo-table td,.demo-table th {
  border-left: 1px solid #cbcbcb;
  border-width: 0 0 0 1px;
  font-size: inherit;
  margin: 0;
  overflow: visible;
  padding: .5em 1em;
}

.demo-table thead {
  background-color: #e0e0e0;
  color: #000;
  text-align: left;
  vertical-align: bottom;
}

.demo-table td {
  background-color: transparent;
}

.demo-table-odd td {
  background-color: #f2f2f2;
}
</style>

```
:::
