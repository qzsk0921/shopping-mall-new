// pages/shop/coupon/coupon.js
// 优惠券选择页面
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getMyCouponList,
} from '../../../api/coupon'
// import {
//   deepClone
// } from '../../../utils/util'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '选择优惠券',
    //优惠券列表数据
    couponList: {
      cache: [],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  // 单选
  // radioboxChange: function (e) {
  //   console.log('radiobox发生change事件，携带value值为：', e.detail.value)

  //   const id = e.detail.value

  //   // 来自确认订单页使用我的地址
  //   const pages = getCurrentPages();
  //   const prevPage = pages[pages.length - 2]; //上一个页面
  //   //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
  //   this.data.couponList.cache.some(item => {
  //     if (item.id == id) {
  //       if (this.data.currentCouponId === id) {
  //         // 已选中变没选
  //         prevPage.setData({
  //           currentCouponId: 0,
  //           'orderData.coupon_discount_total': 0
  //         })
  //       } else {
  //         // 没选变选中
  //         prevPage.setData({
  //           currentCouponId: item.id,
  //           'orderData.coupon_discount_total': item.discount
  //         })
  //       }

  //       wx.navigateBack({
  //         delta: 0,
  //       })
  //       return true
  //     }
  //     return false
  //   })
  // },
  radioChangeHandle(e) {
    const myItem = e.currentTarget.dataset.item

    if (!myItem.is_can_use) return
    // 来自确认订单页使用我的地址
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    const prevPageData = prevPage.data.orderData

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    this.data.couponList.cache.some(item => {
      if (item.id == myItem.id) {
        if (this.data.currentCouponId == item.id) {
          // 已选中变没选
          this.setData({
            currentCouponId: 0
          })
          prevPage.setData({
            currentCouponId: 0,
            'orderData.coupon_discount_total': 0,
            'orderData.price_total': this.toFixed(prevPageData.market_price_total, prevPageData.vip_discount_total, 2), //底部待支付金额
            'orderData.discount_total': prevPageData.vip_discount_total //底部已优惠金额
          })
        } else {
          // 没选变选中
          prevPage.setData({
            currentCouponId: item.id,
            'orderData.coupon_discount_total': item.discount,
            'orderData.price_total': this.toFixed(prevPageData.market_price_total, item.discount, 2), //底部待支付金额
            'orderData.discount_total': item.discount //底部已优惠金额
          })
          wx.navigateBack({
            delta: 0,
          })
        }
        return true
      }
      return false
    })
  },
  // 处理精度
  toFixed(n1, n2, type) {
    if (type == 1) {
      // 加
      return (n1 * 100 + n2 * 100) / 100
    } else if (type == 2) {
      // 减
      return (n1 * 100 - n2 * 100) / 100
    }
  },
  // 过滤出首先可用的优惠券id
  checkedCheck(couponList) {
    for (var i = 0; i < couponList.length; i++) {
      if (couponList[i].is_can_use) {
        this.setData({
          currentCouponId: couponList[i].id
        })
        console.log(this.data.currentCouponId)
        return false
      }
    }
  },
  getMyCouponList(dataObj) {

    let tempData = {
      page: this.data.couponList.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        if (typeof tempData[key] === 'object') {
          deepClone(tempData[key])
        }
        return tempData[key] = dataObj[key]
      })
      // tempData = Object.assign(
      //   tempData,
      //   dataObj
      // )
    }

    return new Promise((resolve, reject) => {
      getMyCouponList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.couponList.cache.push(...res.data.data)
          this.setData({
            'couponList.cache': this.data.couponList.cache,
            'couponList.total_page': res.data.last_page
          })
          resolve(res)

          console.log(this.data.couponList)
        } else {
          this.setData({
            // 测试数据
            // [`couponList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            'couponList.cache': res.data.data,
            'couponList.total_page': res.data.last_page
          })
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 滚动到最底部
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    const couponList = this.data.couponList

    if (couponList.count + 1 > couponList.total_page) return

    this.setData({
      'couponList.count': ++couponList.count
    })
    this.getMyCouponList('scrollToLower')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      preData,
      currentCouponId
    } = options

    if (preData) {
      const preData = JSON.parse(options.preData)
      // console.log(preData)
      this.getMyCouponList(preData).then(res => {
        if (currentCouponId != 'undefined') {
          this.setData({
            currentCouponId
          })
        } else {
          // 开始就选
          // this.checkedCheck(res.data.data)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

    if (this.data.currentCouponId) {
      console.log('have a currentCouponId yet')
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