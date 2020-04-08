<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in breadItems"
                        :key="index">
      {{item.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    breadItems: {
      type: Array,
      default: []
    }
  },
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  height: 35px;
}
</style>