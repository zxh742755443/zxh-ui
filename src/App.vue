<template>
  <z-keyboard @keypress="keypress"/>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      num: 40,
      disabled: false
    }
  },
  methods: {
    keypress (value) {
      console.log('keydown--------', value)
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
