// pages/mine/wallet/withdrawCustom.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getWithdrawInfo,
  createWithdraw
} from '../../../api/wallet'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: '',
    navigationBarTitleText: '钱包',

    withdrawData: {
      // "type": "1",
      // "commission_money": "100.00",
      // "lucky_money": "50.00",
      // "shop_info": {
      //   "name": "厦门会展中心",
      //   "leader_phone": "13559570109",
      //   "wx_code": "https://retailers-qn.xcmbkj.com/admin/shop/shop_adm_2022-03-115828.jpg",
      //   "address": "福建省厦门市思明区软件园二期望海路10号楼之二,302-1室",
      //   "latitude": 24.488806,
      //   "longitude": 118.182724,
      //   "wx_pay_id": 1
      // }
    }
  },
  // 提现申请
  withdrawHandle() {

    const money = this.data.idx == 0 ? this.data.withdrawData.commission_money : this.data.withdrawData.lucky_money
    if (this.data.money > money) {
      wx.showToast({
        title: `您可提现的金额为：${money}，请重新输入`,
        icon: 'none'
      })
      return
    }

    // idx 0佣金 1幸运奖
    this.createWithdraw({
      type: 1 + Number(this.data.idx),
      money: this.data.money
    }).then(res => {

      wx.showToast({
        title: '提现成功，请联系商家审核打款',
        icon: 'none'
      })

      // 提现成功更新数据
      this.getWithdrawInfo().then(res => {
        this.setData({
          withdrawData: res.data
        })
      })
    })
  },
  inputHandle(e) {
    // console.log(e)
    this.data.money = e.detail.value
  },
  // 长按二维码保存
  async qrPressHandle() {

    wx.showLoading({
      title: ' ',
    })

    const res = await this.getLocalImg(this.data.withdrawData.shop_info.wx_code)
    this.savePic(res.path)
  },
  // 保存图片到系统相册
  savePic(tempFilePath) {
    const _this = this
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath, //这个只是测试路径，没有效果
      success(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 3000,
        })
        _this.setData({
          animatDisappear: true
        })
      },
      // 保存到相册失败
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
          _this.saveShareImgErr();
        } else if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
          wx.showModal({
            title: '温馨提示',
            content: '请开启保存到相册权限，开启后自动保存相册',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      _this.createShareImgSuccess(tempFilePath);
                    } else {
                      _this.saveShareImgErr();
                    }
                  }
                })
              } else if (res.cancel) {
                _this.saveShareImgErr();
              }
            }
          })
        } else {
          _this.saveShareImgErr();
        }
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  // 保存到手机失败
  saveShareImgErr() {
    wx.showToast({
      title: '图片保存失败~ ',
      icon: 'none',
      duration: 3000,
    })
  },
  // 获取图片信息
  getLocalImg(url) {
    return new Promise(resolve => {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          console.log(res)
          // 保存到本地
          // res = res.path;
          resolve(res)
        },
        fail(res) {
          console.log(res)
        }
      })
    })
  },
  copyHandle(e) {
    this.copyToClipboard(this.data.withdrawData.shop_info.leader_phone)
  },
  // 复制到剪贴板
  copyToClipboard(data) {
    wx.setClipboardData({
      data,
      success: (res) => {
        wx.showToast({
          title: '复制到剪贴板',
          icon: 'none'
        })
      },
    })
  },
  getWithdrawInfo(data) {
    return new Promise((resolve, reject) => {
      getWithdrawInfo(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  createWithdraw(data) {
    return new Promise((resolve, reject) => {
      createWithdraw(data).then(res => {
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
    if (options.idx) {
      // idx 0佣金 1幸运奖
      this.setData({
        idx: options.idx
      })
    }

    this.getWithdrawInfo().then(res => {
      this.setData({
        withdrawData: res.data
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