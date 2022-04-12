import request from '../utils/request'

/**
 * 核销码接口 User/qrcode
 * @param {int} type require 1:单个核销码 2:全部核销码
 * @param {int} order_id require 订单id
 * @param {int} code_id 单个必填
 */
export function getQrcode(data) {
  return request({
    url: '/User/qr_code',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 核销确认页接口 writeOff/apply
 * @param {int} type require 1:全部核销 2:按数量核销
 * @param {int} order_id require 订单id
 * @param {int} code_id 核销码
 */
export function preWriteoff(data) {
  return request({
    url: '/writeOff/apply',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 核销接口 writeOff/confirm
 * @param {int} type require 1:全部核销 2:按数量核销
 * @param {int} order_id require 订单id
 * @param {int} code_id 核销码
 */
export function writeoff(data) {
  return request({
    url: '/writeOff/confirm',
    method: 'get',
    data,
    load: 'noload'
  })
}