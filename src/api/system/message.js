import request from '@/utils/request'

// 短信配置查询
export function messageConfigInfo(query) {
  return request({
    url: '/messageConfig/info',
    method: 'get',
    params: query
  })
}

// 短信配置修改
export function messageConfigEdit(data) {
    return request({
      url: '/messageConfig/edit',
      method: 'post',
      data
    })
  }

// ALI短信配置查询
export function aliMessageConfigInfo(query) {
    return request({
      url: '/messageConfig/dayuInfo',
      method: 'get',
      params: query
    })
  }
  
  // ALI短信配置修改
  export function aliMessageConfigEdit(data) {
      return request({
        url: '/messageConfig/dayuEdit',
        method: 'post',
        data
      })
    }