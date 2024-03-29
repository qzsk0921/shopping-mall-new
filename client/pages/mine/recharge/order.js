// pages/mine/recharge/order.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getOrderList,
  rePay
} from '../../../api/recharge'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的订单',
    tabbar: ['全部', '待付款', '充值成功', '充值关闭'],
    tabIndex: 0, //0全部 1待支付 2已支付 3已取消
    tabWidth: null,
    orderList: [{
      cache: [], //全部
      count: 1,
      total_page: 1,
    }, {
      cache: [], //待付款
      count: 1,
      total_page: 1,
    }, {
      cache: [
        // {
        //   "id": 14,
        //   "user_id": 1,
        //   "sn": "7895051333923597",
        //   "order_sn": "GOD202112186375",
        //   "pre_number": "PGOD202112188246",
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
        //   "create_time": 1639795631,
        //   "cancel_time": null,
        //   "is_delete": 0,
        //   "delete_time": 0,
        //   "goods_list": [{
        //       "id": 4,
        //       "order_id": 14,
        //       "goods_id": 2,
        //       "goods_name": "商品2",
        //       "market_price": "100.00",
        //       "price": "10.60",
        //       "is_pre_goods": 0,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 1,
        //       "unitName": null,
        //       "type": 1,
        //       "create_time": 1639795634,
        //       "activity_info": []
        //     },
        //     {
        //       "id": 5,
        //       "order_id": 14,
        //       "goods_id": 1,
        //       "goods_name": "商品1",
        //       "market_price": "990.00",
        //       "price": "350.00",
        //       "is_pre_goods": 1,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 2,
        //       "unitName": null,
        //       "type": 2,
        //       "create_time": 1639795634,
        //       "activity_info": []
        //     },{
        //       "id": 6,
        //       "order_id": 14,
        //       "goods_id": 2,
        //       "goods_name": "商品2",
        //       "market_price": "100.00",
        //       "price": "10.60",
        //       "is_pre_goods": 0,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 1,
        //       "unitName": null,
        //       "type": 1,
        //       "create_time": 1639795634,
        //       "activity_info": []
        //     }
        //   ]
        // },
        // {
        //   "id": 15,
        //   "user_id": 1,
        //   "sn": "7895051333959899",
        //   "order_sn": "GOD202112186771",
        //   "pre_number": "PGOD202112186211",
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
        //   "status": 2,
        //   "pay_time": 0,
        //   "pay_id": 1,
        //   "remark": "1",
        //   "address_id": 2,
        //   "create_time": 1639795770,
        //   "cancel_time": 1639805855,
        //   "is_delete": 0,
        //   "delete_time": 0,
        //   "goods_list": [{
        //       "id": 6,
        //       "order_id": 15,
        //       "goods_id": 2,
        //       "goods_name": "商品2",
        //       "market_price": "100.00",
        //       "price": "10.60",
        //       "is_pre_goods": 0,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 1,
        //       "unitName": null,
        //       "type": 1,
        //       "create_time": 1639795770,
        //       "activity_info": []
        //     },
        //     {
        //       "id": 7,
        //       "order_id": 15,
        //       "goods_id": 1,
        //       "goods_name": "商品1",
        //       "market_price": "990.00",
        //       "price": "350.00",
        //       "is_pre_goods": 1,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 2,
        //       "unitName": null,
        //       "type": 2,
        //       "create_time": 1639795770,
        //       "activity_info": []
        //     }
        //   ]
        // },
        // {
        //   "id": 16,
        //   "user_id": 1,
        //   "sn": "7895206314089268",
        //   "order_sn": "GOD202112183547",
        //   "pre_number": "PGOD202112186973",
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
        //   "status": 2,
        //   "pay_time": 0,
        //   "pay_id": 1,
        //   "remark": "1",
        //   "address_id": 2,
        //   "create_time": 1639806789,
        //   "cancel_time": 1639807350,
        //   "is_delete": 0,
        //   "delete_time": 0,
        //   "goods_list": [{
        //       "id": 8,
        //       "order_id": 16,
        //       "goods_id": 2,
        //       "goods_name": "商品2",
        //       "market_price": "100.00",
        //       "price": "10.60",
        //       "is_pre_goods": 0,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 1,
        //       "unitName": null,
        //       "type": 1,
        //       "create_time": 1639806789,
        //       "activity_info": []
        //     },
        //     {
        //       "id": 9,
        //       "order_id": 16,
        //       "goods_id": 1,
        //       "goods_name": "商品1",
        //       "market_price": "990.00",
        //       "price": "350.00",
        //       "is_pre_goods": 1,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 2,
        //       "unitName": null,
        //       "type": 2,
        //       "create_time": 1639806789,
        //       "activity_info": []
        //     }
        //   ]
        // },
        // {
        //   "id": 17,
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
        //   "goods_list": [{
        //       "id": 10,
        //       "order_id": 17,
        //       "goods_id": 2,
        //       "goods_name": "商品2",
        //       "market_price": "100.00",
        //       "price": "10.60",
        //       "is_pre_goods": 0,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 1,
        //       "unitName": "1/个",
        //       "type": 1,
        //       "create_time": 1639807355,
        //       "activity_info": []
        //     },
        //     {
        //       "id": 11,
        //       "order_id": 17,
        //       "goods_id": 1,
        //       "goods_name": "商品1",
        //       "market_price": "990.00",
        //       "price": "350.00",
        //       "is_pre_goods": 1,
        //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //       "goods_num": 2,
        //       "unit_id": 2,
        //       "unitName": "1/箱",
        //       "type": 2,
        //       "create_time": 1639807355,
        //       "activity_info": {
        //         "activity_id": 1,
        //         "activity_name": "新品上市",
        //         "short_name": "好",
        //         "type": 1,
        //         "start_time": 0,
        //         "end_time": 0
        //       }
        //     }
        //   ]
        // }
      ], //充值成功
      count: 1,
      total_page: 1
    }, {
      cache: [], //充值关闭
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        console.log(nv)
        this.getOrderList({
          status: this.parseStatus(nv)
        })
      },
      // immediate: true
    }
  },
  // 重新支付
  copyHandle(e) {
    const copy = e.target.dataset.copy
    this.copyToClipboard(copy)
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
  repayHandle(e) {
    const id = e.currentTarget.dataset.id

    rePay({
      order_id: id
    }).then(res => {
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
          url: `/pages/mine/recharge/orderDetail?order_id=${payModel.order_id}`,
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
          // url: `/pages/shop/order/detailOrder?order_id=${payModel.order_id}`,
        })
      }
    })
  },
  // 订单详情
  toOrderHandle(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mine/recharge/orderDetail?order_id=${id}`,
    })
  },
  parseStatus(tabIndex) {
    // “”:全部 0:待付款 1:充值成功 2:充值关闭
    let myStatus
    if (tabIndex == 0) {
      myStatus = ''
    } else if (tabIndex == 1) {
      myStatus = 0
    } else if (tabIndex == 2) {
      myStatus = 1
    } else if (tabIndex == 3) {
      myStatus = 2
    }

    return myStatus
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index
    }
    if (this.data.orderList[index].count > 1) {
      objData[[`orderList[${index}].count`]] = 1
    }
    this.setData(objData)
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let orderList = this.data.orderList

    if (orderList[this.data.tabIndex].count + 1 > orderList[this.data.tabIndex].total_page) return

    this.setData({
      [`orderList[${this.data.tabIndex}].count`]: ++orderList[this.data.tabIndex].count
    })

    this.getOrderList('scrollToLower')

  },
  getOrderList(dataObj) {
    const tempData = {
      page: this.data.orderList[this.data.tabIndex].count,
      page_size: this.data.page_size,
      status: this.parseStatus(this.data.tabIndex),
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }
    return new Promise((resolve, reject) => {
      getOrderList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.orderList[this.data.tabIndex].cache.push(...res.data.data)
          this.setData({
            [`orderList[${this.data.tabIndex}].cache`]: this.data.orderList[this.data.tabIndex].cache,
            [`orderList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          // console.log(this.data.orderList)
        } else {
          this.setData({
            // 测试数据
            // [`orderList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            [`orderList[${this.data.tabIndex}].cache`]: res.data.data,
            [`orderList[${this.data.tabIndex}].total_page`]: res.data.last_page,
            // tabbarNum: [res.data.be_user_total, 0, 0]
          })

          console.log(this.data.orderList)
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
    getApp().setWatcher(this) //设置监听器
    this.setData({
      tabIndex: 0
    })
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
      that.setData({
        tabHeight: rect.height,
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