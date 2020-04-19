<template>
  <div>
    <div v-for="(item,index) in question.Answer"
         :key="index">
      <el-radio v-model="value"
                @change="onChange(item.Have_Next_Level,item.Next_Level_Rid)"
                :label="item.Answer_No">{{item.Answer_Desc}}</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypeA',
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
      value: '',
    }
  },
  methods: {
    onChange (Have_Next_Level, Next_Level_Rid) {
      this.$emit('trigFunc', this.value, Have_Next_Level, Next_Level_Rid)
    }
  },
  computed: {
    Answer () {
      return {
        Rid: this.question.Rid,
        Answer_No: this.value
      }
    }
  },
}
</script>

