// pages/feedback/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: [{
      title: '向开发者反馈',
      list: [{
        title: '功能异常',
        desc: '请向开发者反馈小程序功能异常问题。'
      }, {
        title: '支付问题',
        desc: '可向开发者反馈你在支付过程中遇到的问题。'
      }, {
        title: '产品建议',
        desc: '请向开发者反馈你对产品的相关建议。'
      }]
    }, {
      title: '向微信平台投诉',
      list: [{
        title: '违规举报',
        desc: '若遇色情、诱导、骚扰、欺诈、恶意营销、违法犯罪等情况，可向微信举报。'
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 
   * @param {*} e 
   */
  toDetail(e) {
    const { item } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/feedback/detail/detail?type=${item.title}`,
    })
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