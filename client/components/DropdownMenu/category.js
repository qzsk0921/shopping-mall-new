// components/DropdownMenu/category.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
    categoryData: {
      type: Object,
      value: []
    },
    currentFirstCategoryId: {
      type: Number,
      value: 0
    }
  },
  observers: {
    'categoryData': function (val) {
      // console.log(val)
      const query = wx.createSelectorQuery().in(this)
      query.select('.dropdown-item-down__content').boundingClientRect(rect => {
        // console.log(rect)
        this.setData({
          height: rect.height
        })
      }).exec()
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
    firstCategoryHandle(e) {
      // console.log(e)
      const id = e.target.dataset.item.id
      this.setData({
        opened: 0,
      })
      this.triggerEvent('subFirstCategoryHandle', id)
    },
    dropdownItemTapHandle(e) {
      // 分类下拉弹窗代理事件
      console.log('dropdownItemTapHandle', e.target.dataset)
      const myItem = e.target.dataset.item
      if (myItem) {
        if (myItem === 'collapse') {
          this.setData({
            opened: 0,
          })
        } else {
          // if (myItem.value === this.data.currentSort) return
          // this.setData({
          //   currentSort: myItem.value,
          // })
          // this.triggerEvent('subClickable', myItem)

          // 相同过的不处理
          // 当前组件中选择的分类要与页面同步
          // 触发父组件
        }
      }
    }
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // const query = wx.createSelectorQuery().in(this)
      // query.select('.dropdown-item-down__content').boundingClientRect(rect => {
      //   // console.log(rect)
      //   that.setData({
      //     height: rect.height
      //   })
      // }).exec()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})