// pages/mine/wallet/wallet.js
import store from '../../../store/common'
import create from '../../../utils/create'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    isGrouphead: 1, //是否是团长

    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: '',
    navigationBarTitleText: '钱包',

    options: ['佣金', '幸运奖'],
    optionIndex: 0,
    optionWidth: null,

    withdrawData: {
      count: 1,
      total_page: 1,
      cache: [{
          "id": 14,
          "user_id": 1,
          "sn": "7895051333923597",
          "order_sn": "GOD202112186375",
          "pre_number": "PGOD202112188246",
          "transaction_no": null,
          "goods_money": "2180.00",
          "vip_id": 1,
          "coupon_id": 5,
          "vip_discount": "0.00",
          "coupon_discount": "10.00",
          "pay_money": "2170.00",
          "receiving_name": "黄5",
          "receiving_phone": "13559570108",
          "receiving_address": "行层追梦123432232",
          "status": 0,
          "pay_time": 0,
          "pay_id": 1,
          "remark": "1",
          "address_id": 2,
          "create_time": 1639795631,
          "cancel_time": null,
          "is_delete": 0,
          "delete_time": 0,
          "goods_list": [{
              "id": 4,
              "order_id": 14,
              "goods_id": 2,
              "goods_name": "商品2",
              "market_price": "100.00",
              "price": "10.60",
              "is_pre_goods": 0,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 1,
              "unitName": null,
              "type": 1,
              "create_time": 1639795634,
              "activity_info": []
            },
            {
              "id": 5,
              "order_id": 14,
              "goods_id": 1,
              "goods_name": "商品1",
              "market_price": "990.00",
              "price": "350.00",
              "is_pre_goods": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 2,
              "unitName": null,
              "type": 2,
              "create_time": 1639795634,
              "activity_info": []
            }, {
              "id": 6,
              "order_id": 14,
              "goods_id": 2,
              "goods_name": "商品2",
              "market_price": "100.00",
              "price": "10.60",
              "is_pre_goods": 0,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 1,
              "unitName": null,
              "type": 1,
              "create_time": 1639795634,
              "activity_info": []
            }
          ]
        },
        {
          "id": 15,
          "user_id": 1,
          "sn": "7895051333959899",
          "order_sn": "GOD202112186771",
          "pre_number": "PGOD202112186211",
          "transaction_no": null,
          "goods_money": "2180.00",
          "vip_id": 1,
          "coupon_id": 5,
          "vip_discount": "0.00",
          "coupon_discount": "10.00",
          "pay_money": "2170.00",
          "receiving_name": "黄5",
          "receiving_phone": "13559570108",
          "receiving_address": "行层追梦123432232",
          "status": 2,
          "pay_time": 0,
          "pay_id": 1,
          "remark": "1",
          "address_id": 2,
          "create_time": 1639795770,
          "cancel_time": 1639805855,
          "is_delete": 0,
          "delete_time": 0,
          "goods_list": [{
              "id": 6,
              "order_id": 15,
              "goods_id": 2,
              "goods_name": "商品2",
              "market_price": "100.00",
              "price": "10.60",
              "is_pre_goods": 0,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 1,
              "unitName": null,
              "type": 1,
              "create_time": 1639795770,
              "activity_info": []
            },
            {
              "id": 7,
              "order_id": 15,
              "goods_id": 1,
              "goods_name": "商品1",
              "market_price": "990.00",
              "price": "350.00",
              "is_pre_goods": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 2,
              "unitName": null,
              "type": 2,
              "create_time": 1639795770,
              "activity_info": []
            }
          ]
        },
        {
          "id": 16,
          "user_id": 1,
          "sn": "7895206314089268",
          "order_sn": "GOD202112183547",
          "pre_number": "PGOD202112186973",
          "transaction_no": null,
          "goods_money": "2180.00",
          "vip_id": 1,
          "coupon_id": 5,
          "vip_discount": "0.00",
          "coupon_discount": "10.00",
          "pay_money": "2170.00",
          "receiving_name": "黄5",
          "receiving_phone": "13559570108",
          "receiving_address": "行层追梦123432232",
          "status": 2,
          "pay_time": 0,
          "pay_id": 1,
          "remark": "1",
          "address_id": 2,
          "create_time": 1639806789,
          "cancel_time": 1639807350,
          "is_delete": 0,
          "delete_time": 0,
          "goods_list": [{
              "id": 8,
              "order_id": 16,
              "goods_id": 2,
              "goods_name": "商品2",
              "market_price": "100.00",
              "price": "10.60",
              "is_pre_goods": 0,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 1,
              "unitName": null,
              "type": 1,
              "create_time": 1639806789,
              "activity_info": []
            },
            {
              "id": 9,
              "order_id": 16,
              "goods_id": 1,
              "goods_name": "商品1",
              "market_price": "990.00",
              "price": "350.00",
              "is_pre_goods": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 2,
              "unitName": null,
              "type": 2,
              "create_time": 1639806789,
              "activity_info": []
            }
          ]
        },
        {
          "id": 17,
          "user_id": 1,
          "sn": "7895051314586266",
          "order_sn": "GOD202112187238",
          "pre_number": "PGOD202112181598",
          "transaction_no": null,
          "goods_money": "2180.00",
          "vip_id": 1,
          "coupon_id": 5,
          "vip_discount": "0.00",
          "coupon_discount": "10.00",
          "pay_money": "2170.00",
          "receiving_name": "黄5",
          "receiving_phone": "13559570108",
          "receiving_address": "行层追梦123432232",
          "status": 0,
          "pay_time": 0,
          "pay_id": 1,
          "remark": "1",
          "address_id": 2,
          "create_time": 1639807355,
          "cancel_time": null,
          "is_delete": 0,
          "delete_time": 0,
          "goods_list": [{
              "id": 10,
              "order_id": 17,
              "goods_id": 2,
              "goods_name": "商品2",
              "market_price": "100.00",
              "price": "10.60",
              "is_pre_goods": 0,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 1,
              "unitName": "1/个",
              "type": 1,
              "create_time": 1639807355,
              "activity_info": []
            },
            {
              "id": 11,
              "order_id": 17,
              "goods_id": 1,
              "goods_name": "商品1",
              "market_price": "990.00",
              "price": "350.00",
              "is_pre_goods": 1,
              "thumb": "http://image.wms.wljkxys.com/202009305f742c49a5276.png",
              "goods_num": 2,
              "unit_id": 2,
              "unitName": "1/箱",
              "type": 2,
              "create_time": 1639807355,
              "activity_info": {
                "activity_id": 1,
                "activity_name": "新品上市",
                "short_name": "好",
                "type": 1,
                "start_time": 0,
                "end_time": 0
              }
            }
          ]
        }
      ]
    },
  },
  changeOption(e) {
    const index = e.target.dataset.index
    if (index == this.data.optionIndex) return

    const that = this
    wx.createSelectorQuery().select('.item-box').boundingClientRect(function (rect) {
      console.log(rect.top)
      that.setData({
        scrollT: rect.top,
      })
    }).exec()


    let objData = {
      optionIndex: index,
    }

    this.setData(objData)

    if (index === 0) {

    } else if (index === 1) {}
  },
  // 提现记录
  toWithdrawRecordHandle() {
    wx.navigateTo({
      url: '/pages/mine/wallet/withdrawRecord',
    })
  },
  toMemberlistHandle() {
    // 跳转到拼团人员（没有进度条）
    wx.navigateTo({
      url: '/pages/groupbargain/memberList?member=all',
    })
  },
  toWithdrawHandle() {
    // 提现功能， 根据后台状态进行切换
    // 1. 用户商户号可进行企业打款时， 进入自动提现页面
    // 2. 用户商户号无法进行企业打开时， 进入人工提现 - 联系客服3页面
    // wx.navigateTo({
    //   url: '/pages/mine/wallet/withdrawAuto',
    // })

    wx.navigateTo({
      url: '/pages/mine/wallet/withdrawCustom',
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
    // 在页面渲染完成OnReady回调 获取元素高度时，如果不加定时器，获取的元素的高度还是没渲染完异步数据前的高度
    query.select('.fixed').boundingClientRect(function (rect) {
      // console.log(rect)
      that.setData({
        fixed: rect.height,
      })
    }).exec();

    query.select('.option').boundingClientRect(function (rect) {
      that.setData({
        optionWidth: rect.width,
      })
    }).exec();

    query.select('.query-r1').boundingClientRect(function (rect) {
      that.setData({
        queryr1H: rect.height,
      })
    }).exec();

    query.select('.query-r2').boundingClientRect(function (rect) {
      that.setData({
        queryr2H: rect.height,
      })
    }).exec();

    query.select('.tip-box').boundingClientRect(function (rect) {
      that.setData({
        tipboxH: rect.height,
      })
    }).exec();

    query.select('.query-r4').boundingClientRect(function (rect) {
      that.setData({
        queryr4H: rect.height,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!this.data.isGrouphead) {
      this.setData({
        optionIndex: 1
      })
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