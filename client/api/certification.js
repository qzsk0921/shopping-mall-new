// 资质认证
// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 资质认证店铺分类 shop/get_shop_type_list
 */
export function getShopCertType(data) {
  return request({
    url: '/shop/get_shop_type_list',
    method: 'get',
    data
  })
}

/**
 * 资质认证店铺详情 shop/get_user_shop_info
 */
export function getShopCertDetail(data) {
  return request({
    url: '/shop/get_user_shop_info',
    method: 'get',
    data
  })
}

/**
 * 申请资质认证店铺 shop/apply_user_shop
 * @param {string} name require 店铺名称
 * @param {string} leader_name require 负责人名称
 * @param {string} leader_phone require 负责人手机
 * @param {string} shop_type_str require 店铺类型，多选用逗号隔开 利 1,2
 * @param {int} address_id require 用户收货地址id
 */
export function addShopCert(data) {
  return request({
    url: '/shop/apply_user_shop',
    method: 'post',
    data
  })
}