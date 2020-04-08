import Mock from 'mockjs'

import user from './user'
import seal from './seal'
import questionaire from './questionaire'

const mocks = [
  ...user, ...seal, ...questionaire
]

mocks.map(route => {
  Mock.mock(new RegExp(route.url), route.type, route.response)
})