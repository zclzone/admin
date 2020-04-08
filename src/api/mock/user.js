const tokens = {
  admin: {
    user: 'admin',
    tokenCode: 'admin-token'
  },
  visitor: {
    user: 'visitor',
    tokenCode: 'visitor-token'
  }
}

const users = {
  'admin': {
    name: 'admin',
    roles: ['admin'],
    introduction: '全栈工程师',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    authRoutes: [
      {
        name: 'OA系统',
        path: '/oa'
      },
      {
        name: '印章盖印管理',
        path: '/oa/seal'
      },
      {
        name: 'function2',
        path: '/oa/function2'
      },
      {
        name: '疫情调查',
        path: '/questionaire'
      },
      {
        name: '疫情问卷',
        path: '/questionaire/index'
      }
    ]
  },
  'visitor': {
    name: 'Visitor',
    roles: ['visitor'],
    introduction: 'I am an visitor',
    avatar: 'https://avatars1.githubusercontent.com/u/49337591?s=40&v=4',
    authRoutes: [
      {
        name: 'OA系统',
        path: '/oa'
      },
      {
        name: 'function1',
        path: '/oa/seal'
      }
    ]
  }
}

export default [
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = JSON.parse(config.body)
      const token = tokens[username]
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect'
        }
      }
      return {
        code: 200,
        token
      }
    }
  },
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { user, tokenCode } = JSON.parse(config.body)
      const info = users[user]

      if (!info) {
        return {
          code: 50008,
          message: 'Login failed,unable to get user details'
        }
      }

      return {
        code: 200,
        data: info
      }
    }
  },
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

