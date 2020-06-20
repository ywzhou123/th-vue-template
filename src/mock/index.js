/**
 * 模拟数据
 */
const Mock = require('mockjs');

// 示例1
import data from './data/example1.js'
Mock.mock(/\/getPageAMockData/, 'get', data);

// 示例2
Mock.mock(/\/getPageAMockJson/, 'get', require('./json/example2.json'));
