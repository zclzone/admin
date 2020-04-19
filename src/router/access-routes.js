import Home from '@/views/index'

const routes = [
  {
    SysID: 'oa',
    SysName: 'OA系统',
    default: 'seal',
    layout: Home,
    children: [
      {
        FunctionID: 'seal',
        FunctionName: '印章盖印管理',
        view: _ => import('@/views/seal')
      },
      {
        FunctionID: 'seal/:id',
        FunctionName: '盖印管理',
        view: _ => import('@/views/seal/detail'),
        hidden: true
      },
      {
        FunctionID: 'function2',
        FunctionName: 'function2',
        view: _ => import('@/views/function2')
      }
    ]
  },
  {
    SysID: 'questionaire',
    SysName: '疫情调查',
    layout: Home,
    default: 'index',
    children: [
      {
        FunctionID: 'index',
        FunctionName: '疫情问卷',
        view: _ => import('@/views/questionaire/index')
      },
      {
        FunctionID: 'create',
        FunctionName: '问卷维护',
        view: _ => import('@/views/questionaire/create')
      }
    ]
  }
]


function createRoutes (routes) {
  let accessRoutes = []
  for (const route of routes) {
    let tempRoute = {
      path: `/${route.SysID}`,
      component: route.layout,
      redirect: `/${route.SysID}/${route.default}`,
      hidden: route.hide || false,
      meta: {
        title: route.SysName || '~'
      },
      children: []
    }
    if (route.children.length) {
      for (const child of route.children) {
        tempRoute.children.push({
          path: child.FunctionID,
          component: child.view,
          hidden: child.hidden || false,
          meta: {
            title: child.FunctionName || '~'
          }
        })
      }
    }
    accessRoutes.push(tempRoute)
  }
  accessRoutes.push({
    path: '*',
    redirect: '/404',
    hidden: true
  })
  return accessRoutes
}

export default createRoutes(routes)



// const accessRoutes = [
//   {
//     path: "/oa",
//     component: Home,
//     meta: {
//       title: 'OA系统'
//     },
//     children: [
//       {
//         path: 'seal',
//         component: _ => import('@/views/seal'),
//         meta: {
//           title: '印章盖印管理'
//         }
//       },
//       {
//         path: 'seal/:id',
//         component: _ => import('@/views/function2'),
//         meta: {
//           title: '印章盖印'
//         }
//       },
//       {
//         path: 'function2',
//         component: _ => import('@/views/function2'),
//         meta: {
//           title: 'function2'
//         }
//       }
//     ]
//   },
//   {
//     path: "/questionaire",
//     component: Home,
//     meta: {
//       title: '疫情调查'
//     },
//     children: [
//       {
//         path: 'index',
//         component: _ => import('@/views/questionaire'),
//         meta: {
//           title: '疫情问卷'
//         }
//       }
//     ]
//   },
//   {
//     path: '*',
//     redirect: '/404',
//     hidden: true
//   },
// ]

// export default accessRoutes