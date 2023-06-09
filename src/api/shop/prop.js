import request from '@/utils/request'

// 查询规格列表
export function listProp(query) {
  return request({
    url: '/shop/prop/list',
    method: 'get',
    params: query
  })
}

// 查询规格详细
export function getProp(id) {
  return request({
    url: '/shop/prop/' + id,
    method: 'get'
  })
}

// 新增规格
export function addProp(data) {
  return request({
    url: '/shop/prop',
    method: 'post',
    data: data
  })
}

// 修改规格
export function updateProp(data) {
  return request({
    url: '/shop/prop',
    method: 'put',
    data: data
  })
}

// 删除规格
export function delProp(id) {
  return request({
    url: '/shop/prop/' + id,
    method: 'delete'
  })
}
