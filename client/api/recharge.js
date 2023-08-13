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