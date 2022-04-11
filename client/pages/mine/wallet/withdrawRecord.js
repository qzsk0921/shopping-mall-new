// pages/mine/wallet/withdrawRecord.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getWithdrawLog
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
    navigationBarTitleText: '提现记录',

    page: 1,
    page_size: 5,
    withdrawRecordData: {
      count: 1,
      total_page: 1,
      cache: [{
          "id": 6,
          "type": 2,
          "admin_id": 0,
          "user_id": 2,
          "money": "20.00",
          "status": 0,
          "message": null,
          "update_time": 1648969717,
          "create_time": 1648969717
        },
        {
          "id": 4,
          "type": 2,
          "admin_id": 0,
          "user_id": 2,
          "money": "30.00",
          "status": 0,
          "message": null,
          "update_time": 1648969661,
          "create_time": 1648969661
        }
      ]
    },
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

    this.getWithdrawLog({
      type: Number(options.idx) + 1
    })
  },

  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let withdrawRecordData = this.data.withdrawRecordData

    if (withdrawRecordData.count + 1 > withdrawRecordData.total_page) return

    this.setData({
      [`withdrawRecordData.count`]: ++withdrawRecordData.count
    })

    this.getWithdrawLog('scrollToLower')
  },
  getWithdrawLog(dataObj) {
    const idx = this.data.idx
    const page = this.data.withdrawRecordData.count

    const tempData = {
      page,
      page_size: this.data.page_size,
      type: idx + 1
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getWithdrawLog(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.withdrawRecordData.cache.push(...res.data.data)
          this.setData({
            [`withdrawRecordData.cache`]: this.data.withdrawRecordData.cache,
            [`withdrawRecordData.total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.withdrawRecordData)
        } else {
          this.setData({
            // 测试数据
            // [`withdrawRecordData.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),

            // [`withdrawRecordData.cache`]: res.data.data,
            // [`withdrawRecordData.total_page`]: res.data.last_page,
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();
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