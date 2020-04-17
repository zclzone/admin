import Mock from 'mockjs'

import user from './user/index'
import seal from './seal/index'
import questionaire from './questionaire/index'

const mocks = [
  ...user, ...seal, ...questionaire
]

mocks.map(route => {
  Mock.mock(new RegExp(route.url), route.type, route.response)
})