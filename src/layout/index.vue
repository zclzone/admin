<template>
  <el-container>
    <el-header height="40px">
      <app-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <AppMenu />
      </el-aside>
      <el-main>
        <app-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AppMenu from './components/app-menu'
import AppHeader from './components/app-header'
import AppMain from './components/app-main'
export default {
  methods: {
    ...mapActions({
      generateRoutes: 'permission/generateRoutes'
    })
  },
  components: {
    AppMenu,
    AppHeader,
    AppMain,
  },
  computed: {
    ...mapState({
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      routes: state => state.permission.routes
    })
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background: linear-gradient(to top right, #162948, #e6edef);
}
.el-aside {
  margin: 0;
  padding: 5px 5px 0;
  background: #e6edef;
  height: calc(100vh - 40px);
}
.el-main {
  margin: 0;
  height: calc(100vh - 40px);
  border-top: 5px solid #e6edef;
  border-right: 5px solid #e6edef;
}
</style>