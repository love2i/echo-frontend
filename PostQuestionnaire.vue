<template>
  <div class="wrapper">
    <div class="left-edit">
      <div class="top">
        <div>
          <el-button type="primary" @click="addQuestion()">添加一个问题</el-button>
          <el-button type="info" @click="showDialog=!showDialog">预览</el-button>
          <el-button type="success" @click="publish()">发布</el-button>
        </div>

        <div>
          <el-date-picker
                  v-model="timerange"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </div>
      </div>
      <div>
        <el-input size="large" v-model="title"></el-input>
      </div>

      <transition-group name="fade-transform" mode="out-in">
        <div v-for="(question,index) in questionList" :key="question+index">
          <div class="question-wrapper">
            <h3>问题</h3>
            <div v-if="question.edit" class="title-edit">
              <el-input class="question" size="small" type="text" v-model="question.title"
                        style="width: 50%"></el-input>
              <!--            <el-button @click="handleConfirm(question)"> confirm</el-button>-->
              <i class="fas fa-check" @click="handleConfirm(question)"></i>
            </div>
            <div v-else class="title-confirm">
              <span>{{index+1}}.{{question.title}}</span>
              <!--            <el-button @click="handleEdit(question)">edit</el-button>-->
              <i class="fas fa-edit" @click="handleEdit(question)"></i>
              <el-button size="mini" type="danger" @click="handleDelete($event.target,index)">delete</el-button>
            </div>

            <el-switch
                    style="display: block"
                    v-model="question.type"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="单选"
                    inactive-text="多选"
                    active-value="1"
                    inactive-value="0">
            </el-switch>
          </div>
          <div class="options-wrapper">
                <span v-for="(option,index) in question.options" :key="index">
                    <el-input class="option" size="small" type="text" v-model="option.content"></el-input>
                </span>
          </div>
        </div>
      </transition-group>

      <div>
        <el-dialog :visible.sync="showDialog">
          <question-preview :title="title" :list="questionList"></question-preview>
        </el-dialog>
      </div>
    </div>
    <div class="right-preview">
      <h1>问卷预览</h1>
      <question-preview :title="title" :list="questionList"></question-preview>
    </div>

  </div>
</template>

<script>
  import QuestionPreview from './QuestionPreview'

  export default {
    name: "PostQuestionnaire",
    components: {
      QuestionPreview
    },
    data() {
      return {
        showDialog: false,
        title: '这里填写这份问卷的标题',
        questionList: [],
        timerange: []
      }
    },
    methods: {
      addQuestion() {
          if (!this.validateList()) {
        return
       }
        const questionSample = {
          title: '样例问题，这里写你的问题',
          type: 1,
          edit: false,
          options: [
            {
              content: '选项1'
            },
            {
              content: '选项2'
            },
            {
              content: '选项3'
            }
          ]
        }
        this.questionList.push(questionSample)
      },
      handleDelete(e, index) {
        this.questionList.splice(index, 1)
      },
      handleEdit(q) {
        q.edit = true
      },
      handleConfirm(q) {
        q.edit = false
      },
      publish() {
        let postData = {
          list: this.questionList,
          //     [
          //   {
          //     title: 'title1',
          //     type: 1,
          //     options: [
          //       {
          //         content: "选项1"
          //       },
          //       {
          //         content: "选项1"
          //       },
          //       {
          //         content: "选项1"
          //       }
          //     ]
          //   }
          // ],
          title: this.title,
          startTime: this.timerange[0],
          endTime: this.timerange[1],
          workerId: this.$store.state.workerInfo.workerId,
          zone: 1,
          building: 1,
          room: 411
        }
        this.$axios.post('https://api.echo.ituoniao.net/api/web/questionnaires/postQuestionnaire', postData)
            .then(res => {
              if (res.success) {
                this.$message({message: '发布成功', type: 'success'})
              } else {
                this.$message.error('发布失败' + res.errMsg)
              }
            })
      },
        validateList() {
        let errMsg = ''
        if (!this.questionList|| this.questionList.length <= 0) errMsg = '请填写选项'
        console.log(errMsg)
        if (errMsg !== '') {
          this.$message.error(errMsg)
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .options-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }

  .option {
    display: flex;
  }

  .title-confirm, .title-edit {
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  .question-wrapper h3 {
    clear: both;
  }

  .question-wrapper i {
    cursor: pointer;
  }

  .left-edit {
    width: 48%;
  }

  .right-preview {
    width: 50%;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
  .top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
  }
</style>
