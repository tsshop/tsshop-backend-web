import request from '@/utils/request'

// 查询店铺收入记录列表
export function listIncome(query) {
  return request({
    url: '/liveStore/income/list',
    method: 'get',
    params: query
  })
}

// 查询店铺收入记录详细
export function getIncome(id) {
  return request({
    url: '/liveStore/income/' + id,
    method: 'get'
  })
}

// 新增店铺收入记录
export function addIncome(data) {
  return request({
    url: '/liveStore/income',
    method: 'post',
    data: data
  })
}

// 修改店铺收入记录
export function updateIncome(data) {
  return request({
    url: '/liveStore/income',
    method: 'put',
    data: data
  })
}

// 删除店铺收入记录
export function delIncome(id) {
  return request({
    url: '/liveStore/income/' + id,
    method: 'delete'
  })
}
