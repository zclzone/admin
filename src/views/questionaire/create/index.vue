<template>
  <div class="questionaire-create-container">
    <div class="btns">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="insert(null)"
                 plain>
        新增题目
      </el-button>
    </div>
    <div class="questionaire">
      <input type="text"
             class="questionaire-name"
             ref="questionaireName"
             v-model="questionaire.name"
             placeholder="请输入问卷名称">
      <div class="ques-item"
           @mouseenter="hoverCurrent = index"
           @mouseleave="hoverCurrent = null"
           v-for="(item,index) in questionaire.questions"
           :key="index">
        <div class="ques-name">
          <span class="seq">{{index + 1 }}、</span>
          <input type="text"
                 placeholder="请输入题目名称"
                 ref="quesTitle"
                 v-model="item.title">
          <el-button icon="el-icon-top"
                     v-show="hoverCurrent === index"
                     title="上移"
                     @click="moveUp(index)"
                     :disabled="index === 0"
                     round>
          </el-button>
          <el-button icon="el-icon-bottom"
                     v-show="hoverCurrent === index"
                     title="下移"
                     @click="moveDown(index)"
                     :disabled="index === questionaire.questions.length - 1"
                     round>
          </el-button>
          <el-button icon="el-icon-plus"
                     v-show="hoverCurrent === index"
                     title="插入"
                     @click="insert(index)"
                     round>
          </el-button>
          <el-button icon="el-icon-minus"
                     v-show="hoverCurrent === index"
                     title="删除"
                     @click="remove(index)"
                     round>
          </el-button>
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
    <el-dialog title="新增问题类型选择"
               :visible.sync="showCreateQuesDialog"
               @close="closeDialog(false)">
      <el-select v-model="quesType"
                 placeholder="问题类型">
        <el-option v-for="item in questionsTypes"
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
  </div>
</template>

<script>
import TypeA from './components/TypeA'
import TypeB from './components/TypeB'
import TypeC from './components/TypeC'
import TypeD from './components/TypeD'
import TypeE from './components/TypeE'
import CreateQuesDialog from './components/create-ques-dialog'

import { getCities } from '@/api/questionaire'

export default {
  data () {
    return {
      questionaire: {
        name: '',
        questions: [
        ]
      },
      questionsTypes: [
        { type: 'TypeA', title: '单选题' },
        { type: 'TypeB', title: '填空题' },
        { type: 'TypeC', title: '多选题' },
        { type: 'TypeD', title: '日期选择题' },
        { type: 'TypeE', title: '籍贯选择题' }
      ],
      hoverCurrent: null,
      showCreateQuesDialog: false,
      quesType: ''
    }
  },
  mounted () {
    this.$refs.questionaireName.focus()
  },
  methods: {
    addQuestions (Type, currentQuesIndex) {
      if (!Type) return
      switch (Type) {
        case 'TypeA':
          this.questionaire.questions.splice(currentQuesIndex + 1, 0, {
            Type,
            title: '单选题',
            options: [
              { option_title: '选项A', option_value: 'A' },
              { option_title: '选项B', option_value: 'B' }
            ]
          })
          this.titleFocus(currentQuesIndex)
          break
        case 'TypeB':
          this.questionaire.questions.splice(currentQuesIndex + 1, 0, {
            Type,
            title: '填空题'
          })
          this.titleFocus(currentQuesIndex)
          break
        case 'TypeC':
          this.questionaire.questions.splice(currentQuesIndex + 1, 0, {
            Type,
            title: '多选题',
            options: [
              { option_title: '选项A', option_value: 'A' },
              { option_title: '选项B', option_value: 'B' }
            ]
          })
          this.titleFocus(currentQuesIndex)
          break
        case 'TypeD':
          this.questionaire.questions.splice(currentQuesIndex + 1, 0, {
            Type,
            title: '什么时候'
          })
          this.titleFocus(currentQuesIndex)
          break
        case 'TypeE':
          getCities().then(res => {
            const { provinces } = res.data
            this.questionaire.questions.splice(currentQuesIndex + 1, 0, {
              Type,
              title: '什么地方',
              options: {
                provinces
              }
            })
            this.titleFocus(currentQuesIndex)
          })
          break
        default:
          break
      }
    },
    titleFocus (currentQuesIndex) {
      setTimeout(() => {
        const quesTitle = this.$refs.quesTitle[currentQuesIndex + 1]
        quesTitle && quesTitle.focus()
        quesTitle && quesTitle.select()
      }, 50)
    },
    moveUp (index) {
      [this.questionaire.questions[index], this.questionaire.questions[index - 1]] = [this.questionaire.questions[index - 1], this.questionaire.questions[index]]
    },
    moveDown (index) {
      [this.questionaire.questions[index], this.questionaire.questions[index + 1]] = [this.questionaire.questions[index + 1], this.questionaire.questions[index]]
    },
    insert (index) {
      if (index === null || index === undefined) {
        this.currentQuesIndex = this.questionaire.questions.length - 1
      } else {
        this.currentQuesIndex = index
      }
      this.showCreateQuesDialog = true
    },
    remove (index) {
      this.questionaire.questions.splice(index, 1)
    },
    closeDialog (isConfirm) {
      this.showCreateQuesDialog = false
      if (isConfirm) {
        this.addQuestions(this.quesType, this.currentQuesIndex)
      }
    },
    save () {
      console.log(this.questionaire)
    }
  },
  components: {
    TypeA, TypeB, TypeC, TypeD, TypeE, CreateQuesDialog
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
          min-width: 350px;
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