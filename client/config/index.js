export default {
  // baseUrl: 'https://liancai.xxhychn.cn',
  baseUrl:'https://liancai.xcmbkj.com', //测试
  contentType: 'application/json',
  tencentKey: 'NMUBZ-KWM6V-E5IPZ-UARUF-6CKRH-FFBM2',
  // tencentKey: 'SIIBZ-BL36R-R54WV-WXKZM-OUTBQ-ZWFPR',
  tabBar: {
    list: [{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/assets/images/btn_home.png",
        "selectedIconPath": "/assets/images/btn_home_focus.png"
      },
      {
        "pagePath": "/pages/category/category",
        "text": "分类",
        "iconPath": "/assets/images/btn_classify.png",
        "selectedIconPath": "/assets/images/btn_classify_focus.png"
      },
      {
        "pagePath": "/pages/shopping/shopping",
        "text": "购物车",
        "iconPath": "/assets/images/btn_car.png",
        "selectedIconPath": "/assets/images/btn_car_focus.png"
      },
      {
        "pagePath": "/pages/profile/profile",
        "text": "个人中心",
        "iconPath": "/assets/images/btn_my.png",
        "selectedIconPath": "/assets/images/btn_my_focus.png"
      }
    ]
  }
}