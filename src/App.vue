<template>
  <div id="app">
    <div id="yourContainer"></div>
    <div id="yourContainer2"></div>
    <!-- <div v-if="loading">loading</div> -->
    <!-- <div id="root-view" class="app-view-box" v-html="content"></div> -->
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App'
  // props: {
  //   loading: Boolean,
  //   content: String
  // }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
