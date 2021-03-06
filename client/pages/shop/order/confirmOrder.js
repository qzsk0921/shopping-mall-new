// pages/shop/confirmOrder.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  addOrder,
  rePay,
  preOrder
} from '../../../api/order'

import {
  getAddressList,
} from '../../../api/location'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    loaded: false,
    delivery_type: null, // 1:送货上门 2:到店消费
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '订单确认',

    orderData: {
      // "market_price_total": 400,
      // "vip_discount_total": 400,
      // "coupon_discount_total": 0,
      // "discount_total": 400,
      // "price_total": 0.01,
      // "goods_list": [{
      //     "id": 2,
      //     "is_pre_sale": 1,
      //     "goods_name": "商品2",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "status": 1,
      //     "spec": "",
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "stock": 0,
      //     "activity_info": [],
      //     "cart_number": "2",
      //     "unit_id": "1",
      //     "type": "1",
      //     "unitName": "1/",
      //     "is_stock": 1
      //   },
      //   {
      //     "id": 1,
      //     "is_pre_sale": 0,
      //     "goods_name": "商品1",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "status": 1,
      //     "spec": "",
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "stock": 0,
      //     "activity_info": [],
      //     "cart_number": "2",
      //     "unit_id": "2",
      //     "type": "2",
      //     "unitName": "1/",
      //     "is_stock": 1
      //   }
      // ]
    },

    remark: '',
  },
  // 拨打电话
  callHandle(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.orderData.shop_info.leader_phone,
    })
  },
  // 查看地址
  addressHandle() {
    wx.openLocation({
      // latitude: 24.44579,
      // longitude: 118.08243
      latitude: this.data.orderData.shop_info.latitude,
      longitude: this.data.orderData.shop_info.longitude
    })
  },
  // 进入我的收货地址页面
  toAddressHandle() {
    wx.navigateTo({
      url: '/pages/location/index/index?from=confirmOrder_of_mine',
    })
  },
  // 进入订单商品页面
  toOrderGoodsHandle() {
    const preData = JSON.stringify(this.data.orderData.goods_list)

    wx.navigateTo({
      url: `/pages/shop/order/goods?preData=${preData}`,
    })
  },
  // 进入优惠券选择页面
  toCouponSelectHandle() {
    let myData = {
      type: 0, //‘’:全部 0:待使用 1:已使用 -2:已过期
      goods: []
    }

    this.data.orderData.goods_list.forEach(item => {
      const temp = {
        "goods_id": item.id,
        "goods_num": item.cart_number,
        "type": item.type,
        "is_pre_goods": item.is_pre_sale,
        "unit_id": item.unit_id
      }

      myData.goods.push(temp)
    })

    const myDataStr = JSON.stringify(myData)
    wx.navigateTo({
      url: `/pages/shop/coupon/coupon?preData=${myDataStr}&currentCouponId=${this.data.currentCouponId}`,
    })
  },
  // 进入备注页面
  toRemarkHandle() {
    wx.navigateTo({
      url: `/pages/shop/remark?remark=${this.data.remark}`,
    })
  },
  // 开通和续费的vip相关处理
  vipHandle() {
    // 1.点击立即开通、立即续费，跳转至会员中心页面
    // 2.若用户是未开通的用户，开通后，返回订单确认页面后，去支付样式需
    // if (this.data.userInfo.is_vip) {
    //   wx.navigateTo({
    //     url: '/pages/mine/vip/vip',
    //   })
    // } else {
    // }
    wx.navigateTo({
      url: '/pages/mine/vip/vip'
    })
  },
  // 去支付
  payHandle() {
    // 1. 调用微信支付
    // 1.1 支付成功后， 返回个人中心， 刷新个人中心页面
    // 1.2 支付失败， toast: 失败原因
    // 失败原因情况： 1.2 .1.取消支付 1.2 .2.后台原因（ 根据后台返回的原因进行toast）
    // 3. 用户未选择地址时， 点击去支付， toast： 请选择收货地址
    if (!this.store.data.address_id && this.data.delivery_type == 1) {
      wx.showToast({
        icon: 'none',
        title: '请选择收货地址',
      })
      return false
    }

    let orderData = {
      // shop_id: this.store.data.shop_id,
      address_id: this.store.data.address_id,
      goods: [],
      remark: this.data.remark
    }

    if (this.data.currentCouponId) {
      // 使用优惠券
      orderData.is_use_coupon = 1
      orderData.coupon_id = this.data.currentCouponId
    } else {
      // 不使用优惠券
      orderData.is_use_coupon = 0
    }

    // 参与拼团
    if (this.data.orderData.goods_group_bargaining_team_id) {
      orderData.goods_group_bargaining_team_id = this.data.orderData.goods_group_bargaining_team_id
    }

    this.data.orderData.goods_list.forEach(item => {
      const temp = {
        "goods_id": item.id,
        "goods_num": item.cart_number,
        "is_pre_goods": item.is_pre_sale,
        "attribute_value_str": item.attribute_value_str
      }
      orderData.goods.push(temp)
    })

    this.addOrder(orderData).then(res => {
      console.log(res)
      this.data.order_id = res.data.order_id
      // 支付金额为0元时，可直接支付成功进入订单详情页，无需调起支付
      if (res.data.pay_status === 1) {
        wx.navigateTo({
          url: `/pages/shop/order/detailOrder?order_id=${res.data.order_id}`,
        })
      }
      // 调起微信支付
      this.wxPay(res.data)
    })
  },
  // 微信支付
  wxPay(payModel) {
    wx.requestPayment({
      'timeStamp': payModel.timeStamp.toString(),
      'nonceStr': payModel.nonceStr,
      'package': 'prepay_id=' + payModel.prepay_id, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
      'signType': payModel.signType,
      'paySign': payModel.paySign,
      'success': function (res) {
        console.log(res)
        // 支付成功后，杀掉订单确认页，刷新个人中心页面
        // wx.switchTab({
        //   url: '/pages/profile/profile',
        // })

        wx.navigateTo({
          url: `/pages/shop/order/detailOrder?order_id=${payModel.order_id}`,
        })

        // 获取消息下发权限(只在支付回调或tap手势事件能调用)
        // wx.requestSubscribeMessage({
        //   tmplIds: ['mtwGRB07oFL2fJgoiIipKVCYFFHS0vytiw2rTHqtAz8', 'gB9gMYOrOkLl-yTHdBP5vUS5rgwsTW1hjUYNml-57Go'],
        //   success(res) {},
        //   fail(err) {
        //     console.log(err)
        //   },
        //   complete() {
        //     // console.log("dasda", payModel.package.substr(10))
        //     that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
        //   }
        // })
      },
      'fail': function (res) {
        const msg = res.errMsg == 'requestPayment:fail cancel' ? '取消支付' : res.errMsg
        wx.showToast({
          title: msg,
          icon: 'none'
        })

        console.log(res)
        wx.navigateTo({
          url: `/pages/shop/order/detailOrder?order_id=${payModel.order_id}`,
        })
      }
    })
  },

  addOrder(data) {
    return new Promise((resolve, reject) => {
      addOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  rePay(data) {
    return new Promise((resolve, reject) => {
      rePay(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  preOrder(data) {
    return new Promise((resolve, reject) => {
      preOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.data.loaded = true
    this.data.orderParam = getApp().globalData.orderData

    const {
      preData,
      delivery_type
    } = options

    if (preData) {
      const preData = JSON.parse(options.preData)
      this.setData({
        orderData: preData
      })
    }

    if (delivery_type) {
      this.setData({
        delivery_type
      })
      console.log(this.data.delivery_type)
    } else {
      // 购物车肯定是送货上门
      this.setData({
        delivery_type: 1
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
    if (!this.data.loaded) {
      this.preOrder(this.data.orderParam).then(res => {
        this.setData({
          orderData: res.data
        })
      }).catch(err => {
        console.log(err)
        // if (err.msg === '地址不存在') {
        //   wx.removeStorageSync('address_id')
        //   this.confirmationOrderHandle()
        // }
      })
    }


    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }

    // 修改地址等信息
    if (this.data.shopAddress) {
      console.log(this.data.shopAddress)
      this.setData({
        'orderData.address_info': this.data.shopAddress
      })
    }

    // 如果有本地缓存的id匹配地址
    if (this.store.data.address_id) {
      getAddressList().then(res => {
        this.setData({
          'orderData.address_info': res.data.data.filter(item => item.id === this.store.data.address_id)[0]
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
    this.data.loaded = false
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