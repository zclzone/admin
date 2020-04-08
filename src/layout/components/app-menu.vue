<template>
  <el-aside width="200px">
    <el-menu :default-active="$route.path"
             class="el-menu-vertical-demo"
             background-color="#EBF0F2"
             :router="true"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse">
      <el-submenu v-for="(route,index) in routes"
                  :key="index"
                  :index="route.path">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{route.meta && route.meta.title}}</span>
        </template>
        <el-menu-item-group v-for="item in route.children"
                            :key="item.path">
          <el-menu-item :index="`${route.path}/${item.path}`">
            {{item.meta && item.meta.title}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      isCollapse: false,
      isOpen: true
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      routes: state => state.permission.addRoutes.filter(route => {
        return route.path !== '*' && route.path !== '/404' && route.path != '/'
      })
    }),
    active () {
      // return this.$route.path
      // const pathes = this.$route.path.replace(/^\//, '').split('/')
      // let active = ''
      // let currentRoute = this.routes
      // for (const path of pathes) {
      //   for (let i = 0; i < currentRoute.length; i++) {
      //     if (currentRoute[i].path.replace(/^\//, '') == path) {
      //       active += i + 1
      //       if (currentRoute[i].children) {
      //         currentRoute = currentRoute[i].children
      //         active += '-'
      //       }
      //       break
      //     }
      //   }
      // }
      // return active
    }
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  margin: 0;
  padding: 5px 5px 0;
  background: #e6edef;
  height: calc(100vh - 40px);
  .el-menu {
    width: 100%;
    border-top: 1px solid #bbd0d6;
    border-left: 1px solid #bbd0d6;
    border-right: 1px solid #bbd0d6;
    min-height: calc(100vh - 45px);
    .el-menu-item {
      width: 100% !important;
      min-width: 188px !important;
    }
    .el-submenu + .el-submenu {
      border-top: 1px solid rgba(#bbd0d6, 0.4) !important;
    }
  }
}
</style>