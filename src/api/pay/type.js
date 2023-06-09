import request from '@/utils/request'

// 查询支付方式列表
export function listType(query) {
  return request({
    url: '/pay/type/list',
    method: 'get',
    params: query
  })
}

// 查询支付方式详细
export function getType(id) {
  return request({
    url: '/pay/type/' + id,
    method: 'get'
  })
}

// 新增支付方式
export function addType(data) {
  return request({
    url: '/pay/type',
    method: 'post',
    data: data
  })
}

// 修改支付方式
export function updateType(data) {
  return request({
    url: '/pay/type',
    method: 'put',
    data: data
  })
}

// 删除支付方式
export function delType(id) {
  return request({
    url: '/pay/type/' + id,
    method: 'delete'
  })
}
