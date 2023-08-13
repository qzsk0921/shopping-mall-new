// pages/mine/recharge/components/rechange-dropdown.js
import store from '../../../../store/common'
import create from '../../../../utils/create'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    open: {
      type: Number,
      value: 0
    },
    curCard: Object
  },
  observers: {
    'open': function (val) {
      // console.log(val)
      if (val === 1) {
        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          console.log(rect)
          this.setData({
            height: rect.height
          })
        }).exec()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    payHandle() {
      console.log('payHandle')
      this.setData({
        open: 0
      })
      
      this.triggerEvent('addPayorder')
    },
    closeHandle() {
      this.setData({
        open: 0
      })
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