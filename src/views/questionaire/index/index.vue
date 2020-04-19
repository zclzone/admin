<template>
  <div class="ques-container"
       v-if="questionsData.length && provinces.length">
    <question-item v-for="(val,key) in questions"
                   :key="key"
                   :question="val"
                   @trigChangeName="trigChangeName"
                   @trigChangeID="trigChangeID"
                   @trigShowQues="trigShowQues"
                   ref="quesItem" />
    <div class="submit">
      <el-button type="primary"
                 plain
                 @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getQuestions, getCities } from '@/api/questionaire'
import QuestionItem from './components/question-item'
export default {
  data () {
    return {
      questionsData: [],
      provinces: []
    }
  },
  mounted () {
    getQuestions().then(res => {
      const { questions } = res.data
      this.questionsData = questions
    })
    getCities().then(res => {
      const { provinces } = res.data
      this.provinces = provinces
    })
  },
  components: {
    QuestionItem
  },
  methods: {
    trigChangeName (val) {
      for (let i = 0; i < this.$refs.quesItem.length; i++) {
        const ref = this.$refs.quesItem[i]
        if (ref.question.Question_Desc.includes('姓名')) {
          ref.$refs.ques.handleChangeName && ref.$refs.ques.handleChangeName(val)
          return
        }
      }
    },
    trigChangeID (val) {
      for (let i = 0; i < this.$refs.quesItem.length; i++) {
        const ref = this.$refs.quesItem[i]
        if (ref.question.Question_Desc.includes('身份证号')) {
          ref.$refs.ques.handleChangeID && ref.$refs.ques.handleChangeID(val)
          return
        }
      }
    },
    trigShowQues (Rid, isShow) {
      for (let i = 0; i < this.$refs.quesItem.length; i++) {
        const quesItem = this.$refs.quesItem[i]
        if (quesItem.question.Rid === Rid) {
          quesItem.handleShowQues && quesItem.handleShowQues(isShow)
          return
        }
      }
    },
    submit () {
      const Answers = this.getAnswers()
      console.log(Answers);
      if (Answers.some(answer => !answer.isValid)) {
        console.error('validate error');
      } else {
        this.$message({
          message: 'submit success',
          type: 'success'
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    },
    getAnswers () {
      let Answers = [];
      if (this.$refs.quesItem) {
        Array.prototype.forEach.call(this.$refs.quesItem, function (item) {
          item.validateAnswer()
          Answers.push(item.Answer)
        })
      }
      return Answers
    }
  },
  computed: {
    questions () {
      const questions = {}
      for (const question of this.questionsData) {
        if (questions[`ques${question.Seq_No}`]) {
          questions[`ques${question.Seq_No}`].Answer.push({
            Answer_Desc: question.Answer_Desc,
            Answer_No: question.Answer_No,
            Have_Next_Level: question.Have_Next_Level || 'N',
            Next_Level_Rid: question.Next_Level_Rid || ''
          })
        } else {
          questions[`ques${question.Seq_No}`] = {}
          questions[`ques${question.Seq_No}`].Seq_No = question.Seq_No
          questions[`ques${question.Seq_No}`].Question_Type = question.Question_Type
          questions[`ques${question.Seq_No}`].Question_Desc = question.Question_Desc
          questions[`ques${question.Seq_No}`].Rid = question.Rid
          questions[`ques${question.Seq_No}`].Answer = [{
            Answer_Desc: question.Answer_Desc,
            Answer_No: question.Answer_No,
            Have_Next_Level: question.Have_Next_Level || 'N',
            Next_Level_Rid: question.Next_Level_Rid || ''
          }]
          questions[`ques${question.Seq_No}`].Visible_Default = question.Visible_Default
          questions[`ques${question.Seq_No}`].component = `Type${question.Question_Type}`
          if (question.Question_Type === 'E') {
            questions[`ques${question.Seq_No}`].provinces = this.provinces
          }
        }
      }
      return questions
    }
  }
}
</script>

<style lang="scss" scoped>
.ques-container {
  width: 100%;
  min-height: 100%;
  margin-bottom: 20px;
  .submit {
    text-align: center;
  }
}
</style>
