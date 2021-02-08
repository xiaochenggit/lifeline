//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      openid: wx.getStorageSync('openid'),
      tabList: [{ // tab导航数据
        "text": "首页",
        "iconPath": "cloud://xly-9gdlbq01cba1b2bb.786c-xly-9gdlbq01cba1b2bb-1300411113/images/index_icon.png",
        "selectedIconPath": "cloud://xly-9gdlbq01cba1b2bb.786c-xly-9gdlbq01cba1b2bb-1300411113/images/index_icon_active.png",
        "path": '/pages/index/index'
      },
      {
        "text": "我的",
        "iconPath": "cloud://xly-9gdlbq01cba1b2bb.786c-xly-9gdlbq01cba1b2bb-1300411113/images/user_icon.png",
        "selectedIconPath": "cloud://xly-9gdlbq01cba1b2bb.786c-xly-9gdlbq01cba1b2bb-1300411113/images/user_icon_active.png",
        "path": '/pages/user/index/index'
      }],
      // userInfo信息
      userInfo: {
        nickName: '登录', // 登录名称
        avatarUrl: 'cloud://xly-9gdlbq01cba1b2bb.786c-xly-9gdlbq01cba1b2bb-1300411113/images/avatar_default.jpg', // 头像
        country: '', // 国家
        province: '', // 省份
        city: '', // 城市
        vipGrade: 0, // vip等级
        phone: '', // 电话号码
        birthday: '', // 生日
        gender: 2, // 性别
        autograph: '', // 签名/简介
        followProductNum: 0, // 关注产品数目
        collectionNum: 0, // 收藏数目
        footPrintNum: 0, // 足迹数目
        messageNum: 0, // 未读消息数目
        integral: 0, // 积分
        address: '', // 地址
        operation: '', // 职业
        weChat: '' // 微信号
      }
    }
  },
  // tab导航切换
  tabChange(e) {
    const { path } = e.detail.item
    wx.reLaunch({
      url: path
    })
  }
})
