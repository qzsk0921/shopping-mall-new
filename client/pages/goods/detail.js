// pages/goods/detail.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  getGoodsDetail,
  setGoodsCollection
} from '../../api/commodity'

import {
  getCartData
} from '../../api/cart'
let prevPage = null

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    isOverShare: 1,
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
      "id": 538,
      "goods_name": "测试",
      "brand_id": 1,
      "category_id": 6,
      "goods_banner": "[\"https:\\/\\/retailers-qn.xcmbkj.com\\/admin\\/goods\\/shop_adm_2022-03-295856.png\"]",
      "goods_image": "[\"https:\\/\\/retailers-qn.xcmbkj.com\\/admin\\/goods\\/shop_adm_2022-03-295843.png\"]",
      "goods_content": "测试笔",
      "unit_id": 2,
      "sort": 1,
      "is_pre_sale": 0,
      "pay_delivery_day": 12,
      "price": "3.00",
      "cost_price": "2.00",
      "market_price": "3.00",
      "sale_number": 0,
      "status": 2,
      "create_time": 1648549325,
      "is_multi_unit": 1,
      "delivery_type": 1,
      "original_price": "2.00",
      "activity_info": [],
      "goods_banner_arr": [
        "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png"
      ],
      "goods_image_arr": [
        "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295843.png"
      ],
      "brand_name": "品牌1",
      "is_like": 0,
      "spec": "单位二",
      "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      "attribute": {
        "attribute_arr": [{
            "attribute_id": 1,
            "attribute_name": "色值",
            "attribute_value_arr": [{
                "id": 39,
                "name": "蓝色"
              },
              {
                "id": 40,
                "name": "红色"
              }
            ]
          },
          {
            "attribute_id": 3,
            "attribute_name": "测试",
            "attribute_value_arr": [{
              "id": 45,
              "name": "12"
            }]
          },
          {
            "attribute_id": 4,
            "attribute_name": "帽子",
            "attribute_value_arr": [{
              "id": 47,
              "name": "大"
            }]
          }
        ],
        "stock_arr": {
          "39,45,47": {
            "price": "2.00",
            "stock": 2,
            "cart_number": 0,
            "attribute_value_name": "蓝色-12-大"
          },
          "40,45,47": {
            "price": "3.00",
            "stock": 5,
            "cart_number": 0,
            "attribute_value_name": "红色-12-大"
          }
        }
      },
      "shop_info": {
        "name": "厦门会展中心",
        "leader_phone": "13559570109",
        "address": "福建省厦门市思明区软件园二期望海路10号楼之二,302-1室",
        "latitude": 24.488806,
        "longitude": 118.182724
      },
      "attribute_value_name": "蓝色-12-大"
    },

    dialog: {
      car: {
        // 点击购物车，多规格
        opened: 0
      },
    }, // 弹窗和下拉窗
  },
  // 拨打电话
  callHandle(e) {
    wx.makePhoneCall({
      phoneNumber: this.data.goodsDetail.shop_info.leader_phone,
    })
  },
  // 查看地址
  addressHandle() {
    wx.openLocation({
      // latitude: 24.44579,
      // longitude: 118.08243
      latitude: this.data.goodsDetail.shop_info.latitude,
      longitude: this.data.goodsDetail.shop_info.longitude
    })
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

      const one_cart_number = res.data.unit_arr.filter(item => item.is_min_number)[0].cart_number

      // 更新上一个页面购物车数据(这里主要是购物车页面的猜你喜欢的购物车数量)
      this.updatePrevpageData(this.data.goods_id, res.data.cart_number, one_cart_number)
    })
  },
  // 更新上一个页面购物车数据
  updatePrevpageData(id, num, one_number) {
    // 在提交成功后，返回上一页（带上参数）
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    // 购物车页面
    if (prevPage.route === 'pages/shopping/shopping') {
      prevPage.data.recommendList.cache.forEach((it, index) => {
        if (id == it.id) {
          prevPage.setData({
            [`recommendList.cache[${index}].cart_number`]: num,
            [`recommendList.cache[${index}].one_cart_number`]: one_number
          })
        }
      })
    } else if (prevPage.route === 'pages/category/category' || prevPage.route === 'pages/search/searchRes' || prevPage.route === 'pages/mine/history/history') {
      getCartData({
        shop_id: this.store.data.shop_id
      }).then(res => {
        // let arr = []
        // for (let i = 0; i < res.data.list.length; i++) {
        //   for (let j = i + 1; j < res.data.list.length; j++) {
        //     if (res.data.list[i].id === res.data.list[j].id) {
        //       res.data.list[j].cart_number = res.data.list[i].cart_number += res.data.list[j].cart_number
        //     }
        //   }
        // }
        this.store.data.cart = res.data.list
        this.update()

        if (prevPage.route === 'pages/category/category') {
          // 更新分类信息(主要是购物车数量)
          prevPage.data.currentGoodsList.cache.forEach((it, index) => {
            if (id == it.id) {
              prevPage.setData({
                [`currentGoodsList.cache[${index}].cart_number`]: num,
                [`currentGoodsList.cache[${index}].one_cart_number`]: one_number
              })
            }
          })
        } else if (prevPage.route === 'pages/search/searchRes') {
          // 更新分类信息(主要是购物车数量)goodsList
          prevPage.data.goodsList[prevPage.data.tabIndex].cache.forEach((it, index) => {
            if (id == it.id) {
              prevPage.setData({
                [`goodsList[${prevPage.data.tabIndex}].cache[${index}].cart_number`]: num,
                [`goodsList[${prevPage.data.tabIndex}].cache[${index}].one_cart_number`]: one_number
              })
            }
          })
        } else if (prevPage.route === 'pages/mine/history/history') {
          // 更新分类信息(主要是购物车数量)
          prevPage.data.historyList.cache.forEach((it, index) => {
            if (id == it.id) {
              prevPage.setData({
                [`historyList.cache[${index}].cart_number`]: num,
                [`historyList.cache[${index}].one_cart_number`]: one_number
              })
            }
          })
        }
      })
    }
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
  // 参与拼团
  pinHandle() {
    // 授权校验
    if (!this.checkAuth()) return

    this.setData({
      ['dialog.car.opened']: 1,
      'bargaining': 1
    })
  },
  // 唤起购物车弹窗
  awakenCarHandle() {
    // 未资质认证导航至认证页
    // if (this.data.userInfo.is_shop_check != 1) {
    //   wx.navigateTo({
    //     url: '/pages/mine/certification/certification',
    //   })
    //   return false
    // }

    // 授权校验
    if (!this.checkAuth()) return

    this.setData({
      ['dialog.car.opened']: 1
    })
  },
  // 授权检查
  checkAuth() {
    if (!this.data.userInfo.avatar_url) {
      // 未授权先去授权页
      wx.navigateTo({
        url: '/pages/authorization/identity',
      })
      return false
    } else if (!this.data.userInfo.phone) {
      // 授权昵称头像还未授权手机号
      wx.navigateTo({
        url: '/pages/authorization/phone',
      })
      return false
    }
    return true
  },
  // 拼团规则 
  collapseHandle() {
    this.setData({
      collapse: !this.data.collapse
    })
  },
  // 查看拼团成员
  toGroupbargainMemberlistHandle() {
    wx.navigateTo({
      url: `/pages/groupbargain/memberList?goods_group_bargaining_team_id=${this.data.goodsDetail.bargaining_info.id}`,
    })
  },
  shareHandle() {
    // 1. 用户身份为团长时， 底部按钮如图所示，
    // 点击发起拼团， 调起微信分享功能（ 特殊情况： 活动有效期小于拼团
    // 有效期时， 提示弹窗， 如图1）
    // 2. 用户身份不为团长时， 点击提示弹窗， 如图2
    // 4. 用户点击分享的拼团， 绑定该分享的团长， 直至拼团成功或解散
    // 5. 每次发起拼团， 扣除最大购买资格数的库存， 若自然解散， 再补回库存
    // 6. 若库存不足时， toast: 库存不足， 正在抓紧补货， 请稍后再试
    // 7. 用户身份为团长， 没有特殊情况时， 点击发起拼团， 提示弹窗， 如图3
    if (this.data.userInfo.is_captain) {
      if (this.data.goodsDetail.end_time < this.data.goodsDetail.bargaining_info.bargaining_expire_time) {
        // 活动有效期小于拼团有效期时
        wx.showModal({
          title: '温馨提示',
          content: '离该拼团活动结束剩余xx小时，此次发起拼团有效期仅剩余xx小时该商品佣金收成比例为5%，拼团成功预计可获得佣金xxx元',
          confirmText: '发起',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        return false
      } else {
        // 用户身份为团长， 没有特殊情况时
        wx.showModal({
          title: '温馨提示',
          content: '该商品佣金收成比例为5%，拼团成功预计可获得佣金xxx元',
          confirmText: '发起',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您还需参与x次拼团，即可晋升为团长，享受团长发起拼团，拼成得佣金的权益',
        confirmText: '发起',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let param = {}
    const {
      id,
      goods_group_bargaining_team_id,
      scene
    } = options

    // 拼团分享
    if (scene) {
      // const scene = decodeURIComponent(options.scene).substr(1)
      const scene = decodeURIComponent(options.scene)
      // console.log(scene)
      //scene=order_id=84&user_type=1
      //id=31&first_id=110&share_id=110
      if (scene && scene != 'undefined') {
        scene.split('?')[1].split('&').forEach(it => {
          const i = it.split('=')
          param[i[0]] = i[1]
        })
      } else {
        param = options
      }
    } else {
      if (id) {
        param.id = id
        this.data.goods_id = id
      }

      // 拼团商品
      if (goods_group_bargaining_team_id) {
        param.goods_group_bargaining_team_id = goods_group_bargaining_team_id
      }
    }

    this.setData(param)

    this.getGoodsDetail(param).then(res => {
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
    const pages = getCurrentPages()
    prevPage = pages[pages.length - 2]; //上一个页面

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
  onShareAppMessage: async function (e) {
    if (e.from === 'button') {
      const res = this.shareHandle()
      if (!res) return
      // 发起拼团
      return {
        title: `${this.data.goodsDetail.brand_name}`,
        path: `/pages/goods/detail?id=${this.data.goodsDetail.id}&goods_group_bargaining_team_id=${this.data.goodsDetail.bargaining_info.id}`, //若无path 默认跳转分享页
        imageUrl: `${this.data.goodsDetail.goods_image_arr}`, //若无imageUrl 截图当前页面
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    } else {
      return {
        title: `${this.data.goodsDetail.brand_name}`,
        path: `/pages/goods/detail?id=${this.data.goodsDetail.id}`, //若无path 默认跳转分享页
        imageUrl: `${this.data.goodsDetail.goods_image_arr}`, //若无imageUrl 截图当前页面
        success(res) {
          console.log('分享成功', res)
        },
        fail(res) {
          console.log(res)
        }
      }
    }
  }
})