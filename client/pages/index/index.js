// pages/index/index.js

import {
  setTabBar
} from '../../utils/business'
import config from '../../config/index'
import store from '../../store/common'
import create from '../../utils/create'

import {
  setAddressShopInfo
} from '../../api/location'

import {
  getShopData
} from '../../api/commodity'

import {
  addNumCart
} from '../../api/cart'
let timerSearchObject = null

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: true,

    userInfo: null,

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX isIphone
    tabbarH: null,
    navStatus: 'location',

    // 热门分组 返利推荐 猜你喜欢 热门分组
    tabbar: [], //[热门分组 返利推荐 猜你喜欢 热门分组],
    tabIndex: 0,
    tabWidth: null,
    // swiper
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    autoplay: true,
    duration: 500,

    shopData: {
      // "shop_id": "1",
      // "banner": [{
      //     "id": 8,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner7",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   },
      //   {
      //     "id": 7,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner7",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   },
      //   {
      //     "id": 6,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner6",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   },
      //   {
      //     "id": 5,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner5",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   },
      //   {
      //     "id": 4,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner4",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   },
      //   {
      //     "id": 1,
      //     "type": 1,
      //     "link_type": 1,
      //     "name": "banner1",
      //     "image_url": "https://sharepuls.xcmbkj.com/app_memu_1.png",
      //     "link": ""
      //   }
      // ],
      // "category": [{
      //     "id": 2,
      //     "name": "分类2",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?"
      //   },
      //   {
      //     "id": 1,
      //     "name": "分类1",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?1"
      //   },
      //   {
      //     "id": 3,
      //     "name": "分类3",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?"
      //   }
      // ],
      // "pre_goods": [{
      //     "id": 2,
      //     "goods_name": "商品2",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "spec": "",
      //     "is_pre_sale": 1,
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "cart_number": 0,
      //     "stock": 0,
      //     "activity_info": []
      //   },
      //   {
      //     "id": 10,
      //     "goods_name": "商品10",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "spec": "",
      //     "is_pre_sale": 1,
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "cart_number": 0,
      //     "stock": 0,
      //     "activity_info": []
      //   }
      // ],
      // "activity_goods": [{
      //   "id": 2,
      //   "name": "限时抢购",
      //   "short_name": "很好",
      //   "type": 2,
      //   "start_time": 1638950997,
      //   "end_time": 1658950997,
      //   "goods_list": [{
      //     "id": 3,
      //     "goods_name": "商品3",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "spec": "",
      //     "is_pre_sale": 0,
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "cart_number": 0,
      //     "stock": 0,
      //     "activity_info": {
      //       "activity_id": 2,
      //       "activity_name": "限时抢购",
      //       "short_name": "很好",
      //       "type": 2,
      //       "start_time": 1638950997,
      //       "end_time": 1658950997
      //     }
      //   }]
      // }],
      // "group_goods": [{
      //   "id": 1,
      //   "name": "商品分组1",
      //   "goods_list": [{
      //     "id": 1,
      //     "goods_name": "商品1",
      //     "price": 0,
      //     "market_price": "100.00",
      //     "spec": "",
      //     "is_pre_sale": 0,
      //     "is_vip": 1,
      //     "is_sale": 0,
      //     "is_shop_check": 0,
      //     "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //     "cart_number": 0,
      //     "stock": 0,
      //     "activity_info": {
      //       "activity_id": 2,
      //       "activity_name": "限时抢购",
      //       "short_name": "很好",
      //       "type": 2,
      //       "start_time": 1638950997,
      //       "end_time": 1658950997
      //     }
      //   }]
      // }],
      // "shop_type_goods": [{
      //     "id": 4,
      //     "name": "子分类1",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
      //     "goods_list": [{
      //         "id": 4,
      //         "goods_name": "商品4",
      //         "price": 0,
      //         "market_price": "100.00",
      //         "spec": "",
      //         "is_pre_sale": 0,
      //         "is_vip": 1,
      //         "is_sale": 0,
      //         "is_shop_check": 0,
      //         "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //         "cart_number": 0,
      //         "stock": 0,
      //         "activity_info": []
      //       },
      //       {
      //         "id": 8,
      //         "goods_name": "商品8",
      //         "price": 0,
      //         "market_price": "100.00",
      //         "spec": "",
      //         "is_pre_sale": 0,
      //         "is_vip": 1,
      //         "is_sale": 0,
      //         "is_shop_check": 0,
      //         "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //         "cart_number": 0,
      //         "stock": 0,
      //         "activity_info": []
      //       },
      //       {
      //         "id": 9,
      //         "goods_name": "商品9",
      //         "price": 0,
      //         "market_price": "100.00",
      //         "spec": "",
      //         "is_pre_sale": 0,
      //         "is_vip": 1,
      //         "is_sale": 0,
      //         "is_shop_check": 0,
      //         "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //         "cart_number": 0,
      //         "stock": 0,
      //         "activity_info": []
      //       },
      //       {
      //         "id": 10,
      //         "goods_name": "商品10",
      //         "price": 0,
      //         "market_price": "100.00",
      //         "spec": "",
      //         "is_pre_sale": 1,
      //         "is_vip": 1,
      //         "is_sale": 0,
      //         "is_shop_check": 0,
      //         "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //         "cart_number": 0,
      //         "stock": 0,
      //         "activity_info": []
      //       }
      //     ]
      //   },
      //   {
      //     "id": 5,
      //     "name": "子分类2",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
      //     "goods_list": [{
      //       "id": 5,
      //       "goods_name": "商品5",
      //       "price": 0,
      //       "market_price": "100.00",
      //       "spec": "",
      //       "is_pre_sale": 0,
      //       "is_vip": 1,
      //       "is_sale": 0,
      //       "is_shop_check": 0,
      //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //       "cart_number": 0,
      //       "stock": 0,
      //       "activity_info": []
      //     }]
      //   },
      //   {
      //     "id": 6,
      //     "name": "子分类3",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
      //     "goods_list": [{
      //       "id": 6,
      //       "goods_name": "商品6",
      //       "price": 0,
      //       "market_price": "100.00",
      //       "spec": "",
      //       "is_pre_sale": 0,
      //       "is_vip": 1,
      //       "is_sale": 0,
      //       "is_shop_check": 0,
      //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //       "cart_number": 0,
      //       "stock": 0,
      //       "activity_info": []
      //     }]
      //   },
      //   {
      //     "id": 7,
      //     "name": "子分类4",
      //     "icon": "https://sharepuls.xcmbkj.com/app_memu_1.png?",
      //     "goods_list": [{
      //       "id": 7,
      //       "goods_name": "商品7",
      //       "price": 0,
      //       "market_price": "100.00",
      //       "spec": "",
      //       "is_pre_sale": 0,
      //       "is_vip": 1,
      //       "is_sale": 0,
      //       "is_shop_check": 0,
      //       "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
      //       "cart_number": 0,
      //       "stock": 0,
      //       "activity_info": []
      //     }]
      //   }
      // ]
    },
    // 分组有分页时需要
    // groupGoods: [
    //   {
    //     cache: [], //couponNouseCache 未使用
    //     count: 1,
    //     total_page: 1,
    //   },
    //   {
    //     cache: [], //couponNouseCache 未使用
    //     count: 1,
    //     total_page: 1,
    //   }
    // ]
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        console.log(nv)
        // this.getOrderList({
        //   status: this.parseStatus(nv)
        // })

      },
      // immediate: true
    },
    currentAddress: {
      handler(nv, ov, obj) {
        // console.log(nv)
        // 用用户授权地址换取店铺id
        this.setAddressShopInfo(nv).then(res => {
          // console.log(res)
          this.store.data.shop_id = res.data.shop_id
          this.update()
          this.setData({
            shop_id: res.data.shop_id
          })
          // 通过shop_id获取商城商品
        }).catch(err => {
          console.log('err' + err)
          // 出现异常或当前地址没有符合店铺
          this.store.data.shop_id = 0
          this.update()
          this.setData({
            shop_id: 0
          })
        })
      },
      deep: true
    },
    shop_id: {
      handler(nv, ov, obj) {
        console.log(nv)
        // 用用户授权地址换取店铺id
        clearTimeout(timerSearchObject)
        timerSearchObject = setTimeout(() => {
          if (nv) {
            if (!this.data.section1H) {
              const that = this;
              const query = wx.createSelectorQuery();
              query.select('.section1').boundingClientRect(function (rect) {
                that.setData({
                  section1H: rect.height,
                })
              }).exec();
            }

            this.getShopData({
              shop_id: nv
            }).then(res => {
              // console.log(res)
              this.setData({
                shopData: res.data,
              })
            })
          }
        }, 1000)
      },
      deep: true
    },
    // compatibleInfo: {
    //   handler(nv, ov, obj) {
    //     // console.log(nv)
    //     // console.log(ov)
    //     // console.log(obj)
    //     // 多次触发，执行一次
    //     clearTimeout(timerSearchObject)
    //     timerSearchObject = setTimeout(() => {
    //       const requireSearchObject = this.store.data.searchObject
    //       requireSearchObject.forEach(item => {
    //         if (item.tag === obj.tag)
    //           item = obj
    //       })
    //       console.log(requireSearchObject)
    //       this.setData({
    //         conditionTag: requireSearchObject,
    //       })
    //     }, 200)
    //   },
    //   deep: true
    // }
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
  },
  searchHandle() {
    console.log('searchHandle')
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  toSearchResHandle() {
    console.log('toSearchResHandle')
    wx.navigateTo({
      url: '/pages/search/searchRes',
    })
  },
  // 跳转至分类页面
  toCategoryHandle(e) {
    this.store.data.currentFirstCategoryId = e.currentTarget.dataset.item.id
    this.update()

    wx.switchTab({
      url: '/pages/category/category',
    })
  },
  // 去搜索结果页
  activityHandle(e) {
    const activity_id = e.currentTarget.dataset.activity_id
    wx.navigateTo({
      url: `/pages/search/searchRes?activity_id=${activity_id}`,
    })
  },
  //跳转至商品详情页
  toGoodsDetail(e) {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    wx.navigateTo({
      url: `/pages/goods/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  checkAuth() {
    if (!this.store.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.store.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  // 加入购物车
  addArtHandle(e) {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    const item = e.currentTarget.dataset.item
    let myData = {
      type: 1,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.cart_number + 1
    }
    this.addNumCart(myData).then(res => {
      // 更新详情页购物车数据
      this.getShopData({
        shop_id: this.store.data.shop_id
      }).then(res => {
        // console.log(res)
        wx.showToast({
          icon: 'none',
          title: '加入购物车成功',
        })

        this.setData({
          shopData: res.data
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 点击调用分享功能， 被邀请用户通过分享入口打开小程序并授权登录即被分享者关联为客户
    // 2. 客户不可被其他业务员覆盖关联
    // 3. 业务员身份变为普通用户后， 他所管理的客户可被其他业务员覆盖关联
    const {
      sale_id
    } = options
    if (sale_id) {
      this.store.data.sale_id = sale_id
      this.update()
    }

    getApp().setWatcher(this) //设置监听器

    getApp().getSystemInfoCallback = (res => {
      console.log(res)
      this.setData({
        compatibleInfo: res
      })

      this.store.data.compatibleInfo.systemInfo = res.systemInfo
      this.store.data.compatibleInfo.navHeight = res.navHeight
      this.store.data.compatibleInfo.isIphoneX = res.isIphoneX
      this.store.data.compatibleInfo.isIphone = res.isIphone

      this.update()
    })

    // 定位授权
    this.getLocation()

    //第一次登陆提示json动图 显示一次 来过吗 0 没来过 1 来过
    const jsonAddDialogVisibile = wx.getStorageSync('jsonAddDialogVisibile')
    // console.log(jsonAddDialogVisibile)
    if (!jsonAddDialogVisibile) {
      this.setData({
        jsonAddDialogVisibile: 1
      })
      wx.setStorageSync('jsonAddDialogVisibile', 1)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    const that = this;
    const query = wx.createSelectorQuery();

    setTabBar.call(this)

    setTimeout(() => {

      query.select('.fixed').boundingClientRect(function (rect) {
        that.setData({
          // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
          fixed: rect.height,
        })
      }).exec();

      this.setData({
        tabbarH: this.store.data.compatibleInfo.tabbarH
      })
      console.log(this.data.tabbarH)
    }, 100)

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(this.data.compatibleInfo)
    if (!this.data.compatibleInfo.navHeight) {
      this.setData({
        compatibleInfo: this.store.data.compatibleInfo
      })
    }

    if (this.store.data.currentAddress) {
      this.setData({
        currentAddress: this.store.data.currentAddress
      })
    }

    if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    }
  },
  addNumCart(data) {
    return new Promise((resolve, reject) => {
      addNumCart(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getShopData(data) {
    return new Promise((resolve, reject) => {
      getShopData(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  setAddressShopInfo(data) {
    return new Promise((resolve, reject) => {
      setAddressShopInfo(data).then(res => {
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
    return {
      title: '联合快采，省时省心更省钱',
      //两种情况 商品详情,帮卖商品详情
      path: 'pages/index/index',
      imageUrl: '/assets/images/share2.jpg',
      success(res) {
        console.log('分享成功', res)
      },
      fail(res) {
        console.log(res)
      }
    }
  },
  getLocation() {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${config.tencentKey}`,
          success: res => {
            console.log(res)
            const result = res.data.result

            that.store.data.currentAddress = {
              address: result.formatted_addresses.recommend,
              longitude: result.location.lng,
              latitude: result.location.lat,
              type: 2, //1:通过地址选择 2:首页选择地址
            }
            that.store.data.location = result
            that.update()

            that.setData({
              currentAddress: that.store.data.currentAddress
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
        that.setData({
          location: {
            formatted_addresses: {
              recommend: '定位失败'
            }
          }
        })
      },
      complete: function () {
        console.log('complete')
      }
    })
  }
})