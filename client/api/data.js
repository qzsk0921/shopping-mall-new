// 统计
import request from '../utils/request'

/**
 * 统计时长 Index/set_log_time
 * @param {int} type require 1:开始 2:结束
 * @param {int} page_id 结束时需要上传
 */
export function setTrack(data) {
  return request({
    url: '/Index/set_log_time',
    method: 'get',
    data,
    load: 'noload'
  })
}