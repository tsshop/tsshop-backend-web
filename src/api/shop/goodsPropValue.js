import request from '@/utils/request'

// 查询规格参数列表
export function listGoodsPropValue(query) {
  return request({
    url: '/shop/goodsPropValue/list',
    method: 'get',
    params: query
  })
}

// 查询规格参数详细
export function getGoodsPropValue(valueId) {
  return request({
    url: '/shop/goodsPropValue/' + valueId,
    method: 'get'
  })
}

// 新增规格参数
export function addGoodsPropValue(data) {
  return request({
    url: '/shop/goodsPropValue',
    method: 'post',
    data: data
  })
}

// 修改规格参数
export function updateGoodsPropValue(data) {
  return request({
    url: '/shop/goodsPropValue',
    method: 'put',
    data: data
  })
}

// 删除规格参数
export function delGoodsPropValue(valueId) {
  return request({
    url: '/shop/goodsPropValue/' + valueId,
    method: 'delete'
  })
}
