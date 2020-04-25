<template>
  <div class="type-a"
       @mouseenter="showConfig = true"
       @mouseleave="showConfig = false">
    <div v-for="(item,index) in radioOptions"
         :key="item.Rid">
      <div class="radio-option"
           @click.prevent="editOption(index)">
        <el-radio v-show="editIndex !== index"
                  :label="item.option_title">{{item.option_title}}</el-radio>

        <input type="text"
               class="edit-input"
               :ref="`inputOption${index}`"
               @blur="editIndex = null"
               @change="handleOptionChange"
               v-show="editIndex === index"
               v-model="item.option_title">

      </div>
      <el-button icon="el-icon-minus"
                 v-show="showConfig"
                 :title="$t('questionaire.remove')"
                 @click="removeOption(index)"
                 round>
      </el-button>
      <el-button icon="el-icon-plus"
                 v-show="showConfig"
                 :title="$t('questionaire.insert')"
                 @click="insertOption(index)"
                 round>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    Rid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      radioOptions: this.options,
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
    handleOptionChange () {
      this.$emit('removeAllRelations', this.Rid)
    },
    removeOption (index) {
      if (this.radioOptions.length > 1) {
        this.radioOptions.splice(index, 1)
        this.$emit('input', this.radioOptions)
      }
      this.$emit('removeAllRelations', this.Rid)
    },
    insertOption (index) {
      this.radioOptions.splice(index + 1, 0, {
        option_title: this.$t('questionaire.newOption'), option_value: this.$t('questionaire.newOption'), Rid: this.guid()
      })
      this.$emit('input', this.radioOptions)
      this.$emit('removeAllRelations', this.Rid)
    }
  },
  watch: {
    options (newValue, oldValue) {
      this.radioOptions = newValue
    }
  }
}
</script>

<style lang="scss">
.type-a {
  .radio-option {
    display: inline-block;
    height: 20px;
    margin: 5px 0;
    .el-radio {
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