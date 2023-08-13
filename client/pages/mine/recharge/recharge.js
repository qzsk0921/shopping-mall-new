// pages/mine/recharge/recharge.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getRechargeInfo,
  addPayorder
} from '../../../api/recharge'


let aBroadcast = wx.createAnimation({
  duration: 500,
  timingFunction: 'linear',
  delay: 3000
})

let reABroadcast = wx.createAnimation({
  duration: 0,
  timingFunction: 'linear',
  delay: 0
})

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '话费充值',
    aBroadcast: null, //广播动画
    curTab: 'yidong', //当前运营商
    // curCardId: null, //当前套餐
    curCard: null, //当前套餐对象
    curReadStatus: false, //当前阅读状态
    tabs: [{
        name: '中国移动',
        image: '中国移动.png',
        key: 'yidong',
      },
      {
        name: '中国联通',
        image: '中国联通.png',
        key: 'liantong',
      },
      {
        name: '中国电信',
        image: '中国电信.png',
        key: 'dianxin',
      }
    ],
    rechargeDetail: {
      phone: '', //手机号,
    },
    dialog: {
      dropdown: {
        open: 0
      },
      confirm: 0
    }
  },
  watch: {
    curTab: {
      handler(nv, ov, obj) {
        console.log(nv)
        this.setData({
          curCardId: this.data.recharge_info.recharge_list[nv].list[0].id
        })
      },
      // deep: true,
      // immediate: true
    }
  },
  toOrderDetailHandle() {
    wx.navigateTo({
      url: '/pages/mine/recharge/order',
    })
  },
  // 创建订单
  addPayorder() {
    addPayorder({
      phone: this.data.rechargeDetail.phone,
      recharge_id: ''
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

        // wx.navigateTo({
        //   url: `/pages/shop/order/detailOrder?order_id=${payModel.order_id}`,
        // })

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
  // 关闭购物车弹窗
  rechargeDropdownMaskTap() {
    this.setData({
      'dialog.dropdown.open': 0,
    })
  },
  // 关闭引导充值弹窗
  rechargeConfirmVisibleHandle(e) {
    // console.log(e)
    this.setData({
      'dialog.confirm': 0,
      'dialog.dropdown.open': 1,
    })
  },
  // 充值
  formSubmit(e) {
    console.log(e)
    const formdata = e.detail.value
    if (!formdata.phone) {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return
    } else {
      this.setData({
        'rechargeDetail.phone': formdata.phone
      })
    }
    if (!this.data.curReadStatus) {
      wx.showToast({
        title: '阅读并勾选充值须知',
        icon: 'none'
      })
      return
    }

    this.setData({
      'dialog.confirm': 1
    })
  },
  // 充值须知
  checkboxChange(e) {
    console.log(e)
    this.setData({
      curReadStatus: !this.data.curReadStatus
    })
  },
  // 套餐
  changeCardHandle(e) {
    this.setData({
      // curCardId: e.currentTarget.dataset.item.id,
      curCard: e.currentTarget.dataset.item
    })
  },
  // 运营商
  tabToggleHandle(e) {
    // console.log(e)
    this.setData({
      curTab: e.currentTarget.dataset.item.key
    })
  },
  startABroadcast() {
    console.log('startABroadcast')
    // 公告只有1条不做动画
    if (this.data.recharge_info.notice_list.length < 2) {
      return
    }

    this.data.aBroadcastCount += 1
    aBroadcast.translateY(-((this.data.aBroadcastCount - 1) * this.data.broadcastH)).step()

    this.setData({
      aBroadcast: aBroadcast.export(),
    })
  },

  aBroadcastEnd() {
    console.log('aBroadcastEnd')
    if (this.data.aBroadcastCount === this.data.recharge_info.notice_list.length) {

      this.data.aBroadcastCount = 1

      reABroadcast.translateY(0).step()
      this.setData({
        aBroadcast: reABroadcast.export(),
      })
      this.startABroadcast()
    } else {
      this.startABroadcast()
    }
  },
  getRechargeInfo() {
    return new Promise((resolve, reject) => {
      getRechargeInfo().then(res => {
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
    getApp().setWatcher(this) //设置监听器
    const that = this;
    const query = wx.createSelectorQuery();

    this.getRechargeInfo().then(res => {
      this.setData({
        recharge_info: res.data,
        curCard: res.data.recharge_list[that.data.curTab].list[0]
        // curCardId: res.data.recharge_list[that.data.curTab].list[0].id,
      })

      query.select('.broadcast').boundingClientRect(function (rect) {
        that.data.broadcastH = rect.height
        that.startABroadcast()
      }).exec()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // const that = this;

    // const query = wx.createSelectorQuery();
    // query.select('.broadcast').boundingClientRect(function (rect) {
    //   that.data.broadcastH = rect.height
    //   that.startABroadcast()
    // }).exec()

    // const query = wx.createSelectorQuery();
    // // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   // console.log(rect)
    //   that.setData({
    //     fixed: rect.height,
    //   })
    // }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 兼容广播
    this.setData({
      aBroadcastCount: 1
    })

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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    reABroadcast.translateY(0).step()
    this.setData({
      aBroadcast: reABroadcast.export(),
    })
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