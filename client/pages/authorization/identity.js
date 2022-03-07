// pages/authorization/identity.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  updateUserInfo
} from '../../api/user'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    canIUseGetUserProfile: false,

    userInfo: null,
  },
  getUserProfile() {
    // userStore.getUserProfile().then(res => {
    //   // console.log(res)
    //   this.setData({
    //     ...res
    //   })
    // })

    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        // this.store.data.userInfo = res.userInfo
        this.store.data.userInfo['avatarUrl'] = res.userInfo.avatarUrl
        this.store.data.userInfo['city'] = res.userInfo.city
        this.store.data.userInfo['country'] = res.userInfo.country
        this.store.data.userInfo['gender'] = res.userInfo.gender
        this.store.data.userInfo['language'] = res.userInfo.language
        this.store.data.userInfo['nickName'] = res.userInfo.nickName
        this.store.data.userInfo['province'] = res.userInfo.province
        this.update()

        // 上传用户信息
        updateUserInfo(res.userInfo).then(res => {
          console.log(res.msg)
          wx.redirectTo({
            url: '/pages/authorization/phone',
          })
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  // 拒绝授权
  cancelHandle() {
    wx.navigateBack({
      delta: 0,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
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