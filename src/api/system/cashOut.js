import request from '@/utils/request'

// 提现配置查询
export function cashOutInfo(query) {
  return request({
    url: '/cash/out/info',
    method: 'get',
    params: query
  })
}

// 提现配置修改
export function cashOutEdit(data) {
    return request({
      url: '/cash/out/edit',
      method: 'post',
      data
    })
  }