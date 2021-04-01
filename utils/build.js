const glob = require('glob')
const { exec } = require('child_process')

const report = process.argv[2]

let fileList, moduleName
glob.sync('./src/pages/*').forEach(filepath => {
  fileList = filepath.split('/')
  moduleName = fileList[fileList.length - 1]
  exec(`vue-cli-service build ${moduleName} ${report || ''}`)
})

