// pages/mine/wallet/withdrawRecord.js
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
    navigationBarTitleText: '提现记录',

    page: 1,
    page_size: 5,
    withdrawData: {
      count: 1,
      total_page: 1,
      cache: [
        {
          "id": 14,
          price: 320.21,
          date: '2022-12-15 13:52:32提现',
          status: 1,
          remark: '驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因'
        },
        {
          "id": 15,
          price: 320.21,
          date: '2022-12-15 13:52:32提现',
          status: 2,
          remark: '驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因驳回原因'
        },
        {
          "id": 16,
          price: 320.21,
          date: '2022-12-15 13:52:32提现',
          status: 3,
          remark: ''
        },
        {
          "id": 17,
          price: 320.21,
          date: '2022-12-15 13:52:32提现',
          status: 4,
          remark: ''
        }
      ]
    },
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
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
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