<template>
  <el-main>
    <bread-crumb :breadItems="breadItems" />
    <transition name="slide-fade"
                mode="out-in">
      <router-view />
    </transition>
  </el-main>
</template>

<script>
import BreadCrumb from '@/components/bread-crumb'

import { mapState } from 'vuex'

export default {
  components: {
    BreadCrumb,
  },
  computed: {
    ...mapState({
      routes: state => state.permission.addRoutes.filter(route => {
        return route.path !== '*' && route.path !== '/404' && route.path != '/'
      })
    }),
    breadItems () {
      const pathes = this.$route.path.replace(/^\//, '').split('/')
      let rootPath = ''
      let breadItems = []
      let currentRoute = this.routes
      for (const path of pathes) {
        for (let i = 0; i < currentRoute.length; i++) {
          if (currentRoute[i].path.replace(/^\//, '') == path) {
            breadItems.push({ path: `${rootPath}/${path}`, name: currentRoute[i].meta.title })
            if (currentRoute[i].children) {
              currentRoute = currentRoute[i].children
              rootPath += `/${path}`
            }
            break
          }
        }
      }
      return breadItems
    }
  },
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: 0;
  height: calc(100vh - 40px);
  border-top: 5px solid #e6edef;
  border-right: 5px solid #e6edef;
  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
}
</style>