import request from '@/utils/request'

// 查询店铺提现配置列表
export function listConfig(query) {
  return request({
    url: '/liveConfig/config/list',
    method: 'get',
    params: query
  })
}

// 查询店铺提现配置详细
export function getConfig(id) {
  return request({
    url: '/liveConfig/config/' + id,
    method: 'get'
  })
}

// 新增店铺提现配置
export function addConfig(data) {
  return request({
    url: '/liveConfig/config',
    method: 'post',
    data: data
  })
}

// 修改店铺提现配置
export function updateConfig(data) {
  return request({
    url: '/liveConfig/config',
    method: 'put',
    data: data
  })
}

// 删除店铺提现配置
export function delConfig(id) {
  return request({
    url: '/liveConfig/config/' + id,
    method: 'delete'
  })
}
