<template>
  <div class="ques-item"
       v-show="isShow">
    <h3 class="title">{{`${question.Seq_No}. ${question.Question_Desc}`}}</h3>
    <component :is="question.component"
               :question="question"
               @trigFunc="trigFunc"
               ref="ques">
    </component>
    <span v-show="!isValid"
          class="err-msg">{{msg}}</span>
  </div>
</template>

<script>
import TypeA from './TypeA'
import TypeB from './TypeB'
import TypeC from './TypeC'
import TypeD from './TypeD'
import TypeE from './TypeE'
export default {
  name: 'question-item',
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
      isValid: true,
      isShow: true,
      msg: ''
    }
  },
  methods: {
    trigFunc (val, Have_Next_Level, Next_Level_Rid) {
      if (val && this.question.Question_Desc.includes('工号')) {
        if (val === '004618') {
          this.$emit('trigChangeName', 'Ronnie Zhang')
          this.$emit('trigChangeID', '367845199804055858')
        }
      }
      if (Have_Next_Level && Have_Next_Level === 'N') {
        // 隐藏下一道题目
        this.$emit('trigShowQues', Next_Level_Rid, false)
      } else {
        // 显示下一道题目
        Next_Level_Rid && this.$emit('trigShowQues', Next_Level_Rid, true)
      }
      this.validateAnswer()
    },
    setValidStatu (isValid, msg) {
      this.isValid = isValid
      this.msg = msg
    },
    handleShowQues (isShow) {
      this.isShow = isShow
      if (!isShow) {
        this.setValidStatu(true, '')
        this.$refs.ques.value = null
      }
    },
    validateAnswer () {
      if (!this.isShow) {
        return true
      }
      switch (this.question.Question_Type) {
        case 'A':
          if (!this.Answer.Answer_No) {
            this.setValidStatu(false, '此为必选项')
            return false
          }
          break
        case 'C':
          if (!this.Answer.Answer_No.length) {
            this.setValidStatu(false, '至少选择一项')
            return false
          }
          break
        case 'B':
          // 校验手机号
          if (this.question.Question_Desc.includes('手机号')) {
            if (!this.Answer.Answer_No) {
              this.setValidStatu(false, '手机号不允许为空')
              return false
            } else {
              const reg = /^1[3456789]\d{9}$/
              if (!reg.test(this.Answer.Answer_No)) {
                this.setValidStatu(false, '无效手机号')
                return false
              }
            }
          }

          // 校验温度输入框
          if (this.question.Question_Desc.includes('体温')) {
            if (!this.Answer.Answer_No) {
              this.setValidStatu(false, '温度不允许为空')
              return false
            } else {
              if (isNaN(+this.Answer.Answer_No)) {
                this.setValidStatu(false, '只能输入数字')
                return false
              }
            }
          }
        case 'D':
        case 'E':
        default:
          if (!this.Answer.Answer_No || !this.Answer.Answer_No.length) {
            this.setValidStatu(false, '此为必填项')
            return false
          }
      }
      this.setValidStatu(true, '')
      return true
    }
  },
  computed: {
    Answer () {
      return {
        Rid: this.question.Rid,
        Answer_No: this.$refs.ques.value || '',
        isValid: this.isValid
      }
    }
  },
  components: {
    TypeA,
    TypeB,
    TypeC,
    TypeD,
    TypeE
  }
}
</script>

<style lang="scss">
.ques-item {
  padding: 10px 0;

  h3 {
    font-size: 18px;
    color: #364560;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .el-radio,
  .el-checkbox {
    line-height: 30px;
    span {
      font-size: 16px;
    }
  }
  .el-input {
    max-width: 240px;
  }
  .el-input__inner {
    font-size: 16px;
  }

  .err-msg {
    color: red;
  }
}
</style>

