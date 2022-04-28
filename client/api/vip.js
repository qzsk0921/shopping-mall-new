
import request from '../utils/request'

/**
 * 会员列表 vip/vip_list
 */
export function getVipList(data) {
  return request({
    url: '/vip/vip_list',
    method: 'get',
    data
  })
}

/**
 * 创建会员订单 vip/create_vip_order
 * @param {int} id require 会员套餐id
 */
export function addVip(data) {
  return request({
    url: '/vip/create_vip_order',
    method: 'post',
    data
  })
}

/**
 * 会员页面接口 Vip/vip_info
 */
export function getVipInfo(data) {
  return request({
    url: '/Vip/vip_info',
    method: 'get',
    data
  })
}
