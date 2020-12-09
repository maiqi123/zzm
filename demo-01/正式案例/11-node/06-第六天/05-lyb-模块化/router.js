let { index, add, assets, del, fbget, fbpost } = require('./handle')
function router(req, res) {
  // 一、处理首页
  if (req.url === '/' || req.url === '/index') {
    index(res)
  }
  // 二、处理添加页
  else if (req.url === '/add') {
    add(res)
  }
  // 三、处理静态资源（样式图片,mime类型）
  // 浏览器在收到网页内容以后，还会进行二次请求，请求样式图片。
  else if (req.url.startsWith('/assets')) {
    assets(req, res)
  }
  // 四、删除
  else if (req.url.startsWith('/delete')) {
    del(req, res)
  }
  // 发布留言-get
  else if (req.url.startsWith('/fb') && req.method === 'GET') {
    fbget(req, res)
  }
  // 发布留言-post
  else if (req.url.startsWith('/fb') && req.method === 'POST') {
    fbpost(req, res)
  } else {
    res.end('404')
  }
}

module.exports = router
