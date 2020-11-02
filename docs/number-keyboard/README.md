

### NumberKeyboard 数字键盘
虚拟数字键盘。

`input` 是 `readonly` 并且点击时需要设置 `stopPropagation`，因为点击非键盘区域需要关闭键盘。

#### 基础用法
数字键盘提供了 `input`、`delete`、`blur` 事件，分别对应输入内容、删除内容和失去焦点的动作。

::: demo
```html
<template>
  <div>
    <input :value="value" readonly @click.stop="show"/>
    <z-number-keyboard
      style="z-index: 99999"
      v-model="value"
      :visible="visible"
      @input="onInput"
      @delete="onDelete"
      @blur="visible = false"/>
  </div>
</template>

<script>

export default {
  name: 'NumberKeyboard',
  data () {
    return {
      value: '',
      visible: false
    }
  },
  methods: {
    show (e) {
      this.visible = true
    },
    onInput (value) {
      console.log('key--------', value)
    },
    onDelete (value) {
      console.log('delete--------', value)
    }
  }
}
</script>
```
:::

#### 身份证号键盘
通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`。

::: demo
```html
<template>
  <div>
    <input :value="value" readonly @click.stop="show"/>
    <z-number-keyboard
      v-model="value"
      :visible="visible"
      extra-key="X"
      @input="onInput"
      @delete="onDelete"
      @blur="visible = false">
    </z-number-keyboard>
  </div>
</template>

<script>

export default {
  name: 'NumberKeyboard',
  data () {
    return {
      value: '',
      visible: false
    }
  },
  methods: {
    show (e) {
      this.visible = true
    },
    onInput (value) {
      console.log('key--------', value)
    },
    onDelete (value) {
      console.log('delete--------', value)
    }
  }
}
</script>
```
:::

#### 自定义删除键
通过 `slot` 属性可以自定义删除按键

::: demo
```html
<template>
  <div>
    <input :value="value" readonly @click.stop="show"/>
    <z-number-keyboard
      v-model="value"
      :visible="visible"
      @input="onInput"
      @delete="onDelete"
      @blur="visible = false">
      <div slot="delete">D</div>
    </z-number-keyboard>
  </div>
</template>

<script>

export default {
  name: 'NumberKeyboard',
  data () {
    return {
      value: '',
      visible: false
    }
  },
  methods: {
    show (e) {
      this.visible = true
    },
    onInput (value) {
      console.log('key--------', value)
    },
    onDelete (value) {
      console.log('delete--------', value)
    }
  }
}
</script>
```
:::


#### Attributes

| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| v-model (value) | 当前输入值           | string      | - |- |
| visible   | 是否显示键盘   | boolean       |   - | false   |
| extra-key | 底部额外按键的内容 | string   |- | . |

#### Events

| 事件名称           | 说明                           | 回调参数      |
| -------------- | -------------------------------- | --------- |
| input          | 点击按键时触发                      | 按键内容      |
| delete         | 点击删除键时触发                    | -            |
| blur           | 非键盘区域时触发                    | -          |

#### Slots

| 名称           | 说明                           |
| -------------- | ------------------------------ |
| delete | 删除键       |

### 全局方法
如果你完整引入了 `zxh-ui`，它会为 `Vue.prototype` 添加全局方法：`$numberkeyboard`。

::: demo
```html
<template>
  <div>
    <input :value="value" readonly @click.stop="show" placeholder="请输入"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      value: '',
      visible: false
    };
  },
  methods: {
    show() {
      this.$numberkeyboard({
        extraKey: '.',
        callback: (type, value)=>{
          if (type === 'input') {
            this.value += value;
          } else if (type === 'delete') {
            this.value = this.value.slice(0, this.value.length - 1);
          } else if (type === 'blur') {
            console.log('blur----------');
          }
        }
      });
    }
  }
};
</script>
```
:::

#### Options
| 参数           | 说明                           | 类型      | 可选值                               | 默认值  |
| -------------- | ------------------------------ | --------- | ------------------------------------ | ------- |
| extra-key | 底部额外按键的内容 | string   |- | . |
| callback | 回调 | function(action, value)，action 的值为'input', 'delete'或'blur', value 为 按键内容   |- | - |
