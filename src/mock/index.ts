/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * 模拟数据
 */
import example1 from './json/example1'
import Mock from 'mockjs'

// 示例1
Mock.mock(RegExp('/getPageAMockData'), 'get', example1)

// 示例2
Mock.mock(RegExp('/getPageAMockJson'), 'get', require('./json/example2.json'))
