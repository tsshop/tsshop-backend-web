import request from '@/utils/request'

// 查询用户礼物列表
export function listUserGift(query) {
  return request({
    url: '/liveGift/userGift/list',
    method: 'get',
    params: query
  })
}

// 查询用户礼物详细
export function getUserGift(id) {
  return request({
    url: '/liveGift/userGift/' + id,
    method: 'get'
  })
}

// 新增用户礼物
export function addUserGift(data) {
  return request({
    url: '/liveGift/userGift',
    method: 'post',
    data: data
  })
}

// 修改用户礼物
export function updateUserGift(data) {
  return request({
    url: '/liveGift/userGift',
    method: 'put',
    data: data
  })
}

// 删除用户礼物
export function delUserGift(id) {
  return request({
    url: '/liveGift/userGift/' + id,
    method: 'delete'
  })
}
