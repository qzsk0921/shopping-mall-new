// pages/couponCenter/couponCenter.js
import store from '../../store/common'
import create from '../../utils/create'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '领券中心',
    tabbar: ['未使用', '已使用', '已过期'],
    tabbarNum: [99, 0, 0],
    tabIndex: 0,
    tabWidth: null,
    couponList: [{
      couponCache: [
      //   {
      //   price: 50,
      //   condition: '满99可用',
      //   tit: '优惠券标题',
      //   tip: '酒水牛奶不可用',
      //   timeStr: '2021/3/21至2021/12/31',
      //   status: 1
      // }, {
      //   price: 50,
      //   condition: '满99可用',
      //   tit: '优惠券标题',
      //   tip: '酒水牛奶不可用',
      //   timeStr: '2021/3/21至2021/12/31',
      //   status: 2
      // }, {
      //   price: 50,
      //   condition: '满99可用',
      //   tit: '优惠券标题',
      //   tip: '酒水牛奶不可用',
      //   timeStr: '2021/3/21至2021/12/31',
      //   status: 3
      // }
    ], //couponNouseCache 未使用
      count: 1,
      total_page: 1,
    }, {
      couponCache: [], //couponUsedCache 已使用
      count: 1,
      total_page: 1
    }, {
      couponCache: [], //couponExpiredCache 已过期
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
  },
  changeTab(e) {
    // console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
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