import request from '@/utils/request'

// 查询运费模板列表
export function listTransport(query) {
  return request({
    url: '/shop/transport/list',
    method: 'get',
    params: query
  })
}

// 查询运费模板详细
export function getTransport(transportId) {
  return request({
    url: '/shop/transport/' + transportId,
    method: 'get'
  })
}

// 新增运费模板
export function addTransport(data) {
  return request({
    url: '/shop/transport',
    method: 'post',
    data: data
  })
}

// 修改运费模板
export function updateTransport(data) {
  return request({
    url: '/shop/transport',
    method: 'put',
    data: data
  })
}

// 删除运费模板
export function delTransport(transportId) {
  return request({
    url: '/shop/transport/' + transportId,
    method: 'delete'
  })
}
