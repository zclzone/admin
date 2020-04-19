<template>
  <div>
    <el-date-picker v-model="value"
                    type="date"
                    value-format="yyyy-MM-dd"
                    @change="onChange"
                    placeholder="选择日期">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'TypeD',
  props: {
    question: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onChange () {
      this.$emit('trigFunc', this.value)
    }
  },
  computed: {
    Answer () {
      return {
        Rid: this.question.Rid,
        Answer_No: this.value
      }
    }
  }
}
</script>
