<template>
    <div id="app"
         v-infinite-scroll="test"
         :infinite-scroll-disabled="disabled"
         infinite-scroll-delay="1000"
         infinite-scroll-distance="0"
    ><div v-for="item in num" :key="item">{{item}}</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      num: 40,
      disabled: false
    }
  },
  methods: {
    test () {
      console.log('test-----------', this)
      if (this.num >= 90) {
        this.disabled = true
        return
      }
      this.num += 10
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
