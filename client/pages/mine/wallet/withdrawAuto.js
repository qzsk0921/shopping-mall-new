// pages/mine/wallet/withdrawAuto.js
import store from '../../../store/common'
import create from '../../../utils/create'

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
        priceStr: '10元'
      },
      {
        id: 2,
        priceStr: '50元'
      },
      {
        id: 3,
        priceStr: '100元'
      },
      {
        id: 4,
        priceStr: '500元'
      },
      {
        id: 5,
        priceStr: '1000元'
      },
      {
        id: 6,
        priceStr: '自定义'
      },
    ],
    currentWithdrawId: 1 //当前提现id
  },
  // 选择金额或自定义
  changeHandle(e) {
    const currentWithdrawId = e.currentTarget.dataset.id
    if (this.data.currentWithdrawId === currentWithdrawId) return
    this.setData({
      currentWithdrawId
    })
  },
  // 提现
  withdrawHandle() {
    
  },
  // 输入金额
  inputHandle(e) {
    console.log(e.detail)
    this.data.customPrice = e.detail.value
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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