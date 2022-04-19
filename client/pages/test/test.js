// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blocks: [{
      padding: '13px',
      background: '#617df2'
    }],
    prizes: [{
        imgs: [{
          src: 'https://retailers-qn.xcmbkj.com/admin/category/shop_adm_2022-04-188110.png',
          width: '50rpx',
          height: '50rpx',
          top: '100rpx'
        }],
        fonts: [{
          text: '可提现红包',
          top: '10%',
        }, {
          text: '1000元',
          top: '32%',
        }],
        background: '#fde4c8',
      },
      {
        fonts: [{
          text: '1',
          top: '10%'
        }],
        background: '#fff',
        imgs: [{
          src: 'https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-162194.png',
          width: '120rpx',
          height: '120rpx',
          top: '20rpx'
        }]
      },
      {
        fonts: [{
          text: '2',
          top: '10%'
        }],
        background: '#e9e8fe'
      },
      {
        fonts: [{
          text: '3',
          top: '10%'
        }],
        background: '#b8c5f2'
      },
      {
        fonts: [{
          text: '4',
          top: '10%'
        }],
        background: '#e9e8fe'
      },
      {
        fonts: [{
          text: '5',
          top: '10%'
        }],
        background: '#b8c5f2'
      },
    ],
    buttons: [{
        radius: '50px',
        background: '#617df2'
      },
      {
        radius: '45px',
        background: '#afc8ff'
      },
      {
        radius: '40px',
        background: '#869cfa',
        pointer: true,
        fonts: [{
          text: '开始\n抽奖',
          top: '-20px'
        }]
      },
    ],
    src: []
  },
  start() {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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