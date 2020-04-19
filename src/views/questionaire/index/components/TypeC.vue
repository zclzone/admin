<template>
  <div>
    <div v-for="(item,index) in question.Answer"
         :key="index">
      <el-checkbox v-model="value"
                   :label="item.Answer_No"
                   @change="onChange">
        {{item.Answer_Desc}}
      </el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeC',
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
      value: []
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
