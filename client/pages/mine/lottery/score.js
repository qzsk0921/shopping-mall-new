// pages/mine/lottery/score.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getLotteryList
} from '../../../api/lottery'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '积分使用记录',

    scoreList: {
      cache: [
        // {
        //   "id": 1,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 9,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 8,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 7,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 6,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 5,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 4,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 3,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 2,
        //   "cost_integral": 0,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 10,
        //   "cost_integral": 10,
        //   "create_time": 1650617638
        // },
      ],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let scoreList = this.data.scoreList

    if (scoreList.count + 1 > scoreList.total_page) return

    this.setData({
      [`scoreList.count`]: ++scoreList.count
    })

    this.getLotteryList('scrollToLower')
  },
  getLotteryList(dataObj) {
    const tempData = {
      ex_type: 2,
      page: this.data.scoreList.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getLotteryList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.scoreList.cache.push(...res.data.data)
          this.setData({
            [`scoreList.cache`]: this.data.scoreList.cache,
            [`scoreList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`scoreList.cache`]: res.data.data,
            [`scoreList.total_page`]: res.data.last_page
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

    this.getLotteryList().then(res => {
      console.log(res)
    })
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