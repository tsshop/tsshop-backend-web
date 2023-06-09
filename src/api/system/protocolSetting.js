import request from '@/utils/request'

// 协议信息查询
export function protocolInfo(query) {
  return request({
    url: '/appConfig/agreementInfo',
    method: 'get',
    params: query
  })
}

// 协议信息修改
export function protocolEdit(data) {
    return request({
      url: '/appConfig/editAgreementConfig',
      method: 'post',
      data
    })
  }