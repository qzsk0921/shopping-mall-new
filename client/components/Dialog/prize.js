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
    // 去领奖
    acceptAwardHandle() {
      // 添加收货地址
      wx.navigateTo({
        url: `/pages/location/index/index?from=lottery_of_mine&draw_reward_prize_id=${this.data.award.draw_reward_prize_id}`,
      })
    },
    closeHandle() {
      this.setData({
        dialogVisible: false
      })
    }
  }
})