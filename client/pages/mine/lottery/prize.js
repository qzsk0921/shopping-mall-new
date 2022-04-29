// pages/mine/lottery/prize.js
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
    navigationBarTitleText: '我的奖品',

    prizeList: {
      cache: [
        // {
        //   "id": 1,
        //   "reward_type": 3,
        //   "reward_name": "积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分",
        //   "reward_price": "10.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 2,
        //   "express_number": null,
        //   "express_company": null,
        //   "address_info": null,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 2,
        //   "reward_type": 3,
        //   "reward_name": "积分",
        //   "reward_price": "10.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 2,
        //   "express_number": null,
        //   "express_company": null,
        //   "address_info": null,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 3,
        //   "reward_type": 1,
        //   "reward_name": "商品",
        //   "reward_price": "20.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 1,
        //   "express_number": null,
        //   "express_company": null,
        //   "address_info": null,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 4,
        //   "reward_type": 1,
        //   "reward_name": "商品",
        //   "reward_price": "20.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 2,
        //   "express_number": "fdfasdfasd",
        //   "express_company": "圆通",
        //   "address_info": "望海路10号楼",
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 5,
        //   "reward_type": 2,
        //   "reward_name": "优惠券",
        //   "reward_price": "10.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 3,
        //   "express_number": null,
        //   "express_company": null,
        //   "address_info": null,
        //   "create_time": 1650617638
        // },
        // {
        //   "id": 6,
        //   "reward_type": 2,
        //   "reward_name": "优惠券",
        //   "reward_price": "100.00",
        //   "reward_image": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg",
        //   "reward_status": 3,
        //   "express_number": null,
        //   "express_company": null,
        //   "address_info": null,
        //   "create_time": 1650617638
        // }
      ],
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,

    refresherEnabled: false,
  },
  copyHandle(e) {
    const copy = e.target.dataset.copy
    this.copyToClipboard(copy)
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
  // 兑换
  exchangeHandle(e) {
    const draw_reward_prize_id = e.target.dataset.id
    // 去领奖 跳转至奖品领取-收货地址页
    // 添加收货地址
    wx.navigateTo({
      url: `/pages/location/index/index?from=lottery_of_mine&draw_reward_prize_id=${draw_reward_prize_id}`,
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let prizeList = this.data.prizeList

    if (prizeList.count + 1 > prizeList.total_page) return

    this.setData({
      [`prizeList.count`]: ++prizeList.count
    })

    this.getLotteryList('scrollToLower')
  },
  getLotteryList(dataObj) {
    const tempData = {
      ex_type: 1,
      page: this.data.prizeList.count,
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
  onLoad(options) {},

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