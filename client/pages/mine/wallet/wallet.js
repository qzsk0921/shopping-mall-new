// pages/mine/wallet/wallet.js
import store from '../../../store/common'
import create from '../../../utils/create'
import {
  getWallet
} from '../../../api/wallet'
// let withdraw = [{
//     // 佣金
//     count: 1,
//     total_page: 1,
//     "commission_money": "2.00",
//     "lucky_money": "0.60",
//     "total_money": 4,
//     "billing_money": 2,
//     "today_billing_money": 2,
//     cache: [
//       {
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "测试",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年04月",
//       },
//       "money": "2.00"
//     }, {
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "测试",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年04月",
//       },
//       "money": "2.00"
//     }, {
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "测试",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年05月",
//       },
//       "money": "2.00"
//     }],
//   },
//   {
//     // 幸运奖
//     count: 1,
//     total_page: 1,
//     "commission_money": "2.00",
//     "lucky_money": "0.60",
//     "total_money": 4,
//     "billing_money": 2,
//     "today_billing_money": 2,
//     cache: [{
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "幸运测试",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "幸运测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年04月",
//       },
//       "money": "2.00"
//     }, {
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "幸运测试2",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年04月",
//       },
//       "money": "2.00"
//     }, {
//       "id": 31,
//       "group_bargaining_id": 1,
//       "goods_id": 538,
//       "total_join_number": 2,
//       "join_number": 2,
//       "total_pay_money": "20.00",
//       "expire_time": 1658960454,
//       "status": 2,
//       "captain_id": 1,
//       "update_time": 1648961512,
//       "create_time": 1648956854,
//       "error_msg": null,
//       "success_member_str": "2",
//       "reward_rate": "0.10",
//       "success_rate": "0.50",
//       "captain_reward_rate": "0.50",
//       "is_billing": 0,
//       "billing_money": "2.00",
//       "goods_info": {
//         "goods_name": "测试",
//         "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
//         "goods_content": "测试笔",
//         "price": "3.00",
//         "bargaining_price": "10.00"
//       },
//       "join_member_list": [{
//           "nick_name": "hgao",
//           "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
//           "create_time": 1638173252
//         },
//         {
//           "nick_name": "hgao11",
//           "avatar_url": "2311",
//           "create_time": 1638173252
//         }
//       ],
//       "month_money": {
//         "money": 2,
//         "month": "2022年05月",
//       },
//       "money": "2.00"
//     }],
//   }
// ]
// Page({
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    compatibleInfo: null, //navHeight menuButtonObject systemInfo isIphoneX
    navStatus: '',
    navigationBarTitleText: '钱包',

    tempTime: [], //过滤同月 2022年4月
    options: ['佣金', '幸运奖'], //1:佣金 2:幸运奖
    optionIndex: 0,
    optionWidth: null,

    withdrawData: [{
        // 佣金
        count: 1,
        total_page: 1,
        "commission_money": "0.00",
        "lucky_money": "0",
        "total_money": 0,
        "billing_money": 0,
        "today_billing_money": 0,
        cache: []
      },
      {
        count: 1,
        total_page: 1,
        "commission_money": "0.00",
        "lucky_money": "0.00",
        "total_money": 0,
        "billing_money": 0,
        "today_billing_money": 0,
        cache: []
      }
      // {
      //   // 佣金
      //   count: 1,
      //   total_page: 1,
      //   "commission_money": "2.00",
      //   "lucky_money": "0.60",
      //   "total_money": 4,
      //   "billing_money": 2,
      //   "today_billing_money": 2,
      //   cache: [{
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年04月",
      //     },
      //     "money": "2.00"
      //   }, {
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年04月",
      //     },
      //     "money": "2.00"
      //   }, {
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年05月",
      //     },
      //     "money": "2.00"
      //   }],
      // },
      // {
      //   // 幸运奖
      //   count: 1,
      //   total_page: 1,
      //   "commission_money": "2.00",
      //   "lucky_money": "0.60",
      //   "total_money": 4,
      //   "billing_money": 2,
      //   "today_billing_money": 2,
      //   cache: [{
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年04月",
      //     },
      //     "money": "2.00"
      //   }, {
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年04月",
      //     },
      //     "money": "2.00"
      //   }, {
      //     "id": 31,
      //     "group_bargaining_id": 1,
      //     "goods_id": 538,
      //     "total_join_number": 2,
      //     "join_number": 2,
      //     "total_pay_money": "20.00",
      //     "expire_time": 1658960454,
      //     "status": 2,
      //     "captain_id": 1,
      //     "update_time": 1648961512,
      //     "create_time": 1648956854,
      //     "error_msg": null,
      //     "success_member_str": "2",
      //     "reward_rate": "0.10",
      //     "success_rate": "0.50",
      //     "captain_reward_rate": "0.50",
      //     "is_billing": 0,
      //     "billing_money": "2.00",
      //     "goods_info": {
      //       "goods_name": "测试",
      //       "thumb": "https://retailers-qn.xcmbkj.com/admin/goods/shop_adm_2022-03-295856.png",
      //       "goods_content": "测试笔",
      //       "price": "3.00",
      //       "bargaining_price": "10.00"
      //     },
      //     "join_member_list": [{
      //         "nick_name": "hgao",
      //         "avatar_url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqtftEFsRLhhDfQZwiboph98aLWPIj43D5LpWg7CYhjrd0rreZRMRzFQsvl1MD12ySZhZK6uuMP8pw/132",
      //         "create_time": 1638173252
      //       },
      //       {
      //         "nick_name": "hgao11",
      //         "avatar_url": "2311",
      //         "create_time": 1638173252
      //       }
      //     ],
      //     "month_money": {
      //       "money": 2,
      //       "month": "2022年05月",
      //     },
      //     "money": "2.00"
      //   }],
      // }
    ],
    page_size: 10,
  },
  watch: {
    optionIndex: {
      handler(nv, ov, obj) {
        setTimeout(() => {
          this.getWallet({
            type: nv + 1
          })
        }, 0)
      },
      // immediate: true
    },
    userInfo: {
      handler(nv, ov, obj) {
        if (nv.is_captain) {
          // 团长
          this.setData({
            optionIndex: 0
          })
        } else {
          this.setData({
            optionIndex: 1,
          })
          // // 不是团长
          // this.getWallet({
          //   type: this.data.optionIndex + 1
          // }).then(res => {
          //   // 过滤同月
          // })
        }
      }
    }
  },
  changeOption(e) {
    const index = e.target.dataset.index
    if (index == this.data.optionIndex) return

    const that = this
    wx.createSelectorQuery().select('.item-box').boundingClientRect(function (rect) {
      console.log(rect.top)
      that.setData({
        scrollT: rect.top,
      })
    }).exec()


    let objData = {
      optionIndex: index,
    }

    this.setData(objData)

    if (index === 0) {

    } else if (index === 1) {}
  },
  // 提现记录
  toWithdrawRecordHandle() {
    wx.navigateTo({
      url: `/pages/mine/wallet/withdrawRecord?idx=${this.data.optionIndex}`,
    })
  },
  // 跳转到拼团人员（没有进度条）
  toMemberlistHandle(e) {
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/groupbargain/memberList?member=all&goods_group_bargaining_team_id=${item.id}`,
    })
  },
  toWithdrawHandle() {
    // 提现功能， 根据后台状态进行切换
    // 1. 用户商户号可进行企业打款时， 进入自动提现页面
    // 2. 用户商户号无法进行企业打开时， 进入人工提现 - 联系客服3页面
    // withdrawal_type	int	1：手动打款 2:自动打款

    if (this.data.userInfo.withdrawal_type == 1) {
      wx.navigateTo({
        url: `/pages/mine/wallet/withdrawCustom?idx=${this.data.optionIndex}`,
      })
    } else if (this.data.userInfo.withdrawal_type == 2) {
      wx.navigateTo({
        url: `/pages/mine/wallet/withdrawAuto?idx=${this.data.optionIndex}`,
      })
    }
  },
  scrollToLower(e) {
    console.log(e)
    console.log('scrollToLower')
    const optionIndex = this.data.optionIndex
    let withdrawData = this.data.withdrawData

    if (withdrawData[optionIndex].count + 1 > withdrawData[optionIndex].total_page) return

    this.setData({
      [`withdrawData${[optionIndex]}.count`]: ++withdrawData[optionIndex].count
    })

    this.getWallet('scrollToLower')
  },
  getWallet(dataObj) {
    const optionIndex = this.data.optionIndex
    const page = this.data.withdrawData[optionIndex].count

    const tempData = {
      page,
      page_size: this.data.page_size,
      type: optionIndex + 1
    }

    if (typeof dataObj === 'object') {
      Object.keys(dataObj).forEach(key => {
        tempData[key] = dataObj[key]
      })
    }

    return new Promise((resolve, reject) => {
      getWallet(tempData).then(res => {

        res.data.data.forEach(item => {
          if (item.month_money.month) {
            if (this.data.tempTime.indexOf(item.month_money.month) == -1) {
              this.data.tempTime.push(item.month_money.month)
              item.month_money.show = true
            } else {
              item.month_money.show = false
            }
          }
        })

        if (dataObj === 'scrollToLower') {
          this.data.withdrawData[optionIndex].cache.push(...res.data.data)
          this.setData({
            [`withdrawData[${optionIndex}].cache`]: this.data.withdrawData.cache,
            [`withdrawData[${optionIndex}].total_page`]: res.data.last_page
          })
          resolve(res)
          console.log(this.data.withdrawData)
        } else {
          console.log(optionIndex)
          this.setData({
            // 测试数据
            // [`withdrawData.cache`]: [].concat(res.data.data).concat(res.data.data).concat(res.data.data).concat(res.data.data),
            // 测试数据
            // [`withdrawData[${optionIndex}].cache`]: withdraw[optionIndex].cache,

            [`withdrawData[${optionIndex}].cache`]: res.data.data,
            [`withdrawData[${optionIndex}].total_page`]: res.data.last_page,
            [`withdrawData[${optionIndex}].commission_money`]: res.data.commission_money,
            [`withdrawData[${optionIndex}].today_billing_money`]: res.data.today_billing_money,
            [`withdrawData[${optionIndex}].lucky_money`]: res.data.lucky_money,
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
    getApp().setWatcher(this) //设置监听器
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

    query.select('.option').boundingClientRect(function (rect) {
      that.setData({
        optionWidth: rect.width,
      })
    }).exec();

    query.select('.query-r1').boundingClientRect(function (rect) {
      that.setData({
        queryr1H: rect.height,
      })
    }).exec();

    query.select('.query-r2').boundingClientRect(function (rect) {
      that.setData({
        queryr2H: rect.height,
      })
    }).exec();

    query.select('.tip-box').boundingClientRect(function (rect) {
      that.setData({
        tipboxH: rect.height,
      })
    }).exec();

    query.select('.query-r4').boundingClientRect(function (rect) {
      that.setData({
        queryr4H: rect.height,
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

    // if (!this.data.userInfo) {
      this.setData({
        userInfo: this.store.data.userInfo
      })
    // }
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