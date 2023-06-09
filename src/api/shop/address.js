import request from '@/utils/request'

// 查询用户收货地址列表
export function listAddress(query) {
  return request({
    url: '/shop/address/list',
    method: 'get',
    params: query
  })
}

// 查询用户收货地址详细
export function getAddress(id) {
  return request({
    url: '/shop/address/' + id,
    method: 'get'
  })
}

// 新增用户收货地址
export function addAddress(data) {
  return request({
    url: '/shop/address',
    method: 'post',
    data: data
  })
}

// 修改用户收货地址
export function updateAddress(data) {
  return request({
    url: '/shop/address',
    method: 'put',
    data: data
  })
}

// 删除用户收货地址
export function delAddress(id) {
  return request({
    url: '/shop/address/' + id,
    method: 'delete'
  })
}
