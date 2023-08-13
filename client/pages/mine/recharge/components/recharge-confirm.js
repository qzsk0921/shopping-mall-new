// pages/mine/recharge/componts/recharge-confirm.js
import store from '../../../../store/common'
import create from '../../../../utils/create'

create({
  // Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialogVisible: {
      type: Boolean,
      value: false
    },
    navHeight: Number,
    phone: Number,
    curCard: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    compCurReadStatus: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    dialogTapHandle() {
      this.triggerEvent('addPayorder')

      this.setData({
        dialogVisible: false
      })
    },
    // 阅读
    readStatusHanle() {
      this.setData({
        compCurReadStatus: !this.data.compCurReadStatus
      })
    },
    // 确认支付
    confimHandle() {
      if (!this.data.compCurReadStatus) {
        wx.showToast({
          title: '请阅读并勾选充值须知',
          icon: 'none'
        })
        return
      }

      this.triggerEvent('rechargeConfirmVisible', 0)

      this.setData({
        dialogVisible: false
      })
      // this.canvas.width = this.canvas.height = 0
    },
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})