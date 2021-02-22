var _resources = [
  // { async: true, path: 'cdn/css/animate.css' },
  // { async: true, path: 'cdn/css/avue.css' },
  { async: true, path: 'cdn/css/normalize.css' },
  // {async: true, path:'cdn/js/element-ui/2.13.2/lib/theme-chalk/index.css', id: 'theme'},
  // { async: true, path: 'cdn/js/nprogress/0.2.0/nprogress.css' },
  { async: true, path: 'cdn/js/th-vue-component/2.0.23/th-vue-component.css' },
  { async: true, path: 'cdn/js/th-vue-component/2.0.23/theme/index.css' },

  { path: 'cdn/js/polyfill/6.26.0/polyfill.min.js' },
  { path: 'cdn/js/classlist-polyfill/1.2.0/index.js' },
  { path: 'cdn/js/vue/2.6.11/vue.min.js' },
  // { path: 'cdn/js/vue-router/3.1.6/vue-router.min.js' },
  // { path: 'cdn/js/vuex/3.5.1/vuex.min.js' },
  { path: 'cdn/js/axios/0.21.1/axios.min.js' },
  // { path: 'cdn/js/mockjs/1.1.0/mock-min.js' },
  // { path: 'cdn/js/nprogress/0.2.0/nprogress.js' },
  // { path: 'cdn/js/jquery/3.3.1/jquery.min.js' },
  { path: 'cdn/js/element-ui/2.13.2/lib/index.js' },
  { path: 'cdn/js/th-vue-component/2.0.23/th-vue-component.umd.js' },

  { async: true, path: 'cdn/js/xlsx/0.15.6/xlsx.full.min.js' },
  { async: true, path: 'cdn/js/xlsx-style/0.8.13/xlsx.full.min.js' },
  { async: true, path: 'cdn/js/screenfull/4.2.1/screenfull.js' },
  { async: true, path: 'cdn/js/clipboard/2.0.6/clipboard.min.js' },
  { async: true, path: 'cdn/js/pinyin/2.8.0/web-pinyin.js' },
  { async: true, path: 'cdn/js/sortablejs/1.10.2/Sortable.min.js' },
  { async: true, path: 'cdn/js/vuedraggable/2.23.2/vuedraggable.umd.min.js' }
]

if (window._loadCdnResources) {
  window._loadCdnResources(null, _resources)
}
