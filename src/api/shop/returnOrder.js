import request from '@/utils/request'

// 查询退款列表
export function listReturnOrder(query) {
  return request({
    url: '/shop/returnOrder/list',
    method: 'get',
    params: query
  })
}

// 查询退款详细
export function getReturnOrder(id) {
  return request({
    url: '/shop/returnOrder/' + id,
    method: 'get'
  })
}

// 新增退款
export function addReturnOrder(data) {
  return request({
    url: '/shop/returnOrder',
    method: 'post',
    data: data
  })
}

// 修改退款
export function updateReturnOrder(data) {
  return request({
    url: '/shop/returnOrder',
    method: 'put',
    data: data
  })
}

// 删除退款
export function delReturnOrder(id) {
  return request({
    url: '/shop/returnOrder/' + id,
    method: 'delete'
  })
}
