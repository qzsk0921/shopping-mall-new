import request from '../utils/request'

/**
 * 下单页面（预下单） Order/pre_order
 * @param {string} address_id 用户选择地址id
 * @param {string} is_captain 1:开新团 0：参团
 * @param {string} goods_group_bargaining_team_id 参加的团id,拼团必选
 * @param {int} is_use_coupon require	1:使用优惠券 0：不使用优惠券
 * @param {int} coupon_id	用户的优惠券id
 * @param {string} remark	备注
 * @param {object} goods require i	是	int	商品index 0-n
 *  {"goods_id": "商品id","goods_num": "用户单件选择数量","attribute_value_str": "购物车 返回attribute_value_str","is_pre_goods": "	购物车返回"}
 */
export function preOrder(data, load) {
  return request({
    url: '/Order/pre_order',
    method: 'post',
    data,
    load
  })
}

/**
 * 订单提示语 Order/get_remark_list
 */
export function getRemarkList() {
  return request({
    url: '/Order/get_remark_list',
    method: 'get',
  })
}

/**
 * 下单接口 Order/add_order
 * @param {string} address_id require 用户选择地址id
 * @param {int} is_use_coupon require	1:使用优惠券 0：不使用优惠券
 * @param {int} coupon_id	用户的优惠券id
 * @param {int} goods_group_bargaining_team_id	拼团团队id
 * @param {int} is_captain	是否团长发起拼团 1：是 0：否
 * @param {int} goods require i	是	商品index 0-n
 *  {"goods_id": "商品id","goods_num": "用户单件选择数量","attribute_value_str": "购物车 返回attribute_value_str","is_pre_goods": "购物车返回"}
 */
export function addOrder(data) {
  return request({
    url: '/Order/add_order',
    method: 'post',
    data
  })
}

/**
 * 订单详情 Order/order_info
 * @param {int} order_id require 订单id
 */
export function getOrderDetail(data) {
  return request({
    url: '/Order/order_info',
    method: 'get',
    data
  })
}

/**
 * 订单消费统计 order/sale_total
 * @param {string} year require 年
 */
export function getExpenseList(data) {
  return request({
    url: '/order/sale_total',
    method: 'get',
    data
  })
}

/**
 * 删除订单 Order/del_order
 * @param {string} order_id require 订单id
 */
export function delOrder(data) {
  return request({
    url: '/Order/del_order',
    method: 'post',
    data
  })
}

/**
 * 取消订单 Order/cancel_order
 * @param {string} order_id require 订单id
 */
export function cancelOrder(data) {
  return request({
    url: '/Order/cancel_order',
    method: 'get',
    data
  })
}

/**
 * 订单列表 Order/order_list
 * @param {string} status require ‘’:全部 状态 0:待支付 1:已支付 2:已取消 3:已完成 4:已退款
 * @param {string} keyword
 * @param {string} type require 1:普通订单 2:拼团订单
 */
export function getOrderList(data) {
  return request({
    url: '/Order/order_list',
    method: 'get',
    data
  })
}

/**
 * 订单重新支付 order/re_pay
 * @param {int} order_id require 订单id
 */
export function rePay(data) {
  return request({
    url: '/order/re_pay',
    method: 'get',
    data
  })
}