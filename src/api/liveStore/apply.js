import request from '@/utils/request'

// 查询直播小店申请列表
export function listApply(query) {
  return request({
    url: '/system/apply/list',
    method: 'get',
    params: query
  })
}

// 查询直播小店申请详细
export function getApply(id) {
  return request({
    url: '/system/apply/' + id,
    method: 'get'
  })
}

// 新增直播小店申请
export function addApply(data) {
  return request({
    url: '/system/apply',
    method: 'post',
    data: data
  })
}

// 修改直播小店申请
export function updateApply(data) {
  return request({
    url: '/system/apply',
    method: 'put',
    data: data
  })
}

// 删除直播小店申请
export function delApply(id) {
  return request({
    url: '/system/apply/' + id,
    method: 'delete'
  })
}
