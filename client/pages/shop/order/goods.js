// pages/shop/order/goods.js
import store from '../../../store/common'
import create from '../../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '', //共2件商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const {
      preData
    } = options

    if (preData) {
      const myPreData = JSON.parse(options.preData)
      // 普通商品
      const normalList = myPreData.filter(item => !item.activity_info.activity_id && !item.is_pre_sale)
      // 折扣商品
      const discountList = myPreData.filter(item => item.activity_info.activity_id || item.is_pre_sale)
      console.log(normalList)
      console.log(discountList)

      this.setData({
        navigationBarTitleText: `共${myPreData.length}件商品`,
        normalList,
        discountList
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