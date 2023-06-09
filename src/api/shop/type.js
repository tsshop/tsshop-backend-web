import request from '@/utils/request'

// 查询商品类型列表
export function listType(query) {
  return request({
    url: '/shop/type/list',
    method: 'get',
    params: query
  })
}

// 查询商品类型详细
export function getType(id) {
  return request({
    url: '/shop/type/' + id,
    method: 'get'
  })
}

// 新增商品类型
export function addType(data) {
  return request({
    url: '/shop/type',
    method: 'post',
    data: data
  })
}

// 修改商品类型
export function updateType(data) {
  return request({
    url: '/shop/type',
    method: 'put',
    data: data
  })
}

// 删除商品类型
export function delType(id) {
  return request({
    url: '/shop/type/' + id,
    method: 'delete'
  })
}
