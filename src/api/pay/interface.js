import request from '@/utils/request'

// 查询支付接口列表
export function listInterface(query) {
  return request({
    url: '/pay/interface/list',
    method: 'get',
    params: query
  })
}

// 查询支付接口详细
export function getInterface(id) {
  return request({
    url: '/pay/interface/' + id,
    method: 'get'
  })
}

// 新增支付接口
export function addInterface(data) {
  return request({
    url: '/pay/interface',
    method: 'post',
    data: data
  })
}

// 修改支付接口
export function updateInterface(data) {
  return request({
    url: '/pay/interface',
    method: 'put',
    data: data
  })
}

// 删除支付接口
export function delInterface(id) {
  return request({
    url: '/pay/interface/' + id,
    method: 'delete'
  })
}


// 开启关闭
export function closeInterface(data) {
  return request({
    url: '/pay/interface/close',
    method: 'put',
    data: data
  })
}