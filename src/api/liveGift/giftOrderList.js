import request from '@/utils/request'

// 获取礼物列表
export function getGiftOrderList(data) {
    return request({
      url: '/liveGift/order/list',
      method: 'post',
      data: data
    })
  }

  export function getPayTypeMap() {
    return request({
      url: '/pay/type/getType',
      method: '',
    })
  }