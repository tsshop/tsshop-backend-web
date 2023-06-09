import request from '@/utils/request'

// 快递鸟配置查询
export function expressConfigInfo(query) {
  return request({
    url: '/expressConfig/info',
    method: 'get',
    params: query
  })
}

// 快递鸟配置修改
export function expressConfigEdit(data) {
    return request({
      url: '/expressConfig/edit',
      method: 'post',
      data
    })
  }