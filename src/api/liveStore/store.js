import request from '@/utils/request'

// 查询直播小店列表
export function listStore(query) {
  return request({
    url: '/system/store/list',
    method: 'get',
    params: query
  })
}

// 查询直播小店详细
export function getStore(params) {
  return request({
    url: '/system/store/info',
    method: 'get',
    params
  })
}

// 新增直播小店
export function addStore(data) {
  return request({
    url: '/system/store',
    method: 'post',
    data: data
  })
}

// 修改直播小店
export function updateStore(data) {
  return request({
    url: '/system/store',
    method: 'put',
    data: data
  })
}

// 删除直播小店
export function delStore(id) {
  return request({
    url: '/system/store/' + id,
    method: 'delete'
  })
}

// 查询直播小店详细
export function getStoreGoods(data) {
  return request({
    url: '/liveStoreGoods/list',
    method: 'post',
    data
  })
}