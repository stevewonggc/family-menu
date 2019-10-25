// pages/addDish/addDish.js

const api = require('../../api/main')

Page({

  /**
   * Page initial data
   */
  data: {
    images: [],
    cook:['东东', '佳佳'],
    cookIndex: 0,
    partsString: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onInput: function(e) {
    this.setData({
      partsString: e.detail.value
    });
  },

  onCookChange: function(e) {
    this.setData({
      cookIndex: e.detail.value
    })
  },

  onSave: function() {
    console.log(this.data);
    api.
  },

  chooseImage: function() {
    var that = this;
    console.log('tap choose image');
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'cameral'],
      success: function(res) {
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        })
        console.log(that.data);
      },
    })
  }
})