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
      }]
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
