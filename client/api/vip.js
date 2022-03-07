
// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
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
