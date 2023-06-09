import request from '@/utils/request'

// 查询秒杀活动列表
export function listSeckill(query) {
  return request({
    url: '/shop/seckill/list',
    method: 'get',
    params: query
  })
}

// 查询秒杀活动详细
export function getSeckill(id) {
  return request({
    url: '/shop/seckill/' + id,
    method: 'get'
  })
}

// 新增秒杀活动
export function addSeckill(data) {
  return request({
    url: '/shop/seckill',
    method: 'post',
    data: data
  })
}

// 修改秒杀活动
export function updateSeckill(data) {
  return request({
    url: '/shop/seckill',
    method: 'put',
    data: data
  })
}

// 删除秒杀活动
export function delSeckill(id) {
  return request({
    url: '/shop/seckill/' + id,
    method: 'delete'
  })
}
