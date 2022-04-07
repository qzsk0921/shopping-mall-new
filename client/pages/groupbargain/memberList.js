// pages/groupbargain/memberList.js
import store from '../../store/common'
import create from '../../utils/create'
import {
  getGroupbargainMemberList
} from '../../api/groupbargain'

create(store, {
  // Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX

    navigationBarTitleText: '拼团人员',
    memberData: {
      // "id": 23,
      // "group_bargaining_id": 1,
      // "goods_id": 1,
      // "total_join_number": 5,
      // "join_number": 1,
      // "total_pay_money": "10.00",
      // "expire_time": 1648878334,
      // "status": 1,
      // "captain_id": 1,
      // "update_time": 1648801388,
      // "create_time": 1648801388,
      // "error_msg": null,
      // "last_join_member": 4,
      // "join_member_list": [{
      //   "nick_name": "hgao",
      //   "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNxyM4Via1sYUkGhFONWeO83RibWKXXunaMaulxE85ERM4bibmIqulD1a7mia6QUOudk8Uic8Xjg4HquQ/132",
      //   "create_time": 1638173252
      // },{
      //   "nick_name": "hgao",
      //   "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNxyM4Via1sYUkGhFONWeO83RibWKXXunaMaulxE85ERM4bibmIqulD1a7mia6QUOudk8Uic8Xjg4HquQ/132",
      //   "create_time": 1638173252
      // }]
    }
  },
  getGroupbargainMemberList(dataObj) {
    const tempData = {
      goods_group_bargaining_team_id: this.data.goods_group_bargaining_team_id
    }
    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getGroupbargainMemberList(tempData).then(res => {
        this.setData({
          memberData: res.data,
        })
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      member,
      goods_group_bargaining_team_id
    } = options

    const param = {}

    // member all时为全部拼团人员 不要进度条
    if (member) {
      param.member = member
    }

    if (goods_group_bargaining_team_id) {
      param.goods_group_bargaining_team_id = goods_group_bargaining_team_id
    }

    this.setData(param)
    this.getGroupbargainMemberList()
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