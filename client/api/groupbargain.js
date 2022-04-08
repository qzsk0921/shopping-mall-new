import request from '../utils/request'

/**
 * (完)火热拼团列表页 groupBargaining/goods_list
 */
export function getGroupbargainList(data) {
  return request({
    url: '/groupBargaining/goods_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * (完)拼团人员页面 groupBargaining/member_list
 * @param {int} goods_group_bargaining_team_id require 我的拼团团队id
 */
export function getGroupbargainMemberList(data) {
  return request({
    url: '/groupBargaining/member_list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * (完)拼团结果页 groupBargaining/result
 * @param {int} goods_group_bargaining_team_id require 我的拼团团队id
 */
export function getGroupbargainRes(data) {
  return request({
    url: '/groupBargaining/result',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 *（完）我的拼团列表接口 groupBargaining/list
 */
export function getMyGroupbargainList(data) {
  return request({
    url: '/groupBargaining/list',
    method: 'get',
    data,
    load: 'noload'
  })
}

/**
 * 发起拼团 GroupBargaining/create_bargaining
 * @param {int} goods_group_bargaining_team_id require 团队id
 */
export function createGroupbargain(data) {
  return request({
    url: '/GroupBargaining/create_bargaining',
    method: 'get',
    data,
    load: 'noload'
  })
}