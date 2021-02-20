const glob = require('glob')
const path = require('path')
module.exports.glob = glob
module.exports.path = path
// const CompressionPlugin = require('compression-webpack-plugin')

// 是否生产环境s
module.exports.isProduction = process.env.NODE_ENV === 'production'

// 解析文件路径
module.exports.resolve = function(dir) {
  return path.join(__dirname, '../', dir)
}

// 获取入口文件
module.exports.getPages = function() {
  const pages = {}
  let fileList, moduleName
  glob.sync('./src/pages/*').forEach(filepath => {
    fileList = filepath.split('/')
    moduleName = fileList[fileList.length - 1]
    pages[moduleName] = {
      entry: `src/pages/${moduleName}/${moduleName}.js`,
      template: `src/pages/${moduleName}/${moduleName}.html`,
      filename: `${moduleName}.html`,
      // inject: true,
      chunks: [`chunk-vendors`, `chunk-common`, `manifest.${moduleName}`, moduleName]
      // chunks: [`chunk-vendors-${moduleName}`, `chunk-common-${moduleName}`, `manifest.${moduleName}`, moduleName]
    }
  })
  return pages
}

module.exports.cdn = { // 引用的CDN地址
  js: ['https://cdn.jsdelivr.net/npm/vue']
}
