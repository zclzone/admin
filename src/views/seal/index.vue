<template>
  <div class="view">
    <div class="btns">
      <el-button type="success"
                 icon="el-icon-plus"
                 @click="add"
                 plain>
        新增
      </el-button>
      <el-button type="primary"
                 icon="el-icon-view"
                 plain>
        查看
      </el-button>
      <el-button type="info"
                 icon="el-icon-edit"
                 plain>
        编辑
      </el-button>

    </div>

    <el-table ref="multipleTable"
              :data="Seal_Stamped_Data"
              tooltip-effect="dark"
              style="width: 100%"
              height="100% - 40"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column v-for="(item,index) in columns"
                       :key="index"
                       :prop="item.prop"
                       :label="item.title">
      </el-table-column>
    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalCount"
                   :page-size="pageSize"
                   :current-page="currentPage"
                   @prev-click="handlePrev"
                   @next-click="handleNext"
                   @current-change="handlePageChange">
    </el-pagination>
  </div>

</template>

<script>

import { getSealStamped } from '@/api/seal'
export default {
  data () {
    return {
      Seal_Stamped_Data: [],
      columns: [
        { title: '申请单号', prop: 'Seal_Stamped_No', width: 120 },
        { title: '申请人', prop: 'Applicant_User', width: 120 },
        { title: '公司', prop: 'Company_Code', width: 120 },
        { title: '申请部门', prop: 'Applicant_Dept', width: 120 },
        { title: '印章类型', prop: 'Seal_Type', width: 120 },
        { title: '文件名称', prop: 'Files_Name', width: 120 },
        { title: '备注', prop: 'Remarks', width: 120 }
      ],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0
    }
  },
  mounted () {
    this.getData(this.pageSize, this.currentPage)
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    getData (pageSize, toPage) {
      getSealStamped({ pageSize, toPage }).then(res => {
        const { Seal_Stamped_Data, totalCount } = res.data.data
        this.Seal_Stamped_Data = Seal_Stamped_Data
        this.totalCount = totalCount
      })
    },
    handlePrev () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    handleNext () {
      if (this.totalCount / this.pageSize > this.currentPage) {
        this.currentPage++
      }
    },
    handlePageChange (page) {
      this.currentPage = page
      this.getData(this.pageSize, this.currentPage)
    },
    add () {
      this.$router.push('/oa/seal/add')
    }
  },
}
</script>

<style lang="scss" scoped>
.view {
  height: calc(100% - 35px);
  padding-bottom: 40px;
  position: relative;
  .btns {
    text-align: left;
    height: 50px;
    line-height: 50px;
    .el-button {
      padding: 5px;
    }
  }
  .el-table {
    height: calc(100% - 40px);
  }
  .el-pagination {
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>