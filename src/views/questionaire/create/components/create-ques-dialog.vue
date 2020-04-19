<template>
  <el-dialog title="新增问题类型选择"
             :visible.sync="dialogVisible"
             @close="closeDialog(false)">
    <el-select v-model="quesType"
               placeholder="问题类型">
      <el-option v-for="item in options"
                 :key="item.type"
                 :label="item.title"
                 :value="item.type">
      </el-option>
    </el-select>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 @click="closeDialog(true)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      quesType: '',
      dialogVisible: this.visible
    }
  },
  methods: {
    closeDialog (isConfirm) {
      this.dialogVisible = false
      this.$emit('input', this.dialogVisible)
      if (isConfirm) {
        this.$emit('addQuestions', this.quesType)
      }
    }
  }
}
</script>