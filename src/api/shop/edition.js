import request from '@/utils/request'

// 查询版本列表
export function listEdition(query) {
  return request({
    url: '/shop/edition/list',
    method: 'get',
    params: query
  })
}

// 查询版本详细
export function getEdition(id) {
  return request({
    url: '/shop/edition/' + id,
    method: 'get'
  })
}

// 新增版本
export function addEdition(data) {
  return request({
    url: '/shop/edition',
    method: 'post',
    data: data
  })
}

// 修改版本
export function updateEdition(data) {
  return request({
    url: '/shop/edition',
    method: 'put',
    data: data
  })
}

// 删除版本
export function delEdition(id) {
  return request({
    url: '/shop/edition/' + id,
    method: 'delete'
  })
}
