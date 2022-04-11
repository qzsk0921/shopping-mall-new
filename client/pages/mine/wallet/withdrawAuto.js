// pages/mine/wallet/withdrawAuto.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getWithdrawInfo,
  createWithdraw
} from '../../../api/wallet'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: '',
    navigationBarTitleText: '钱包',
    withdrawArr: [{
        id: 1,
        priceStr: '10元',
        price: 10
      },
      {
        id: 2,
        priceStr: '50元',
        price: 50
      },
      {
        id: 3,
        priceStr: '100元',
        price: 100
      },
      {
        id: 4,
        priceStr: '500元',
        price: 500
      },
      {
        id: 5,
        priceStr: '1000元',
        price: 1000
      },
      {
        id: 6,
        priceStr: '自定义',
        price: ''
      },
    ],
    currentWithdrawId: 1, //当前提现id
    withdrawData: {
      // "type": "1",
      // "commission_money": "100.00",
      // "lucky_money": "50.00",
      // "shop_info": {
      //   "name": "厦门会展中心",
      //   "leader_phone": "13559570109",
      //   "wx_code": "https://retailers-qn.xcmbkj.com/admin/shop/shop_adm_2022-03-115828.jpg",
      //   "address": "福建省厦门市思明区软件园二期望海路10号楼之二,302-1室",
      //   "latitude": 24.488806,
      //   "longitude": 118.182724,
      //   "wx_pay_id": 1
      // }
    }
  },
  watch: {
    currentWithdrawId: {
      handler(nv, ov, obj) {
        // console.log(nv)
        this.data.withdrawArr.some(item => {
          if (item.id === nv) {
            this.data.money = item.price
          }
        })
      },
      // immediate: true
    },
  },
  // 选择金额或自定义
  changeHandle(e) {
    const item = e.currentTarget.dataset.item
    if (this.data.currentWithdrawId === item.id) return

    this.setData({
      currentWithdrawId: item.id
    })
  },
  // 提现申请
  withdrawHandle() {
    if (!this.data.money) {
      wx.showToast({
        title: '请输入正确的金额',
        icon: 'none'
      })
      return
    }

    // idx 0佣金 1幸运奖
    this.createWithdraw({
      type: 1 + Number(this.data.idx),
      money: this.data.money
    })
  },
  // 输入金额
  inputHandle(e) {
    // console.log(e.detail)
    this.data.money = e.detail.value
  },
  getWithdrawInfo(data) {
    return new Promise((resolve, reject) => {
      getWithdrawInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  createWithdraw(data) {
    return new Promise((resolve, reject) => {
      createWithdraw(data).then(res => {
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

    this.setData({
      currentWithdrawId: 1
    })

    if (options.idx) {
      // idx 0佣金 1幸运奖
      this.setData({
        idx: options.idx
      })
    }

    this.getWithdrawInfo().then(res => {
      this.setData({
        withdrawData: res.data
      })
    })
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