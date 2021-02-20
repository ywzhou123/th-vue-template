/**
 * 模拟数据
 */
// const Mock = require('mockjs')

// 示例1
import example1 from './json/example1.js'
window.Mock.mock(RegExp('/getPageAMockData'), 'get', example1)

// 示例2
window.Mock.mock(RegExp('/getPageAMockJson'), 'get', require('./json/example2.json'))
