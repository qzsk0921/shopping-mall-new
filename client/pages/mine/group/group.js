// pages/mine/group/group.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getMyGroupbargainList
} from '../../../api/groupbargain'
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navigationBarTitleText: '我的拼团',
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: '',
    page: 1,
    page_size: 10,
    groupData: {
      count: 1,
      total_page: 1,
      cache: [
        //   {
        //   "id": 4,
        //   "group_bargaining_id": 1,
        //   "goods_id": 1,
        //   "total_join_number": 5,
        //   "join_number": 1,
        //   "total_pay_money": "10.00",
        //   "expire_time": 1648878334,
        //   "status": 1,
        //   "captain_id": 1,
        //   "update_time": 1648801388,
        //   "create_time": 1648801388,
        //   "error_msg": null,
        //   "success_member_str": "",
        //   "goods_info": {
        //     "goods_name": "锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋锅锅香 珍珠米-25kg/袋",
        //     "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-04-013079.jpg",
        //     "goods_content": "去问问",
        //     "price": "4.00",
        //     "bargaining_price": "10.00"
        //   },
        //   "reward_money": 1,
        //   "reward_rate": "0.01",
        //   "join_member_list": [{
        //     "nick_name": "hgao",
        //     "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erTBqQBTx6llYy45TOlGqIafxxcibwYMPQ80z9BMQnliaBP4HzrpR8b4xUStGCB1UZlFmPAicDOMXxpg/132",
        //     "create_time": 1638173252
        //   }]
        // },
      ]
    },
  },
  toDetailHandle(e) {
    const item = e.currentTarget.dataset.item
    if (!this.checkAuth()) return
    wx.navigateTo({
      url: `/pages/goods/detail?id=${item.goods_id}&goods_group_bargaining_team_id=${item.id}`,
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
      // wx.navigateTo({
      //   url: '/pages/authorization/phone',
      // })
      // return false
    }
    return true
  },
  toMemberlistHandle(e) {
    // 跳转到拼团人员
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/groupbargain/memberList?goods_group_bargaining_team_id=${item.id}`,
    })
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')

    let groupData = this.data.groupData

    if (groupData.count + 1 > groupData.total_page) return

    this.setData({
      [`groupData.count`]: ++groupData.count
    })

    this.getMyGroupbargainList('scrollToLower')
  },
  getMyGroupbargainList(dataObj) {
    const tempData = {
      page: this.data.groupData.count,
      page_size: this.data.page_size,
      // shop_id: this.store.data.shop_id
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getMyGroupbargainList(tempData).then(res => {
        if (dataObj === 'scrollToLower') {
          this.data.groupData.cache.push(...res.data.data)
          this.setData({
            [`groupData.cache`]: this.data.groupData.cache,
            [`groupData.total_page`]: res.data.last_page
          })
          resolve(res)
        } else {
          this.setData({
            [`groupData.cache`]: res.data.data,
            [`groupData.total_page`]: res.data.last_page
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
    this.getMyGroupbargainList()
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