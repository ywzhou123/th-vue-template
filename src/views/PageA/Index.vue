<template>
  <div>
    this is page a {{val}}
    <el-input v-model="val" size="medium" placeholder="请输入" clearable />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'PageA',
  setup() {
    const val = ref('')
    return {
      val
    }
  }
})
</script>
<style lang="scss" scoped>

</style>
