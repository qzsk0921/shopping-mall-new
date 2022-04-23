// pages/mine/lottery/prize.js
import store from '../../../store/common'
import create from '../../../utils/create'

// import {
//   getGoodsprizeList,
// } from '../../../api/commodity'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的奖品',

    prizeList: {
      cache: [{
          thumb: 'https://img.xxhychn.cn/admin/goods/shop_adm_2022-03-231633.jpg',
          goods_name: '阿尔卑斯饮用天然矿泉水阿尔卑斯饮用天然矿泉水',
          goods_content: '',
          price: '13.6',
          spec: '500ml*6',
          delivery: 'SF12345613456'
        },
        {
          thumb: 'https://img.xxhychn.cn/admin/goods/shop_adm_2022-03-231633.jpg',
          goods_name: '阿尔卑斯饮用天然矿泉水阿尔卑斯饮用天然矿泉水',
          goods_content: '',
          price: '13.6',
          spec: '500ml*6',
          delivery: ''
        }
      ],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
  },
  // 兑换
  exchangeHandle(e) {

  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let prizeList = this.data.prizeList

    if (prizeList.count + 1 > prizeList.total_page) return

    this.setData({
      [`prizeList.count`]: ++prizeList.count
    })

    this.getGoodsprizeList('scrollToLower')
  },
  getGoodsprizeList(dataObj) {
    const tempData = {
      page: this.data.prizeList.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGoodsprizeList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.prizeList.cache.push(...res.data.data)
          this.setData({
            [`prizeList.cache`]: this.data.prizeList.cache,
            [`prizeList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`prizeList.cache`]: res.data.data,
            [`prizeList.total_page`]: res.data.last_page
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

    // this.getGoodsprizeList().then(res => {
    //   console.log(res)
    // })
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