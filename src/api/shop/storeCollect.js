import request from '@/utils/request'

// 查询店铺收藏列表
export function listStoreCollect(query) {
  return request({
    url: '/shop/storeCollect/list',
    method: 'get',
    params: query
  })
}

// 查询店铺收藏详细
export function getStoreCollect(id) {
  return request({
    url: '/shop/storeCollect/' + id,
    method: 'get'
  })
}

// 新增店铺收藏
export function addStoreCollect(data) {
  return request({
    url: '/shop/storeCollect',
    method: 'post',
    data: data
  })
}

// 修改店铺收藏
export function updateStoreCollect(data) {
  return request({
    url: '/shop/storeCollect',
    method: 'put',
    data: data
  })
}

// 删除店铺收藏
export function delStoreCollect(id) {
  return request({
    url: '/shop/storeCollect/' + id,
    method: 'delete'
  })
}
