// pages/shop/shopType.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getShopCertType
} from '../../api/certification'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '店铺类型',
    // currentId: null, //选中的类型
    currentIds: [], //选中的类型（多选）
    shops: {
      cache: [
        // {
        //   "id": 1,
        //   "name": "烧烤店",
        //   "category_str": "1,2",
        //   "sort": 6,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 4,
        //   "name": "烧烤店3",
        //   "category_str": "1,2",
        //   "sort": 5,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 5,
        //   "name": "烧烤店4",
        //   "category_str": "1,2",
        //   "sort": 2,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 6,
        //   "name": "烧烤店5",
        //   "category_str": "1,2",
        //   "sort": 2,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 7,
        //   "name": "烧烤店6",
        //   "category_str": "1,2",
        //   "sort": 2,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 9,
        //   "name": "烧烤店8",
        //   "category_str": "1,2",
        //   "sort": 2,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 10,
        //   "name": "烧烤店9",
        //   "category_str": "1,2",
        //   "sort": 2,
        //   "status": 1,
        //   "create_time": 222222
        // },
        // {
        //   "id": 8,
        //   "name": "烧烤店7",
        //   "category_str": "1,2",
        //   "sort": 1,
        //   "status": 1,
        //   "create_time": 222222
        // }
      ],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 20,
  },
  selectHandle(e) {
    // 店铺类型选择
    const item = e.target.dataset.item

    if (this.data.currentIds.length) {
      let res = true
      res = this.data.currentIds.some((it, index) => {
        if (it.id === item.id) {
          this.data.currentIds.splice(index, 1)
          this.setData({
            currentIds: this.data.currentIds
          })
          return true
        }
        return false
      })

      if (!res) {
        this.setData({
          currentIds: this.data.currentIds.concat(item)
        })
      }
    } else {
      this.setData({
        currentIds: [].concat(item)
      })
    }
  },
  getShopCertType(dataObj) {
    const tempData = {
      page_size: this.data.page_size,
      page: this.data.shops.count
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getShopCertType(tempData).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 使用
  useHandle() {
    // 在提交成功后，返回首页需要刷新（带上参数）
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      // shopType: item
      shopType: this.data.currentIds
    })

    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopCertType().then(res => {
      this.setData({
        'shops.cache': res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})