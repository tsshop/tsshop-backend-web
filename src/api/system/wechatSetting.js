import request from '@/utils/request'

// 快递鸟配置查询
export function wechatInfo(query) {
  return request({
    url: '/appConfig/liteInfo',
    method: 'get',
    params: query
  })
}

// 快递鸟配置修改
export function wechatEdit(data) {
    return request({
      url: '/appConfig/editLite',
      method: 'post',
      data
    })
  }