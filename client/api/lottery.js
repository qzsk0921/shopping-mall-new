import request from '../utils/request'

/**
 * 抽奖页面接口 LuckyDraw/draw_info
 */
export function getPrizeList(data) {
  return request({
    url: '/LuckyDraw/draw_info',
    method: 'get',
    data
  })
}

/**
 * 开始抽奖接口 LuckyDraw/start_draw
 * @param {*} data 
 */
export function lotteryStart(data) {
  return request({
    url: '/LuckyDraw/start_draw',
    method: 'get',
    data,
    load: 'noload'
  })
}


/**
 * 抽奖记录接口 LuckyDraw/draw_list
 * @param {int} ex_type require 1:奖品列表 2:积分列表
 * 
 */
export function getLotteryList(data) {
  return request({
    url: '/LuckyDraw/draw_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 用户积分页面 user/integral_info
 * @param {int} source_type require “”:全部 1:会员奖励 2:消费 3:幸运大抽奖
 */
export function getScoreList(data) {
  return request({
    url: '/user/integral_info',
    method: 'get',
    data
  })
}


/**
 * 用户领奖接口 LuckyDraw/get_prizes
 * @param {int} draw_reward_prize_id require 奖品列表id
 * @param {int} address_id require 用户地址
 */
export function getPrize(data) {
  return request({
    url: '/LuckyDraw/get_prizes',
    method: 'get',
    data
  })
}