// pages/shopping/shopping.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

import {
  getCartData,
  addNumCart,
  delCart,
  getRecommendList
} from '../../api/cart'

import {
  preOrder
} from '../../api/order'

import {
  getMyCouponList
} from '../../api/coupon'

let timerSearchObject = null,
  btnflag = true //按钮截流

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0, //总计
    discountPrice: 0, //总优惠

    select_all: true, //全选
    checkedIds: [], //选中的id和unit_id  格式[id.unit_id]

    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    tabbarH: null, //tabbar高度
    navigationBarTitleText: '购物车',
    navStatus: 'isEmpty',
    // 购物车商品 优先判断 下架 其次判断 库存
    cartData: {
      cache: [
        // {
        //   "id": 1,
        //   "is_pre_sale": 0,
        //   "goods_name": "商品2",
        //   "price": 10.6,
        //   "market_price": 100.00,
        //   "status": 3,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 0,
        //   "activity_info": [],
        //   "cart_number": 2,
        //   "unit_id": "1",
        //   "type": "1",
        //   "unitName": "1/个",
        //   "is_stock": 0
        // },
        // {
        //   "id": 2,
        //   "is_pre_sale": 1,
        //   "goods_name": "商品1",
        //   "price": 35,
        //   "market_price": 99,
        //   "status": 1,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 10,
        //   "activity_info": {
        //     "activity_id": 1,
        //     "activity_name": "新品上市",
        //     "short_name": "好",
        //     "type": 1,
        //     "start_time": 0,
        //     "end_time": 0
        //   },
        //   "cart_number": 2,
        //   "unit_id": 1,
        //   "type": 2,
        //   "unitName": "1/个",
        //   "is_stock": 1
        // },
        // {
        //   "id": 3,
        //   "is_pre_sale": 1,
        //   "goods_name": "商品1",
        //   "price": 350,
        //   "market_price": 990,
        //   "status": 1,
        //   "spec": "10g",
        //   "is_vip": 1,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "stock": 0,
        //   "activity_info": {
        //     "activity_id": 1,
        //     "activity_name": "新品上市",
        //     "short_name": "好",
        //     "type": 1,
        //     "start_time": 0,
        //     "end_time": 0
        //   },
        //   "cart_number": 1,
        //   "unit_id": "2",
        //   "type": "2",
        //   "unitName": "1/箱",
        //   "is_stock": 0
        // }
      ],
      total: 0,
      coupon_total: 0,
      // count: 1,
      // total_page: 1,
    },

    // 猜你喜欢
    recommendList: {
      cache: [],
      count: 1,
      total_page: 1,
    },
    page: 1,
    page_size: 10,

    refresherEnabled: false,
    triggered: false,
  },
  watch: {
    checkedIds: {
      handler(nv, ov, obj) {
        console.log(nv)
        clearTimeout(timerSearchObject)
        timerSearchObject = setTimeout(() => {
          if (nv.length) {
            let totalPrice = 0
            let discountPrice = 0
            let total = 0 //结算商品数量
            this.data.cartData.cache.forEach(item => {
              if (nv.includes(item.id + '.' + item.unit_id)) {
                // 有库存并且未下架或删除
                if (![2, 3].includes(item.status) && item.is_stock) {
                  if (this.store.data.userInfo.is_vip || this.store.data.userInfo.is_sale) {
                    // 会员
                    totalPrice += (item.price * 1000 * item.cart_number)
                    discountPrice += ((item.market_price * 1000 - item.price * 1000) * item.cart_number)
                  } else {
                    // 非会员
                    totalPrice += (item.market_price * 1000 * item.cart_number)
                  }
                  total += 1
                }
              }
            })

            let tempData = {
              totalPrice,
              discountPrice,
              'cartData.total': total
            }

            if (!this.data.select_all) {
              if (nv.length === this.data.cartData.cache.length) {
                tempData.select_all = true
              }
            }

            this.setData(tempData)
          } else {
            this.setData({
              totalPrice: 0,
              discountPrice: 0,
              'cartData.total': 0
            })
          }
        }, 0)
      },
      // immediate: true
    },
    'cartData.cache': {
      handler(nv, ov, obj) {
        // console.log(obj)

        // 修改购物车数量和修改购物车选择
        // clearTimeout(timerSearchObject)
        // timerSearchObject = setTimeout(() => {
        if (typeof nv === 'object') {
          let totalPrice = 0
          let discountPrice = 0
          let total = 0 //结算商品数量
          nv.forEach((item, index) => {
            // 有库存并且未下架或删除
            if (![2, 3].includes(item.status) && item.is_stock && this.data.checkedIds.includes(item.id + '.' + item.unit_id)) {
              if (this.store.data.userInfo.is_vip || this.store.data.userInfo.is_sale) {
                // 会员
                totalPrice += (item.price * 1000 * item.cart_number)
                discountPrice += ((item.market_price * 1000 - item.price * 1000) * item.cart_number)
              } else {
                // 非会员
                totalPrice += (item.market_price * 1000 * item.cart_number)
              }
              total += 1
            }
          })

          this.setData({
            totalPrice,
            discountPrice,
            'cartData.total': total
          })
        }
        // }, 200)
      },
      deep: true
    }
  },
  //跳转至商品详情页(购物车商品和猜你喜欢商品)
  toGoodsDetail(e) {
    const dataset = e.currentTarget.dataset
    if (!dataset.disabled) return
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    wx.navigateTo({
      url: `/pages/goods/detail?id=${dataset.id}`,
    })
  },
  // 增加商品数量
  addHandle(e) {
    if (btnflag) {
      btnflag = false

      const item = e.currentTarget.dataset.item

      const cartData = {
        type: item.type,
        shop_id: this.store.data.shop_id,
        goods_id: item.id,
        goods_num: Number(item.cart_number) + 1,
        // goods_num: 1, //-1为扣减
        unit_id: item.unit_id
      }
      this.addNumCart(cartData).then(res => {
        this.getCartData()
        // 更新猜你喜欢
        this.data.recommendList.cache.forEach((it, index) => {
          if (item.id === it.id) {
            this.setData({
              [`recommendList.cache[${index}].cart_number`]: ++it.cart_number,
            })
          }

          if (index == this.data.recommendList.cache.length - 1) {
            setTimeout(() => {
              btnflag = true
            }, 300)
          }
        })
      }).catch(err => {
        console.log(err.msg)
        this.getCartData()
        btnflag = true
      })
    }
  },
  // 减少商品数量
  reduceHandle(e) {
    if (btnflag) {
      btnflag = false
      const item = e.currentTarget.dataset.item
      // 不能小于0
      if (item.cart_number - 1 <= -1) return
      const cartData = {
        type: item.type,
        shop_id: this.store.data.shop_id,
        goods_id: item.id,
        goods_num: item.cart_number - 1,
        // goods_num: -1, //-1为扣减
        unit_id: item.unit_id
      }

      this.addNumCart(cartData).then(res => {
        this.getCartData()
        // 更新猜你喜欢
        this.data.recommendList.cache.forEach((it, index) => {
          if (item.id === it.id) {
            this.setData({
              [`recommendList.cache[${index}].cart_number`]: it.cart_number - 1,
              [`recommendList.cache[${index}].one_cart_number`]: it.cart_number - 1
            })
          }

          if (index == this.data.recommendList.cache.length - 1) {
            setTimeout(() => {
              btnflag = true
            }, 250)
          }
        })
      }).catch(err => {
        btnflag = true
      })
    }
  },
  // 输入商品数量
  // inputBlurHandle(e) {
  //   // console.log(e)
  //   const item = e.currentTarget.dataset.item
  //   const index = e.currentTarget.dataset.index
  //   // 购买数量非法恢复原数值
  //   if (e.detail.value < 0) {
  //     this.setData({
  //       [`cartData.cache[${index}].cart_number`]: item.cart_number,
  //     })
  //   } else {
  //     const cartData = {
  //       type: item.type,
  //       shop_id: this.store.data.shop_id,
  //       goods_id: item.id,
  //       goods_num: e.detail.value - 0, //-1为扣减
  //       unit_id: item.unit_id
  //     }

  //     this.addNumCart(cartData).then(res => {
  //       this.setData({
  //         [`cartData.cache[${index}].cart_number`]: e.detail.value,
  //       })
  //     }).catch(err => {
  //       console.log(err.msg)
  //       this.setData({
  //         [`cartData.cache[${index}].cart_number`]: item.cart_number,
  //       })
  //     })
  //   }
  // },
  couponHandle() {
    // 授权校验
    if (!this.checkAuth()) return
    // 资质校验
    if (!this.certCheck()) return

    // 1.有购物券 跳转至我的购物券 2.没购物券 跳转至领券中心页面
    if (this.data.cartData.coupon_total) {
      wx.navigateTo({
        url: '/pages/mine/coupon/coupon',
      })
    } else {
      wx.navigateTo({
        url: '/pages/mine/coupon/center',
      })
    }
  },
  // 生成订单并导航至订单详情页
  confirmationOrderHandle() {
    // 授权校验
    if (!this.checkAuth()) return
    // 资质校验
    if (!this.certCheck()) return

    // if(checkedIds)

    if (!this.data.checkedIds.length) {
      wx.showToast({
        icon: 'none',
        title: '没有选中任何商品',
      })
    } else {

      let orderData = {
        shop_id: this.store.data.shop_id,
        is_use_coupon: 0,
        // coupon_id: null,
        goods: []
      }

      if (this.store.data.address_id) {
        orderData.address_id = this.store.data.address_id
      }
      this.data.cartData.cache.forEach(item => {
        const temp = {
          "goods_id": item.id,
          "goods_num": item.cart_number,
          "type": item.type,
          "is_pre_goods": item.is_pre_sale,
          "unit_id": item.unit_id
        }

        if (this.data.checkedIds.includes(item.id + '.' + item.unit_id)) {
          orderData.goods.push(temp)
        }
      })

      this.preOrder(orderData).then(res => {
        // 进入订单确认页若开通会员返回订单确认页需要更新数据
        getApp().globalData.orderData = orderData

        const pre = JSON.stringify(res.data)

        wx.navigateTo({
          url: `/pages/shop/order/confirmOrder?preData=${pre}`,
        })
      }).catch(err => {
        console.log(err)
        if (err.msg === '地址不存在') {
          wx.removeStorageSync('address_id')
          this.confirmationOrderHandle()
        }
      })
    }
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
  // 资质认证检查
  certCheck() {
    // 若用户没有通过资质认证，显示弹窗如下图
    // 若用户资质认证已申请，待审核，提示弹窗如下图
    // -2:未申请 0:审核中 1:已通过 -1:已删除
    const status = this.store.data.userInfo.is_shop_check
    if (status != 1) {
      // wx.showToast({
      //   icon: 'none',
      //   title: '请先到【个人中心】-【资质认证】提交认证',
      // })
      if (status === -2 || status === 2 || status === -1) {
        // this.setData({
        //   confirmTitle: '温馨提示',
        //   confirmContent: '请进行资质认证后再开通会员',
        //   confirmBgColor: "#FF723A",
        //   confirmDialogVisibile: true,
        //   confirmText: '确定'
        // })
        wx.showToast({
          icon: 'none',
          title: '请先到【个人中心】-【资质认证】提交认证',
        })
      } else if (status === 0) {
        // this.setData({
        //   confirmTitle: '温馨提示',
        //   confirmContent: '资质认证审核中，请等待审核过后再开通会员',
        //   confirmBgColor: "#FF723A",
        //   confirmDialogVisibile: true,
        //   confirmText: '确定'
        // })
        wx.showToast({
          icon: 'none',
          title: '正在审核当中，加急请联系2085025',
        })
      }
      return false
    }
    return true
  },
  // 删除购物车中的商品
  delGoodsHandle(e) {
    // console.log('delGoodsHandle')
    this.setData({
      confirmTitle: '提示',
      confirmContent: '确定要删除该商品吗？',
      confirmBgColor: "#F23D32",
      confirmText: '删除',
      confirmDialogVisibile: true
    })
    const item = e.currentTarget.dataset.item
    const cartData = {
      type: item.type, //1：单单位（列表页面和购物车页面） 2:多单位（商品详情和购物车）3:清空购物车
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      unit_id: item.unit_id
    }
    this.data.tempDelGoodsData = cartData
  },
  diaConfirmHandle(params) {
    this.delCart(this.data.tempDelGoodsData).then(res => {
      // 更新购物车数据
      this.getCartData().then(res => {
        // 更新checkedIds全选按钮
        const checkedIds = this.data.checkedIds.filter((item, index) => {
          return item.split('.')[0] !== this.data.tempDelGoodsData.goods_id && item.split('.')[1] !== this.data.tempDelGoodsData.unit_id
        })

        this.setData({
          checkedIds
        })
      })

      // 更新猜你喜欢的购物车数量
      this.data.recommendList.cache.forEach((it, index) => {
        if (this.data.tempDelGoodsData.goods_id === it.id) {
          this.setData({
            [`recommendList.cache[${index}].cart_number`]: 0
          })
          return true
        }
        return false
      })
    })
  },
  // 单选
  checkboxChange: function (e) {
    //1.3 1表示id 3表示unit_id
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    // const myIds = e.detail.value.map(id => id - 0)
    const myIds = e.detail.value

    let setData = {
      checkedIds: myIds
    }

    if (myIds.length) {
      // 控制全选按钮
      if (myIds.length === this.data.cartData.cache.filter(item =>
          ![2, 3].includes(item.status) && item.is_stock).length) {
        if (!this.data.select_all) setData.select_all = true
      } else {
        if (this.data.select_all) setData.select_all = false
      }
    } else {
      // 控制全选按钮
      setData.select_all = false
    }

    this.setData(setData)
  },
  // 全选与反选
  checkboxAllChange(e) {
    console.log(e)
    const flag = Boolean(e.detail.value.length)

    let arr = []; //存放选中id.unit_id的数组

    // 全选或全不选
    this.data.cartData.cache.forEach(item => {
      // 有库存并且未下架或删除
      if (![2, 3].includes(item.status) && item.is_stock) {
        if (flag) arr = arr.concat(item.id + '.' + item.unit_id)
      }
    })

    this.setData({
      select_all: flag,
      checkedIds: arr
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
  // 加入购物车(猜你喜欢列表的购物车)
  addArtHandle(e) {
    // 授权校验
    if (!this.checkAuth()) return
    const dataset = e.currentTarget.dataset
    let myData = {
      type: dataset.item.type ? dataset.item.type : 1,
      shop_id: this.store.data.shop_id,
      goods_id: dataset.item.id,
      // goods_num: dataset.item.cart_number + 1,
      goods_num: dataset.item.one_cart_number + 1
      // goods_num: 1
    }

    this.addNumCart(myData).then(res => {

      wx.showToast({
        icon: 'none',
        title: '加入购物车成功',
      })

      // 更新购物车数据
      const ress = this.data.cartData.cache.some((item, index) => {
        if (item.id === dataset.item.id && item.unit_id === dataset.item.unit_arr[0].id) {
          this.setData({
            [`cartData.cache[${index}].cart_number`]: dataset.item.cart_number + 1,
            [`cartData.cache[${index}].one_cart_number`]: dataset.item.cart_number + 1,
          })
          return true
        }
        return false
      })

      this.getCartData().then(res => {
        // 购物车需要新增一个商品
        if (!ress) {
          this.setData({
            checkedIds: this.data.checkedIds.length ? this.data.checkedIds.concat([`${dataset.item.id}.${dataset.item.unit_arr[0].id}`]) : [`${dataset.item.id}.${dataset.item.unit_arr[0].id}`]
          })
        }
      })

      // 猜你喜欢 同步数据
      let indexArr = [],
        tempData = {}
      this.data.recommendList.cache.forEach((item, index) => {
        if (item.id === dataset.item.id)
          indexArr.push(index)
      })

      indexArr.forEach(ind => {
        tempData[`recommendList.cache[${ind}].cart_number`] = dataset.item.cart_number + 1
        tempData[`recommendList.cache[${ind}].one_cart_number`] = dataset.item.cart_number + 1
      })

      this.setData(tempData)
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    // let recommendList = this.data.recommendList

    // if (recommendList.count + 1 > recommendList.total_page) return

    // this.setData({
    //   'recommendList.count': ++recommendList.count
    // })

    this.getRecommendList('scrollToLower')
  },
  getCartData(dataObj) {
    const tempData = {
      // page: this.data.cartData.count,
      // page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getCartData(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.cartData.cache.push(...res.data.list)
          this.setData({
            'cartData.cache': this.data.cartData.cache,
          })
        } else {
          this.setData({
            'cartData.cache': res.data.list,
            // 'cartData.total': res.data.total,
            'cartData.coupon_total': res.data.coupon_total
          })
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
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
  delCart(data) {
    return new Promise((resolve, reject) => {
      delCart(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  preOrder(data) {
    return new Promise((resolve, reject) => {
      preOrder(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getRecommendList(dataObj) {
    const tempData = {
      // page: this.data.recommendList.count,
      // page_size: this.data.page_size,
      shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getRecommendList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.recommendList.cache.push(...res.data)
          this.setData({
            'recommendList.cache': this.data.recommendList.cache,
            // 'recommendList.total_page': res.data.last_page
          })
          resolve(res)

          console.log(this.data.recommendList)
        } else {
          this.setData({
            // 测试数据
            // [`recommendList.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            'recommendList.cache': res.data,
            // 'recommendList.total_pag': res.data.last_page
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
    setTabBar.call(this, {
      selected: 2
    })
    if (!this.data.tabbarH) {
      setTimeout(() => {
        this.setData({
          tabbarH: this.store.data.compatibleInfo.tabbarH
        })
      }, 0)
    }

    getApp().setWatcher(this) //设置监听器

    this.getRecommendList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    // query.select('.fixed').boundingClientRect(function (rect) {
    //   that.setData({
    //     fixed: rect.height,
    //   })
    // }).exec();


    query.select('.scroll-box').boundingClientRect(function (rect) {
      that.setData({
        scrollBoxT: rect.top,
      })
    }).exec();

    query.select('.bottom').boundingClientRect(function (rect) {
      that.setData({
        bottomH: rect.height,
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

    // getMyCouponList({
    //   type: 0
    // }).then(res => {
    //   console.log(res)
    //   this.setData({
    //     coupon_total: res.data.data.length
    //   })
    // })

    this.getCartData().then(res => {
      let arr = []

      for (let i = 0; i < res.data.list.length; i++) {
        for (let j = i + 1; j < res.data.list.length; j++) {
          if (res.data.list[i].id === res.data.list[j].id) {
            res.data.list[j].cart_number = res.data.list[i].cart_number += res.data.list[j].cart_number
          }
        }
      }
      // 全选或全不选 的处理
      res.data.list.forEach(item => {
        // 有库存并且未下架或删除
        if (![2, 3].includes(item.status) && item.is_stock) {
          if (this.data.select_all) arr = arr.concat(item.id + '.' + item.unit_id)
        }

        // 返回该页面更新猜你喜欢的购物车数量
        this.data.recommendList.cache.forEach((it, index) => {
          if (item.id === it.id) {
            this.setData({
              [`recommendList.cache[${index}].cart_number`]: item.cart_number,
            })
          }
        })
      })

      this.setData({
        checkedIds: arr
      })
    })

    // this.getRecommendList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
    this.store.data.cart = this.data.cartData.cache
    this.update()
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