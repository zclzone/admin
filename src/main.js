import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/index'

import './styles/main.scss'
import 'element-ui/lib/theme-chalk/index.css';

import Element from 'element-ui'

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// 路由权限拦截
import './router/permission'

// mock
import './api/mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
