// pages/weather/index.js
const { weatherKey, TencentLocationKey } = require('../common/constant')
const utils = require('../common/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayList: ['今天', '明天', '后天'],
    weather: {}, // 实时天气
    weather3day: [], // 3天内天气
    air5day: [], // 五天空气质量
    latitude: '',
    longitude: '',
    region: ['北京市', '北京市', '朝阳区'],
    dialogTitle: '提示',
    dialogContent: '拒绝授权位置信息无法获取当前位置天气信息',
    dialogShow: false,
    buttons: [{text: '取消'}, {text: '去设置'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
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
   * 获取位置信息
   */
  getLocation() {
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (result)=>{
        console.log(result)
        const { latitude, longitude } = result
        this.getWeather(latitude, longitude)
        this.getWeather3day(latitude, longitude)
        this.getLocationStr(latitude,longitude)
        this.getAir(latitude,longitude)
      },
      fail: (res)=>{
        if (res.errMsg === "getLocation:fail auth deny") {
          console.log('拒绝授权位置信息无法获取天气信息!')
          _this.setData({
            dialogShow: true
          })
        }
      },
      complete: ()=>{

      }
    })
  },
  /**
   * 获取当前位置省市区
   * @param {*} latitude 
   * @param {*} longitude
   */
  getLocationStr(latitude, longitude) {
    const _this = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/', //仅为示例，并非真实的接口地址
      data: {
        location: `${latitude},${longitude}`,
        key: TencentLocationKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        res = res.data.result
        const { district, province, city } = res.ad_info
        const region = [province, city, district]
        _this.setData({
          region
        })
        console.log(res.ad_info)
      }
    })
  },

  /**
   * 获取天气
   */
  getWeather(latitude, longitude) {
    const _this = this
    wx.cloud.callFunction({
      name: 'axios',
      data: {
        url: 'https://devapi.qweather.com/v7/weather/now',
        key: weatherKey,
        location: `${utils.currency(longitude, '')},${utils.currency(latitude, '')}`
      },
      success: res => {
        res = res.result
        if (res.code == '200') {
          _this.setData({
            weather: res.now
          })
          const { region } = _this.data
          wx.setNavigationBarTitle({
            title: region[2]
          })
          wx.stopPullDownRefresh()
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 3天内的天气
   */
  getWeather3day(latitude, longitude) {
    const _this = this
    wx.cloud.callFunction({
      name: 'axios',
      data: {
        url: 'https://devapi.qweather.com/v7/weather/3d',
        key: weatherKey,
        location: `${utils.currency(longitude, '')},${utils.currency(latitude, '')}`
      },
      success: res => {
        res = res.result
        if (res.code == '200') {
          _this.setData({
            weather3day: res.daily
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 获取空气质量
   */
  getAir(latitude, longitude) {
    const _this = this
    wx.cloud.callFunction({
      name: 'axios',
      data: {
        url: 'https://devapi.qweather.com/v7/air/5d',
        key: weatherKey,
        location: `${utils.currency(longitude, '')},${utils.currency(latitude, '')}`
      },
      success: res => {
        res = res.result
        if (res.code == '200') {
          // console.log(res)
          _this.setData({
            air5day: res.daily
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 省市区变化
   */
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const region = e.detail.value
    const address = region.join('')
    this.setData({
      region: e.detail.value
    })
    this.getLocationCode(address)
  },
  /**
   * 省市区位置坐标
   * @param {String} address 位置信息 
   */
  getLocationCode(address) {
    const _this = this
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/', //仅为示例，并非真实的接口地址
      data: {
        address,
        key: TencentLocationKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        const { lng, lat } = res.data.result.location
        _this.getWeather(lat, lng)
        _this.getWeather3day(lat, lng)
        _this.getAir(lat, lng)
      }
    })
  },
  
  /**
   * 弹窗关闭
   * @param {Object} e 
   */
  tapDialogButton(e) {
    const { index } = e.detail
    const { region } = this.data
    const address = region.join('')
    this.setData({
      dialogShow: false
    })
    // 如果取消直接获取默认天气
    if (index === 0) {
      this.getLocationCode(address)
    } else { // 去设置
      const _this = this
      wx.openSetting({
        success (res) {
          const authSetting = res.authSetting
          if (authSetting['scope.userLocation']) { // 同意授权
            console.log('同意位置授权')
            _this.getLocation()
          } else {
            _this.getLocationCode(address)
          }
          console.log(res.authSetting)
        }
      })
    }
    console.log(index)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const region = this.data.region
    const address = region.join('')
    this.getLocationCode(address)
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
})