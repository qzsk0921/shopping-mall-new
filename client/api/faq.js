// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 规则页列表 RulePage/get_page_list
 * @param {int} type require 1:常见问题 2:其他
 */
export function getFAQlist(data) {
  return request({
    url: '/RulePage/get_page_list',
    method: 'get',
    data
  })
}

/**
 * 规则页列表 RulePage/get_page_info
 * @param {int} id require 页面id
 */
export function getFAQdetail(data) {
  return request({
    url: '/RulePage/get_page_info',
    method: 'get',
    data
  })
}

/**
 * 我的优惠券列表 Coupon/my_coupon_list
 * @param {int} type require 全部 0:待使用 1:已使用 -2:已过期
 */
export function getMyCouponList(data) {
  return request({
    url: '/Coupon/my_coupon_list',
    method: 'get',
    data
  })
}