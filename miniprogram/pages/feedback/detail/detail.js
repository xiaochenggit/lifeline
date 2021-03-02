// pages/feedback/detail/detail.js
const App = getApp();
const utils = require('../../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: App.globalData.openid,
    type: '', // 反馈类型
    images: [], // 截图存储
    describe: '', // 问题描述
    concat: '', // 联系方式
    maxImagesLength: 4, // 最大截图上传数量
    message: {
      message: '',
      type: ''
    },
    canUpload: false // 是否可提交，默认不可以提交
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options
    if (type) {
      this.setData({
        type
      })
    }
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
   * 验证提交
   */
  check() {
    const { describe, concat } = this.data
    if (!describe) {
      this.setData({
        message: {
          message: '请输入反馈描述!',
          type: 'error'
        }
      })
      return false
    }
    if (!concat) {
      this.setData({
        message: {
          message: '请输入联系方式!',
          type: 'error'
        }
      })
      return false
    }
    if (concat) {
      if (!utils.checkPhone(concat) && !utils.checkEmail(concat)) {
        this.setData({
          message: {
            message: '请输入正确的联系方式!',
            type: 'error'
          }
        })
        return false
      }
    }
    this.uploadFeedback()
  },

  /**
   * 提交
   */
  async uploadFeedback() {
    const db = wx.cloud.database()
    const { openid, type, images, describe, concat } = this.data
    const data = {
      type,
      images,
      describe,
      concat
    }
    await db.collection('feedback').add({
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
   * 上传头像 
   */
  chooseImage() {
    const _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath)
        _this.uploadFileImage(tempFilePath)
      }
    })
  },

  /**
   * 图片上传到服务器
   * @param {String} filePath 小程序临时文件路径 
   */
  uploadFileImage(filePath) {
    const cloudPath = `feedback/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/.[^.]+?$/)[0]
    const _this = this
    wx.cloud.uploadFile({
      cloudPath, // 上传至云端的路径
      filePath, // 小程序临时文件路径
      success: res => {
        const { images } = _this.data
        images.push(res.fileID)
        _this.setData({
          images
        })
      },
      fail: console.error
    })
  },

  /**
   * 描述改变
   * @param {*} e 
   */
  inputChange(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      [type]: e.detail.value
    })
    let { describe, concat, canUpload } = this.data
    if (describe && concat) {
      canUpload = true
    } else {
      canUpload = false
    }
    this.setData({
      canUpload
    })
  },

  /**
   * 删除反馈图片
   */
  deleteImage(e) {
    const { index } = e.currentTarget.dataset
    const { images } = this.data
    images.splice(index, 1)
    this.setData({
      images
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