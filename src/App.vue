<template>
  <div id="app">
    <a href="/">Base</a>
    <!-- 子应用 vue app -->
    <a href="/demo">Demo</a>
    <a href="/template">Template</a>
    <a href="/sgjssdk">SgJsSdk</a>
    <!-- 主应用容器 -->
    <router-view></router-view>
    <!-- 子应用容器 -->
    <div
      v-for="item in apps"
      :id="item.container.replace(/^#/, '')"
      :key="item.name"
      :class="{active: getActiveRule(item.activeRule)}"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable vue/require-default-prop */
export default {
  name: 'App',
  props: {
    loading: Boolean,
    content: String
  },
  data() {
    return {
      active: '',
      apps: apps
    }
  },
  methods: {
    getActiveRule(routerPrefix) {
      return window.location.pathname.startsWith(routerPrefix)
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  >div[id].active{
    height: 100%;
    ::v-deep >div[id]{
      height: 100%;
    }
  }
}
</style>
