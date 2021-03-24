/* eslint-disable no-unused-vars */
import Vue, { VNode } from 'vue'

// 声明.jsx文件的识别
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
