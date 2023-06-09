import request from '@/utils/request'

// 查询评论列表
export function listGoodsReview(query) {
  return request({
    url: '/shop/goodsReview/list',
    method: 'get',
    params: query
  })
}

// 查询评论详细
export function getGoodsReview(id) {
  return request({
    url: '/shop/goodsReview/' + id,
    method: 'get'
  })
}

// 新增评论
export function addGoodsReview(data) {
  return request({
    url: '/shop/goodsReview',
    method: 'post',
    data: data
  })
}

// 修改评论
export function updateGoodsReview(data) {
  return request({
    url: '/shop/goodsReview',
    method: 'put',
    data: data
  })
}

// 删除评论
export function delGoodsReview(id) {
  return request({
    url: '/shop/goodsReview/' + id,
    method: 'delete'
  })
}
