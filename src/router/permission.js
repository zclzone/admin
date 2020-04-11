import router from './index'
import store from '@/store'

import { getToken, setToken } from '@/utils/cookie-util'
import getPageTitle from '@/utils/page-title'

import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//路由全局守护
const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // set title
  document.title = getPageTitle(to.meta.title)

  const token = getToken()
  if (token) {
    setToken(token) //每次路由改变延长Cookie过期时间
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        const { authRoutes } = await store.dispatch('user/getInfo')
        store.dispatch('permission/generateRoutes', authRoutes).then(rst => {
          router.addRoutes(rst)  //动态添加路由
        })
        next()
      } catch (err) {
        await store.dispatch('user/resetToken')
        Message.error(err || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      //白名单通过
      next()
    } else {
      //其他路由跳转登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})