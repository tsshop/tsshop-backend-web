import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listStorage(query) {
  return request({
    url: '/system/storage/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getStorage(id) {
  return request({
    url: '/system/storage/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addStorage(data) {
  return request({
    url: '/system/storage',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateStorage(data) {
  return request({
    url: '/system/storage',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delStorage(id) {
  return request({
    url: '/system/storage/' + id,
    method: 'delete'
  })
}

// 获取储存方式
export function getTypeApi(id) {
  return request({
    url: '/storage/type/getType',
    method: 'get'
  })
}