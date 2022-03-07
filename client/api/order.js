// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 下单页面（预下单） Order/pre_order
 * @param {string} shop_id require 店铺id
 * @param {string} address_id require 用户选择地址id
 * @param {int} is_use_coupon require	1:使用优惠券 0：不使用优惠券
 * @param {int} coupon_id	用户的优惠券id
 * @param {object} goods require i	是	int	商品index 0-n
 *  {"goods_id": "2","goods_num": "2","type": "1","is_pre_goods": "0","unit_id": "1"}
 */
export function preOrder(data) {
  return request({
    url: '/Order/pre_order',
    method: 'post',
    data
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
 * @param {string} shop_id require 店铺id
 * @param {string} address_id require 用户选择地址id
 * @param {int} is_use_coupon require	1:使用优惠券 0：不使用优惠券
 * @param {int} coupon_id	用户的优惠券id
 * @param {object} goods require i	是	int	商品index 0-n
 *  {"goods_id": "2","goods_num": "2","type": "1","is_pre_goods": "0","unit_id": "1"}
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
 * @param {string} status require ‘’:全部 0：待支付 1:已支付 2:已取消
 * @param {string} keyword
 */
export function getOrderList(data) {
  return request({
    url: '/Order/order_list',
    method: 'get',
    data
  })
}