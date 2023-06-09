import request from '@/utils/request'

// 查询地址列表
export function listArea(query) {
  return request({
    url: '/shop/area/list',
    method: 'get',
    params: query
  })
}

// 查询地址详细
export function getArea(areaId) {
  return request({
    url: '/shop/area/' + areaId,
    method: 'get'
  })
}

// 新增地址
export function addArea(data) {
  return request({
    url: '/shop/area',
    method: 'post',
    data: data
  })
}

// 修改地址
export function updateArea(data) {
  return request({
    url: '/shop/area',
    method: 'put',
    data: data
  })
}

// 删除地址
export function delArea(areaId) {
  return request({
    url: '/shop/area/' + areaId,
    method: 'delete'
  })
}
