import request from '@/utils/request'

// 查询商品列表
export function listGoods(query) {
  return request({
    url: '/shop/goods/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getGoods(id) {
  return request({
    url: '/shop/goods/' + id,
    method: 'get'
  })
}

// 新增商品
export function addGoods(data) {
  return request({
    url: '/shop/goods',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateGoods(data) {
  return request({
    url: '/shop/goods',
    method: 'post',
    data: data
  })
}

// 删除商品
export function delGoods(id) {
  return request({
    url: '/shop/goods/' + id,
    method: 'delete'
  })
}
