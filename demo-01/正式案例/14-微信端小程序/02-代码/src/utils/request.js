const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1'

export default function (Vue) {
  
  Vue.prototype.$http = async function (params) {

      const { url, data, header, method = 'GET' } = params 
      
      let r = await uni.request({
        url :  BASE_URL + url,
        data,
        header,
        method
      })
      return r[1].data.message
    }
}