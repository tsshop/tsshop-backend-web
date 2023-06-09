import request from '@/utils/request'

// 查询支付配置列表
export function listConfig(query) {
  return request({
    url: '/pay/config/list',
    method: 'get',
    params: query
  })
}

// 查询支付配置详细
export function getConfig(id) {
  return request({
    url: '/pay/config/' + id,
    method: 'get'
  })
}

// 新增支付配置
export function addConfig(data) {
  return request({
    url: '/pay/config',
    method: 'post',
    data: data
  })
}

// 修改支付配置
export function updateConfig(data) {
  return request({
    url: '/pay/config',
    method: 'put',
    data: data
  })
}

// 删除支付配置
export function delConfig(id) {
  return request({
    url: '/pay/config/' + id,
    method: 'delete'
  })
}
