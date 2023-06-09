import request from '@/utils/request'

// 查询店铺提现记录列表
export function listLog(query) {
  return request({
    url: '/system/log/list',
    method: 'get',
    params: query
  })
}

// 查询店铺提现记录详细
export function getLog(id) {
  return request({
    url: '/system/log/' + id,
    method: 'get'
  })
}

// 新增店铺提现记录
export function addLog(data) {
  return request({
    url: '/system/log',
    method: 'post',
    data: data
  })
}

// 修改店铺提现记录
export function updateLog(data) {
  return request({
    url: '/system/log',
    method: 'put',
    data: data
  })
}

// 删除店铺提现记录
export function delLog(id) {
  return request({
    url: '/system/log/' + id,
    method: 'delete'
  })
}
