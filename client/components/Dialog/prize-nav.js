// components/Dialog/prize-nav.js
import store from '../../store/common'
import create from '../../utils/create'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toLotteryHandle() {
      // 检查授权状态
      // 未授权
      if (!this.checkAuth()) return

      wx.navigateTo({
        url: '/pages/mine/lottery/lottery',
      })
      this.setData({
        dialogVisible: false
      })
    },
    closeHandle() {
      this.setData({
        dialogVisible: false
      })
    },
    checkAuth() {
      if (!store.data.userInfo.avatar_url) {
        // 未授权先去授权页
        wx.navigateTo({
          url: '/pages/authorization/identity',
        })
        return false
      } else if (!store.data.userInfo.phone) {
        // 授权昵称头像还未授权手机号
        wx.navigateTo({
          url: '/pages/authorization/phone',
        })
        return false
      }
      return true
    },
  }
})