import request from '@/utils/request'

// 查询商品收藏列表
export function listGoodsCollect(query) {
  return request({
    url: '/shop/goodsCollect/list',
    method: 'get',
    params: query
  })
}

// 查询商品收藏详细
export function getGoodsCollect(id) {
  return request({
    url: '/shop/goodsCollect/' + id,
    method: 'get'
  })
}

// 新增商品收藏
export function addGoodsCollect(data) {
  return request({
    url: '/shop/goodsCollect',
    method: 'post',
    data: data
  })
}

// 修改商品收藏
export function updateGoodsCollect(data) {
  return request({
    url: '/shop/goodsCollect',
    method: 'put',
    data: data
  })
}

// 删除商品收藏
export function delGoodsCollect(id) {
  return request({
    url: '/shop/goodsCollect/' + id,
    method: 'delete'
  })
}
