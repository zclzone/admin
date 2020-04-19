<template>
  <div class="type-b"
       @mouseenter="showConfig = true"
       @mouseleave="showConfig = false">
    <div v-for="(item,index) in checkBoxOptions"
         :key="index">
      <div class="check-box-option"
           @click.prevent="editOption(index)">
        <el-checkbox :label="item.option_value"
                     v-show="editIndex !== index">
          {{item.option_title}}
        </el-checkbox>
        <input type="text"
               class="edit-input"
               :ref="`inputOption${index}`"
               @blur="editIndex = null"
               v-show="editIndex === index"
               v-model="item.option_title">
      </div>
      <el-button type="warning"
                 icon="el-icon-minus"
                 v-show="showConfig"
                 title="删除选项"
                 @click="removeOption(index)"
                 round>
      </el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 v-show="showConfig"
                 title="插入选项"
                 @click="insertOption(index)"
                 round>
      </el-button>
    </div>
    <!-- <div class="option-config"
         v-show="showConfig">
      <el-button type="success"
                 icon="el-icon-plus"
                 @click="addOption"
                 plain>
        添加选项
      </el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      checkBoxOptions: this.options,
      editIndex: null,
      showConfig: false
    }
  },
  methods: {
    editOption (index) {
      this.editIndex = index
      setTimeout(() => {
        this.$refs[`inputOption${index}`][0].focus()
      }, 200);
    },
    addOption () {
      this.checkBoxOptions.push({
        option_title: '新选项', option_value: 'A'
      })
      this.$emit('input', this.checkBoxOptions)
    },
    removeOption (index) {
      if (this.checkBoxOptions.length > 1) {
        this.checkBoxOptions.splice(index, 1)
        this.$emit('input', this.checkBoxOptions)
      }
    },
    insertOption (index) {
      this.checkBoxOptions.splice(index + 1, 0, {
        option_title: '新选项', option_value: 'A'
      })
      this.$emit('input', this.checkBoxOptions)
    }
  },
}
</script>

<style lang="scss" scoped>
.type-b {
  .check-box-option {
    display: inline-block;
    margin: 5px 0;
    .el-checkbox {
      min-width: 300px;
      margin: 0;
    }
    .edit-input {
      min-width: 300px;
      &:focus {
        height: 20px;
        color: #364560;
        border-bottom: 1px solid #364560;
      }
    }
  }
  .option-config {
    margin: 5px 0;
  }
}
</style>