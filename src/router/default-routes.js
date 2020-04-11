const defaultRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: _ => import('@/views/index'),
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        component: _ => import('@/views/index/default'),
        meta: {
          title: '首页'
        }
      }
    ],
  },
  {
    path: '/login',
    component: _ => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
    meta: {
      title: '404-错误页'
    }
  }
]

export default defaultRoutes