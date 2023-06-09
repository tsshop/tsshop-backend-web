import request from '@/utils/request'

// 查询商品类型列表
export function listGoodsType(query) {
  return request({
    url: '/shop/goodsType/list',
    method: 'get',
    params: query
  })
}

// 查询商品类型详细
export function getGoodsType(id) {
  return request({
    url: '/shop/goodsType/' + id,
    method: 'get'
  })
}

// 新增商品类型
export function addGoodsType(data) {
  return request({
    url: '/shop/goodsType',
    method: 'post',
    data: data
  })
}

// 修改商品类型
export function updateGoodsType(data) {
  return request({
    url: '/shop/goodsType',
    method: 'put',
    data: data
  })
}

// 删除商品类型
export function delGoodsType(id) {
  return request({
    url: '/shop/goodsType/' + id,
    method: 'delete'
  })
}
