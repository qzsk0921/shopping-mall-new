export default {
  data: {
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    compatibleInfo: {
      menuButtonObject: wx.getMenuButtonBoundingClientRect(), //按钮（右上角胶囊按钮）的布局位置信息
      systemInfo: null, //systemInfo system:'ios'||'android',
      navHeight: 0, //顶部导航栏高度
      isIphoneX: null,
    },
    settingInfo: {}, //微信设置信息 settingInfo.authSetting['scope.userInfo'](微信已授权)

    //定位位置 ad_info{object} address福建省厦门市思明区康泰路5-1-107号 address_component{city: 厦门市, district: 思明区, nation: 中国,province: 福建省,street: 康泰路,street_number: 康泰路5-1-107号} address_reference{object} formatted_addresses{recommend: "中共厦门市委员会", rough: "中共厦门市委员会"} location{lat: 24.47951, lng: 118.08948}
    location: {},
    //收货地址
    deliveryAddress: [
      //   {
      //   id: 1,
      //   address: '厦门星辰追梦科技有限公司1', //地址
      //   number: '10-2号302-1室', //门牌号
      //   name: '洪先生', //联系人
      //   phone: '14012344321', //手机号
      //   current: 0, //当前使用地址
      // }, {
      //   id: 2,
      //   address: '厦门星辰追梦科技有限公司2', //地址
      //   number: '10-2号302-1室', //门牌号
      //   name: '洪先生', //联系人
      //   phone: '14012344321', //手机号
      //   current: 1,
      // }
    ],
    // 1.未授权：会展中心(默认) 2.已授权：当前定位 3.已授权已选择：已选择地址
    currentAddress: {
      address: "厦门国际会议展览中心",
      longitude: 118.183681124,
      latitude: 24.467152248,
      type: 2, //1:通过地址选择 2:首页选择地址
      // id: null,
    },
    shop_id: null, //店铺ID
    address_id: wx.getStorageSync('address_id') || null, //当前使用的收货地址

    cart: [], //购物车

    // logs: [],
    // b: { 
    //   arr: [{ name: '数值项目1' }] ,
    //   //深层节点也支持函数属性
    //   fnTest:function(){
    //     return this.motto.split('').reverse().join('')
    //   }
    // },
    // firstName: 'dnt',
    // lastName: 'zhang',
    // fullName: function () {
    //   return this.firstName + this.lastName
    // },
    // pureProp: 'pureProp',
    // globalPropTest: 'abc', //更改我会刷新所有页面,不需要再组件和页面声明data依赖
    // ccc: { ddd: 1 } //更改我会刷新所有页面,不需要再组件和页面声明data依赖
  },
  globalData: ['globalPropTest', 'ccc.ddd'],
  logMotto: function () {
    console.log(this.data.motto)
  },
  //默认 false，为 true 会无脑更新所有实例
  //updateAll: true
}