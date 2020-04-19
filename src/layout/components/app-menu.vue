<template>
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
    },
    filterRoutes (routes) {
      let routeList = []
      for (const route of routes) {
        if (!route.hidden) {
          let tmp = {
            path: route.path,
            meta: { ...route.meta }
          }
          if (route.children) {
            tmp.children = this.filterRoutes(route.children)
          }
          routeList.push(tmp)
        }
      }
      return routeList
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      addRoutes: state => state.permission.addRoutes
    }),
    routes () {
      return this.filterRoutes(this.addRoutes)
    },
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
  width: 100%;
  .el-menu {
    width: 100%;
    overflow: auto;
    border-top: 1px solid #bbd0d6;
    border-left: 1px solid #bbd0d6;
    border-right: 1px solid #bbd0d6;
    min-height: calc(100vh - 45px);
    .el-menu-item {
      display: inline-block;
      padding-right: 20px !important;
      min-width: 188px !important;
    }
    .el-submenu + .el-submenu {
      border-top: 1px solid rgba(#bbd0d6, 0.4) !important;
    }
  }
}
</style>