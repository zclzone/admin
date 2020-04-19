<template>
  <div>
    <el-date-picker type="date"
                    value-format="yyyy-MM-dd"
                    v-model="value"
                    placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>