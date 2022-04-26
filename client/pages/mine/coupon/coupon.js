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
        // {
        //   "id": 5,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "100.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866819,
        //   "update_time": 0,
        //   "is_can_use": 1
        // },
        // {
        //   "id": 6,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866820,
        //   "update_time": 0,
        //   "is_can_use": 0
        // },
        // {
        //   "id": 7,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 1,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866914,
        //   "update_time": 0,
        //   "is_can_use": 1
        // },
        // {
        //   "id": 5,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "100.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866819,
        //   "update_time": 0,
        //   "is_can_use": 1
        // },
        // {
        //   "id": 6,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866820,
        //   "update_time": 0,
        //   "is_can_use": 0
        // },
        // {
        //   "id": 7,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 1,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866914,
        //   "update_time": 0,
        //   "is_can_use": 1
        // }, {
        //   "id": 5,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "100.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866819,
        //   "update_time": 0,
        //   "is_can_use": 1
        // },
        // {
        //   "id": 6,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 0,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866820,
        //   "update_time": 0,
        //   "is_can_use": 0
        // },
        // {
        //   "id": 7,
        //   "user_id": 1,
        //   "coupon_name": "优惠券3",
        //   "coupon_id": 3,
        //   "money_limit": "20.00",
        //   "discount": "10.00",
        //   "is_all_goods": 1,
        //   "start_time": 1638859064,
        //   "end_time": 1658859064,
        //   "content": "优惠内容",
        //   "status": 0,
        //   "order_id": null,
        //   "create_time": 1638866914,
        //   "update_time": 0,
        //   "is_can_use": 1
        // }
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
  toCouponHandle() {
    // 授权校验
    if (!this.checkAuth()) return
    // 资质校验
    // if (!this.certCheck()) return

    wx.navigateTo({
      url: '/pages/mine/coupon/center',
    })
  },
  touchMove(e) {
    // console.log('touchMove')
    let {
      shrink
    } = this.data
    if (!shrink) this.setData({
      shrink: true
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(res => {
      this.setData({
        shrink: false
      })
      clearTimeout(this.timer)
    }, 400)
  },
  checkAuth() {
    if (!this.store.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.store.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  // 资质认证检查
  certCheck() {
    // 若用户没有通过资质认证，显示弹窗如下图
    // 若用户资质认证已申请，待审核，提示弹窗如下图
    // -2:未申请 0:审核中 1:已通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    if (status != 1) {
      // wx.showToast({
      //   icon: 'none',
      //   title: '请先到【个人中心】-【资质认证】提交认证',
      // })
      if (status === -2 || status === 2 || status === -1) {
        // this.setData({
        //   confirmTitle: '温馨提示',
        //   confirmContent: '请进行资质认证后再开通会员',
        //   confirmBgColor: "#FF723A",
        //   confirmDialogVisibile: true,
        //   confirmText: '确定'
        // })
        wx.showToast({
          icon: 'none',
          title: '请先到【个人中心】-【资质认证】提交认证',
        })
      } else if (status === 0) {
        // this.setData({
        //   confirmTitle: '温馨提示',
        //   confirmContent: '资质认证审核中，请等待审核过后再开通会员',
        //   confirmBgColor: "#FF723A",
        //   confirmDialogVisibile: true,
        //   confirmText: '确定'
        // })
        wx.showToast({
          icon: 'none',
          title: '正在审核当中，加急请联系2085025',
        })
      }
      return false
    }
    return true
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    const objData = {
      tabIndex: index
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

    // 把tabindex 2 转成参数需要的 -2
    tempData.type = this.data.tabIndex === 2 ? -2 : this.data.tabIndex

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
          console.log(this.data.couponList[this.data.tabIndex].cache)
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

  },
})