/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: '',
  outputDir: 'dist',
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      // .set('@@', resolve('node_modules/th-pdiot-component-ui/src'))
      .set('@@', resolve('src'))
      .set('variable', resolve('node_modules/th-pdiot-component-ui/src/assets/theme/src/common/variable.scss'))

    // 忽略的打包文件
    config.externals({
      'axios': 'axios'
    })
    // svg图标处理
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      // 访问微服务系统
      [process.env.VUE_APP_API_PREFIX]: {
        target: process.env.VUE_APP_API_HOST,
        changeOrigin: true,
        ws: false,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_PREFIX]: ''
        }
      },
      // 访问原系统
      [process.env.VUE_APP_API_PREFIX_ORIGIN]: {
        target: process.env.VUE_APP_API_HOST_ORIGIN,
        changeOrigin: true,
        ws: false,
        autoRewrite: true,
        cookieDomainRewrite: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_PREFIX_ORIGIN]: ''
        }
      }
    }
  },
  // 未编译成es5的依赖包，处理低版本浏览器兼容性问题
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ]
}
