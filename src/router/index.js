import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRoutes from './default-routes'

Vue.use(VueRouter)

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRoutes
})

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

const router = createRouter()

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router
