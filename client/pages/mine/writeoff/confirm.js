// pages/mine/writeoff/confirm.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  preWriteoff,
  writeoff
} from '../../../api/writeoff'
create(store, {
  // Page({

  /**
   * 页面的初始数据
   */
  data: {
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '核销确认',
    orderData: {
      // "id": 76,
      // "user_id": 2,
      // "sn": null,
      // "order_sn": "P202204031463",
      // "transaction_no": "",
      // "goods_money": "3.00",
      // "coupon_id": 9,
      // "coupon_discount": "10.00",
      // "pay_money": "0.00",
      // "receiving_name": "黄5",
      // "receiving_phone": "13559570108",
      // "receiving_address": "行层追梦1234",
      // "receiving_address_name": "望海路10号楼",
      // "receiving_address_user_name": "32232",
      // "pay_delivery_day": 12,
      // "status": 1,
      // "pay_time": 1648961510,
      // "pay_id": 1,
      // "remark": "0",
      // "address_id": 2,
      // "create_time": 1648961508,
      // "cancel_time": null,
      // "is_delete": 0,
      // "delete_time": 0,
      // "service_status": 0,
      // "type": 2,
      // "goods_group_bargaining_team_id": 31,
      // "is_captain": 0,
      // "refund_time": 0,
      // "delivery_type": 2,
      // "goods_list": [{
      //   "id": 71,
      //   "order_id": 76,
      //   "goods_id": 538,
      //   "brand_id": 1,
      //   "goods_name": "测试",
      //   "market_price": "3.00",
      //   "price": "10.00",
      //   "is_pre_goods": 0,
      //   "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //   "goods_num": 1,
      //   "attribute_value_str": "39,45,47",
      //   "attribute_value_name": "蓝色-12-大",
      //   "spec": "单位二",
      //   "type": 2,
      //   "create_time": 1648961508,
      //   "activity_info": [],
      //   "category_id": 6
      // }],
      // "order_goods_code": [{
      //     "id": 38,
      //     "code": "G202204036981",
      //     "status": 0
      //   },
      //   {
      //     "id": 46,
      //     "code": "G202204036981",
      //     "status": 0
      //   }
      // ]
    }
  },
  // 核销订单
  writeoffHandle(e) {
    //  * @param {int} type require 1:全部核销 2:按数量核销
    //  * @param {int} order_id require 订单id
    //  * @param {int} code_id 核销码
    this.writeoff(this.data.param).then(res => {
      wx.navigateTo({
        url: '/pages/mine/writeoff/status',
      })
    })
  },
  preWriteoff(data) {
    return new Promise((resolve, reject) => {
      preWriteoff(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  writeoff(data) {
    return new Promise((resolve, reject) => {
      writeoff(data).then(res => {
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
    console.log(options)
    let temp = {}
    const scene = decodeURIComponent(options.scene)
    console.log(scene)
    //scene=order_id=1114&user_type=1
    if (scene && scene != 'undefined') {
      scene.split('&').forEach(it => {
        const i = it.split('=')
        temp[i[0]] = i[1]
      })
    } else {
      temp = options
    }

    // t类型 o订单id c code_id

    // type	是	int	1:全部核销 2:按数量核销
    // order_id	是	int	订单id
    // code_id	否	int	核销码
    let param = {
      type: temp.t,
      order_id: temp.o,
    }
    if (temp.c) {
      param.code_id = temp.c
    }

    this.data.param = param

    this.preWriteoff(param).then(res => {
      this.setData({
        orderData: res.data
      })
    })
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