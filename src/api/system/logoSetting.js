import request from '@/utils/request'

// 快递鸟配置查询
export function systemInfo(query) {
  return request({
    url: '/appConfig/info',
    method: 'get',
    params: query
  })
}

// 快递鸟配置修改
export function systemEdit(data) {
    return request({
      url: '/appConfig/edit',
      method: 'post',
      data
    })
  }