let fs = require('fs')
let path = require('path')
let dataPath = path.join(__dirname, './data.json')
// 封装读取数据的函数
function data_read(callback) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    // 读取data.json成功以后
    callback(data)
  })
}

// 封装写入数据的函数
function data_write(data, callback) {
  fs.writeFile(dataPath, JSON.stringify(data, null, 2), err => {
    callback()
  })
}
module.exports = {
  data_read,
  data_write,
}
