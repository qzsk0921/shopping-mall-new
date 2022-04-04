import request from '../utils/request'

/**
 * 购物车页面 Cart/cart_list
 * @param {string} shop_id
 */
export function getCartData(data) {
  return request({
    url: '/Cart/cart_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 购物车操作 Cart/add_cart
 * @param {int} type 1：单单位（列表页面和购物车页面） 2:多单位（商品详情和购物车）
 * @param {int} shop_id 店铺id
 * @param {int} goods_id 商品id
 * @param {int} goods_num 商品数量 -1为扣减
 * @param {int} unit_id 多单位单位
 */
export function addCart(data) {
  return request({
    url: '/Cart/add_cart',
    method: 'post',
    data
  })
}

/**
 * 购物车操作 Cart/add_cart 购物车操作 直接改变数量
 * @param {int} goods_id require 商品id
 * @param {int} goods_num require 商品数量
 * @param {string} attribute_value_str require 选中的属性值id，通过逗号拼接，需要id升序
 */
export function addNumCart(data) {
  return request({
    url: '/Cart/add_num_cart',
    method: 'post',
    data
  })
}

/**
 * 删除购物车 goods/del_cart
 * @param {int} type：require 1:单条商品 3:清空购物车
 * @param {int} goods_id 商品id
 * @param {string} attribute_value_str 多单位单位
 */
export function delCart(data) {
  return request({
    url: '/Cart/del_cart',
    method: 'get',
    data
  })
}

/**
 * 购物车推荐 Cart/cart_like
 * @param {string} require shop_id
 */
export function getRecommendList(data) {
  return request({
    url: '/Cart/cart_like',
    method: 'get',
    data
  })
}