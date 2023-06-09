import request from '@/utils/request'

// 查询包邮城市项列表
export function listTranscityFree(query) {
  return request({
    url: '/shop/transcityFree/list',
    method: 'get',
    params: query
  })
}

// 查询包邮城市项详细
export function getTranscityFree(transcityFreeId) {
  return request({
    url: '/shop/transcityFree/' + transcityFreeId,
    method: 'get'
  })
}

// 新增包邮城市项
export function addTranscityFree(data) {
  return request({
    url: '/shop/transcityFree',
    method: 'post',
    data: data
  })
}

// 修改包邮城市项
export function updateTranscityFree(data) {
  return request({
    url: '/shop/transcityFree',
    method: 'put',
    data: data
  })
}

// 删除包邮城市项
export function delTranscityFree(transcityFreeId) {
  return request({
    url: '/shop/transcityFree/' + transcityFreeId,
    method: 'delete'
  })
}
