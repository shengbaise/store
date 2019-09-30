<template>
  <div id="app">
  </div>
</template>

<script>
import Store from './lib/index'
export default {
  name: 'app',
  mounted() {
    const store = new Store()
    console.info(store.setItem('cookie'), 'rrrrrrrrrrr', store.Cookie)
  },
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
