// pages/groupbargain/list.js
import store from '../../store/common'
import create from '../../utils/create'

create(store, {
  // Page({

  /**
   * 页面的初始数据
   */
  data: {
    refresherEnabled: false,
    triggered: false,
    
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: 'groupbargain',
    page: 1,
    page_size: 5,
    groupData: {
      count: 1,
      total_page: 1,
      cache: [{
        id: 1,
        isHead: 1,
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNxyM4Via1sYUkGhFONWeO83RibWKXXunaMaulxE85ERM4bibmIqulD1a7mia6QUOudk8Uic8Xjg4HquQ/132',
        nickname: '用户昵称',
        img: 'https://sharepuls.xcmbkj.com/shop_adm_2022-03-115459.jpg',
        tit: '元宝优选调和油元宝优选调和油调和油  20L/捅',
        price: '132.9',
        marketPrice: '224.8',
        total: 10,
        num: 2,
      }, {
        id: 2,
        isHead: 1,
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNxyM4Via1sYUkGhFONWeO83RibWKXXunaMaulxE85ERM4bibmIqulD1a7mia6QUOudk8Uic8Xjg4HquQ/132',
        nickname: '用户昵称',
        img: 'https://sharepuls.xcmbkj.com/shop_adm_2022-03-115459.jpg',
        tit: '元宝优选调和油元宝优选调和油调和油  20L/捅',
        price: '12.9',
        marketPrice: '224.8',
        total: 10,
        num: 9,
      }]
    }
  },
  //跳转至商品详情页
  toGroupDetail(e) {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    wx.navigateTo({
      url: `/pages/goods/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let historyList = this.data.historyList

    if (historyList.count + 1 > historyList.total_page) return

    this.setData({
      [`historyList.count`]: ++historyList.count
    })

    this.getViewHistory('scrollToLower')
  },
  getViewHistory(dataObj) {
    const tempData = {
      page: this.data.historyList.count,
      page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getViewHistory(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.historyList.cache.push(...res.data.data)
          this.setData({
            [`historyList.cache`]: this.data.historyList.cache,
            [`historyList.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`historyList.cache`]: res.data.data,
            [`historyList.total_page`]: res.data.last_page
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
  onLoad: function (options) {

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

    query.select('.safe-area').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        safeareaH: rect.height,
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