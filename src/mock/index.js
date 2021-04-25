/**
 * 模拟数据
 */
// 示例1
import example1 from './json/example1.js'

const Mock = require('mockjs')
Mock.mock(RegExp('/getPageAMockData'), 'get', example1)

// 示例2
Mock.mock(RegExp('/getPageAMockJson'), 'get', require('./json/example2.json'))
