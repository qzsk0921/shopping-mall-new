// pages/mine/wallet/withdrawCustom.js
import store from '../../../store/common'
import create from '../../../utils/create'

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
  },
  // 长按二维码保存
  async qrPressHandle() {
    const res = await this.getLocalImg('https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132')
    this.savePic(res.path)
  },
  // 保存图片到系统相册
  savePic(tempFilePath) {
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath, //这个只是测试路径，没有效果
      success(res) {
        wx.showToast({
          title: '已保存至相册',
          icon: 'none',
          duration: 3000,
        })
        _this.setData({
          animatDisappear: true
        })
      },
      // 保存到相册失败
      fail: function (err) {
        wx.hideLoading();
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
        }
      })
    })
  },
  copyHandle() {
    this.copyToClipboard(15224165468)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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