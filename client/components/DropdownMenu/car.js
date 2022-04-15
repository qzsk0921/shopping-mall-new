// components/DropdownMenu/car.js
import store from '../../store/common'
import create from '../../utils/create'

import {
  addNumCart
} from '../../api/cart'

import {
  deepClone
} from '../../utils/util'

import {
  preOrder
} from '../../api/order'

// Component({
create({
  /**
   * 组件的属性列表
   */
  properties: {
    opened: {
      type: Number,
      value: 0
    },
    goodsDetail: Object,
    userInfo: Object,
    bargaining: Number
  },
  observers: {
    'opened': function (val) {
      // console.log(val)
      if (val === 1) {
        // // 更新用户信息
        // this.setData({
        //   userInfo: store.data.userInfo
        // })

        // 购物车默认数量是1，不是0
        const myGoodsDetail = deepClone(this.data.goodsDetail)
        let currentUnitIdsArr = [],
          currentUnitIds = '',
          myAttr = []

        if (myGoodsDetail.attribute.attribute_arr.length) {
          myGoodsDetail.attribute.attribute_arr.forEach((item, index) => {
            myAttr[index] = {
              aid: item.attribute_id
            }
            item.attribute_value_arr.some((it, idx) => {
              if (idx === 0) {
                myAttr[index].val = {
                  id: it.id
                }
                currentUnitIdsArr.push(it.id)
                return true
              }
              return false
            })
          })

          this.data.myAttr = myAttr //[{aid:1,val:{id:4,id:5}},{aid:2,val:{id:6}}]
          currentUnitIds = currentUnitIdsArr.sort((a, b) => a - b).join(',') //一组属性id，5,6,12 匹配库存 升序
        } else {
          currentUnitIds = Object.keys(myGoodsDetail.attribute.stock_arr)[0]
        }


        // 购物车数量显示 至少是1
        Object.keys(myGoodsDetail.attribute.stock_arr).forEach(key => {
          if (!myGoodsDetail.attribute.stock_arr[key].cart_number) myGoodsDetail.attribute.stock_arr[key].cart_number = 1
        })

        // 购物车有相同商品时，该拼团商品任保持数量1
        if (this.data.bargaining) {
          myGoodsDetail.attribute.stock_arr[currentUnitIds].cart_number = 1
        }

        this.setData({
          myGoodsDetail,
        })

        // 没有初始化过才使用默认第一个规格
        if (!this.data.currentUnitIds) {
          this.setData({
            currentUnitIds
          })
        }

        const query = wx.createSelectorQuery().in(this)
        query.select('.dropdown-item-down__content').boundingClientRect(rect => {
          console.log(rect)
          this.setData({
            height: rect.height
          })
        }).exec()
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

    height: 0,
    currentUnitIndex: 0,
    currentUnitIds: null,
    myGoodsDetail: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    specHandle(e) {
      console.log(e)
      const dataset = e.target.dataset
      this.data.myAttr.some(item => {
        if (item.aid === dataset.aid) {
          item.val.id = dataset.id
          return true
        }
        return false
      })

      const currentUnitIds = this.parseCurrentUnitIds(this.data.myAttr)

      this.setData({
        currentUnitIds
      })
    },
    // 解析成 '7,8,12'
    parseCurrentUnitIds(myAttr) {
      return myAttr.map(item => item.val.id).sort((a, b) => a - b).join(',')
    },
    dropdownItemTapHandle() {},
    addHandle() {
      // 拼团时最大值为1，不可增加
      if (this.data.bargaining) return

      this.data.myGoodsDetail.attribute.stock_arr[this.data.currentUnitIds].cart_number += 1
      this.setData({
        'myGoodsDetail.attribute.stock_arr': this.data.myGoodsDetail.attribute.stock_arr,
      })
    },
    reduceHandle() {
      // 拼团时最大值为1，不可增加
      if (this.data.bargaining) return

      // 不能小于0
      if (this.data.myGoodsDetail.attribute.stock_arr[this.data.currentUnitIds].cart_number - 1 <= 0) {
        // 不变
      } else {
        this.data.myGoodsDetail.attribute.stock_arr[this.data.currentUnitIds].cart_number -= 1
        this.setData({
          'myGoodsDetail.attribute.stock_arr': this.data.myGoodsDetail.attribute.stock_arr,
        })
      }
    },
    inputBlurHandle(e) {
      // console.log(e)
      // 购买数量非法恢复原数值
      if (e.detail.value < 0) {
        this.setData({
          [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: this.data.myGoodsDetail.unit_arr[this.data.currentUnitIndex].number,
        })
      } else {
        this.setData({
          [`myGoodsDetail.unit_arr[${this.data.currentUnitIndex}].number`]: e.detail.value,
        })
      }
    },
    // 加入购物车
    addCarHandle() {
      // console.log('addCarHandle')

      this.setData({
        opened: 0
      })

      // 如果到店消费不加入购物车跳转到订单确认页 1:送货上门 2:到店消费
      if (this.data.myGoodsDetail.delivery_type === 2) {
        let orderData = {
          is_use_coupon: 0,
          goods: []
        }

        // 参与拼团
        if (this.data.bargaining) {
          orderData.goods_group_bargaining_team_id = this.data.myGoodsDetail.bargaining_info.id
        }

        // if (this.store.data.address_id) {
        //   orderData.address_id = this.store.data.address_id
        // }

        const temp = {
          "goods_id": this.data.myGoodsDetail.id,
          "goods_num": this.data.myGoodsDetail.attribute.stock_arr[this.data.currentUnitIds].cart_number,
          "is_pre_goods": this.data.myGoodsDetail.is_pre_sale,
          "attribute_value_str": this.data.currentUnitIds
        }

        orderData.goods.push(temp)

        this.preOrder(orderData).then(res => {
          // 进入订单确认页若开通会员返回订单确认页需要更新数据
          // getApp().globalData.orderData = orderData

          const pre = JSON.stringify(res.data)

          wx.navigateTo({
            url: `/pages/shop/order/confirmOrder?preData=${pre}&delivery_type=${this.data.myGoodsDetail.delivery_type}`,
          })
        }).catch(err => {
          console.log(err)
          // if (err.msg === '地址不存在') {
          //   wx.removeStorageSync('address_id')
          //   this.confirmationOrderHandle()
          // }
        })
      } else {
        let orderData = {
          is_use_coupon: 0,
          goods: []
        }

        let myData = {
          goods_id: this.data.myGoodsDetail.id,
          goods_num: this.data.myGoodsDetail.attribute.stock_arr[this.data.currentUnitIds].cart_number,
          is_pre_goods: this.data.myGoodsDetail.is_pre_sale,
          attribute_value_str: this.data.currentUnitIds
        }

        orderData.goods.push(myData)

        // 参与拼团
        if (this.data.bargaining) {
          orderData.goods_group_bargaining_team_id = this.data.myGoodsDetail.bargaining_info.id
          this.preOrder(orderData).then(res => {
            // 进入订单确认页若开通会员返回订单确认页需要更新数据
            // getApp().globalData.orderData = orderData

            const pre = JSON.stringify(res.data)

            wx.navigateTo({
              url: `/pages/shop/order/confirmOrder?preData=${pre}&delivery_type=${this.data.myGoodsDetail.delivery_type}`,
            })
          }).catch(err => {
            console.log(err)
            // if (err.msg === '地址不存在') {
            //   wx.removeStorageSync('address_id')
            //   this.confirmationOrderHandle()
            // }
          })
          return false
        }
        console.log(8888)
        this.addNumCart(myData).then(res => {

          // 更新详情页购物车数据
          wx.showToast({
            icon: 'none',
            title: '购物车操作成功',
          })

          setTimeout(() => {
            this.triggerEvent('updateCartHandle')
          }, 1000)

          console.log(res)
        }).catch(err => {
          setTimeout(function () {
            this.triggerEvent('updateCartHandle')
          }, 1000)
          // 恢复设置
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
    preOrder(data) {
      return new Promise((resolve, reject) => {
        preOrder(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
  },
  lifetimes: {
    ready() {
      // 在组件在视图层布局完成后执行
    },
    attached: function () {

      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})