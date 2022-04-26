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

let options2 = [{
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
  // {
  //   id: 4,
  //   imgName: 'my_icon_certification',
  //   name: '资质认证',
  //   url: '/pages/mine/certification/certification?from=mine'
  // },
  // {
  //   id: 5,
  //   imgName: 'my_icon_customer',
  //   name: '我的客户',
  //   url: '/pages/mine/customer/customer?from=mine'
  // },
  {
    id: 6,
    imgName: 'my_icon_problem',
    name: '常见问题',
    url: '/pages/mine/faq/index?from=mine'
  },
  {
    id: 9,
    imgName: 'my_icon_service',
    name: '联系客服',
    url: '/pages/mine/set/set?from=mine'
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
    id: 10,
    imgName: 'my_icon_invite',
    name: '团长邀请',
    url: '/pages/mine/set/set?from=mine'
  },
  {
    id: 11,
    imgName: 'my_icon_scan',
    name: '扫码核销',
    url: '/pages/mine/set/set?from=mine'
  },
  {
    id: 12,
    imgName: 'my_pt',
    name: '我的拼团',
    url: '/pages/mine/group/group?from=mine'
  },
  {
    id: 13,
    imgName: 'my_icon_wallet',
    name: '钱包',
    url: '/pages/mine/wallet/wallet?from=mine'
  },
  {
    id: 14,
    imgName: 'my_members_level_1',
    name: '抽奖中心',
    url: '/pages/mine/lottery/lottery?from=mine'
  }
]

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: 1,
    dialog: {
      // 团长特权弹窗
      groupprivilege: {
        opened: 0,
      },
    },

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
      // {
      //   id: 4,
      //   imgName: 'my_icon_certification',
      //   name: '资质认证',
      //   url: '/pages/mine/certification/certification?from=mine'
      // },
      // {
      //   id: 5,
      //   imgName: 'my_icon_customer',
      //   name: '我的客户',
      //   url: '/pages/mine/customer/customer?from=mine'
      // },
      {
        id: 6,
        imgName: 'my_icon_problem',
        name: '常见问题',
        url: '/pages/mine/faq/index?from=mine'
      },
      {
        id: 9,
        imgName: 'my_icon_service',
        name: '联系客服',
        url: '/pages/mine/set/set?from=mine'
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
        id: 10,
        imgName: 'my_icon_invite',
        name: '团长邀请',
        url: '/pages/mine/set/set?from=mine'
      },
      {
        id: 11,
        imgName: 'my_icon_scan',
        name: '扫码核销',
        url: '/pages/mine/set/set?from=mine'
      },
      {
        id: 12,
        imgName: 'my_pt',
        name: '我的拼团',
        url: '/pages/mine/group/group?from=mine'
      },
      {
        id: 13,
        imgName: 'my_icon_wallet',
        name: '钱包',
        url: '/pages/mine/wallet/wallet?from=mine'
      },
      {
        id: 14,
        imgName: 'my_members_level_1',
        name: '抽奖中心',
        url: '/pages/mine/lottery/lottery?from=mine'
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
        if (id === 11) {
          // 扫码核销
          this.scan()
        } else if (id === 12) {
          // 我的拼团
          if (!this.data.userInfo.is_captain) {
            let param = {
              is_captain: this.data.userInfo.is_captain
            }

            let tempParam = {
              cancelText: '',
              shareType: 'normal',
              wxconfirmDialogVisibile: true,
              confirmDialogContent: `您还需参与${this.data.userInfo.captain_last_time}次拼团，即可晋升为团长，享受团长发起拼团，拼成得佣金的权益`,
            }

            for (const key in tempParam) {
              if (Object.hasOwnProperty.call(tempParam, key)) {
                param[key] = tempParam[key]
              }
            }

            this.setData(param)
          } else {
            wx.navigateTo({
              url: item.url
            })
          }

        } else {
          wx.navigateTo({
            url: item.url
          })
        }
        return true
      }
      return false
    })
  },
  scan() {
    wx.scanCode({
      scanType: 'qrCode',
      success(res) {
        console.log(res)

        if (!res.path) {
          wx.showToast({
            title: '无效二维码',
            icon: 'none'
          })
          return
        }
        console.log(res.path)
        wx.navigateTo({
          url: '/' + res.path
        })
      },
      fail(res) {
        console.log(res)
        // wx.showToast({
        //   title: '无效二维码',
        //   icon: 'none'
        // })
      }
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
  // 打开团队特权
  openGroupprivilegeHandle() {
    this.setData({
      'dialog.groupprivilege.opened': 1
    })
  },
  // 关闭团长特权弹窗
  dropdownGroupprivilegeMaskTap() {
    this.setData({
      'dialog.groupprivilege.opened': 0
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
    let tempOptions2 = JSON.parse(JSON.stringify(options2))
    getUserDetail().then(res => {
      const myData = {
        userInfo: res.data,
        'options[0].value': res.data.like_number,
        'options[1].value': res.data.view_number,
      }
      // 我的客户入口需要是业务员才有
      if (!res.data.is_sale || !res.data.is_invitation_captain) {
        if (!res.data.is_sale) {
          tempOptions2.some((item, index) => {
            if (item.id === 5) {
              tempOptions2.splice(index, 1)
            }
          })
        }
        // 团长邀请
        if (!res.data.is_invitation_captain) {
          tempOptions2.some((item, index) => {
            if (item.id === 10) {
              tempOptions2.splice(index, 1)
            }
          })
        }

        // 我的拼团
        // if (!res.data.is_captain) {
        //   tempOptions2.some((item, index) => {
        //     if (item.id === 12) {
        //       tempOptions2.splice(index, 1)
        //     }
        //   })
        // }

        // 扫码核销
        if (!res.data.is_check_order) {
          tempOptions2.some((item, index) => {
            if (item.id === 11) {
              tempOptions2.splice(index, 1)
            }
          })
        }

        myData.options2 = tempOptions2
        myData.option2Show = true
      } else {
        myData.options2 = tempOptions2
        myData.option2Show = true
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
  onShareAppMessage: function (e) {
    return {
      title: ' ',
      path: `/pages/groupbargain/headinvitation?invite_user_id=${this.store.data.userInfo.id}`, //若无path 默认跳转分享页
      imageUrl: '/assets/images/headinvitation.png', //若无imageUrl 截图当前页面
      success(res) {
        console.log('分享成功', res)
      },
      fail(res) {
        console.log(res)
      }
    }
  }
})