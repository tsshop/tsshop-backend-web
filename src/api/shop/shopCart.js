import request from '@/utils/request'

// 查询购物车列表
export function listShopCart(query) {
  return request({
    url: '/shop/shopCart/list',
    method: 'get',
    params: query
  })
}

// 查询购物车详细
export function getShopCart(id) {
  return request({
    url: '/shop/shopCart/' + id,
    method: 'get'
  })
}

// 新增购物车
export function addShopCart(data) {
  return request({
    url: '/shop/shopCart',
    method: 'post',
    data: data
  })
}

// 修改购物车
export function updateShopCart(data) {
  return request({
    url: '/shop/shopCart',
    method: 'put',
    data: data
  })
}

// 删除购物车
export function delShopCart(id) {
  return request({
    url: '/shop/shopCart/' + id,
    method: 'delete'
  })
}
