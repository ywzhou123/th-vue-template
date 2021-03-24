/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 声明vue全局属性
import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $path: string
    $request: any
    $enums: any
  }
}
