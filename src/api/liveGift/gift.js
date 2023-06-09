import request from '@/utils/request'

// 查询直播礼物列表
export function listGift(query) {
  return request({
    url: '/liveGift/gift/list',
    method: 'get',
    params: query
  })
}

// 查询直播礼物详细
export function getGift(id) {
  return request({
    url: '/liveGift/gift/' + id,
    method: 'get'
  })
}

// 新增直播礼物
export function addGift(data) {
  return request({
    url: '/liveGift/gift',
    method: 'post',
    data: data
  })
}

// 修改直播礼物
export function updateGift(data) {
  return request({
    url: '/liveGift/gift',
    method: 'put',
    data: data
  })
}

// 删除直播礼物
export function delGift(id) {
  return request({
    url: '/liveGift/gift/' + id,
    method: 'delete'
  })
}
