<template>
  <div>
    {{ msg + ' ' + username }}
    <th-dialog
      v-bind="dialogProps"
      @handleConfirm="handleConfirm"
    >
      <div class="dialog-content">
        {{ msg + ' ' + username }}
      </div>
    </th-dialog>
    <el-button type="primary" size="medium" @click="onClick">
      弹框
    </el-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class PageA extends Vue {
  msg = 'this is page a'

  @Getter('userInfo') userInfo:any

  get username(): any {
    return this.userInfo.username
  }

  dialogProps = {
    ref: 'dialog',
    loading: false,
    title: '详细信息',
    width: '50%',
    height: '50vh',
    buttons: [
      {
        key: 'confirm',
        label: '确定'
      }
    ], // key,label
    showCancelButton: true,
    isDisabledDrag: false,
    isDisabledFullScreen: false,
    props: {}
  }

  onClick() {
    (this.$refs.dialog as any).showDialog()
  }

  handleConfirm(btn:Array<any>) {
    console.log(btn)
    this.$request.fetchHostOrg().then((res:any) => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
