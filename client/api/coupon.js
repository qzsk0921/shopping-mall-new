// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 优惠券市场 Coupon/coupon_market
 */
export function getCouponMarketList(data) {
  return request({
    url: '/Coupon/coupon_market',
    method: 'get',
    data
  })
}

/**
 * 领取优惠券 Coupon/get_coupon
 * @param {int} coupon_id require 优惠券id
 */
export function getCoupon(data) {
  return request({
    url: '/Coupon/get_coupon',
    method: 'get',
    data
  })
}

/**
 * 我的优惠券列表 Coupon/my_coupon_list
 * @param {int} type require 全部 0:待使用 1:已使用 -2:已过期
 * @param {object} goods require i	是	int	商品index 0-n
 *  {"goods_id": "2","goods_num": "2","type": "1","is_pre_goods": "0","unit_id": "1"}
 */
export function getMyCouponList(data) {
  return request({
    url: '/Coupon/my_coupon_list',
    method: 'post',
    data
  })
}

/**
 * 优惠券详情 Coupon/get_coupon_info
 * @param {int} coupon_id require 优惠券id 不是我的优惠券id
 */
export function couponDetail(data) {
  return request({
    url: '/Coupon/get_coupon_info',
    method: 'get',
    data
  })
}