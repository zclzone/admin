<template>
  <div class="view">
    <el-button type="success"
               icon="el-icon-plus"
               @click="addQuestions('A')"
               plain>
      新增填空题
    </el-button>
    <h1>{{questionaire.name}}</h1>
    <div class="ques-item"
         v-for="(item,index) in questionaire.questions"
         :key="index">
      <h3 class="title">{{index + 1  + '、' + item.title}}</h3>
      <el-button type="success"
                 icon="el-icon-edit"
                 plain>
        编辑
      </el-button>
      <el-input></el-input>
    </div>

  </div>
</template>

<script>
import AddQuesBox from './components/add-ques-box'

export default {
  data () {
    return {
      questionaire: {
        name: '',
        name_en: '',
        questions: [
        ]
      }
    }
  },
  mounted () {
    this.$prompt('请输入问卷名称', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      if (value) {
        this.questionaire.name = value
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      });
    });
  },
  methods: {
    addQuestions (Type) {
      this.questionaire.questions.push({
        Type,
        title: '填空题'
      })
    }
  },
}
</script>


<style lang="scss" scoped>
.view {
  .el-button {
    padding: 5px;
    display: inline-block;
  }
  .el-form-item__label {
    display: inline-block;
  }
}
</style>