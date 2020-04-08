import request from '@/api/request'

export function getSealStamped (data) {
  return request({
    url: '/seal/getSealStamped',
    method: 'get',
    data
  })
}