// https://www.showdoc.com.cn/1859985641138102 xczm190410 零售文档
// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410 批发文档

export default {
  baseUrl: 'https://b2c-api-xjcy.xcmbkj.com', //零售测试wx11729f975a9b0116
  // baseUrl: 'https://retailers.xcmbkj.com', //零售测试wx11729f975a9b0116
  // baseUrl: 'https://liancai.xxhychn.cn',
  // baseUrl:'https://liancai.xcmbkj.com', //测试wx46bb087e8ac10589
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