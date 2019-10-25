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

uploadFile = (url, data, filePath, name) => {
  let _url = config.baseUrl + url;
  name = name ? name : 'tempFile';
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: _url,
      filePath: filePath,
      name: name,
      header: { "Content-Type": "multipart/form-data" },
      success: function(res) {
        console.log(res);
        if(res.statusCode > 299) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
      }
    })
  });
}


module.exports = {
  request,
  queryMenuList: () => {
    return request('menu', 'GET')
  },
  uploadFile
}