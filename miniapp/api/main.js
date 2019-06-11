const config = require('./config.js') 

const request = (url, method, data) => {
  let _url = config.baseUrl + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {

      }
    })
  })
}


module.exports = {
  request,
  queryMenuList: () => {
    return request('menu', 'GET')
  }
}