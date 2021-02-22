/**
 * 加载CDN资源
 *    参数root：cdn地址(如http://localhost:5500)
 *    参数resources：自定义资源列表(参考http://192.168.14.227/DefaultCollection/PSSCS/_git/th-vue-cdn?path=%2Fcdn%2Futils%2FimportAll.js&version=GBdevelop)
 */

var _resources = [
  { async: true, path: 'cdn/css/normalize.css' },
  { async: true, path: 'cdn/js/th-vue-component/2.0.24/th-vue-component.css' },
  { async: true, path: 'cdn/js/th-vue-component/2.0.24/theme/index.css' },

  { path: 'cdn/js/polyfill/6.26.0/polyfill.min.js' },
  { path: 'cdn/js/classlist-polyfill/1.2.0/index.js' },
  { path: 'cdn/js/vue/2.6.11/vue.min.js' },
  { path: 'cdn/js/axios/0.21.1/axios.min.js' },
  { path: 'cdn/js/element-ui/2.13.2/lib/index.js' },
  { path: 'cdn/js/th-vue-component/2.0.24/th-vue-component.umd.js' },

  { async: true, path: 'cdn/js/xlsx/0.15.6/xlsx.full.min.js' },
  { async: true, path: 'cdn/js/xlsx-style/0.8.13/xlsx.full.min.js' },
]

if (window._loadCdnResources) {
  window._loadCdnResources(null, _resources)
}
