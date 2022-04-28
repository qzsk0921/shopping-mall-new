// pages/mine/vip/vip.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  addVip,
  getVipInfo
} from '../../../api/vip'

import {
  getUserDetail
} from '../../../api/user.js'

import {
  preOrder
} from '../../../api/order'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '会员中心',
    vipData: null,
    currentVip: null
  },
  watch: {
    currentVipId: {
      handler(nv, ov, obj) {

      },
      // immediate: true
    }
  },
  toMyscoreHandle() {
    wx.navigateTo({
      url: '/pages/mine/vip/score',
    })
  },
  vipItemHandle(e) {
    if (e.target.dataset.item) {
      this.setData({
        currentVip: e.target.dataset.item,
      })
    }
  },
  // 去抽奖中心
  toLotteryHandle() {
    wx.navigateTo({
      url: '/pages/mine/lottery/lottery',
    })
  },
  certCheck() {
    // 若用户没有通过资质认证，显示弹窗如下图
    // 若用户资质认证已申请，待审核，提示弹窗如下图
    // -2:未申请 0:审核中 1:已通过 2:未通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    if (status != 1) {
      if (status === -2 || status === -1) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '请进行资质认证后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      } else if (status === 2) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '资质认证审核失败，请重新进行认证申请',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      } else if (status === 0) {
        this.setData({
          confirmTitle: '温馨提示',
          confirmContent: '资质认证审核中，请等待审核过后再开通会员',
          confirmBgColor: "#FF723A",
          confirmDialogVisibile: true
        })
      }
      return false
    }
    return true
  },
  // 弹窗提示的确认
  diaConfirmHandle() {
    // -2:未申请 0:审核中 1:已通过 2:未通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    // 跳转至进货申请
    // console.log('跳转至进货申请')
    if (status != 1) {
      wx.navigateTo({
        url: '/pages/mine/certification/certification',
      })
    }
  },
  getVipInfo(data) {
    return new Promise((resolve, reject) => {
      getVipInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  addVip(data) {
    return new Promise((resolve, reject) => {
      addVip(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  preOrder(data, load) {
    return new Promise((resolve, reject) => {
      preOrder(data, load).then(res => {
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

    this.getVipInfo().then(res => {
      let index = 0
      res.data.vip_list.some((item, idx) => {
        if (item.vip_level === res.data.user_vip.vip_level) {
          index = idx
          return true
        }
        return false
      })
      
      let dataset = {
        vipData: res.data,
        currentVip: res.data.vip_list[0],
        index
      }

      if (res.data.vip_list[index + 1]) {
        dataset.last_integral = res.data.vip_list[index + 1].integral_num - res.data.user.total_integral
      } else {
        dataset.last_integral = 0
      }

      this.setData(dataset)
    })
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