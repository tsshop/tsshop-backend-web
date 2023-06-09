import request from '@/utils/request'

// 查询支付通道列表
export function listThoroughfare(query) {
  return request({
    url: '/pay/thoroughfare/list',
    method: 'get',
    params: query
  })
}

// 查询支付通道详细
export function getThoroughfare(id) {
  return request({
    url: '/pay/thoroughfare/' + id,
    method: 'get'
  })
}

// 新增支付通道
export function addThoroughfare(data) {
  return request({
    url: '/pay/thoroughfare',
    method: 'post',
    data: data
  })
}

// 修改支付通道
export function updateThoroughfare(data) {
  return request({
    url: '/pay/thoroughfare',
    method: 'put',
    data: data
  })
}

// 删除支付通道
export function delThoroughfare(id) {
  return request({
    url: '/pay/thoroughfare/' + id,
    method: 'delete'
  })
}


// 开启关闭
export function closeThoroughfare(data) {
  return request({
    url: '/pay/thoroughfare/close',
    method: 'put',
    data: data
  })
}

// 开启关闭提现功能
export function closeWithdrawals(data) {
  return request({
    url: '/pay/thoroughfare/supportWithdrawals/close',
    method: 'put',
    data: data
  })
}