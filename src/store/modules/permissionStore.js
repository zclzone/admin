import defaultRoutes from '@/router/default-routes'
import accessRoutes from '@/router/access-routes'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = defaultRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAccessRoutes(accessRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  generateRoutes ({ commit }, authRoutes) {
    return new Promise(resolve => {
      const authPathList = authRoutes.map(route => {
        return { ...route, path: route.path.replace(/^\//, '') }
      })
      const accessedRoutes = filterAccessRoutes(accessRoutes, authPathList)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}


export function isAccessPath (route, authPathList, parentPath) {
  if (route.path == '*') {
    return true
  }
  const authPath = authPathList.find(item => item.path == route.path.replace(/^\//, ''))
  if (authPath) {
    route.meta.title = authPath.name || route.meta.title
    return true
  }
  if (parentPath) {
    const childAuthPath = authPathList.find(item => item.path == `${parentPath}/${route.path.replace(/^\//, '')}`)
    if (childAuthPath) {
      route.meta.title = childAuthPath.name || route.meta.title
      return true
    }
  }
  if (route.children && authPathList && authPathList.length > 0) {
    return route.children.some(item => {
      let tmp = { ...item }
      tmp.path = `${route.path}/${tmp.path.replace(`/^\//`)}`
      return isAccessPath(tmp, authPathList)  //递归判断子路由路径是否匹配
    })
  }
  return false
}

export function filterAccessRoutes (routes, authPathList, parentPath = '') {
  const res = []
  routes.forEach(route => {
    const tmpRoute = { ...route }
    if (isAccessPath(tmpRoute, authPathList, parentPath)) {
      if (tmpRoute.children) {
        //递归获取所有有权限的子路由
        tmpRoute.children = filterAccessRoutes(tmpRoute.children, authPathList, tmpRoute.path.replace(/^\//, ''))
      }
      res.push(tmpRoute)
    }
  })
  return res
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}