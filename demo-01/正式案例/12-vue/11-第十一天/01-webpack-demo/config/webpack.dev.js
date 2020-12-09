// dev development 开发环境 (不压缩)
// dev 不需要配置所有的配置, 应该在base的基础上, 额外新增自己的配置即可

// 导入基础的配置对象
const base = require('./webpack.base.js')
// 利用merge包, 进行配置的扩展
const { merge } = require('webpack-merge')

// merge({ a: '1' }, { b: '2' })  =>  { a: '1', b: '2' }
// merge({ a: '1' }, { a: '2' })  =>  { a: '2' }

module.exports = merge(base, {
  // 这里写dev的配置
  devServer: {
    port: 3000,
    open: true
  },
  mode: 'development'
})