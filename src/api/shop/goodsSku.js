import request from '@/utils/request'

// 查询单品SKU列表
export function listGoodsSku(query) {
  return request({
    url: '/shop/goodsSku/list',
    method: 'get',
    params: query
  })
}

// 查询单品SKU详细
export function getGoodsSku(skuId) {
  return request({
    url: '/shop/goodsSku/' + skuId,
    method: 'get'
  })
}

// 新增单品SKU
export function addGoodsSku(data) {
  return request({
    url: '/shop/goodsSku',
    method: 'post',
    data: data
  })
}

// 修改单品SKU
export function updateGoodsSku(data) {
  return request({
    url: '/shop/goodsSku',
    method: 'put',
    data: data
  })
}

// 删除单品SKU
export function delGoodsSku(skuId) {
  return request({
    url: '/shop/goodsSku/' + skuId,
    method: 'delete'
  })
}
