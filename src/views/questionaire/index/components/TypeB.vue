<template>
  <div>
    <el-input placeholder="请输入内容"
              v-model="value"
              @change="check"
              clearable>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'TypeB',
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
    check () {
      this.$emit('trigFunc', this.value)
    },
    handleChangeName (val) {
      this.value = val
      this.check()
    },
    handleChangeID (val) {
      this.value = val
      this.check()
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