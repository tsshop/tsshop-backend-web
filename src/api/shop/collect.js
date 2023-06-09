import request from '@/utils/request'

// 查询商品收藏列表
export function listCollect(query) {
  return request({
    url: '/shop/collect/list',
    method: 'get',
    params: query
  })
}

// 查询商品收藏详细
export function getCollect(id) {
  return request({
    url: '/shop/collect/' + id,
    method: 'get'
  })
}

// 新增商品收藏
export function addCollect(data) {
  return request({
    url: '/shop/collect',
    method: 'post',
    data: data
  })
}

// 修改商品收藏
export function updateCollect(data) {
  return request({
    url: '/shop/collect',
    method: 'put',
    data: data
  })
}

// 删除商品收藏
export function delCollect(id) {
  return request({
    url: '/shop/collect/' + id,
    method: 'delete'
  })
}
