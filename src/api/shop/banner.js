import request from '@/utils/request'

// 查询用户首页轮播图片列表
export function listBanner(query) {
  return request({
    url: '/shop/banner/list',
    method: 'get',
    params: query
  })
}

// 查询用户首页轮播图片详细
export function getBanner(id) {
  return request({
    url: '/shop/banner/' + id,
    method: 'get'
  })
}

// 新增用户首页轮播图片
export function addBanner(data) {
  return request({
    url: '/shop/banner',
    method: 'post',
    data: data
  })
}

// 修改用户首页轮播图片
export function updateBanner(data) {
  return request({
    url: '/shop/banner',
    method: 'put',
    data: data
  })
}

// 删除用户首页轮播图片
export function delBanner(id) {
  return request({
    url: '/shop/banner/' + id,
    method: 'delete'
  })
}
