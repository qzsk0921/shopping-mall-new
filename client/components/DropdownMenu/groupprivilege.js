// components/DropdownMenu/groupprivilege.js
import store from '../../store/common'
import create from '../../utils/create'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          console.log(rect)
          let height = rect.height

          // 如果是switchTab页面，加tabbar高度
          // if (this.getTabBar().data.list) {
          //   const tabbarRoutes = this.getTabBar().data.list
          //   const currentRoute = getCurrentPages()[getCurrentPages().length - 1].route
          //   const res = tabbarRoutes.some(item => item.pagePath === currentRoute || item.pagePath === '/' + currentRoute)

          //   if (res) {
          //     height += store.data.compatibleInfo.tabbarH
          //   }
          // }

          this.setData({
            height
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
    gotitHandle(e) {
      // console.log(e)
      this.setData({
        opened: 0,
      })
      // this.triggerEvent('gotitHandle', item)
    },
  }
})