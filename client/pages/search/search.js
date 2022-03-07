// pages/search/search.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getKeyList
} from '../../api/commodity'

let timer;

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '搜索',

    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX

    searchKeyword: '',
    searchHistory: [],

    searchKeyList: [
      // {
      //   "id": 4,
      //   "search_name": "车",
      //   "time": 3,
      //   "create_time": 1638935250
      // },
      // {
      //   "id": 1,
      //   "search_name": "大车",
      //   "time": 2,
      //   "create_time": 1638935148
      // },
      // {
      //   "id": 2,
      //   "search_name": "小车",
      //   "time": 1,
      //   "create_time": 1638935240
      // },
      // {
      //   "id": 3,
      //   "search_name": "货车",
      //   "time": 1,
      //   "create_time": 1638935245
      // },
    ]
  },
  inputHandle(e) {
    // console.log(e)
    this.data.searchKeyword = e.detail.value
    var val = e.detail.value;

    const _this = this
    this.setData({
      searchKeyword: val
    })


    clearTimeout(timer);
    timer = setTimeout(function () {
      if (val.length > 0) {
        _this.getKeyList({
          keyword: val
        }).then(res => {
          _this.setData({
            searchKeyList: res.data
          })
        })
      } else {
        //  清空

      }
    }, 400);
  },
  // 关闭搜索
  searchCloseHandle() {
    this.setData({
      searchKeyword: ''
    })
  },
  // 点击搜索出的关键字
  keyTapHandle(e) {
    wx.navigateTo({
      url: `/pages/search/searchRes?keyword=${e.currentTarget.dataset.search_name}`,
    })

    // 保存搜索记录
    this.saveSearchHandle({
      name: e.currentTarget.dataset.search_name
    })

    this.setData({
      searchKeyword: ''
    })
  },
  bindconfirmHandle() {
    if (!this.data.searchKeyword.trim()) {
      wx.showToast({
        title: '搜索内容不能为空',
        icon: 'none'
      })
      return false
    }

    this.store.data.searchKeyword = this.data.searchKeyword
    this.update()

    this.saveSearchHandle({
      name: this.data.searchKeyword
    })

    // 跳转至搜索结果页
    wx.navigateTo({
      url: `/pages/search/searchRes?keyword=${this.data.searchKeyword}`,
    })
  },
  btnSearchCancelHandle() {
    // 清空并返回
    wx.navigateBack()
  },
  searchHandle(e) {
    console.log(e)
    const dataset = e.target.dataset

    // this.store.data.searchKeyword = dataset.keyword
    // this.update()

    this.saveSearchHandle({
      name: dataset.keyword
    })

    wx.navigateTo({
      url: `/pages/search/searchRes?keyword=${dataset.keyword}`,
    })
  },
  // 存储历史搜索
  saveSearchHandle(keywordObj) {
    // 空值时不存储
    if (keywordObj.name.trim()) {
      const logs = wx.getStorageSync('logs') || []
      // 去重
      if (logs.length) {
        logs.some((item, index) => {
          if (item.name === keywordObj.name)
            return logs.splice(index, 1)
          else return false
        })
      }
      logs.unshift(keywordObj)
      wx.setStorageSync('logs', logs)
    }
  },
  // 清除搜索历史
  clearSearchHandle() {
    wx.removeStorageSync('logs')
    this.setData({
      searchHistory: []
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
    // // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   // console.log(rect)
    //   that.setData({
    //     // scrollViewHeight: that.data.systemInfo.screenHeight - (rect.height + that.data.navHeight),
    //     fixed: rect.height,
    //   })
    // }).exec();

    setTimeout(function () {
      query.select('.section1').boundingClientRect(function (rect) {
        that.setData({
          listH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.bottom
        })
      }).exec();
    }, 0)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setData({
    //   searchKeyword: this.store.data.searchKeyword
    // })
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo,
        searchHistory: wx.getStorageSync('logs') || [],
      })
    } else {
      this.setData({
        searchHistory: wx.getStorageSync('logs') || [],
      })
    }
  },
  getKeyList(data) {
    return new Promise((resolve, reject) => {
      getKeyList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
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