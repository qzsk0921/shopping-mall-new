// pages/mine/writeoff/confirm.js
import store from '../../../store/common'
import create from '../../../utils/create'

create(store, {
  // Page({

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '核销确认',
    orderData: {
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
  onShareAppMessage: function () {

  }
})