import request from '@/utils/request'

// 查询订单列表
export function listOrder(query) {
  return request({
    url: '/shop/order/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getOrder(id) {
  return request({
    url: '/shop/order/' + id,
    method: 'get'
  })
}

// 新增订单
export function addOrder(data) {
  return request({
    url: '/shop/order',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateOrder(data) {
  return request({
    url: '/shop/order',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delOrder(id) {
  return request({
    url: '/shop/order/' + id,
    method: 'delete'
  })
}

// 新增订单
export function getWuliuInfo(data) {
  return request({
    url: '/shop/order/expressInfo',
    method: 'post',
    data: data
  })
}
