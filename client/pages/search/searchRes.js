// pages/search/searchRes.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getGoodsList,
  getKeyList
} from '../../api/commodity'

import {
  getCartData,
  addNumCart
} from '../../api/cart'

let timer
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    visibileSearchDialog: false, //搜索列表

    userInfo: null,
    navigationBarTitleText: '搜索',
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX

    tabbar: ['综合', '销量', '价格'],
    tabIndex: 0, //0:综合 1:销量 2:价格
    // tabWidth: null,
    goodsList: [{
      cache: [
        //   {
        //   "id": 3,
        //   "goods_name": "商品3",
        //   "price": "40.00",
        //   "market_price": "100.00",
        //   "is_pre_sale": 0,
        //   "goods_content": "商品详情3",
        //   "spec": "10g",
        //   "is_vip": 0,
        //   "is_sale": 1,
        //   "is_shop_check": 1,
        //   "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
        //   "cart_number": 0
        // }
      ], //综合
      count: 1,
      total_page: 1,
    }, {
      cache: [], //销量
      count: 1,
      total_page: 1
    }, {
      cache: [], //价格
      count: 1,
      total_page: 1,
    }],
    page: 1,
    page_size: 10,
    currentPriceSort: null, //3:价格从高到底 4:价格从低到高

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
  watch: {
    goodsList: {
      handler(nv, ov, obj) {
        console.log(nv)
        if (nv.length) {
          const that = this;
          const query = wx.createSelectorQuery();
          query.select('.scroll-box').boundingClientRect(function (rect) {
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
  toArtHandle() {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    wx.switchTab({
      url: '/pages/shopping/shopping',
    })
  },
  addArtHandle(e) {
    // 检查授权状态
    // 未授权
    if (!this.checkAuth()) return

    const item = e.currentTarget.dataset.item
    let myData = {
      type: item.type ? item.type : 1,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.cart_number + 1
      // goods_num: 1
    }
    this.addNumCart(myData).then(
      res => {
        // 更新大购物车数量（顶部）
        getCartData({
          shop_id: this.store.data.shop_id
        }).then(res => {
          let cart_number = 0
          res.data.list.forEach(item => {
            cart_number += item.cart_number
          })

          this.setData({
            cart_number
          })
        })

        // 更新小购物车数量
        this.data.goodsList[this.data.tabIndex].cache.some((it, index) => {
          if (it.id === item.id) {
            it.cart_number += 1
            this.setData({
              [`goodsList[${this.data.tabIndex}].cache[${index}]`]: it
            })
            return true
          }
          return false
        })

        wx.showToast({
          icon: 'none',
          title: '加入购物车成功',
        })
      }
    )
  },
  // 搜索框获取焦点
  focusHandle(e) {
    var val = e.detail.value;

    if (val.trim()) {
      this.inputHandle(e)
    }
  },
  // 搜索框失去获取焦点
  blurHandle(e) {
    // this.setData({
    //   visibileSearchDialog: false
    // })
  },
  closeHandle(e) {
    console.log('closeHandle')
    this.setData({
      searchKeyword: '',
      visibileSearchDialog: false
    })
  },
  inputHandle(e) {
    console.log(e)
    var val = e.detail.value;
    if (!val.trim()) {
      // 搜索框为空并且显示列表时隐藏搜索列表
      if (this.data.visibileSearchDialog) {
        this.setData({
          visibileSearchDialog: !this.data.visibileSearchDialog
        })
      }
      return ''
    }

    const _this = this

    if (!this.data.visibileSearchDialog) {
      this.setData({
        searchKeyword: val,
        visibileSearchDialog: true
      })
    } else {
      this.setData({
        searchKeyword: val,
      })
    }


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
  // 点击搜索出的关键字
  keyTapHandle(e) {
    this.setData({
      searchKeyword: e.currentTarget.dataset.search_name,
      visibileSearchDialog: false
    })

    this.getGoodsList()

    // 保存搜索记录
    this.saveSearchHandle({
      name: e.currentTarget.dataset.search_name
    })
  },
  bindconfirmHandle(e) {
    // if (!this.data.searchKeyword.trim()) {
    //   wx.showToast({
    //     title: '搜索内容不能为空',
    //     icon: 'none'
    //   })
    //   return false
    // }
    this.setData({
      searchKeyword: e.detail.value,
      visibileSearchDialog: false,
      [`goodsList[${this.data.tabIndex}].count`]: 1
    })

    this.getGoodsList()

    // this.store.data.searchKeyword = this.data.searchKeyword
    // this.update()

    // 保存搜索记录
    this.saveSearchHandle({
      name: this.data.searchKeyword
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
  cartClickHandle() {
    console.log('cartClickHandle')
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index

    let objData = {
      tabIndex: index,
    }
    console.log(index)
    if (this.data.goodsList[index].count > 1) {
      objData[[`goodsList[${index}].count`]] = 1
    }
    this.setData(objData)

    this.getGoodsList()

  },
  typeParse(index) {
    let type
    if (index === 0) {
      type = 0
      this.setData({
        currentPriceSort: null
      })
    } else if (index === 1) {
      type = 1
      this.setData({
        currentPriceSort: null
      })
    } else if (index === 2) {
      if (!this.data.currentPriceSort) {
        type = 3
        this.setData({
          currentPriceSort: type
        })
      } else if (this.data.currentPriceSort === 3) {
        type = 4
        this.setData({
          currentPriceSort: type
        })
      } else {
        type = 3
        this.setData({
          currentPriceSort: type
        })
      }
    }
    return type
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
  addNumCart(data) {
    return new Promise((resolve, reject) => {
      addNumCart(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getGoodsList(dataObj) {
    const tempData = {
      category_id: this.data.category_id,
      keyword: this.data.searchKeyword,
      activity_id: this.data.activity_id, //活动
      page_size: this.data.page_size,
      page: this.data.goodsList[this.data.tabIndex].count
    }
    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    tempData.order_by_type = this.typeParse(this.data.tabIndex)

    return new Promise((resolve, reject) => {
      getGoodsList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.goodsList[this.data.tabIndex].cache.push(...res.data.data)
          this.setData({
            [`goodsList[${this.data.tabIndex}].cache`]: this.data.goodsList[this.data.tabIndex].cache,
            [`goodsList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.goodsList)
        } else {
          this.setData({
            // 测试数据
            // [`goodsList[${this.data.tabIndex}].cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            // [`goodsList[${this.data.tabIndex}].cache`]: [],
            [`goodsList[${this.data.tabIndex}].cache`]: res.data.data,
            [`goodsList[${this.data.tabIndex}].total_page`]: res.data.last_page
          })
          console.log(this.data.goodsList[this.data.tabIndex].cache)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let goodsList = this.data.goodsList

    if (goodsList[this.data.tabIndex].count + 1 > goodsList[this.data.tabIndex].total_page) return

    this.setData({
      [`goodsList[${this.data.tabIndex}].count`]: ++goodsList[this.data.tabIndex].count
    })

    // this.getGoodsList('scrollToLower').then(res => {
    //   goodsList.cache.push(...res.data.data)
    //   this.setData({
    //     [`goodsList.cache`]: goodsList.cache
    //   })
    // })
    this.getGoodsList('scrollToLower')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器

    const {
      keyword,
      activity_id,
      category_id
    } = options

    // console.log(keyword)
    this.setData({
      activity_id: activity_id ? activity_id : '',
      searchKeyword: keyword ? keyword : '',
      category_id: category_id ? category_id : ''
    })

    // this.data.searchKeyword = keyword
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();

    query.select('.section1').boundingClientRect(function (rect) {
      that.setData({
        listH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.bottom
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

    getCartData({
      shop_id: this.store.data.shop_id
    }).then(res => {
      let cart_number = 0
      res.data.list.forEach(item => {
        cart_number += item.cart_number
      })

      this.setData({
        cart_number
      })

      // 更新分类信息(主要是购物车数量)goodsList
      if (this.data.goodsList[this.data.tabIndex].cache.length) {
        if (res.data.list.length) {
          this.data.goodsList[this.data.tabIndex].cache.forEach((item, index) => {
            const ress = res.data.list.some(it => {
              if (item.id === it.id) {
                this.setData({
                  [`goodsList[${this.data.tabIndex}].cache[${index}].cart_number`]: it.cart_number
                })
                return true
              }
              return false
            })

            if (!ress) {
              this.setData({
                [`goodsList[${this.data.tabIndex}].cache[${index}].cart_number`]: 0
              })
            }
          })
        } else {
          // 购物车为空，全部清零
          this.data.goodsList[this.data.tabIndex].cache.forEach((item, index) => {
            this.setData({
              [`goodsList[${this.data.tabIndex}].cache[${index}].cart_number`]: 0
            })
          })
        }
      }
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