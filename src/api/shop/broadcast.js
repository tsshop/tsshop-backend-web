import request from '@/utils/request'

// 查询直播记录列表
export function listBroadcast(query) {
  return request({
    url: '/shop/broadcast/list',
    method: 'get',
    params: query
  })
}

// 查询直播记录详细
export function getBroadcast(id) {
  return request({
    url: '/shop/broadcast/' + id,
    method: 'get'
  })
}

// 新增直播记录
export function addBroadcast(data) {
  return request({
    url: '/shop/broadcast',
    method: 'post',
    data: data
  })
}

// 修改直播记录
export function updateBroadcast(data) {
  return request({
    url: '/shop/broadcast',
    method: 'put',
    data: data
  })
}

// 删除直播记录
export function delBroadcast(id) {
  return request({
    url: '/shop/broadcast/' + id,
    method: 'delete'
  })
}
