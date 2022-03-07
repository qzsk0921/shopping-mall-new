// pages/mine/vip/vip.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getVipList,
  addVip
} from '../../../api/vip'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '会员中心',
    vipList: [
      // {
      //   "id": 3,
      //   "name": "青铜",
      //   "price": "3.00",
      //   "icon": "爱仕达发多少",
      //   "introduce": "2332",
      //   "discount": "10.00",
      //   "sort": 11,
      //   "status": 1,
      //   "create_time": 1638511838
      // },
      // {
      //   "id": 1,
      //   "name": "黄金",
      //   "price": "1.00",
      //   "icon": "xdddd",
      //   "introduce": "fsdf",
      //   "discount": "6.00",
      //   "sort": 10,
      //   "status": 1,
      //   "create_time": 1638511838
      // },
      // {
      //   "id": 2,
      //   "name": "白英",
      //   "price": "2.00",
      //   "icon": "xdddd",
      //   "introduce": "fsdf",
      //   "discount": "8.00",
      //   "sort": 9,
      //   "status": 1,
      //   "create_time": 1638511838
      // }
    ],

    currentVipId: null,

    btnDisable: false,
    btnText: '', //立即开通 立即续费 立即升级
  },
  watch: {
    currentVipId: {
      handler(nv, ov, obj) {
        let btnText = null
        if (this.store.data.userInfo.is_vip) {
          let it
          setTimeout(() => {
            this.data.vipList.some(item => {
              if (item.id === nv) {
                return it = item
              }
              return false
            })

            if (this.data.myVipPrice == it.price) {
              btnText = '立即续费'
            } else if (this.data.myVipPrice < it.price) {
              btnText = '立即升级'
            } else {
              btnText = '立即开通'
            }
          }, 0)

        } else {
          btnText = '立即开通'
        }

        setTimeout(() => {
          this.setData({
            btnText
          })
        }, 0)
      },
      // immediate: true
    }
  },
  vipItemHandle(e) {
    const dataset = e.currentTarget.dataset
    this.setData({
      currentVipId: dataset.item.id
    })
    // 选择比自己等级低的会员不能续费
    // myVipPrice
    this.setData({
      btnDisable: this.data.myVipPrice > dataset.item.price
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
  addVipHandle(e) {
    console.log('addVipHandle')

    if (!this.certCheck()) return

    if (this.data.btnDisable) return
    this.addVip({
      id: this.data.currentVipId
    }).then(res => {
      const payModel = res.data;
      wx.requestPayment({
        'timeStamp': payModel.timeStamp.toString(),
        'nonceStr': payModel.nonceStr,
        'package': 'prepay_id=' + payModel.prepay_id, //统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
        'signType': payModel.signType,
        'paySign': payModel.paySign,
        'success': function (res) {
          console.log(res)
          // 支付成功后，返回个人中心，刷新个人中心页面
          wx.navigateBack({
            delta: 0,
          })
          // 获取消息下发权限(只在支付回调或tap手势事件能调用)
          // wx.requestSubscribeMessage({
          //   tmplIds: ['mtwGRB07oFL2fJgoiIipKVCYFFHS0vytiw2rTHqtAz8', 'gB9gMYOrOkLl-yTHdBP5vUS5rgwsTW1hjUYNml-57Go'],
          //   success(res) {},
          //   fail(err) {
          //     console.log(err)
          //   },
          //   complete() {
          //     // console.log("dasda", payModel.package.substr(10))
          //     that.addOrder(payModel.out_trade_no, payModel.package.substr(10))
          //   }
          // })
        },
        'fail': function (res) {
          wx.showToast({
            title: '取消支付，开通失败',
            icon: 'none'
          })
          console.log(res)
        }
      }).catch(res => {
        console.log(res)
      })
    })
  },
  getVipList(data) {
    return new Promise((resolve, reject) => {
      getVipList(data).then(res => {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器

    let currentVip = null
    this.getVipList().then(res => {
      res.data.data.some(item => {
        if (item.name === this.store.data.userInfo.vip_info.vip_name)
          return currentVip = item
        return false
      })

      this.setData({
        vipList: res.data.data,
        currentVipId: currentVip ? currentVip.id : res.data.data[0].id,
        myVipPrice: currentVip ? currentVip.price : 0
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