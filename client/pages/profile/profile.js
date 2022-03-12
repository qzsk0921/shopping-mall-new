// pages/profile/profile.js
import {
  setTabBar
} from '../../utils/business'

import store from '../../store/common'
import create from '../../utils/create'

import {
  getUserDetail,
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

    options: [{
        id: 1,
        value: 0,
        name: '我的收藏',
        url: '/pages/mine/collection/collection?from=mine'
      },
      {
        id: 2,
        value: 0,
        name: '浏览记录',
        url: '/pages/mine/history/history?from=mine'
      }
    ],
    options1: [{
        id: 1,
        imgName: 'my_order_all',
        name: '全部订单',
        url: '/pages/shop/order/myOrder?from=mine&type=0'
      },
      {
        id: 2,
        imgName: 'my_order_wait',
        name: '待支付',
        url: '/pages/shop/order/myOrder?from=mine&type=1'
      },
      {
        id: 3,
        imgName: 'my_order_done',
        name: '已支付',
        url: '/pages/shop/order/myOrder?from=mine&type=2'
      }
    ],
    options2: [{
        id: 1,
        imgName: 'my_icon_coupons',
        name: '优惠券',
        url: '/pages/mine/coupon/coupon?from=mine'
      },
      {
        id: 2,
        imgName: 'my_icon_address',
        name: '收货地址',
        url: '/pages/location/index/index?from=mine'
      },
      {
        id: 3,
        imgName: 'my_icon_consume',
        name: '消费记录',
        url: '/pages/mine/expensesRecord/expensesRecord?from=mine'
      },
      {
        id: 4,
        imgName: 'my_icon_certification',
        name: '资质认证',
        url: '/pages/mine/certification/certification?from=mine'
      },
      {
        id: 5,
        imgName: 'my_icon_customer',
        name: '我的客户',
        url: '/pages/mine/customer/customer?from=mine'
      },
      {
        id: 6,
        imgName: 'my_icon_problem',
        name: '常见问题',
        url: '/pages/mine/faq/index?from=mine'
      },
      {
        id: 7,
        imgName: 'my_icon_focus',
        name: '关注公众号',
        url: '/pages/mine/focus/index'
      },
      {
        id: 8,
        imgName: 'my_icon_set',
        name: '设置',
        url: '/pages/mine/set/set?from=mine'
      },
      {
        id: 9,
        imgName: 'my_icon_service',
        name: '联系客服',
        url: '/pages/mine/set/set?from=mine'
      }
    ]
  },
  optionsTapHandle(e) {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return
    // 已授权
    else {
      const id = e.currentTarget.dataset.id
      this.data.options.some(item => {
        if (item.id === id) {
          wx.navigateTo({
            url: item.url
          })
          return true
        }
        return false
      })
    }
  },
  checkAuth() {
    if (!this.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  toVipHandle() {
    // 未授权
    if (!this.checkAuth()) return
    // 已授权
    else {
      wx.navigateTo({
        url: '/pages/mine/vip/vip'
      })
    }
  },
  option1Handle(e) {
    // 未授权
    if (!this.checkAuth()) return
    // 已授权
    else {
      const id = e.currentTarget.dataset.id
      this.data.options1.some(item => {
        if (item.id === id) {
          wx.navigateTo({
            url: item.url
          })
          return true
        }
        return false
      })
    }
  },
  option2Handle(e) {
    console.log(e)
    // 6常见问题、7关注公众号、8设置不需要授权
    const id = e.currentTarget.dataset.id

    if (![6, 7, 8].includes(id)) {
      // 未授权
      if (!this.checkAuth()) return
    }

    // 已授权
    // console.log(`Sorry, we are out of ${id}.`);
    this.data.options2.some(item => {
      if (item.id === id) {
        wx.navigateTo({
          url: item.url
        })
        return true
      }
      return false
    })
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
          wx.navigateTo({
            url: '/pages/authorization/phone',
          })
        }).catch(err => {
          console.log('更新微信信息:' + err.msg)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTabBar.call(this, {
      selected: 3
    })

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
    console.log(this.data.userInfo)
    // console.log('profile show')
    getUserDetail().then(res => {
      const myData = {
        userInfo: res.data,
        'options[0].value': res.data.like_number,
        'options[1].value': res.data.view_number,
      }
      // 我的客户入口需要是业务员才有
      if (!res.data.is_sale) {
        this.data.options2.some((item, index) => {
          if (item.id === 5) {
            this.data.options2.splice(index, 1)
          }

          myData.options2 = this.data.options2
          myData.option2Show = true
        })
      }

      this.setData(myData)

      console.log(this.data.userInfo)
      this.store.data.userInfo = res.data
      this.store.update()
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