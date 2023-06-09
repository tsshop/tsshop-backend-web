import request from '@/utils/request'

// 查询物流公司列表
export function listDelivery(query) {
  return request({
    url: '/shop/delivery/list',
    method: 'get',
    params: query
  })
}

// 查询物流公司详细
export function getDelivery(id) {
  return request({
    url: '/shop/delivery/' + id,
    method: 'get'
  })
}

// 新增物流公司
export function addDelivery(data) {
  return request({
    url: '/shop/delivery',
    method: 'post',
    data: data
  })
}

// 修改物流公司
export function updateDelivery(data) {
  return request({
    url: '/shop/delivery',
    method: 'put',
    data: data
  })
}

// 删除物流公司
export function delDelivery(id) {
  return request({
    url: '/shop/delivery/' + id,
    method: 'delete'
  })
}
