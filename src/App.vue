<template>
  <div class="demo-image__lazy">
    <input type="file" @change="upload"/>
  </div>
</template>

<script>
import compress from './utils/compress';

export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    upload(e) {
      var file = e.target.files[0];
      compress(file, {});
      console.log('----------', file);
    }
  }
};
</script>

<style lang="scss">

</style>
