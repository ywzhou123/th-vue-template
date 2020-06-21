<template>
  <div id="app">
    <router-view />
    <theme />
  </div>
</template>

<script>
import Theme from '@/components/theme/Index'

export default {
  name: 'App',
  components: {
    Theme
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
