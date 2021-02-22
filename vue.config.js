/* eslint-disable no-unused-vars */
/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const { glob, path, resolve, isProduction, getPages, getDist } = require('./utils/cdn.js')

module.exports = {
  pages: getPages(),
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: '',
  outputDir: getDist(),
  chainWebpack: config => {
    // 别名
    config.resolve.alias
      .set('@@', resolve('node_modules/th-vue-component/src'))
      .set('variable', resolve('node_modules/th-vue-component/src/assets/theme/src/common/variable.scss'))

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

    // 排除打包依赖
    if (isProduction) {
      config.externals({
        'vue': 'vue',
        'element-ui': 'element-ui',
        'th-vue-component': 'th-vue-component'
      })
    }
    // 移除 preload
    glob.sync('./src/pages/*').forEach(filePath => {
      const pageName = path.basename(filePath)
      config.plugins.delete(`preload-${pageName}`)
      config.plugins.delete(`prefetch-${pageName}`)
    })
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
    'th-vue-component/src'
  ]
}
