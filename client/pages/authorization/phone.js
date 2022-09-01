// pages/authorization/phone.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  updatePhone
} from '../../api/user'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    is_select: 0, //协议
  },
  // 选择阅读协议
  agreementHandle() {
    this.setData({
      is_select: !this.data.is_select
    })
  },
  protocolHandle(e) {
    // 隐私协议10，用户协议9，关于我们7
    if (e.target.dataset.id) {
      const id = e.target.dataset.id
      // 借faq页面一用
      wx.navigateTo({
        url: `/pages/mine/faq/detail?id=${id}`,
      })
    }
  },
  getPhoneNumber(e) {
    if (!this.data.is_select) {
      wx.showToast({
        icon: 'none',
        title: '请阅读并同意用户协议与隐私政策',
      })
      return false
    }

    console.log(e)
    if (e.detail.encryptedData) {
      const myData = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
      }
      if (this.store.data.sale_id) {
        myData.sale_id = this.store.data.sale_id
      }
      this.updatePhone(myData).then(res => {
        // const data = res.data.phone
        // 1. 授权微信信息
        // 2. 授权手机号
        // 3. 进入成为会员页面（ 赠送1次抽奖机会）
        this.store.data.userInfo['phone'] = res.data.phone
        this.update()
        wx.redirectTo({
          // url: '/pages/profile/profile',
          url: `/pages/mine/vip/createVip?vip_name=${res.data.vip_name}`
        })
      }).catch(res => {
        wx.showToast({
          icon: 'none',
          title: res.msg,
        })
        console.log(res)
      })
    } else {
      wx.switchTab({
        url: '/pages/profile/profile',
      })
      // wx.showModal({
      //   content: '为便于商家服务需要您进行手机号授权',
      //   confirmText: '确定',
      //   confirmColor: '#4283FB',
      //   showCancel: false,
      //   success(res) {
      //     if (res.confirm) {
      //       console.log('确定')
      //     } else if (res.cancel) {
      //       console.log('取消')
      //     }
      //   }
      // })
    }
  },
  // 拒绝 返回顶级页面
  rejectHandle() {
    
    wx.switchTab({
      url: '/pages/index/index',
    })
    // wx.navigateBack({
    //   delta: 1,
    //   fail(err) {
    //     console.log(err)
    //     wx.switchTab({
    //       url: '/pages/index/index',
    //     })
    //   }
    // })
  },
  updatePhone(data) {
    return new Promise((resolve, reject) => {
      updatePhone(data).then(res => {
        resolve(res)
      }).catch(res => {
        reject(res)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().getSettingCallback = (setting) => {
      this.setData({
        setting
      })
      this.store.data.setting = setting
      this.update()
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
    if (!this.data.setting) {
      this.setData({
        setting: this.store.data.setting
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