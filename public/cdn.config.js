var _resources = [
	// css
	{ path: 'cdn/css/animate.css' }, // 动画效果
	{ path: 'cdn/css/avue.css' }, // 首次加载页面样式
	{ path: 'cdn/css/normalize.css' }, // 全局样式调整
	{ path: 'cdn/js/nprogress/0.2.0/nprogress.css' }, // 顶部进度条样式
	// { path: 'cdn/js/element-ui/2.13.2/lib/theme-chalk/index.css', id: 'theme' }, // ElementUI默认主题样式
	{ path: 'cdn/js/th-vue-component/2.0.23/th-vue-component.css' }, // ThVueComponent公共样式
	{ path: 'cdn/js/th-vue-component/2.0.23/theme/index.css' }, // ThVueComponent主题样式

	// js
	{ path: 'cdn/js/polyfill/6.26.0/polyfill.min.js' }, // 兼容性处理
	{ path: 'cdn/js/classlist-polyfill/1.2.0/index.js' }, // 兼容性处理
	{ path: 'cdn/js/vue/2.6.11/vue.min.js' }, // VUE2
	{ path: 'cdn/js/vue-router/3.1.6/vue-router.min.js' }, // VUE-ROUTER路由
	{ path: 'cdn/js/vuex/3.5.1/vuex.min.js' }, // VUEX状态管理
	{ path: 'cdn/js/axios/0.21.1/axios.min.js' }, // AXIOS请求
	{ path: 'cdn/js/mockjs/1.1.0/mock-min.js' }, // MOCK模拟数据
	{ path: 'cdn/js/nprogress/0.2.0/nprogress.js' }, // 顶部进度条
	{ path: 'cdn/js/jquery/3.3.1/jquery.min.js' }, // JQUERY库
	{ path: 'cdn/js/element-ui/2.13.2/lib/index.js' }, // ELEMENTUI组件库
	{ path: 'cdn/js/th-vue-component/2.0.23/th-vue-component.umd.js' }, // ThVueComponent组件库

	// async js
	{ async: true, path: 'cdn/js/xlsx/0.15.6/xlsx.full.min.js' }, // 导入导出EXCEL插件
	{ async: true, path: 'cdn/js/xlsx-style/0.8.13/xlsx.full.min.js' }, // 导入导出EXCEL插件
	{ async: true, path: 'cdn/js/screenfull/4.2.1/screenfull.js' }, // 全屏插件
	{ async: true, path: 'cdn/js/clipboard/2.0.6/clipboard.min.js' }, // 复制插件
	{ async: true, path: 'cdn/js/crypto-js/3.1.9/crypto-js.js' }, // 加解密插件
	{ async: true, path: 'cdn/js/pinyin/2.8.0/web-pinyin.js' }, // 拼音插件
	{ async: true, path: 'cdn/js/sortablejs/1.10.2/Sortable.min.js' }, // 排序插件
	{ async: true, path: 'cdn/js/vuedraggable/2.23.2/vuedraggable.umd.min.js' }, // 排序VUE组件
];

if (window._loadCdnResources) {
  window._loadCdnResources(null, _resources)
}
