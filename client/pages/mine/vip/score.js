// pages/mine/vip/score.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getScoreList
} from '../../../api/lottery'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的积分',
    scoreData: {
      cache: [
        //   {
        //     "id": 1,
        //     "source_type": 1,
        //     "number": 10,
        //     "create_time": 0,
        //     "source_type_name": "会员奖励"
        // },
        // {
        //     "id": 2,
        //     "source_type": 2,
        //     "number": 100,
        //     "create_time": 0,
        //     "source_type_name": "消费"
        // },
        // {
        //     "id": 3,
        //     "source_type": 3,
        //     "number": 10,
        //     "create_time": 0,
        //     "source_type_name": "幸运大抽奖"
        // }
      ],
      count: 1,
      total_page: 1,
      integral: 0,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let scoreData = this.data.scoreData

    if (scoreData.count + 1 > scoreData.total_page) return

    this.setData({
      [`scoreData.count`]: ++scoreData.count
    })

    this.getScoreList('scrollToLower')
  },
  getScoreList(dataObj) {
    const tempData = {
      page: this.data.scoreData.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getScoreList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.scoreData.cache.push(...res.data.data)
          this.setData({
            'scoreData.cache': this.data.scoreData.cache,
            'scoreData.total_page': res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            'scoreData.cache': res.data.data,
            'scoreData.total_page': res.data.last_page,
            'scoreData.integral': res.data.integral
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const that = this;
    const query = wx.createSelectorQuery();

    query.select('.fixed').boundingClientRect(function (rect) {
      that.setData({
        fixed: rect.height,
      })
    }).exec();

    query.select('.section1').boundingClientRect(function (rect) {
      that.setData({
        section1T: rect.height,
      })
    }).exec();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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

    this.getScoreList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})