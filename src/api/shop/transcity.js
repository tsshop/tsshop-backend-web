import request from '@/utils/request'

// 查询运费城市的模板列表
export function listTranscity(query) {
  return request({
    url: '/shop/transcity/list',
    method: 'get',
    params: query
  })
}

// 查询运费城市的模板详细
export function getTranscity(transcityId) {
  return request({
    url: '/shop/transcity/' + transcityId,
    method: 'get'
  })
}

// 新增运费城市的模板
export function addTranscity(data) {
  return request({
    url: '/shop/transcity',
    method: 'post',
    data: data
  })
}

// 修改运费城市的模板
export function updateTranscity(data) {
  return request({
    url: '/shop/transcity',
    method: 'put',
    data: data
  })
}

// 删除运费城市的模板
export function delTranscity(transcityId) {
  return request({
    url: '/shop/transcity/' + transcityId,
    method: 'delete'
  })
}
