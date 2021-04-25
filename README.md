## 项目部署

### 1、安装软件包

```bash
  npm config set registry https://registry.npm.taobao.org
  npm install
```

或者

```bash
  npm run pre
```


### 2、启动开发模式

```bash
  npm run dev
```

### 3、编译发布版本

```bash
  npm run build
```

### 4、编译发布版本，并且成生报告文件

```bash
  npm run report
```

## vue微应用

### main.js

```js
let instance = null

function render(props = {}) {
  const { container } = props
  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// webpack打包公共文件路径
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 生命周期
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
```

### router.js

```js
new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/demo' : process.env.BASE_URL,
  routes,
})
```

### vue.config.js

- packageName必须和apps里的name一致

```js
const packageName = require('./package').name
const dev = process.env.NODE_ENV === 'development'
const port = 1801
module.exports = {
  // 自定义webpack配置
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  // 配置转发代理
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true,
    port: port,
  }
}
```

### public图片资源加载

- 静态资源目录前缀
```
  Vue.prototype.$path = process.env.BASE_URL
```
- img地址加前缀：
```html
  <img :src="$path + item.img" alt="">
```

- echarts-3D地图背景图片加载有跨域安全问题，需要把图片资源放在主框架中



## html微应用
micorapp.js

```js
const render = ($) => {
  $('#purehtml-container').html('Hello, render with jQuery');
  return Promise.resolve();
};

((global) => {
  global['purehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: () => {
      console.log('purehtml mount');
      return render($);
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
  if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
    debugger
  }
})(window);
```