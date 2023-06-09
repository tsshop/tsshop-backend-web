import request from '@/utils/request'

// 查询规格参数列表
export function listValue(query) {
  return request({
    url: '/shop/value/list',
    method: 'get',
    params: query
  })
}

// 查询规格参数详细
export function getValue(valueId) {
  return request({
    url: '/shop/value/' + valueId,
    method: 'get'
  })
}

// 新增规格参数
export function addValue(data) {
  return request({
    url: '/shop/value',
    method: 'post',
    data: data
  })
}

// 修改规格参数
export function updateValue(data) {
  return request({
    url: '/shop/value',
    method: 'put',
    data: data
  })
}

// 删除规格参数
export function delValue(valueId) {
  return request({
    url: '/shop/value/' + valueId,
    method: 'delete'
  })
}
