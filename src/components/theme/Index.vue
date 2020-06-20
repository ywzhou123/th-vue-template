<template>
  <th-dialog v-bind="dialogProps">
    <th-theme style="padding: 50px;text-align: center;"/>
  </th-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialogProps: {
        ref: 'dialog',
        title: '主题切换',
        width: '400px',
        showCancelButton: false,
        buttons: []
      }
    }
  },
  methods: {
    onTheme (e) {
      const keyCode = e.keyCode || e.which || e.charCode;
      if (keyCode === 84 && e.altKey && e.ctrlKey) {
        this.$refs.dialog.showDialog()
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onTheme, false)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.onTheme, false)
  }
}
</script>
