// https://www.showdoc.com.cn/1722521359176667/8053561250017786 Xczm190410
import request from '../utils/request'

/**
 * 商城首页 Index/home
 * @param {string} shop_id require 设置地址返回的店铺id
 * @param {string} sale_id 业务员分享带过来的业务员id
 */
export function getShopData(data) {
  return request({
    url: '/Index/home',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 商品分类
 * @param {int} pid require 0:父级 其他:父级分类id
 */
export function getCategoryList(data, noload) {
  return request({
    url: '/Category/get_category_list',
    method: 'post',
    data,
    load: noload ? 'noload' : ''
  })
}

/**
 * 商品列表 goods/goods_list
 * @param {string} order_by_type 1:销量从高到低 2:销量从低到高 3:价格从高到底 4:价格从低到高
 * @param {string} keyword 关键词
 * @param {int} brand_id 品牌id
 * @param {string} is_pre_sale 是否预售商品1:是 0:否
 * @param {int} category_id 分类id
 * @param {int} activity_id 活动id
 * @param {int} group_id 商品分组id
 * @param {int} shop_id 定位获取的shop_id
 */
export function getGoodsList(data) {
  return request({
    url: '/goods/goods_list',
    method: 'get',
    data
  })
}

/**
 * 商品详情 goods/goods_info
 * @param {string} id 商品id
 * @param {string} shop_id 店铺id
 * @param {string} share_id 分享id
 */
export function getGoodsDetail(data) {
  return request({
    url: '/goods/goods_info',
    method: 'get',
    data
  })
}

/**
 * 商品收藏 goods/goods_like
 * @param {int} goods_id 商品id
 * @param {string} type 0:取消关注 1:关注
 */
export function setGoodsCollection(data) {
  return request({
    url: '/goods/goods_like',
    method: 'post',
    data
  })
}

/**
 * 商品收藏列表 goods/goods_like_list
 * @param {string} shop_id 店铺id
 */
export function getGoodsCollectionList(data) {
  return request({
    url: '/goods/goods_like_list',
    method: 'get',
    data
  })
}

/**
 * 商品浏览记录 goods/get_view_goods
 * @param {string} shop_id 店铺id
 */
export function getViewHistory(data) {
  return request({
    url: '/goods/goods_view_log',
    method: 'get',
    data
  })
}

/**
 * 获取搜索词 Index/search_key_list
 * @param {string} keyword require 关键词
 */
export function getKeyList(data) {
  return request({
    url: '/Index/search_key_list',
    method: 'get',
    data
  })
}