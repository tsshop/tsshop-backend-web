import request from '@/utils/request'

// 查询包邮金额列表
export function listTransfeeFree(query) {
  return request({
    url: '/shop/transfeeFree/list',
    method: 'get',
    params: query
  })
}

// 查询包邮金额详细
export function getTransfeeFree(transfeeFreeId) {
  return request({
    url: '/shop/transfeeFree/' + transfeeFreeId,
    method: 'get'
  })
}

// 新增包邮金额
export function addTransfeeFree(data) {
  return request({
    url: '/shop/transfeeFree',
    method: 'post',
    data: data
  })
}

// 修改包邮金额
export function updateTransfeeFree(data) {
  return request({
    url: '/shop/transfeeFree',
    method: 'put',
    data: data
  })
}

// 删除包邮金额
export function delTransfeeFree(transfeeFreeId) {
  return request({
    url: '/shop/transfeeFree/' + transfeeFreeId,
    method: 'delete'
  })
}
