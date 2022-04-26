// pages/mine/lottery/lottery.js
import store from '../../../store/common'
import create from '../../../utils/create'

import {
  getPrizeList,
  getLotteryList,
  getScoreList
} from '../../../api/lottery'

// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navigationBarTitleText: '抽奖中心',
    tabbar: ['中奖历史', '积分使用记录'],
    tabIndex: 0, //0中奖历史 1积分使用记录
    tabWidth: null,

    blocks: [{
      // padding: '172rpx',
      padding: '86rpx',
      imgs: [{
        src: '/assets/images/rtary_outside.png',
        width: '100%',
        height: '100%'
      }]
    }],
    prizes: [],
    buttons: [{
        radius: '95rpx',
        imgs: [{
          src: '/assets/images/rotary_btn_draw.png',
          width: '190rpx',
          height: '210rpx',
          top: '-110rpx'
        }]
      },
      // {
      //   radius: '40px',
      //   background: '#869cfa',
      //   pointer: true,
      //   fonts: [{
      //     text: '开始\n抽奖',
      //     top: '-20px'
      //   }]
      // },
    ],
    src: [],
    listData: [
      // 中奖历史
      {
        cache: [
          {
            "id": 1,
            "reward_type": 3,
            "reward_name": "积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分积分",
            "reward_price": "10.00",
            "reward_image": 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg',
            "reward_status": 2,
            "express_number": null,
            "express_company": null,
            "address_info": null,
            "create_time": 1650617638
          },
          {
            "id": 2,
            "reward_type": 3,
            "reward_name": "积分",
            "reward_price": "10.00",
            "reward_image": 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg',
            "reward_status": 2,
            "express_number": null,
            "express_company": null,
            "address_info": null,
            "create_time": 1650617638
          },
          {
            "id": 3,
            "reward_type": 1,
            "reward_name": "商品",
            "reward_price": "20.00",
            "reward_image": 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg',
            "reward_status": 1,
            "express_number": null,
            "express_company": null,
            "address_info": null,
            "create_time": 1650617638
          },
          {
            "id": 4,
            "reward_type": 1,
            "reward_name": "商品",
            "reward_price": "20.00",
            "reward_image": 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg',
            "reward_status": 2,
            "express_number": "fdfasdfasd",
            "express_company": "圆通",
            "address_info": "望海路10号楼",
            "create_time": 1650617638
          },
          {
            "id": 5,
            "reward_type": 2,
            "reward_name": "优惠券",
            "reward_price": "10.00",
            "reward_image": 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-127944.jpg',
            "reward_status": 2,
            "express_number": null,
            "express_company": null,
            "address_info": null,
            "create_time": 1650617638
          }
        ],
        count: 1,
        total_page: 1,
      },
      // 积分记录
      {
        cache: [
          {
            "id": 1,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 9,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 8,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 7,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 6,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 5,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 4,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 3,
            "cost_integral": 10,
            "create_time": 1650617638
          },
          {
            "id": 2,
            "cost_integral": 0,
            "create_time": 1650617638
          },
          {
            "id": 10,
            "cost_integral": 10,
            "create_time": 1650617638
          }
        ],
        count: 1,
        total_page: 1,
      }
    ]
  },
  watch: {
    tabIndex: {
      handler(nv, ov, obj) {
        console.log(nv)
        this.getLotteryList({
          ex_type: this.parseStatus(nv)
        }).then(res => {
          // this.setData({
          //   [`listData[${nv}].cache`]: res.data.data
          // })
        })
      },
      immediate: true
    }
  },
  start() {
    console.log(9333)
    // 获取抽奖组件实例
    const child = this.selectComponent('#myLucky')
    // 调用play方法开始旋转
    child.$lucky.play()
    // 用定时器模拟请求接口
    setTimeout(() => {
      // 3s 后得到中奖索引 (假设抽到第0个奖品)
      const index = 5
      // 调用stop方法然后缓慢停止
      child.$lucky.stop(index)
    }, 3000)
  },
  end(event) {
    // 中奖奖品详情
    console.log(event.detail)
  },
  changeTab(e) {
    console.log(e)
    const index = e.target.dataset.index
    if (index == this.data.tabIndex) return

    let objData = {
      tabIndex: index,
    }

    this.setData(objData)
  },
  parseStatus(tabIndex) {
    // 1:奖品列表 2:积分列表
    let myStatus
    if (tabIndex == 0) {
      myStatus = 1
    } else if (tabIndex == 1) {
      myStatus = 2
    }

    return myStatus
  },
  // 奖品数据
  assemblePrizes(prizes) {
    console.log(prizes)
    if (prizes.length) {
      let myPrizes = []
      prizes.forEach((item, index) => {
        myPrizes[index] = {}
        if (item.image) {
          myPrizes[index].imgs = [{
            src: item.image,
            width: '50rpx',
            height: '50rpx',
            top: '100rpx'
          }]
        }
        if (item.reward_name) {
          myPrizes[index].fonts = myPrizes[index].fonts ? myPrizes[index].fonts : []

          myPrizes[index].fonts = myPrizes[index].fonts.concat({
            text: item.reward_name,
            top: '0',
          })
        }

        if (item.reward_price) {
          myPrizes[index].fonts = myPrizes[index].fonts ? myPrizes[index].fonts : []

          myPrizes[index].fonts = myPrizes[index].fonts.concat({
            text: item.reward_price,
            top: '0',
          })
        }
        myPrizes[index].background = item.background_color
      })
      console.log(myPrizes)
      this.setData({
        prizes: myPrizes
      })
    }
  },
  // 0我的奖品 1查看更多
  lotteryHandle(e) {
    if (this.data.tabIndex === 0) {

    } else if (this.data.tabIndex === 1) {

    }
  },
  getPrizeList(data) {
    return new Promise((resolve, reject) => {
      getPrizeList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getLotteryList(data) {
    return new Promise((resolve, reject) => {
      getLotteryList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getScoreList(data) {
    return new Promise((resolve, reject) => {
      getScoreList(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    getApp().setWatcher(this) //设置监听器
    this.getPrizeList().then(res => {
      const prizes = JSON.parse(JSON.stringify(res.data.draw_prizes))
      this.assemblePrizes(prizes)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const that = this;
    const query = wx.createSelectorQuery();

    query.select('.fixed').boundingClientRect(function (rect) {
      that.setData({
        // scrollViewHeight: that.store.data.systemInfo.screenHeight - (rect.height + 50),
        fixed: rect.height,
      })
    }).exec();

    query.select('.tab').boundingClientRect(function (rect) {
      that.setData({
        tabWidth: rect.width,
      })
    }).exec();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})