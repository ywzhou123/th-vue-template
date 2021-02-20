/* eslint-disable no-unused-vars */
/**
 * 配置参考:
 * https://cli.vuejs.org/zh/config/
 */
const { glob, path, resolve, isProduction, getPages, cdn } = require('./utils/common.js')

module.exports = {
  pages: getPages(),
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: '',
  outputDir: 'dist',
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
    if (isProduction) { // 判断是否是生产环境
      config.externals = { // 需要以cdn引入的模块
        'vue': 'Vue'
      }
    }
    // 输出文件
    // config.output
    //   .filename(bundle => {
    //     // console.log(bundle)
    //     return 'js/[name].[contenthash:8].js'
    //   })
    // .chunkFilename('[name]/[name].[contenthash:8].css')

    // 本来想让css按目录打包，但是一直失败报错，需要排查下原因
    // config.plugin('extract-css').tap(args => [...args, ...[{
    //   filename: bundle => {
    //     return bundle.chunk.name === 'index' ? 'css/[name].[contenthash:8].css' : '[name]/[name].[contenthash:8].css'
    //   },
    //   chunkFilename: 'css/[name].[contenthash:8].css'
    // }]])
    // 移除 prefetch 插件
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')
    // 压缩代码
    config.optimization.minimize(true)
    // 插入cdn代码
    const entry = Object.keys(getPages())
    for (const iterator of entry) {
      config
        .plugin(`html-${iterator}`)
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
    // config.when(isProduction,
    //   config => {
    //     config.optimization.splitChunks({
    //       chunks: 'all',
    //       cacheGroups: {
    //         vendors: {
    //           name: 'chunk-vendors',
    //           test: /[\\/]node_modules[\\/]/,
    //           priority: -10,
    //           chunks: 'all'
    //         },
    //         // 抽离自定义工具库
    //         common: {
    //           name: 'chunk-common',
    //           minSize: 1024,
    //           minChunks: 1,
    //           priority: -20
    //         },
    //         elementUI: {
    //           name: 'chunk-element-ui',
    //           priority: 20,
    //           test: /[\\/]node_modules[\\/]_?element-ui(.*)/
    //         },
    //         ThVueComponent: {
    //           name: 'chunk-th-vue-component',
    //           priority: 19,
    //           test: /[\\/]node_modules[\\/]th-vue-component[\\/]/
    //         },
    //         ThVueBusiness: {
    //           name: 'chunk-th-vue-business',
    //           priority: 18,
    //           test: /[\\/]node_modules[\\/]th-vue-business[\\/]/
    //         },
    //         ThVueEcharts: {
    //           name: 'chunk-th-vue-echarts',
    //           priority: 17,
    //           test: /[\\/]node_modules[\\/]th-vue-echarts[\\/]/
    //         },
    //         commons: {
    //           name: 'chunk-commons',
    //           test: resolve('src/components'),
    //           minChunks: 1,
    //           priority: 5,
    //           reuseExistingChunk: true
    //         }
    //       }
    //     })

    //     config.optimization.runtimeChunk({
    //       name: entryPoint => `manifest.${entryPoint.name}`
    //     })
    //   }
    // )
    // 移除 preload
    glob.sync('./src/pages/*').forEach(filePath => {
      const pageName = path.basename(filePath)
      config.plugins.delete(`preload-${pageName}`)
      config.plugins.delete(`prefetch-${pageName}`)
    })

  },
  // configureWebpack: config => {
  // if (isProduction) {
  //   return {
  //     plugins: [
  //       new CompressionPlugin({
  //         test: /\.js$|\.html$|\.css/,
  //         threshold: 10240,
  //         deleteOriginalAssets: false
  //       })
  //     ]
  //   }
  // }
  // },

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
    'th-vue-component/src',
    'vue-echarts',
    'resize-detector'
  ]
  // css: {
  //   // modules: false,
  //   extract: isProduction, // 是否使用css分离插件 ExtractTextPlugin
  //   sourceMap: !isProduction, // 开启 CSS source maps?
  //   requireModuleExtension: true
  //   // loaderOptions: {
  //   //   // postcss: {
  //   //   //   plugins: [postcss] // 预处理
  //   //   // },
  //   //   css: {
  //   //     localsConvention: 'camelCase',
  //   //     modules: {
  //   //       mode: 'local',
  //   //       localIdentName: !isProduction ? '[name]-[hash:base64:5]' : '[hash:base64:5]' // 使用hash方式生成class
  //   //     }
  //   //   }
  //   // },
  // }
}
