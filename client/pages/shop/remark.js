// pages/shop/remark.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getRemarkList
} from '../../api/order'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '备注',

    prepareList: [],
    currentCount: 0,
    content: ''
  },
  submitHandle() {
    // 在提交成功后，返回上一页（带上参数）
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      remark: this.data.content
    })

    wx.navigateBack({
      delta: 0,
    })
  },
  inputHandle(e) {
    // console.log(e)
    let content = e.detail.value
    let len = e.detail.value.length

    if (len > 100) {
      len = 100
      content = this.data.content.slice(0, 100)
    }

    this.setData({
      currentCount: len,
      content
    })
  },
  remarkFillHandle(e) {
    const data = e.target.dataset.text

    // 100字以内
    if ((this.data.content + data).length > 100) return

    this.setData({
      currentCount: (this.data.content + data).length,
      content: this.data.content + data
    })
  },

  getRemarkList(data) {
    return new Promise((resolve, reject) => {
      getRemarkList(data).then(res => {
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
    // 备注回填
    const {
      remark
    } = options
    if (remark) {
      this.setData({
        content: remark
      })
    }

    this.getRemarkList().then(res => {
      this.setData({
        prepareList: res.data
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