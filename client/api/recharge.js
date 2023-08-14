import request from '../utils/request'


/**
 * 充值详情 Recharge/info
 */
export function getRechargeInfo() {
  return request({
    url: '/Recharge/info',
    method: 'get',
  })
}

/**
 * 创建订单 /Recharge/pay_order
 * @param {int} phone require 充值手机号
 * @param {int} recharge_id require	充值的记录id
 */
export function addPayorder(data) {
  return request({
    url: '/Recharge/pay_order',
    method: 'post',
    data
  })
}

/**
 * 订单列表 /Recharge/order_list
 * @param {int} status require 	“”:全部 0:待付款 1:充值成功 2:充值关闭
 */
export function getOrderList(data) {
  return request({
    url: '/Recharge/order_list',
    method: 'get',
    data
  })
}

/**
 * 订单详情 /Recharge/order_info
 * @param {int} order_id require 订单id
 */
export function getOrderDetail(data) {
  return request({
    url: '/Recharge/order_info',
    method: 'get',
    data
  })
}