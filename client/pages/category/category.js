// pages/category/category.js
import {
  setTabBar
} from '../../utils/business'
import store from '../../store/common'
import create from '../../utils/create'

import {
  getCategoryList,
  getGoodsList
} from '../../api/commodity'

import {
  addNumCart
} from '../../api/cart'

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    categoryOpened: 0, //0收起 1展开
    currentSecondCategoryIndex: 0,
    currentPriceSort: null, //3:价格从高到底 4:价格从低到高
    // priceSort: 1, //1升序 2降序 0空

    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    tabbarH: null,
    navStatus: 'category',

    categoryData: [
      //   {
      //   id: 1,
      //   name: '蔬 菜',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 2,
      //   name: '肉禽蛋品',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 3,
      //   name: '蔬菜3',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 4,
      //   name: '蔬菜4',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 5,
      //   name: '蔬菜5',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 6,
      //   name: '蔬菜6',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 7,
      //   name: '蔬菜7',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 8,
      //   name: '蔬菜8',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 9,
      //   name: '蔬菜9',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 10,
      //   name: '蔬菜10',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 11,
      //   name: '蔬菜11',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }, {
      //   id: 12,
      //   name: '蔬菜12',
      //   url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      // }
    ],
    screenCategory: [{
      // 导航名称
      option: '蔬菜豆制品',
      id: 'a1',
      currentOptionId: '',
      // 该导航下所有的可选项
      content: [{
        type: 1, //预售
        option: '元宝优选调和油20L/捅',
        desc: '商品描述，最多1行，超过显…',
        id: 1,
        price: '13.9',
        originPrice: '25.9',
        store: 1, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2, //新品
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 2,
        price: '13.9',
        originPrice: '25.9',
        store: 0, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2,
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 3,
        price: '13.9',
        originPrice: '25.9',
        store: 23, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }, {
        type: 2,
        option: '阿尔卑斯饮用天然矿泉水500ml*6',
        desc: '商品描述，最多1行，超过显…',
        id: 4,
        price: '13.9',
        originPrice: '25.9',
        store: 0, //库存
        url: 'https://gw.alicdn.com/tps/i1/O1CN01PWx1at1LfLtyRhW1V_!!0-juitemmedia.jpg_140x10000Q75.jpg'
      }]
    }],

    firstCategory: [], //第一分类
    secondCategory: [], //第二分类
    currentFirstCategoryId: '',
    currentSecondCategoryId: '',
    currentGoodsList: {
      cache: [], //综合
      count: 1,
      total_page: 1,
    },

    page: 1,
    page_size: 10,
  },
  watch: {
    currentGoodsList: {
      handler(nv, ov, obj) {
        if (nv) {
          const that = this;
          const query = wx.createSelectorQuery();
          query.select('.tree-select__tip').boundingClientRect(function (rect) {
            // console.log(rect)
            that.setData({
              contentTipH: rect.height,
            })
          }).exec();
        }
      },
      deep: true
    },
    firstCategory: {
      handler(nv, ov, obj) {
        // console.log(nv)
        const that = this;
        setTimeout(() => {
          const query = wx.createSelectorQuery();
          query.select('.section1').boundingClientRect(function (rect) {
            that.setData({
              section1H: rect.height,
            })
          }).exec();
        }, 0)
      },
      deep: true,
      immediate: true
    }
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
    if (!this.checkAuth()) return

    const item = e.currentTarget.dataset.item
    const index = e.currentTarget.dataset.index

    let myData = {
      type: item.type ? item.type : 1,
      shop_id: this.store.data.shop_id,
      goods_id: item.id,
      goods_num: item.cart_number + 1
    }
    this.addNumCart(myData).then(res => {
      // 更新详情页购物车数据
      // this.getGoodsList()
      // 不重新渲染
      wx.showToast({
        icon: 'none',
        title: '加入购物车成功',
      })
      this.setData({
        [`currentGoodsList.cache[${index}].cart_number`]: item.cart_number + 1
      })
    })
  },
  extendHandle() {
    // 展开全部分类
    console.log('extendHandle')
    this.setData({
      categoryOpened: 1
    })
  },
  // 分类展开
  subClickableHandle(e) {
    console.log(e)
    console.log(e.detail)
    // const currentSortObj = e.detail
    this.setData({
      categoryOpened: 0
    })
  },
  dropdownMenuItemTap(e) {
    const clickable = e.target.dataset.clickable
    console.log(e)
    if (!clickable)
      this.setData({
        categoryOpened: 0
      })
  },
  // 切换一级分类
  firstCategoryHandle(e) {
    // console.log(e)
    console.log('firstCategoryHandle')
    const id = e.target.dataset.id

    // 不是分类选项则不执行
    if (!id) return

    this.firstCategorySwitch(id)
  },
  firstCategorySwitch(id) {
    let currentScrollTopId ///content滚动id
    // 滚动居中处理
    const myArr = this.data.firstCategory.map(item => item.id)
    if (myArr.includes(id - 2)) {
      currentScrollTopId = 'a' + (id - 2)
    } else if (myArr.includes(id - 1)) {
      currentScrollTopId = 'a' + (id - 1)
    } else {
      currentScrollTopId = 'a' + id
    }

    this.setData({
      currentFirstCategoryId: id,
      currentScrollTopId,
    })

    this.store.data.currentFirstCategoryId = id
    this.update()

    this.getCategoryList({
      pid: id
    }).then(res => {
      if (res.data.length) {
        this.setData({
          currentSecondCategoryId: res.data[0].id,
          secondCategory: res.data
        })

        if (res.data.length) {
          this.getGoodsList({
            category_id: res.data[0].id
          })
        }
      } else {
        this.setData({
          secondCategory: []
        })
      }
    })
  },
  // 子组件切换一级分类
  subFirstCategoryHandle(e) {
    // console.log('subFirstCategoryHandle')
    const id = e.detail

    // 滚动居中处理
    let currentScrollTopId ///content滚动id
    const myArr = this.data.firstCategory.map(item => item.id)
    if (myArr.includes(id - 2)) {
      currentScrollTopId = 'a' + (id - 2)
    } else if (myArr.includes(id - 1)) {
      currentScrollTopId = 'a' + (id - 1)
    } else {
      currentScrollTopId = 'a' + id
    }

    this.setData({
      currentFirstCategoryId: id,
      currentScrollTopId
    })

    this.getCategoryList({
      pid: id
    }).then(res => {
      if (res.data.length) {
        this.setData({
          currentSecondCategoryId: res.data[0].id,
          secondCategory: res.data
        })

        if (res.data.length) {
          this.getGoodsList({
            category_id: res.data[0].id
          })
        }
      } else {
        this.setData({
          secondCategory: []
        })
      }
    })
  },
  // 切换2级分类
  itemTapHandle(e) {
    // console.log('itemTapHandle')
    const id = e.target.dataset.id
    const index = e.target.dataset.index
    this.setData({
      currentSecondCategoryId: id,
      currentSecondCategoryIndex: index
    })
    this.getGoodsList({
      category_id: id
    })
  },
  changeTab(e) {
    // console.log(e)
    let index = e.target.dataset.index

    if (index == this.data.tabIndex) {
      if (index == 1) {
        index = null
      } else if (index == 2 && this.data.currentPriceSort == 4) {
        index = null
      }
    }

    let objData = {
      tabIndex: index,
    }
    console.log(index)
    if (this.data.currentGoodsList.count > 1) {
      objData[[`currentGoodsList.count`]] = 1
    }
    this.setData(objData)

    this.getGoodsList()

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
  getCategoryList(data) {
    return new Promise((resolve, reject) => {
      getCategoryList(data, 'noload').then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getGoodsList(dataObj) {
    const tempData = {
      page: this.data.currentGoodsList.count,
      page_size: this.data.page_size,
      category_id: this.data.currentSecondCategoryId
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
          this.data.currentGoodsList.cache.push(...res.data.data)
          this.setData({
            [`currentGoodsList.cache`]: this.data.currentGoodsList.cache,
            [`currentGoodsList.total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.currentGoodsList)
        } else {
          this.setData({
            [`currentGoodsList.cache`]: res.data.data,
            [`currentGoodsList.total_page`]: res.data.last_page
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  typeParse(index) {
    let type
    if (!index) {
      type = 0
      this.setData({
        currentPriceSort: null
      })
    } else if (index == 1) {
      type = 2
      this.setData({
        currentPriceSort: null
      })
    } else if (index == 2) {
      if (!this.data.currentPriceSort) {
        type = 3
        this.setData({
          currentPriceSort: type
        })
      } else if (this.data.currentPriceSort == 3) {
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
  goodsDetailHandle(e) {
    if (!this.checkAuth()) return

    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/goods/detail?id=${id}`,
    })
  },
  scrollToLower() {
    console.log(e)
    console.log('scrollToLower')

    let currentGoodsList = this.data.currentGoodsList

    if (currentGoodsList[this.data.tabIndex].count + 1 > currentGoodsList.total_page) return

    this.setData({
      [`currentGoodsList[${this.data.tabIndex}].count`]: ++currentGoodsList[this.data.tabIndex].count
    })

    this.getGoodsList('scrollToLower').then(res => {
      currentGoodsList.cache.push(...res.data.data)
      this.setData({
        [`currentGoodsList.cache`]: currentGoodsList.cache
      })
    })
  },
  calcCategoryW(len) {
    const categoryBoxW = len * 158 + 78
    this.setData({
      categoryBoxW
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().setWatcher(this) //设置监听器

    setTabBar.call(this, {
      selected: 1
    })

    if (!this.data.tabbarH) {
      setTimeout(() => {
        this.setData({
          tabbarH: this.store.data.compatibleInfo.tabbarH
        })
      }, 0)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    const query = wx.createSelectorQuery();
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 首页选择分类定位到对应分类
    if (!this.data.firstCategory.length) {
      this.getCategoryList({
        pid: 0
      }).then(res => {

        this.setData({
          firstCategory: res.data,
          currentFirstCategoryId: res.data[0].id
        })
        // 计算第一分类宽度
        this.calcCategoryW(res.data.length)

        if (this.store.data.currentFirstCategoryId) {
          this.firstCategorySwitch(this.store.data.currentFirstCategoryId)
        } else {
          this.firstCategorySwitch(res.data[0].id)
        }
      })
    } else {
      if (this.store.data.currentFirstCategoryId) {
        this.firstCategorySwitch(this.store.data.currentFirstCategoryId)
      } else {
        this.firstCategorySwitch(this.data.firstCategory[0].id)
      }
    }

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

    // 更新分类信息(主要是购物车数量)
    if (this.data.currentGoodsList.cache.length) {
      if (this.store.data.cart.length) {
        this.data.currentGoodsList.cache.forEach((item, index) => {
          const res = this.store.data.cart.some(it => {
            if (item.id === it.id) {
              this.setData({
                [`currentGoodsList.cache[${index}].cart_number`]: it.cart_number
              })
              return true
            }
            return false
          })

          if (!res) {
            this.setData({
              [`currentGoodsList.cache[${index}].cart_number`]: 0
            })
          }
        })
      } else {
        // 购物车为空，全部清零
        this.data.currentGoodsList.cache.forEach((item, index) => {
          this.setData({
            [`currentGoodsList.cache[${index}].cart_number`]: 0
          })
        })
      }
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