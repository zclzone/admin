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
        <div class="ques-title">
          <span :class="{'seq': true,'require-mark': item.rules.includes('require')} ">{{index + 1 }}、</span>
          <input type="text"
                 placeholder="请输入题目名称"
                 ref="quesTitle"
                 v-model="item.title">

          <el-dropdown @command="handleTypeChange">
            <span class="el-dropdown-link">问题类型
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in questionsTypes"
                                :key="item.type"
                                :command="{index,type:item.type }">{{item.title}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button icon="el-icon-top"
                     title="上移"
                     @click="moveUp(index)"
                     :disabled="index === 0"
                     round>
          </el-button>
          <el-button icon="el-icon-bottom"
                     title="下移"
                     @click="moveDown(index)"
                     :disabled="index === questionaire.questions.length - 1"
                     round>
          </el-button>
          <el-button icon="el-icon-plus"
                     title="插入"
                     @click="insert(index)"
                     round>
          </el-button>
          <el-button icon="el-icon-minus"
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
        <div class="ques-config">
          <div class="rules">
            <el-checkbox-group v-model="item.rules">
              <el-checkbox :label="rule.value"
                           v-for="(rule,ruleIndex) in getRules(item.Type)"
                           :disabled="checkRuleDisabled(item.rules,rule.value)"
                           :key="ruleIndex">{{rule.title}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="relation"
               v-show="index > 0">
            <div class="relation-msg">
              <el-tag v-for="(relation,relationIndex) in item.relations"
                      :key="relationIndex">{{relation.desc}}</el-tag>
            </div>
            <el-button type="primary"
                       icon="el-icon-plus"
                       @click="addRelation(index)"
                       title="关联显示条件">
              添加关联
            </el-button>
          </div>
        </div>
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
    <el-dialog title="添加关联"
               :visible.sync="showCreateRelationDialog"
               @close="closeDialog(false)"
               width="500px"
               center>
      <div class="content">
        <el-select v-model="relationQue"
                   placeholder="选择问题">
          <el-option v-for="(item,index) in getRelationQues()"
                     :key="index"
                     :label="item.title"
                     :value="index">
          </el-option>
        </el-select>
      </div>
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
      rules: [
        { title: '必填', value: 'require' },
        { title: '数字', value: 'num' },
        { title: '手机号', value: 'tel' }
      ],
      hoverCurrent: null,
      showCreateRelationDialog: false,
      relationQue: null
    }
  },
  mounted () {
    this.$refs.questionaireName.focus()
  },
  methods: {
    addQuestions (Type, index) {
      if (!Type) return
      switch (Type) {
        case 'TypeA':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            title: '单选题',
            options: [
              { option_title: '是', option_value: 'Y' },
              { option_title: '否', option_value: 'N' }
            ],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeB':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            title: '填空题',
            options: [],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeC':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            title: '多选题',
            options: [
              { option_title: '选项A', option_value: 'A' },
              { option_title: '选项B', option_value: 'B' }
            ],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeD':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            title: '什么时候',
            options: [],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeE':
          getCities().then(res => {
            const { provinces } = res.data
            this.questionaire.questions.splice(index + 1, 0, {
              Type,
              title: '什么地方',
              options: {
                provinces
              },
              rules: [this.rules[0].value]
            })
          })
          break
        default:
          break
      }
      this.titleFocus(index)
    },
    titleFocus (index) {
      setTimeout(() => {
        const quesTitle = this.$refs.quesTitle[index + 1]
        quesTitle && quesTitle.focus()
        quesTitle && quesTitle.select()
      }, 50)
    },
    moveUp (index) {
      let questions = [...this.questionaire.questions]
        ;[questions[index], questions[index - 1]] = [questions[index - 1], questions[index]]
      this.$set(this.questionaire, "questions", questions)
      // [this.questionaire.questions[index], this.questionaire.questions[index - 1]] = [this.questionaire.questions[index - 1], this.questionaire.questions[index]]
    },
    moveDown (index) {
      let questions = [...this.questionaire.questions]
        ;[questions[index], questions[index + 1]] = [questions[index + 1], questions[index]]
      this.$set(this.questionaire, "questions", questions)
      // [this.questionaire.questions[index], this.questionaire.questions[index + 1]] = [this.questionaire.questions[index + 1], this.questionaire.questions[index]]
    },
    insert (index, Type) {
      index = (index === null || index === undefined) && this.questionaire.questions.length - 1 || index
      this.addQuestions(Type || 'TypeB', index)
    },
    remove (index) {
      this.questionaire.questions.splice(index, 1)
    },
    checkRuleDisabled (rules, currRule) {
      if (currRule == 'num' && rules.includes('tel')) {
        return true
      }
      if (currRule == 'tel' && rules.includes('num')) {
        return true
      }
      return false
    },
    handleTypeChange (command) {
      const { type, index } = command
      this.questionaire.questions.splice(index, 1)
      this.addQuestions(type, index - 1)
    },
    save () {
      console.log(this.questionaire)
    },
    getRules (Type) {
      let rules = [this.rules[0]]
      if (Type == 'TypeB') {
        rules = this.rules
      }
      return rules
    },
    addRelation (index) {
      let questions = [...this.questionaire.questions]
      if (questions[index].relations) {
        questions[index].relations.push({ relationQues: 1, value: '是', desc: '第1题值为是时显示' })
      } else {
        questions[index].relations = [{ relationQues: 1, value: '是', desc: '第1题值为是时显示' }]
      }
      this.$set(this.questionaire, "questions", questions)
      this.showCreateRelationDialog = true
      console.log(this.getRelationQues())
    },
    getRelationQues (index) {
      let ques = []
      for (let i = 0; i < index; i++) {
        let currQue = this.questionaire.questions[i]
        if (currQue.Type === 'TypeA' || currQue.Type === 'TypeC') {
          ques.push(currQue)
        }
      }
      return ques
    },
    closeDialog (isConfirm) {

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
      .ques-title {
        font-size: 18px;
        line-height: 30px;
        margin-bottom: 5px;
        .require-mark::before {
          content: "*";
          color: red;
          left: 0;
          top: 0;
        }
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
      .ques-config {
        line-height: 30px;
        padding: 5px;
      }
      .el-tag {
        margin: 5px;
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
  .el-dropdown {
    cursor: pointer;
    margin: 0 10px;
  }
}
</style>