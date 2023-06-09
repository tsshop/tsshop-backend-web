import request from '@/utils/request'

// 查询直播礼物赠送记录列表
export function listGiftDetail(query) {
  return request({
    url: '/liveGift/giftDetail/list',
    method: 'get',
    params: query
  })
}

// 查询直播礼物赠送记录详细
export function getGiftDetail(id) {
  return request({
    url: '/liveGift/giftDetail/' + id,
    method: 'get'
  })
}

// 新增直播礼物赠送记录
export function addGiftDetail(data) {
  return request({
    url: '/liveGift/giftDetail',
    method: 'post',
    data: data
  })
}

// 修改直播礼物赠送记录
export function updateGiftDetail(data) {
  return request({
    url: '/liveGift/giftDetail',
    method: 'put',
    data: data
  })
}

// 删除直播礼物赠送记录
export function delGiftDetail(id) {
  return request({
    url: '/liveGift/giftDetail/' + id,
    method: 'delete'
  })
}
