// pages/shop/order/detailOrder.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getOrderDetail,
  cancelOrder,
  delOrder,
  addOrder
} from '../../../api/order'
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '订单详情',
    orderData: {
      // "id": 17,
      //   "user_id": 1,
      //   "sn": "7895051314586266",
      //   "order_sn": "GOD202112187238",
      //   "pre_number": "PGOD202112181598",
      //   "transaction_no": null,
      //   "goods_money": "2180.00",
      //   "vip_id": 1,
      //   "coupon_id": 5,
      //   "vip_discount": "0.00",
      //   "coupon_discount": "10.00",
      //   "pay_money": "2170.00",
      //   "receiving_name": "黄5",
      //   "receiving_phone": "13559570108",
      //   "receiving_address": "行层追梦123432232",
      //   "status": 0,
      //   "pay_time": 0,
      //   "pay_id": 1,
      //   "remark": "1",
      //   "address_id": 2,
      //   "create_time": 1639807355,
      //   "cancel_time": null,
      //   "is_delete": 0,
      //   "delete_time": 0,
      //   "goods_list": [
      //       {
      //           "id": 10,
      //           "order_id": 17,
      //           "goods_id": 2,
      //           "goods_name": "商品2",
      //           "market_price": "100.00",
      //           "price": "10.60",
      //           "is_pre_goods": 0,
      //           "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //           "goods_num": 2,
      //           "unit_id": 1,
      //           "unitName": "1/个",
      //           "type": 1,
      //           "create_time": 1639807355,
      //           "activity_info": []
      //       },
      //       {
      //           "id": 11,
      //           "order_id": 17,
      //           "goods_id": 1,
      //           "goods_name": "商品1",
      //           "market_price": "990.00",
      //           "price": "350.00",
      //           "is_pre_goods": 1,
      //           "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //           "goods_num": 2,
      //           "unit_id": 2,
      //           "unitName": "1/箱",
      //           "type": 2,
      //           "create_time": 1639807355,
      //           "activity_info": {
      //               "activity_id": 1,
      //               "activity_name": "新品上市",
      //               "short_name": "好",
      //               "type": 1,
      //               "start_time": 0,
      //               "end_time": 0
      //           }
      //       }
      //   ]
    }
  },
  // 进入订单商品页面
  toOrderGoodsHandle() {
    const preData = JSON.stringify(this.data.orderData.goods_list)

    wx.navigateTo({
      url: `/pages/shop/order/goods?preData=${preData}`,
    })
  },
  // 取消订单 删除订单
  delOrderHandle(e) {
    const myOrderData = this.data.orderData
    // 0:待支付 1:已支付 2:已取消
    if (myOrderData.status === 0) {
      this.cancelOrder({
        order_id: myOrderData.id
      }).then(res => {
        wx.showToast({
          icon: 'none',
          title: '取消成功',
        })

        // toast结束后 返回上一个页面
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 500)
      })
    } else {
      this.delOrder({
        order_id: myOrderData.id
      }).then(res => {
        wx.showToast({
          icon: 'none',
          title: '删除成功',
        })

        // toast结束后 返回上一个页面
        setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
        }, 500)

      })
    }
  },
  // 立即支付 再来一单
  payOrderHandle(e) {
    // console.log(e)
    const myOrderData = this.data.orderData

    if (myOrderData.status === 0) {
      // 去支付
      let orderData = {
        shop_id: myOrderData.shop_id,
        address_id: myOrderData.address_id,
        goods: myOrderData.goods_list,
      }

      if (myOrderData.coupon_id) {
        // 使用优惠券
        orderData.is_use_coupon = 1
        orderData.coupon_id = myOrderData.coupon_id
      } else {
        // 不使用优惠券
        orderData.is_use_coupon = 0
      }

      this.addOrder(orderData).then(res => {
        console.log(res)
        // 调起微信支付
        this.wxPay(res.data)
      })
    } else {
      // 再来一单点击，跳转至分类页面
      wx.switchTab({
        url: '/pages/category/category',
      })
    }
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
        // 支付成功后，返回个人中心，刷新个人中心页面
        wx.switchTab({
          url: '/pages/profile/profile',
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
      }
    }).catch(res => {
      console.log(res)
    })
  },
  // 复制订单编号
  copyHandle() {
    this.copyToClipboard(this.data.orderData.order_sn)
  },
  // 复制到剪贴板
  copyToClipboard(data) {
    wx.setClipboardData({
      data,
      success: (res) => {
        wx.showToast({
          title: '复制到剪贴板',
          icon: 'none'
        })
      },
    })
  },
  cancelOrder(data) {
    return new Promise((resolve, reject) => {
      cancelOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delOrder(data) {
    return new Promise((resolve, reject) => {
      delOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
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
  getOrderDetail(data) {
    return new Promise((resolve, reject) => {
      getOrderDetail(data).then(res => {
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
    const {
      order_id
    } = options

    if (order_id) {
      this.getOrderDetail({
        order_id
      }).then(res => {
        this.setData({
          orderData: res.data
        })
      })
    }
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