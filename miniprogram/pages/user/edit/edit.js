// pages/user/edit/edit.js
const App = getApp();
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: App.globalData.openid,
    userInfo: {},
    message: {
      message: '',
      type: ''
    },
    birthdayStart: '1960-01-01',
    birthdayEnd: utils.formatTime('') // 生日选择最大日期(当前天)
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
    this.setData({
      userInfo: App.globalData.userInfo
    })
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

  },

  /**
   * 验证是否可以更新用户信息
   */
  checkUpdateUser() {
    const { avatarUrl, nickName, birthday, autograph, phone, operation, weChat, address } = this.data.userInfo
    if (!nickName) {
      this.setData({
        message: {
          message: '请输入昵称!',
          type: 'error'
        }
      })
      return false
    }
    if (!utils.checkPhone(phone)) {
      this.setData({
        message: {
          message: '请输入正确的手机号码!',
          type: 'error'
        }
      })
      return false
    }
    const data = {
      avatarUrl,
      nickName,
      autograph,
      operation,
      weChat,
      address,
      phone,
      birthday
    }
    this.updateUser(data)
  },

  /**
   * 更新user信息
   * @param {Object} data 更新user信息对象 
   */
  async updateUser(data) {
    const db = wx.cloud.database()
    const { openid } = this.data
    await db.collection('users').where({
      _openid: openid
    }).update({
      data
    })
    this.setData({
      message: {
        message: '保存成功!',
        type: 'success'
      }
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1,
      })
    }, 1000);
  },

  /**
   * 获取用户手机号
   * @param {Object} result 
   */
  getPhoneNumber(result) {
    wx.cloud.callFunction({
      name: 'opendata',
      data: {
        getPhoneNumber: wx.cloud.CloudID(result.detail.cloudID), 
      },
      success:(res)=>{
        console.log("云函数返回的对象",res.result.getPhoneNumber)
      }
    })
  },

  /**
   * 输入
   * @param {Object} e 
   */
  inputChange(e) {
    const { value } = e.detail
    const { type } = e.currentTarget.dataset
    const { userInfo } = this.data
    userInfo[type] = value
    this.setData({
      userInfo
    })
  },

  /**
   * 日期选择器
   * @param {Object} e 
   */
  bindDateChange(e) {
    const { value } = e.detail
    const { userInfo } = this.data
    userInfo.birthday = value
    this.setData({
      userInfo
    })
  },

  /**
   * 选择收货地址
   */
  chooseAddress() {
    const _this = this
    wx.chooseAddress({
      success (res) {
        const { userInfo } = _this.data
        userInfo.address = `${res.provinceName}${res.cityName}${res.countyName}${res.detailInfo}`
        App.globalData.userInfo = userInfo
        _this.setData({
          userInfo
        })
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })
  }
})