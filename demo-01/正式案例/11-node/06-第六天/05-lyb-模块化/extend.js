function myRedirect(res) {
  res.my_redirect = res => {
    // 重定向
    res.statusCode = 302
    res.setHeader('location', '/')
    // 需要res.end
    res.end()
  }
}
module.exports = myRedirect
