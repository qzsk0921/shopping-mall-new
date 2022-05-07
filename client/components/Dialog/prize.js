// components/Dialog/prize.js.js
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
    award: {
      type: Object,
      value: {}
    }
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
    dialogTapHandle() {
      // this.setData({
      //   dialogVisible: false
      // })
    },
    // 去领奖 跳转至奖品领取-收货地址页
    acceptAwardHandle() {
      //  -1:商品已被抽光 1:商品 2:优惠券 3:积分 4:谢谢参与
      const type = this.data.award.type
      if ([1, 2, 3].includes(type)) {
        if (type === 1) {
          // 添加收货地址（跳转需把弹窗关闭）
          wx.navigateTo({
            url: `/pages/location/index/index?from=lottery_of_mine&draw_reward_prize_id=${this.data.award.draw_reward_prize_id}`,
          })
        } else if (type === 2) {
          // 优惠券
          wx.navigateTo({
            url: `/pages/mine/coupon/coupon?from=lottery_of_mine`,
          })
        } else if (type === 3) {
          // 积分
          wx.navigateTo({
            url: '/pages/mine/vip/score?from=lottery_of_mine',
          })
        }
      }

      this.setData({
        dialogVisible: false
      })
    },
    closeHandle() {
      this.setData({
        dialogVisible: false
      })
    }
  }
})