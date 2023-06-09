import request from '@/utils/request'

// 查询运费项列表
export function listTransfee(query) {
  return request({
    url: '/shop/transfee/list',
    method: 'get',
    params: query
  })
}

// 查询运费项详细
export function getTransfee(transfeeId) {
  return request({
    url: '/shop/transfee/' + transfeeId,
    method: 'get'
  })
}

// 新增运费项
export function addTransfee(data) {
  return request({
    url: '/shop/transfee',
    method: 'post',
    data: data
  })
}

// 修改运费项
export function updateTransfee(data) {
  return request({
    url: '/shop/transfee',
    method: 'put',
    data: data
  })
}

// 删除运费项
export function delTransfee(transfeeId) {
  return request({
    url: '/shop/transfee/' + transfeeId,
    method: 'delete'
  })
}
