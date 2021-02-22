const glob = require('glob')
const path = require('path')
module.exports.glob = glob
module.exports.path = path

// 是否生产环境
const isProduction = process.env.NODE_ENV === 'production'
module.exports.isProduction = isProduction

// 解析文件路径
module.exports.resolve = function(dir) {
  return path.join(__dirname, '../', dir)
}

// 获取入口文件
module.exports.getPages = function() {
  const pages = {}
  let pageName = process.argv[3]
  if (pageName && pageName.startsWith('--')) {
    pageName = process.argv[4]
  }
  let fileList, moduleName
  glob.sync('./src/pages/*').forEach(filepath => {
    fileList = filepath.split('/')
    moduleName = fileList[fileList.length - 1]
    pages[moduleName] = {
      entry: `src/pages/${moduleName}/${moduleName}.js`,
      template: `src/pages/${moduleName}/${moduleName}.html`,
      filename: `${moduleName}.html`,
      chunks: [`chunk-vendors`, `chunk-common`, `manifest.${moduleName}`, moduleName]
    }
  })
  if (isProduction && pageName) {
    return { [pageName]: pages[pageName] }
  }
  return pages
}

// 获取输出目录
module.exports.getDist = function() {
  let dir = 'dist'
  let pageName = process.argv[3]
  if (pageName && pageName.startsWith('--')) {
    pageName = process.argv[4]
  }
  if (isProduction && pageName) {
    dir = `${dir}/${pageName}`
  }
  return dir
}
