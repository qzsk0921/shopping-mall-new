// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 我的客户列表 order/my_custom_list
 */
export function getCustomerList() {
  return request({
    url: '/Sales/my_custom_list',
    method: 'get',
  })
}

/**
 * 客户消费统计 Sales/get_my_custom_order
 * @param {string} year require 年
 * @param {int} user_id require 需要统计的客户id
 */
export function getCustomerInfo() {
  return request({
    url: '/Sales/get_my_custom_order',
    method: 'get',
  })
}