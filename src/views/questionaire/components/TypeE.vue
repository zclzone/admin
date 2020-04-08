<template>
  <el-cascader :options="provinces"
               v-model="value"
               @change="onChange"
               clearable></el-cascader>
</template>

<script>
export default {
  name: 'TypeE',
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
        Answer_No: this.value.join('-')
      }
    },
    provinces () {
      let provinces = []
      for (const item of this.question.provinces) {
        let province = {
          value: item.name,
          label: item.name,
          children: []
        }
        if (item.cities && item.cities.length) {
          for (const city of item.cities) {
            province.children.push({
              value: city.name,
              label: city.name
            })
          }
        }
        provinces.push(province)
      }
      return provinces
    }
  }
}
</script>