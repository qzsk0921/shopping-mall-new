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
export function getWithdrawLog(data) {
  return request({
    url: '/withdrawal/log',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 提现说明页接口 withdrawal/info
 */
export function getWithdrawInfo(data) {
  return request({
    url: '/withdrawal/info',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 提现申请接口 withdrawal/apply 
 * @param {int} type require 1:佣金 2:幸运奖
 * @param {float} money 金额
 */
export function createWithdraw(data) {
  return request({
    url: '/withdrawal/apply',
    method: 'get',
    data,
    load: 'noload'
  })
}