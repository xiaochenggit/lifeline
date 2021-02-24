// pages/historytoday/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyList: [],
    today: '',
    err: '',
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistoryToday()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  
  /**
   * 获取历史上的今天数据
   */
  getHistoryToday() {
    const _this = this
    this.setData({
      isLoading: true
    })
    wx.cloud.callFunction({
      name: 'axios',
      data: {
        url: 'https://www.ipip5.com/today/api.php?type=json',
      },
      success: res => {
        res = res.result
        const { result, today } = res
        _this.setData({
          historyList: result,
          today,
          isLoading: false
        })
        wx.setNavigationBarTitle({
          title: today,
        })
        // console.log(res)
      },
      fail: err => {
        _this.setData({
          err: '请稍候重试...',
          isLoading: false
        })
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})