import request from '@/api/request'

export function getQuestions (data) {
  return request({
    url: '/questionaire/getQuestions',
    method: 'get',
    data
  })
}

export function getCities (data) {
  return request({
    url: '/questionaire/getCities',
    method: 'get',
    data
  })
}