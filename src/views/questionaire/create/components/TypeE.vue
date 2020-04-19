<template>
  <el-cascader :options="provinces"
               clearable></el-cascader>
</template>

<script>
export default {
  props: {
    options: {
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
  computed: {
    provinces () {
      let provinces = []
      for (const item of this.options.provinces) {
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