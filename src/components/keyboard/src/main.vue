<template>
  <transition class="z-keyboard-fade">
    <div class="z-keyboard" v-show="visible">
      <div class="z-keyboard__header">
        <slot name="cancel">
          <div class="z-keyboard__cancel" @click="onClick('cancel')">取消</div>
        </slot>
        <slot name="confirm">
          <div class="z-keyboard__confirm" @click="onClick('confirm')">确认</div>
        </slot>
      </div>
      <div class="z-keyboard__content">
        <template v-if="ktype === 'number'">
          <div class="z-keyboard__item" v-for="(item,key) in numberList" :key="key">
            <slot name="item" :scope="item">
              <div class="z-keyboard__text" @click="onClick('keypress',item)">
                <span v-if="item !== 'delete'">{{item}}</span>
                <img v-else class="z-keyboard__text-delete" src="../assets/keyboard-delete.png" />
              </div>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ZKeyboard',
  props: {
    ktype: {
      type: String,
      default: 'number'
    }
  },
  computed: {
    numberList () {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete']
    }
  },
  data () {
    return {
      visible: true,
      value: ''
    }
  },
  methods: {
    onClick (type, value) {
      switch (type) {
        case 'cancel':
          this.$emit('cancel')
          break
        case 'confirm':
          this.$emit('confirm')
          break
        case 'keypress':
          if (value === 'delete') {
            this.$emit('delete')
          } else {
            this.$emit('keypress', value)
          }
          break
      }
    }
  }
}
</script>
