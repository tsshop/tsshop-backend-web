import request from '@/utils/request'

// 查询包邮城市项列表
export function listFree(query) {
  return request({
    url: '/shop/free/list',
    method: 'get',
    params: query
  })
}

// 查询包邮城市项详细
export function getFree(transcityFreeId) {
  return request({
    url: '/shop/free/' + transcityFreeId,
    method: 'get'
  })
}

// 新增包邮城市项
export function addFree(data) {
  return request({
    url: '/shop/free',
    method: 'post',
    data: data
  })
}

// 修改包邮城市项
export function updateFree(data) {
  return request({
    url: '/shop/free',
    method: 'put',
    data: data
  })
}

// 删除包邮城市项
export function delFree(transcityFreeId) {
  return request({
    url: '/shop/free/' + transcityFreeId,
    method: 'delete'
  })
}
