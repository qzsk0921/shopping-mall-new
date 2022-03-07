// pages/mine/customer/customer.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getCustomerList
} from '../../../api/customer'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '我的客户',

    customerTotal: '', //客户数
    customerList: {
      cache: [
        // {
        //   "id": 1,
        //   "sales_id": 1,
        //   "user_id": 1,
        //   "bind_time": 1639813599,
        //   "create_time": 1639813577,
        //   "user_info": {
        //     "nick_name": "hgao",
        //     "avatar_url": "https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg",
        //     "phone": "1221"
        //   },
        //   "shop_info": {
        //     "name": "福州斯克路德饭店",
        //     "leader_name": "科斯加",
        //     "leader_phone": "422222"
        //   }
        // },
        // {
        //   "id": 2,
        //   "sales_id": 1,
        //   "user_id": 1,
        //   "bind_time": 1639813599,
        //   "create_time": 1639813577,
        //   "user_info": {
        //     "nick_name": "hgao",
        //     "avatar_url": "https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg",
        //     "phone": "1221"
        //   },
        //   "shop_info": {
        //     "name": "",
        //     "leader_name": "",
        //     "leader_phone": ""
        //   }
        // }
      ], //couponNouseCache 未使用
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,
  },
  watch: {
    customerList: {
      handler(nv, ov, obj) {
        // console.log(nv)
        if (nv.length) {
          const that = this;
          const query = wx.createSelectorQuery();
          query.select('.scroll').boundingClientRect(function (rect) {
            // console.log(rect)
            that.setData({
              scrollTop: rect.top,
            })
          }).exec();
        }
      },
      deep: true
    }
  },
  cardHandle(e) {
    // 跳转至消费记录页面
    const customerid = e.currentTarget.dataset.customerid

    wx.navigateTo({
      url: `/pages/mine/expensesRecord/expensesRecord?id=${customerid}`,
    })

  },
  getCustomerList(dataObj) {
    const tempData = {
      page: this.data.customerList.count,
      page_size: this.data.page_size,
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    tempData.type = this.data.tabIndex

    return new Promise((resolve, reject) => {
      getCustomerList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.customerList.cache.push(...res.data.data)
          this.setData({
            'customerList.cache': this.data.customerList.cache,
            'customerList.total_page': res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            // 测试数据
            // [`customerList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            // 'customerList.cache': res.data.data,
            // 'customerList.total_page': res.data.last_page
            customerTotal: res.data.total
          })
          resolve(res)
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
    getApp().setWatcher(this) //设置监听器
    this.getCustomerList()
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
  onShareAppMessage: function (res) {
    console.log(res)
    // if (res.from === 'button') {
    // 来自页面内转发按钮
    return {
      title: `${this.store.data.userInfo.nick_name}邀请您使用旺莱联采`,
      //两种情况 商品详情,帮卖商品详情
      path: `pages/index/index?sale_id=${this.store.data.userInfo.id}`,
      imageUrl: '/assets/images/share1.jpg',
      success(res) {
        console.log('分享成功', res)
      },
      fail(res) {
        console.log(res)
      }
    }
    // }
  },
})