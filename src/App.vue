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
