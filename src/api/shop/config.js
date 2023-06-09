import request from '@/utils/request'

// 查询配置列表
export function listConfig(query) {
  return request({
    url: '/shop/config/list',
    method: 'get',
    params: query
  })
}

// 查询配置详细
export function getConfig(id) {
  return request({
    url: '/shop/config/' + id,
    method: 'get'
  })
}

// 新增配置
export function addConfig(data) {
  return request({
    url: '/shop/config',
    method: 'post',
    data: data
  })
}

// 修改配置
export function updateConfig(data) {
  return request({
    url: '/shop/config',
    method: 'put',
    data: data
  })
}

// 删除配置
export function delConfig(id) {
  return request({
    url: '/shop/config/' + id,
    method: 'delete'
  })
}
