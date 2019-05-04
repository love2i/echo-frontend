<template>
  <div class="wrapper">
    <div class="content">
      <el-table :data="questionData.list">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="题目">
                <span>{{ props.row.title }}</span>
              </el-form-item>
              <el-form-item label="开始时间">
                <span>{{ props.row.start_time }}</span>
              </el-form-item>
              <el-form-item label="结束时间">
                <span>{{ props.row.end_time }}</span>
              </el-form-item>
              <el-form-item label="发布员工id">
                <span>{{ props.row.w_id }}</span>
              </el-form-item>
              <el-form-item label="小区">
                <span>{{ props.row.zone }}</span>
              </el-form-item>
              <el-form-item label="楼">
                <span>{{ props.row.building==null?'全部':props.row.building }}</span>
              </el-form-item>
              <el-form-item label="房间">
                <span>{{ props.row.room==null?'全部':props.row.room }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-for="(config, index) in tableConfig"
                         :key="index"
                         :label="config.label"
                         :prop="config.prop">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="showDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
              background
              :page-size="page.pageSize"
              :page-count="page.pages"
              :current-page="page.pageNum"
              :total="page.total"
              @current-change="handleChange"
              layout="prev, pager, next">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Questionnaire',
    data() {
      return {
        questionData: {},
        tableConfig: [
          {
            label: 'ID',
            prop: 'id',
            sortable: false
          }, {
            label: '问卷标题',
            prop: 'title',
            sortable: false
          }, {
            label: '开始时间',
            prop: 'start_time',
            sortable: true
          }, {
            label: '结束时间',
            prop: 'end_time',
            sortable: true
          }
        ],
        page: {
          pageSize: 10,
          pages: 1,
          pageNum: 1,
          total: 0
        }
      }
    },
    components: {},
    methods: {
      getQuestionsList() {
        this.$axios.get('https://api.echo.ituoniao.net/api/web/questionnaires/getAllQuestionnaires?pageNum=' + this.page.pageNum + '&pageSize=' + this.page.pageSize)
            .then(res => {
              if (res.success) {
                this.questionData = res.data
                this.page.pages=res.data.pages
                this.page.pageNum=res.data.pageNum
                this.page.pageSize=res.data.pageSize
                this.page.total=res.data.total
              } else {
                this.$message.error('获取问卷列表出错：' + res.errMsg)
              }
            })
            .then(() => {
            })
      },
      showDetail(row) {
        this.$router.push({path: '/questionnaireDetail/' + row.id})
      },
      handleChange(val) {
        this.page.pageNum=val
        this.getQuestionsList()
      }
    },
    mounted() {
      this.getQuestionsList()
    }
  }
</script>

<style scoped>

  .table-expand {
    font-size: 0;
  }

  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .content {
    margin: 20px auto;
  }
</style>
