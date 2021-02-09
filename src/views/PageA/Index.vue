<template>
  <div>
    this is page a
    <th-link @click="handleClick">链接</th-link>
  </div>
</template>
<script>
export default {
  name: 'PageA',
  methods: {
    handleClick() {
      alert('点击事件')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
