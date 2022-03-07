// pages/location/index/index.js
import store from '../../../store/common'
import create from '../../../utils/create'
import config from '../../../config/index'
const QQMapWX = require('../../../lib/qqmap-wx-jssdk.js');

import {
  getAddressList,
  setAddressShopInfo,
  checkAddress
} from '../../../api/location'

let qqmapsdk, timer;

// Page({
create(store, {
  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '', //选择收货地址 我的地址
    deliveryAddress: [],

    searchKeyword: '',
    pois: [],

    availablePoi: false, //是否可配送地址

    deliveryAddressBoxH: null, //我的收货地址列表超过高度滚动

    address_id: null,
  },
  watch: {
    navigationBarTitleText: {
      handler(nv, ov, obj) {
        // console.log(nv)
        const that = this;
        const query = wx.createSelectorQuery();
        if (nv === '选择收货地址') {
          setTimeout(function () {
            query.select('.section1').boundingClientRect(function (rect) {
              that.setData({
                listH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.bottom
              })
            }).exec();
          }, 0)
        } else if (nv === '我的地址') {
          console.log('navigationBarTitleText 我的地址')
        }
      }
    },
    deliveryAddress: {
      handler(nv, ov, obj) {
        // console.log(nv)
        // console.log(ov)
        // console.log(obj)
        if (!nv.length) return
        const that = this;
        const query = wx.createSelectorQuery();

        setTimeout(function () {
          query.select('.deliveryAddress-box').boundingClientRect(function (rect) {
            console.log(rect)
            that.setData({
              deliveryAddressBoxH: that.store.data.compatibleInfo.systemInfo.windowHeight - rect.top
            })
          }).exec();
        }, 0)
      }
    },
  },
  inputHandle(e) {
    const _this = this
    // console.log(e)
    this.data.searchKeyword = e.detail.value
    this.setData({
      searchKeyword: e.detail.value
    })

    var val = e.detail.value;
    this.setData({
      addr: val
    })
    clearTimeout(timer);
    timer = setTimeout(function () {
      if (val.length > 0) {
        _this.searchKeyword(val)
      } else {
        //  清空

      }
    }, 400);
  },
  searchKeyword(keyword) {
    // console.log(keyword)
    const vm = this

    let location = null
    if (vm.store.data.location.location) {
      location = {
        latitude: vm.store.data.location.location.lat,
        longitude: vm.store.data.location.location.lng
      }
    }

    // qqmapsdk.search({
    qqmapsdk.getSuggestion({
      keyword, //搜索关键词
      location,
      // location: `${vm.data.latitude},${vm.data.longitude}`,
      // rectangle: `${vm.data.latitude-2},${vm.data.longitude-2},${vm.data.longitude+2},${vm.data.longitude+2}`,
      // auto_extend: '1',
      policy: 1,
      page_size: 20,
      page_index: 1,
      success: function (res) {
        console.log(res, '搜索位置');
        const pois = res.data
        // 可配送范围处理
        // do something
        if (pois.length === 0) return
        vm.setData({
          pois
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },
  poiTapHandle(e) {
    const dataset = e.currentTarget.dataset
    console.log(dataset)

    const myData = {
      address: dataset.item.title,
      longitude: dataset.item.location.lng,
      latitude: dataset.item.location.lat,
      id: dataset.item.id
    }

    // 验证配送范围
    this.checkAddress(myData).then(res => {
      // 在配送范围
      const myyData = {
        address: dataset.item.title,
        longitude: dataset.item.location.lng,
        latitude: dataset.item.location.lat,
        type: 2, //1:通过地址选择 2:首页选择地址
      }
      this.setAddressShopInfo(myyData).then(res => {
        // 在配送范围里跳转到首页，不在配送范围提示
        myyData.address = res.data.address
        this.store.data.currentAddress = myyData
        // this.store.data.location = dataset.item
        this.update()

        wx.switchTab({
          url: '../../index/index',
        })
      })
    })
  },
  // 当前定位地址点击
  locationClickHandle() {
    this.store.data.currentAddress = {
      address: this.data.location.formatted_addresses.recommend,
      longitude: this.data.location.location.lng,
      latitude: this.data.location.location.lat,
      type: 2,
    }
    this.update()

    wx.switchTab({
      url: '../../index/index',
    })
  },
  // 重新定位
  repositionHandle() {
    // console.log('repositionHandle')
    this.getLocation()
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
  },
  // 我的收货地址点击
  addrClickHandle(e) {
    console.log(e)
    // 当前收货地址存后台
    // 请求当前收货地址接口
    // 请求成功
    const dataset = e.currentTarget.dataset
    const type = e.target.dataset.type

    // 编辑按钮不处理
    if (type) return false

    if (this.data.tag === 'cert_of_mine') {
      // 来自资质认证的使用我的地址
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        shopAddress: dataset.item
      })
      wx.navigateBack({
        delta: 0,
      })
    } else if (this.data.tag === 'confirmOrder_of_mine') {
      // 来自确认订单页使用我的地址
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        shopAddress: dataset.item
      })

      // 收货地址存储
      this.store.data.address_id = dataset.item.id
      this.update()

      wx.setStorageSync('address_id', dataset.item.id)

      wx.navigateBack({
        delta: 0,
      })
    } else {
      // 个人中心点击进我的地址
      // 如果是从个人中心那进入的收货地址列表页，点击收货地址，无需做事件详情，不用跳转到首页
      this.store.data.currentAddress = {
        address: dataset.item.name,
        longitude: dataset.item.longitude,
        latitude: dataset.item.latitude,
        type: 1,
        id: dataset.item.id
      }
      // 收货地址存储
      this.store.data.address_id = dataset.item.id
      this.update()

      wx.setStorageSync('address_id', dataset.item.id)

      // wx.switchTab({
      //   url: '../../index/index',
      // })
    }
  },
  addrEditHandle(e) {
    // console.log('addrEditHandle')
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: `/pages/location/add/add?type=edit&id=${id}`,
    })
  },
  addAddrHandle() {
    // 导航至新增收货地址页
    wx.navigateTo({
      url: '../add/add',
    })
  },
  searchClickHandle() {
    console.log('searchClickHandle')
  },
  searchCloseHandle() {
    console.log('searchCloseHandle')
    this.setData({
      searchKeyword: ''
    })
  },
  getAddressList(data) {
    data = data ? data : {}
    return new Promise((resolve, reject) => {
      getAddressList(data).then(res => {
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
  checkAddress(data) {
    return new Promise((resolve, reject) => {
      checkAddress(data).then(res => {
        resolve(res)
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

    qqmapsdk = new QQMapWX({
      key: config.tencentKey
    });

    if (options.from && options.from.includes('mine')) {
      this.setData({
        navigationBarTitleText: '我的地址'
      })

      if (options.from === 'confirmOrder_of_mine') {
        // 来自订单确认页
        this.setData({
          tag: options.from
        })
      } else if (options.from === 'cert_of_mine') {
        this.setData({
          tag: options.from
        })
      }
    } else {
      this.setData({
        navigationBarTitleText: '选择收货地址'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
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

    this.setData({
      location: this.store.data.location,
      address_id: this.store.data.address_id
    })
    // 更新收货地址列表
    this.getAddressList().then(res => {
      this.setData({
        deliveryAddress: res.data.data
        // deliveryAddress: [{
        //   id: 1,
        //   address: '厦门星辰追梦科技有限公司1', //地址
        //   number: '10-2号302-1室', //门牌号
        //   name: '洪先生', //联系人
        //   phone: '14012344321', //手机号
        //   current: 0, //当前使用地址
        // }]
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