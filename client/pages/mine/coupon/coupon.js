// pages/mine/coupon/coupon.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getMyCouponList
} from '../../../api/coupon'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的优惠券',
    tabbar: ['未使用', '已使用', '已过期'],
    tabbarNum: [0, 0, 0],
    tabIndex: 0, //0:待使用 1:已使用 -2:已过
    tabWidth: null,
    couponList: [{
      cache: [

      ], //couponNouseCache 未使用
      count: 1,
      total_page: 1,
    }, {
      cache: [], //couponUsedCache 已使用
      count: 1,
      total_page: 1
    }, {
      cache: [], //couponExpiredCache 已过期
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
    this.getMyCouponList()
  },
  // 优惠券详情
  toDetailHandle(e) {
    const coupon_id = e.currentTarget.dataset.coupon_id
    wx.navigateTo({
      url: `/pages/mine/coupon/detail?coupon_id=${coupon_id}`,
    })
  },
  couponHandle(e) {
    console.log(e)
    const status = e.currentTarget.dataset.item.status
    if (status === 0) {
      // 导航链接，跳转至分类
      wx.switchTab({
        url: '/pages/category/category',
      })
    } else return false
  },
  // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    const couponMarketList = this.data.couponMarketList

    if (couponMarketList[this.data.tabIndex].count + 1 > couponMarketList[this.data.tabIndex].total_page) return

    this.setData({
      [`couponMarketList[${this.data.tabIndex}].count`]: ++couponMarketList[this.data.tabIndex].count
    })
    this.getMyCouponList('scrollToLower')
  },
  getMyCouponList(dataObj) {
    const tempData = {
      page: this.data.couponList[this.data.tabIndex].count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    tempData.type = this.data.tabIndex

    return new Promise((resolve, reject) => {
      getMyCouponList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.couponList[this.data.tabIndex].cache.push(...res.data.data)
          this.setData({
            [`couponList[${this.data.tabIndex}].cache`]: this.data.couponList[this.data.tabIndex].cache,
            [`couponList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.couponList)
        } else {
          this.setData({
            // 测试数据
            // [`couponList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`couponList[${this.data.tabIndex}].cache`]: res.data.data,
            [`couponList[${this.data.tabIndex}].total_page`]: res.data.last_page,
            tabbarNum: [res.data.be_user_total, 0, 0]
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCouponList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();

    query.select('.tab').boundingClientRect(function (rect) {
      console.log(rect.width)
      that.setData({
        tabWidth: rect.width,
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