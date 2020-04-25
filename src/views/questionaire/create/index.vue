<template>
  <div class="questionaire-create-container">
    <div class="btns">
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="insertQue(null)"
                 plain>{{$t('questionaire.addQues')}}
      </el-button>
    </div>
    <div class="questionaire">
      <input type="text"
             class="questionaire-name"
             ref="questionaireName"
             v-model="questionaire.name"
             :placeholder="$t('questionaire.enterQuestionaireName')">
      <div class="ques-item"
           @mouseenter="hoverCurrent = index"
           @mouseleave="hoverCurrent = null"
           v-for="(item,index) in questionaire.questions"
           :key="index">
        <div class="ques-title">
          <span :class="{'seq': true,'require-mark': item.rules.includes('required')} ">{{index + 1 }}、</span>
          <input type="text"
                 :placeholder="$t('questionaire.enterQuesName')"
                 @change="removeAllRelations(item.Rid)"
                 ref="quesTitle"
                 v-model="item.title">

          <el-dropdown @command="handleTypeChange">
            <span class="el-dropdown-link type-desc">{{item.TypeDesc}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="type in questionsTypes"
                                :class="{'current-type':type.type_code === item.Type}"
                                :key="type.type_code"
                                :command="{index,type:type.type_code }">{{type.title}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button icon="el-icon-top"
                     :title="$t('questionaire.moveUp')"
                     @click="moveUp(index)"
                     :disabled="index === 0"
                     round>
          </el-button>
          <el-button icon="el-icon-bottom"
                     :title="$t('questionaire.moveDown')"
                     @click="moveDown(index)"
                     :disabled="index === questionaire.questions.length - 1"
                     round>
          </el-button>
          <el-button icon="el-icon-plus"
                     :title="$t('questionaire.insert')"
                     @click="insertQue(index)"
                     round>
          </el-button>
          <el-button icon="el-icon-minus"
                     :title="$t('questionaire.remove')"
                     @click="removeQue(index)"
                     round>
          </el-button>
        </div>
        <component :is="item.Type"
                   v-model="item.options"
                   :options="item.options"
                   :Rid="item.Rid"
                   @removeAllRelations="removeAllRelations"
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
            <div class="relation-msg"
                 v-show="getValidRelations(item).length">
              {{$t('questionaire.jummRules1')}}
              <el-tag v-for="relation in getValidRelations(item)"
                      closable
                      @close="closeTag(relation.Rid,index)"
                      :key="relation.Rid">{{`[${relation.title}] ${$t('questionaire.selected')}《${relation.value}》`}}</el-tag>
            </div>

            <el-button type="success"
                       @click="addRelation(index)"
                       :title="$t('questionaire.addJumpRules')"
                       plain>
              {{$t('questionaire.addJumpRules')}}
            </el-button>
            <el-button type="info"
                       @click="removeRelation(index)"
                       :title="$t('questionaire.cancelJumpRules')"
                       plain>
              {{$t('questionaire.cancelJumpRules')}}
            </el-button>
            <div class="create-relation">
              <div class="relation-item"
                   v-for="relationQue in item.relations"
                   :key="relationQue.Rid">
                <span>{{`[${relationQue.title}]： `}}</span>
                <el-radio :label="relationQueOption.option_title"
                          v-model="relationQue.value"
                          @change="trigRefresh"
                          v-for="(relationQueOption,relationQueOptionIndex) in relationQue.options"
                          :key="relationQueOptionIndex">{{relationQueOption.option_title}}
                </el-radio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="submit"
         v-show="questionaire.questions.length">
      <el-button type="success"
                 icon="el-icon-finished"
                 @click="save"
                 class="btnSave">
        {{$t('questionaire.save')}}
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
      },
      questionsTypes: [
        { type_code: 'TypeA', title: this.$t('questionaire.typeA') },
        { type_code: 'TypeB', title: this.$t('questionaire.typeB') },
        { type_code: 'TypeC', title: this.$t('questionaire.typeC') },
        { type_code: 'TypeD', title: this.$t('questionaire.typeD') },
        { type_code: 'TypeE', title: this.$t('questionaire.typeE') }
      ],
      rules: [
        { title: this.$t('questionaire.required'), value: 'required' },
        { title: this.$t('questionaire.number'), value: 'num' },
        { title: this.$t('questionaire.tel'), value: 'tel' },
        { title: this.$t('questionaire.ID'), value: 'ID' }
      ],
      hoverCurrent: null,
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
            TypeDesc: this.$t('questionaire.typeA'),
            Rid: this.guid(),
            title: this.$t('questionaire.typeA'),
            options: [
              { option_title: this.$t('questionaire.yes'), option_value: this.$t('questionaire.yes'), Rid: this.guid() },
              { option_title: this.$t('questionaire.no'), option_value: this.$t('questionaire.no'), Rid: this.guid() }
            ],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeB':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            TypeDesc: this.$t('questionaire.typeB'),
            Rid: this.guid(),
            title: this.$t('questionaire.typeB'),
            options: [{ Rid: this.guid() }],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeC':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            TypeDesc: this.$t('questionaire.typeC'),
            Rid: this.guid(),
            title: this.$t('questionaire.typeC'),
            options: [
              { option_title: this.$t('questionaire.optionA'), option_value: this.$t('questionaire.optionA'), Rid: this.guid() },
              { option_title: this.$t('questionaire.optionB'), option_value: this.$t('questionaire.optionB'), Rid: this.guid() }
            ],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeD':
          this.questionaire.questions.splice(index + 1, 0, {
            Type,
            TypeDesc: this.$t('questionaire.typeD'),
            Rid: this.guid(),
            title: this.$t('questionaire.typeD'),
            options: [{ Rid: this.guid() }],
            rules: [this.rules[0].value]
          })
          break
        case 'TypeE':
          getCities().then(res => {
            const { provinces } = res.data
            this.questionaire.questions.splice(index + 1, 0, {
              Type,
              TypeDesc: this.$t('questionaire.typeE'),
              Rid: this.guid(),
              title: this.$t('questionaire.typeE'),
              options: {
                provinces, Rid: this.guid()
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
      let questions = this.questionaire.questions
        ;[questions[index], questions[index - 1]] = [questions[index - 1], questions[index]]
      this.trigRefresh()
    },
    moveDown (index) {
      let questions = this.questionaire.questions
        ;[questions[index + 1], questions[index]] = [questions[index], questions[index + 1]]
      this.trigRefresh()
    },
    insertQue (index, Type) {
      index = (index === null || index === undefined) && this.questionaire.questions.length - 1 || index
      this.addQuestions(Type || 'TypeB', index)
    },
    removeQue (index) {
      this.removeAllRelations(this.questionaire.questions[index].Rid)
      this.questionaire.questions.splice(index, 1)
    },
    checkRuleDisabled (rules, currRule) {
      if (currRule == 'num' && (rules.includes('tel') || rules.includes('ID'))) {
        return true
      }
      if (currRule == 'tel' && (rules.includes('num') || rules.includes('ID'))) {
        return true
      }
      if (currRule == 'ID' && (rules.includes('num') || rules.includes('tel'))) {
        return true
      }
      return false
    },
    handleTypeChange (command) {
      const { type, index } = command
      this.removeAllRelations(this.questionaire.questions[index].Rid)
      this.questionaire.questions.splice(index, 1)
      this.addQuestions(type, index - 1)
    },
    getRules (Type) {
      let rules = [this.rules[0]]
      if (Type == 'TypeB') {
        rules = this.rules
      }
      return rules
    },
    getValidRelations (question) {
      const { relations } = question
      if (!relations) return []
      return relations.filter(item => {
        return item.value
      })
    },
    addRelation (index) {
      let originRids = []
      if (this.questionaire.questions[index].relations && this.questionaire.questions[index].relations.length) {
        originRids = this.questionaire.questions[index].relations.map(item => {
          return item.Rid
        })
      }
      for (let i = 0; i < index; i++) {
        let tmp = { ...this.questionaire.questions[i] }
        if (tmp.Type !== 'TypeA') continue
        if (!originRids.includes(tmp.Rid)) {
          // tmp.Seq = i + 1
          tmp.value = ''
          if (!this.questionaire.questions[index].relations) {
            this.questionaire.questions[index].relations = [tmp]
          } else {
            this.questionaire.questions[index].relations.push(tmp)
          }
        }
      }
      this.trigRefresh()
    },
    removeRelation (index) {
      this.questionaire.questions[index].relations = []
      this.trigRefresh()
    },
    removeAllRelations (Rid) {
      for (const question of this.questionaire.questions) {
        if (question.relations) {
          question.relations = question.relations.filter(item => {
            return item.Rid !== Rid
          })
        }
      }
      this.trigRefresh()
    },
    closeTag (Rid, index) {
      let que = this.questionaire.questions[index]
      que.relations = que.relations.filter(item => {
        return item.Rid !== Rid
      })
      this.trigRefresh()
    },
    trigRefresh () {
      const questions = [...this.questionaire.questions]
      this.$set(this.questionaire, "questions", questions)
    },
    save () {
      const questionaireData = this.questionaireData
      if (!questionaireData.name) {
        this.$message({
          message: '请输入问卷名称',
          type: 'warning'
        })
        this.$refs.questionaireName.focus()
      }
      console.log(this.questionaireData)
    }
  },
  components: {
    TypeA, TypeB, TypeC, TypeD, TypeE
  },
  computed: {
    questionaireData () {
      let data = { name: '', questions: [] }
      data.name = this.questionaire.name || ''
      for (let i = 0; i < this.questionaire.questions.length; i++) {
        let que = this.questionaire.questions[i]
        let tmpQue = { ...que, rules: que.rules.join(','), Seq: i + 1 }
        if (que.relations && que.relations.length) {
          tmpQue.relations = []
          for (const item of que.relations) {
            tmpQue.relations.push({
              Rid: item.Rid,
              value: item.value
            })
          }
        }
        data.questions.push(tmpQue)
      }
      return data
    }
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
      width: 450px;
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
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba($color: #333, $alpha: 0.1);
      .ques-title {
        font-size: 18px;
        line-height: 35px;
        margin-bottom: 5px;
        .seq {
          display: inline-block;
          width: 40px;
        }
        .type-desc {
          display: inline-block;
          margin-left: 20px;
          width: 200px;
        }
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
      margin-bottom: 50px;
    }
  }
  .el-dropdown {
    cursor: pointer;
    margin: 0 10px;
  }
}
.current-type {
  background-color: #ecf5ff;
  color: #66b1ff;
}
</style>