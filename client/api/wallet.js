import request from '../utils/request'

/**
 * 明细接口 moneyLog/my_list
 * @param {int} type require 1:佣金 2:幸运奖
 */
export function getWallet(data) {
  return request({
    url: '/moneyLog/my_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 提现记录接口 withdrawal/log
 * @param {int} type require 1:佣金 2:幸运奖
 */
export function getWithdraw(data) {
  return request({
    url: '/withdrawal/log',
    method: 'get',
    data,
    load: 'noload'
  })
}