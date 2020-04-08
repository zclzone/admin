<template>
  <el-container>
    <el-header height="40px">
      <div class="logo">
        <h2>Admin</h2>
      </div>
      <div class="info">
        <img :src="avatar"
             class="avatar"></div>
    </el-header>
    <el-container>
      <app-menu />
      <app-main />
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import AppMenu from './components/app-menu'
import AppMain from './components/app-main'
export default {
  methods: {
    ...mapActions({
      generateRoutes: 'permission/generateRoutes'
    })
  },
  created () {
  },
  components: {
    AppMenu,
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
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to top right, #162948, #e6edef);
  .logo {
    h2 {
      margin: 0;
      padding: 0;
      color: #fff;
    }
  }
  .info {
    .avatar {
      height: 30px;
      width: 30px;
      border-radius: 5px;
      margin-top: 5px;
      cursor: pointer;
    }
  }
}
</style>