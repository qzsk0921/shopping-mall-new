// pages/location/add/add.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  checkMobile
} from '../../../utils/util'
import {
  addAddress,
  editAddress,
  delAddress,
  getAddressDetail,
} from '../../../api/location'
const duration = 500
// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    type: 'add', //默认新增收货地址

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '添加新地址', //默认
    checked: false,

    deliveryAddress: {
      consignee_name: '', //联系人
      consignee_phone: '', //手机号,
      name: '', //微信提供位置名称
      address: '', //具体地址
      user_address: '', //门牌号
      latitude: '',
      longitude: ''
      // current: 0, //当前使用地址
    },
  },
  onChange({
    detail
  }) {
    console.log(detail)
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },
  addressHandle() {
    // console.log('addressHandle')
    const that = this
    // console.log(this.store.data.location.location.lat)
    // const objectData = {
    //   latitude: this.store.data.location.location.lat,
    //   longitude: this.store.data.location.location.lng
    // }
    wx.chooseLocation({
      // latitude: this.store.data.location.location.lat,
      // longitude: this.store.data.location.location.lng,
      success: function (res) {
        // console.log('chooseLocation success')
        console.log(res)

        that.setData({
          'deliveryAddress.name': res.name,
          'deliveryAddress.address': res.address,
          'deliveryAddress.latitude': res.latitude,
          'deliveryAddress.longitude': res.longitude
        })
      },
      fail: function (res) {
        // 接口调用失败的回调函数
        console.log('chooseLocation fail')
        console.log(res)
      },
      complete: function (res) {
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        console.log('chooseLocation complete')
        console.log(res)
      }
    })
    // wx.openLocation(objectData)
  },
  addressDelHandle() {
    // 删除收货地址
    // console.log('addressDelHandle')
    this.setData({
      confirmText: '删除',
      confirmDialogVisibile: true
    })
  },
  // 对话框确认按钮
  diaConfirmHandle(e) {
    // console.log('diaConfirmHandle')
    // console.log(e.detail)
    this.delAddress({
      id: this.data.id
    }).then(res => {
      wx.showToast({
        icon: 'none',
        title: res.msg,
        duration
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, duration)
    })
  },
  // 对话框取消按钮
  diaCancelHandle(e) {
    console.log('diaCancelHandle')
    console.log(e.detail)
  },
  // 保存收货地址
  formSubmit(e) {
    console.log(e)
    const formdata = e.detail.value
    const res = Object.keys(formdata).some(key => !formdata[key])

    if (res) {
      wx.showToast({
        icon: 'none',
        title: '请填写完整信息',
      })
    } else {
      // 校验手机号
      if (!checkMobile(formdata.consignee_phone)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      }

      const mydata = {
        ...this.data.deliveryAddress,
        ...formdata
      }

      if (this.data.type === 'edit') {
        // 编辑
        mydata.id = this.data.id
        this.editAddress(mydata).then(res => {
          wx.showToast({
            icon: 'none',
            title: res.msg,
            duration
          })

          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, duration)
        })
      } else {
        // 新增
        this.addAddress(mydata).then(res => {
          wx.showToast({
            icon: 'none',
            title: res.msg,
            duration
          })

          setTimeout(() => {
            // wx.navigateTo({
            //   url: '/pages/location/index/index',
            // })
            wx.navigateBack({
              delta: 0,
            })
          }, duration)
        })
      }
    }
  },
  addAddress(data) {
    return new Promise((resolve, reject) => {
      addAddress(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  delAddress(data) {
    return new Promise((resolve, reject) => {
      delAddress(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  editAddress(data) {
    return new Promise((resolve, reject) => {
      editAddress(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAddressDetail(data) {
    return new Promise((resolve, reject) => {
      getAddressDetail(data).then(res => {
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
    if (options) {
      if (options.type === 'add') {
        // 添加地址
        this.setData({
          type: options.type,
          navigationBarTitleText: '添加新地址'
        })
      } else if (options.type === 'edit') {
        // 编辑地址
        this.setData({
          type: options.type,
          navigationBarTitleText: '编辑地址',
          id: options.id
        })

        this.getAddressDetail({
          id: options.id
        }).then(res => {
          console.log(res.data)
          this.setData({
            deliveryAddress: res.data
          })
        })
      }
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