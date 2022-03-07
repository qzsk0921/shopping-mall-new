// pages/goods/detail.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getGoodsDetail,
  setGoodsCollection
} from '../../api/commodity'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '商品详情',

    // swiper
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    interval: 2000,
    autoplay: true,
    duration: 500,

    currentSwiperIndex: 1,

    goodsDetail: {
      // "id": 1,
      // "goods_name": "商品1",
      // "brand_id": 1,
      // "category_id": 1,
      // "goods_banner": "[\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c49a5276.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4a327a7.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4aa422b.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4b1df9f.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4b9470d.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cd92eccf.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cd9a0546.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cda2b288.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cdab73ca.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742ce223965.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742ce288d48.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742d120b78b.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742d127b1a7.jpg\"]",
      // "goods_image": "[\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c49a5276.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4a327a7.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4aa422b.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4b1df9f.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742c4b9470d.png\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cd92eccf.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cd9a0546.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cda2b288.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742cdab73ca.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742ce223965.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742ce288d48.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742d120b78b.jpg\",\"http:\\/\\/image.wms.wljkxys.com\\/202009305f742d127b1a5.jpg\"]",
      // "goods_content": "商品详情1",
      // "spec": "10g",
      // "sort": 10,
      // "is_pre_sale": 0,
      // "pay_delivery_day": 1,
      // "price": 10.49,
      // "market_price": "99.00",
      // "sale_number": 0,
      // "status": 1,
      // "create_time": 1638946959,
      // "is_multi_unit": 1,
      // "activity_info": [],
      // "goods_banner_arr": [
      //   "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4a327a7.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4aa422b.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4b1df9f.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4b9470d.png",
      //   "http://image.wms.wljkxys.com/202009305f742cd92eccf.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cd9a0546.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cda2b288.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cdab73ca.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742ce223965.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742ce288d48.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742d120b78b.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742d127b1a7.jpg"
      // ],
      // "goods_image_arr": [
      //   "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4a327a7.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4aa422b.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4b1df9f.png",
      //   "http://image.wms.wljkxys.com/202009305f742c4b9470d.png",
      //   "http://image.wms.wljkxys.com/202009305f742cd92eccf.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cd9a0546.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cda2b288.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742cdab73ca.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742ce223965.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742ce288d48.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742d120b78b.jpg",
      //   "http://image.wms.wljkxys.com/202009305f742d127b1a5.jpg"
      // ],
      // "brand_name": "品牌1",
      // "is_like": 1,
      // "unit_arr": [{
      //     "id": 1,
      //     "goods_id": 1,
      //     "unitName": "个",
      //     "price": 10.6,
      //     "market_price": "20.00",
      //     "cart_number": 0,
      //     "number": 0,
      //   },
      //   {
      //     "id": 2,
      //     "goods_id": 1,
      //     "unitName": "箱",
      //     "price": 106,
      //     "market_price": "200.00",
      //     "cart_number": 0,
      //     "number": 0,
      //   },
      // ],
      // "cart_number": 0
    },

    dialog: {
      car: {
        // 点击购物车，多规格
        opened: 0
      },
    }, // 弹窗和下拉窗
  },
  // 购物车
  toCartHandle() {
    // 移除所有上级页面，除1级页面，tab显示至购物车页面
    wx.switchTab({
      url: '/pages/shopping/shopping',
    })
  },
  // 收藏
  collectionHandle(e) {
    // 分为2种情况1.收藏成功2.取消收藏
    const data = {
      goods_id: this.data.goodsDetail.id,
      type: this.data.goodsDetail.is_like ? 0 : 1
    }

    this.setGoodsCollection(data).then(res => {
      // console.log(res)
      this.setData({
        'goodsDetail.is_like': data.type
      })
    })
  },

  bindchangeHandle(e) {
    // console.log(e)
    this.setData({
      currentSwiperIndex: e.detail.current + 1
    })
  },
  // 更新购物车数量
  updateCartHandle(e) {
    // console.log(e)
    this.getGoodsDetail({
      id: this.data.goods_id
    }).then(res => {
      this.setData({
        goodsDetail: res.data
      })

      // 更新上一个页面购物车数据(这里主要是购物车页面的猜你喜欢的购物车数量)
      this.updatePrevpageData(this.data.goods_id, res.data.cart_number)
    })
  },
  // 更新上一个页面购物车数据
  updatePrevpageData(id, num) {
    // 在提交成功后，返回上一页（带上参数）
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.data.recommendList.cache.forEach((it, index) => {
      if (id == it.id) {
        prevPage.setData({
          [`recommendList.cache[${index}].cart_number`]: num
        })
      }
    })
  },
  /**
   * 图片点击事件
   * */
  previewImg: function (e) {
    const dataset = e.currentTarget.dataset;
    //图片预览，预览后会重新加载onshow方法
    wx.previewImage({
      urls: dataset.urls,
      current: dataset.url, // 当前显示图片的http链接
    })
  },
  getGoodsDetail(data) {
    return new Promise((resolve, reject) => {
      getGoodsDetail(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setGoodsCollection(data) {
    return new Promise((resolve, reject) => {
      setGoodsCollection(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 关闭购物车弹窗
  dropdownMenuCarMaskTap() {
    this.setData({
      ['dialog.car.opened']: 0
    })
  },
  // 唤起购物车弹窗
  awakenCarHandle() {
    // 未资质认证导航至认证页
    if (this.data.userInfo.is_shop_check != 1) {
      wx.navigateTo({
        url: '/pages/mine/certification/certification',
      })
      return false
    }

    this.setData({
      ['dialog.car.opened']: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      id
    } = options

    this.data.goods_id = id

    this.getGoodsDetail({
      id
    }).then(res => {
      this.setData({
        goodsDetail: res.data
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
    query.select('.content').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        contentTop: rect.top,
      })
    }).exec();

    query.select('.footer').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        footerH: rect.height,
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