import request from '@/utils/request'

// 查询规格列表
export function listGoodsProp(query) {
  return request({
    url: '/shop/goodsProp/list',
    method: 'get',
    params: query
  })
}

// 查询规格详细
export function getGoodsProp(id) {
  return request({
    url: '/shop/goodsProp/' + id,
    method: 'get'
  })
}

// 新增规格
export function addGoodsProp(data) {
  return request({
    url: '/shop/goodsProp',
    method: 'post',
    data: data
  })
}

// 修改规格
export function updateGoodsProp(data) {
  return request({
    url: '/shop/goodsProp',
    method: 'put',
    data: data
  })
}

// 删除规格
export function delGoodsProp(id) {
  return request({
    url: '/shop/goodsProp/' + id,
    method: 'delete'
  })
}
