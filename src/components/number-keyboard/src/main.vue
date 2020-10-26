<template>
  <transition name="z-number-keyboard-fade">
    <div class="z-number-keyboard" v-show="visible" ref="keyborder" @click.stop>
      <div class="z-number-keyboard__content">
        <div class="z-number-keyboard__item" v-for="(item,key) in keyList" :key="key">
          <slot name="item" :scope="item">
            <div class="z-number-keyboard__key" @click="onInput(item)">
              <span v-if="item.type !== 'delete'">{{item.text}}</span>
              <img v-else class="z-number-keyboard__key-delete" src="../assets/keyboard-delete.png" />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ZNumberKeyboard',
  model: {
    prop: 'value',
    event: 'upddate:value'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    extraKey: {
      type: String,
      default: '.'
    }
  },
  computed: {
    keyList () {
      return this.genDefaultKeys()
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.handler(true)
  },
  destroyed () {
    this.handler(false)
  },
  methods: {
    genBasicKeys () {
      const keys = []
      for (let i = 1; i <= 9; i++) {
        keys.push({ text: '' + i })
      }
      return keys
    },
    genDefaultKeys () {
      return [
        ...this.genBasicKeys(),
        {text: this.extraKey},
        {text: '0'},
        {
          text: 'delete',
          type: 'delete'
        }
      ]
    },
    onBlur () {
      this.$emit('blur')
    },
    onInput (item) {
      let value = this.value
      if (item.type === 'delete') {
        this.$emit('delete')
        this.$emit('upddate:value', value.slice(0, value.length - 1))
        return
      }
      this.$emit('input', item.text)
      this.$emit('upddate:value', value + item.text)
    },
    handler (action) {
      document[(action ? 'add' : 'remove') + 'EventListener']('click', this.onBlur)
    }
  }
}
</script>
