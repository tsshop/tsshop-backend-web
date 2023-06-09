import request from '@/utils/request'

// 查询单品SKU列表
export function listSku(query) {
  return request({
    url: '/shop/sku/list',
    method: 'get',
    params: query
  })
}

// 查询单品SKU详细
export function getSku(skuId) {
  return request({
    url: '/shop/sku/' + skuId,
    method: 'get'
  })
}

// 新增单品SKU
export function addSku(data) {
  return request({
    url: '/shop/sku',
    method: 'post',
    data: data
  })
}

// 修改单品SKU
export function updateSku(data) {
  return request({
    url: '/shop/sku',
    method: 'put',
    data: data
  })
}

// 删除单品SKU
export function delSku(skuId) {
  return request({
    url: '/shop/sku/' + skuId,
    method: 'delete'
  })
}
