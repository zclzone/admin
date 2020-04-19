<template>
  <div class="questionaire-create-container">
    <el-button type="primary"
               icon="el-icon-plus"
               @click="addQuestions('TypeB')"
               plain>
      填空题
    </el-button>
    <el-button type="primary"
               icon="el-icon-plus"
               @click="addQuestions('TypeA')"
               plain>
      单选题
    </el-button>
    <el-button type="primary"
               icon="el-icon-plus"
               @click="addQuestions('TypeC')"
               plain>
      多选题
    </el-button>
    <el-button type="primary"
               icon="el-icon-plus"
               @click="addQuestions('TypeD')"
               plain>
      日期选择题
    </el-button>
    <el-button type="primary"
               icon="el-icon-plus"
               @click="addQuestions('TypeE')"
               plain>
      籍贯选择题
    </el-button>
    <div class="questionaire">
      <input type="text"
             class="questionaire-name"
             ref="questionaireName"
             v-model="questionaire.name"
             placeholder="请输入问卷名称">
      <div class="ques-item"
           v-for="(item,index) in questionaire.questions"
           :key="index">
        <div class="ques-name">
          <span class="seq">{{index + 1 }}、</span>
          <input type="text"
                 placeholder="请输入题目名称"
                 ref="quesTitle"
                 v-model="item.title">
        </div>
        <component :is="item.Type"
                   v-model="item.options"
                   :options="item.options"
                   ref="ques">
        </component>

      </div>
    </div>
    <div class="submit"
         v-show="questionaire.questions.length">
      <el-button type="success"
                 icon="el-icon-finished"
                 @click="save"
                 class="btnSave"
                 plain>
        保存
      </el-button>
    </div>

  </div>
</template>

<script>
import TypeA from './components/TypeA'
import TypeB from './components/TypeB'
import TypeC from './components/TypeC'
import TypeD from './components/TypeD'
import TypeE from './components/TypeE'

import { getCities } from '@/api/questionaire'

export default {
  data () {
    return {
      questionaire: {
        name: '',
        questions: [
        ]
      }
    }
  },
  mounted () {
    this.$refs.questionaireName.focus()
  },
  methods: {
    addQuestions (Type) {
      switch (Type) {
        case 'TypeA':
          this.questionaire.questions.push({
            Type,
            title: '单选题',
            options: [
              { option_title: '选项A', option_value: 'A' },
              { option_title: '选项B', option_value: 'B' }
            ]
          })
          this.titleFocus()
          break
        case 'TypeB':
          this.questionaire.questions.push({
            Type,
            title: '填空题'
          })
          this.titleFocus()
          break
        case 'TypeC':
          this.questionaire.questions.push({
            Type,
            title: '多选题',
            options: [
              { option_title: '选项A', option_value: 'A' },
              { option_title: '选项B', option_value: 'B' }
            ]
          })
          this.titleFocus()
          break
        case 'TypeD':
          this.questionaire.questions.push({
            Type,
            title: '什么时候'
          })
          this.titleFocus()
          break
        case 'TypeE':
          getCities().then(res => {
            const { provinces } = res.data
            this.questionaire.questions.push({
              Type,
              title: '什么地方',
              options: {
                provinces
              }
            })
            this.titleFocus()
          })
          break
        default:
          break
      }
    },
    titleFocus () {
      setTimeout(() => {
        const quesTitle = this.$refs.quesTitle[this.questionaire.questions.length - 1]
        quesTitle && quesTitle.focus()
        quesTitle && quesTitle.select()
      }, 50)
    },
    save () {
      console.log(this.questionaire)
    }
  },
  components: {
    TypeA, TypeB, TypeC, TypeD, TypeE
  }
}
</script>


<style lang="scss">
.questionaire-create-container {
  .el-button {
    padding: 5px;
  }
  .el-input {
    .el-input__inner {
      height: 30px;
      max-width: 220px;
    }
  }
  .questionaire {
    .questionaire-name {
      height: 30px;
      font-size: 25px;
      margin: 20px 0;
      color: #364560;
      font-weight: 600;
      margin-bottom: 20px;
      transition: all 0.8s;
      &:focus {
        font-size: 20px;
        padding: 5px;
        color: #364560;
        border-bottom: 1px solid #364560;
      }
    }
    .ques-item {
      margin-bottom: 20px;
      .ques-name {
        font-size: 18px;
        margin-bottom: 5px;
        input {
          width: 320px;
          height: 30px;
          font-size: 18px;
          transition: all 0.8s;
          &:focus {
            font-size: 16px;
            padding: 5px;
            color: #364560;
            border-bottom: 1px solid #364560;
          }
        }
      }
    }
  }
  .submit {
    .btnSave {
      font-size: 16px;
      font-weight: 600;
      padding: 8px;
    }
  }
}
</style>