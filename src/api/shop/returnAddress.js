import request from '@/utils/request'

// 查询用户收货地址列表
export function listReturnAddress(query) {
  return request({
    url: '/shop/returnAddress/list',
    method: 'get',
    params: query
  })
}

// 查询用户收货地址详细
export function getReturnAddress(id) {
  return request({
    url: '/shop/returnAddress/' + id,
    method: 'get'
  })
}

// 新增用户收货地址
export function addReturnAddress(data) {
  return request({
    url: '/shop/returnAddress',
    method: 'post',
    data: data
  })
}

// 修改用户收货地址
export function updateReturnAddress(data) {
  return request({
    url: '/shop/returnAddress',
    method: 'put',
    data: data
  })
}

// 删除用户收货地址
export function delReturnAddress(id) {
  return request({
    url: '/shop/returnAddress/' + id,
    method: 'delete'
  })
}
