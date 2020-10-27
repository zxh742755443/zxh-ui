<template>
  <div>
    <input :value="value" readonly @click.stop="show" placeholder="请输入"/>
    <z-number-keyboard
      v-model="value"
      :visible="visible"
      extra-key="X"
      @input="onInput"
      @delete="onDelete"
      @blur="visible = false">
      <div slot="delete">D</div>
    </z-number-keyboard>
  </div>
</template>

<script>

export default {
  name: 'App',
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
