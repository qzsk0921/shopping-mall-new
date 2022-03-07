// pages/mine/certification/certification.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  checkMobile
} from '../../../utils/util'

import {
  getShopCertDetail,
  addShopCert
} from '../../../api/certification'

const duration = 500

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '资质认证',

    certificationInfo: {
      name: '', //店铺名称
      shop_type_str: '', //店铺类型
      leader_name: '', //负责人
      leader_phone: '', //手机号
      address_id: '', //地址（从收货地址选择）
    }, //资质认证

    address: null,
    latitude: null,
    longitude: null
  },
  chooseShopTypeHandle() {
    console.log('chooseShopTypeHandle')
    // 选择店铺类型
    wx.navigateTo({
      url: "/pages/shop/shopType",
    })
  },
  addressHandle() {
    // 选择收货地址
    console.log('addressHandle')
    const that = this
    wx.navigateTo({
      url: '/pages/location/index/index?from=cert_of_mine',
    })
    // wx.openLocation(objectData)
  },
  formSubmit(e) {
    // console.log(e)
    // 提交资质认证申请
    const formData = e.detail.value
    formData.shop_type_str = this.data.certificationInfo.shop_type_str
    formData.address_id = this.data.certificationInfo.address_id

    // 校验
    if (!this.formValidate(formData)) return


    // 提交 退回个人中心页面
    this.addShopCert(formData).then(res => {
      wx.showToast({
        icon: 'none',
        title: '提交申请成功',
        duration
      })

      setTimeout(() => {
        wx.navigateBack({
          delta: 0,
        })
      }, duration)
    })
  },
  formValidate(formData) {
    const flag = Object.keys(formData).some(key => {
      if (!formData[key]) {
        if (key === 'name') {
          wx.showToast({
            icon: 'none',
            title: '请输入店铺名称',
          })
        } else if (key === 'shop_type_str') {
          wx.showToast({
            icon: 'none',
            title: '请选择店铺类型',
          })
        } else if (key === 'leader_name') {
          wx.showToast({
            icon: 'none',
            title: '请输入负责人名称',
          })
        } else if (key === 'leader_phone') {
          wx.showToast({
            icon: 'none',
            title: '请输入联系方式',
          })
        } else if (key === 'address_id') {
          wx.showToast({
            icon: 'none',
            title: '请选择收货地址',
          })
        }
        return true
      }
      return false
    })

    // 全部填写再校验手机号码
    if (!flag) {
      if (!checkMobile(formData.leader_phone)) {
        wx.showToast({
          title: '请输入正确手机号',
          icon: 'none'
        })
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  },
  addShopCert(data) {
    return new Promise((resolve, reject) => {
      addShopCert(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getShopCertDetail(data) {
    return new Promise((resolve, reject) => {
      getShopCertDetail(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 资质认证审核失败 点击按钮重新认证
  resetHandle() {
    this.setData({
      status: -2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShopCertDetail().then(res => {
      // -2:未申请 0:审核中 1:已通过 -1:已删除
      this.setData({
        status: res.data.status
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

    // // 如果是提交状态返回isRefresh=1，才刷新页面，从详情过来无需刷新
    // const pages = getCurrentPages();
    // const currPage = pages[pages.length - 1];
    // // console.log(currPage.__data__.mydata);//此处既是上一页面传递过来的值
    // if (currPage.__data__.mydata && currPage.__data__.mydata.isRefresh == 1) {
    //   // 重新获取数据
    //   this.getData(true)
    //   // 每一次需要清除，否则会参数会缓存
    //   currPage.__data__.mydata.isRefresh = ''
    // }

    if (this.data.shopType) {
      this.setData({
        // 'certificationInfo.shop_type_str': this.data.shopType.id,
        'certificationInfo.shop_type_str': this.data.shopType.map(item => item.id).join(),
        type: this.data.shopType.map(item => item.name).join(),
      })
    }

    if (this.data.shopAddress) {
      this.setData({
        'certificationInfo.address_id': this.data.shopAddress.id,
        shop_address_str: this.data.shopAddress.name
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