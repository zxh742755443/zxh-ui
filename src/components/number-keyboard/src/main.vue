<template>
  <transition name="z-number-keyboard-fade">
    <div class="z-number-keyboard" v-show="show" ref="keyborder" @click.stop>
      <div class="z-number-keyboard__content">
        <div class="z-number-keyboard__item" v-for="(item,key) in keyList" :key="key">
          <div class="z-number-keyboard__key" @click="onInput(item)">
            <span v-if="item.type !== 'delete'">{{item.text}}</span>
            <div v-else>
              <slot v-if="$slots.delete" name="delete"></slot>
              <img v-else class="z-number-keyboard__key-delete" src="../assets/keyboard-delete.png" />
            </div>
          </div>
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
    event: 'update:value'
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
    keyList() {
      return this.genDefaultKeys();
    }
  },
  watch: {
    visible: function(val) {
      this.show = val;
    }
  },
  data() {
    return {
      show: this.visible
    };
  },
  mounted() {
    this.handler(true);
  },
  activated() {
    this.handler(true);
  },
  deactivated() {
    this.handler(false);
  },
  destroyed() {
    this.handler(false);
  },
  methods: {
    genBasicKeys() {
      const keys = [];
      for (let i = 1; i <= 9; i++) {
        keys.push({ text: '' + i });
      }
      return keys;
    },
    genDefaultKeys() {
      return [
        ...this.genBasicKeys(),
        {text: this.extraKey},
        {text: '0'},
        {
          text: 'delete',
          type: 'delete'
        }
      ];
    },
    onBlur() {
      this.$emit('blur');
      this.callback && this.callback('blur');
    },
    onInput(item) {
      let value = this.value;
      if (item.type === 'delete') {
        this.$emit('delete');
        let text = value.slice(0, value.length - 1);
        this.$emit('update:value', text);
        this.callback && this.callback('delete');
        return;
      }
      this.$emit('input', item.text);
      let text = value + item.text;
      this.$emit('update:value', text);
      this.callback && this.callback('input', text);
    },
    handler(action) {
      document[(action ? 'add' : 'remove') + 'EventListener']('click', this.onBlur);
    }
  }
};
</script>
