// pages/user/index/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: App.globalData.openid,
    list: App.globalData.tabList, // tabbar 数据
    userInfo: wx.getStorageSync('userInfo') || App.globalData.userInfo, // 用户信息
    isLogin: false // 是否微信用户信息授权过
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
    const _this = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              _this.uploadUserInfo(res.userInfo)
            }
          })
        } else {
          this.setData({
            isLogin: false
          })
        }
      }
    });
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
  // onShareAppMessage: function () {

  // },
  
  /**
   * 获取微信用户授权微信信息
   * @param {*} e 
   */
  getUserInfo(e) {
    this.uploadUserInfo(e.detail.userInfo)
  },

  /**
   * 新建/拉取用户信息
   * @param {Object} info 微信用户信息 
   */
  async uploadUserInfo(info) {
    const { avatarUrl, nickName, gender } = info
    let { userInfo } = this.data
    userInfo = {
      ...userInfo,
      avatarUrl,
      nickName,
      gender
    }
    const db = wx.cloud.database()
    const { openid } = this.data
    const userData = (await db.collection('users').where({
      _openid: openid
    }).get()).data
    // 如果没有获取到用户数据添加一条
    if (userData.length) {
      userInfo = userData[0]
    } else {
      await db.collection('users').add({
        data:{
          ...userInfo
        }
      })
    }
    App.globalData.userInfo = userInfo
    wx.setStorageSync('userInfo', userInfo)
    this.setData({
      userInfo: userInfo,
      isLogin: true
    })
  },

  toUserIndex() {
    wx.navigateTo({
      url: '/pages/user/edit/edit'
    })
  },

  /**
   * tabbar tab切换
   * @param {*} e
   */
  tabChange(e) {
    App.tabChange(e)
  },

  /**
   * 头像预览
   * @param {String} url 
   */
  previewImage(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      current: 0, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
})