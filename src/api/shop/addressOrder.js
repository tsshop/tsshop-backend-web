import request from '@/utils/request'

// 查询用户收货地址列表
export function listAddressOrder(query) {
  return request({
    url: '/shop/addressOrder/list',
    method: 'get',
    params: query
  })
}

// 查询用户收货地址详细
export function getAddressOrder(id) {
  return request({
    url: '/shop/addressOrder/' + id,
    method: 'get'
  })
}

// 新增用户收货地址
export function addAddressOrder(data) {
  return request({
    url: '/shop/addressOrder',
    method: 'post',
    data: data
  })
}

// 修改用户收货地址
export function updateAddressOrder(data) {
  return request({
    url: '/shop/addressOrder',
    method: 'put',
    data: data
  })
}

// 删除用户收货地址
export function delAddressOrder(id) {
  return request({
    url: '/shop/addressOrder/' + id,
    method: 'delete'
  })
}
