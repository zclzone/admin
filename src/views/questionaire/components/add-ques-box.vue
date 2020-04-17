<template>
  <el-form label-position="top"
           label-width="200px">
    <el-form-item label="问题名称">
      <el-input v-model="ques.title"></el-input>
    </el-form-item>
    <el-form-item label="问题名称(英文)">
      <el-input v-model="ques.title_en"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      ques: {
        title: '',
        title_en: '',
        options: []
      }
    }
  },
}
</script>