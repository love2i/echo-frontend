<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" label-position="top">
      <el-form-item label="消息标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
        <el-time-picker placeholder="选择时间" v-model="form.time" style="margin-left: 10px"></el-time-picker>
      </el-form-item>
      <el-form-item label="发布对象">
        <el-select v-model="form.selectedZone"
                   clearable
                   placeholder="请选择小区">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="form.selectedBuilding"
                   clearable
                   style="margin-left: 10px"
                   placeholder="请选择楼号">
          <el-option
                  v-for="item in buildings"
                  :key="item"
                  :label="item+'号楼'"
                  :value="item">
          </el-option>
        </el-select>
        <el-select v-model="form.selectedRoom"
                   clearable
                   style="margin-left: 10px"
                   placeholder="请选择宿舍">
          <el-option
                  v-for="item in dormitories"
                  :key="item"
                  :label="item+'宿舍'"
                  :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="消息内容">
        <el-input type="textarea" rows="8" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="发布">
        <el-button type="primary" @click="pubishInformation" :loading="postLoading">确定发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {POST_INFORMATION} from '../../apis/information'

  export default {
    name: 'PostInformation',
    data() {
      return {
        form: {
          title: '',
          content: '',
          date: '',
          time: '',
          selectedZone: '',
          selectedBuilding: '',
          selectedRoom: ''
        },
        options: [{
          value: '0',
          label: '所有区域'
        },
          {
            value: '1',
            label: '一区'
          }, {
            value: '2',
            label: '二区'
          }, {
            value: '3',
            label: '三区'
          }, {
            value: '4',
            label: '四区'
          }, {
            value: '5',
            label: '五区'
          }],
        dormitories: this.$store.getters.dormitories,
        buildings: this.$store.getters.buildings,
        postLoading: false
      }
    },
    methods: {
      pubishInformation() {
        if (!this.validateForm()) {
          return
        }
        this.postLoading = true
        let postData = {
          title: this.form.title,
          content: this.form.content,
          time: this.formatTime(this.form.date, this.form.time),
          workerId: this.$store.getters.workerInfo.workerId,
          zone: Number.parseInt(this.form.selectedZone),
          building: Number.parseInt(this.form.selectedBuilding),
          room: Number.parseInt(this.form.selectedRoom)
        }
        this.$axios.post('https://api.echo.ituoniao.net/api/web/information/postInformation', postData)
            .then(res => {
              console.log('post information', res)
              if (res.success) {
                this.openMessage('发布成功', 'success')
              } else {
                this.openMessage(res.errMsg, 'error')
              }
            })
            .catch(err => {
              console.error(err)
            })
            .then(_ => {
              this.postLoading = false
            })
      },
      validateForm() {
        let errMsg = ''
        if (!this.form.title || this.form.title.length <= 0) errMsg = '请填写title'
        if (!this.form.content || this.form.content.length <= 0) errMsg = '请填写content'
        if (!this.form.date || this.form.date.length <= 0) errMsg = '请填写date'
        if (!this.form.time || this.form.time.length <= 0) errMsg = '请填写time'
        if (!this.form.selectedZone || this.form.selectedZone.length <= 0) errMsg = '请填写小区'
        console.log(errMsg)
        if (errMsg !== '') {
          this.$message.error(errMsg)
          return false
        }
        return true
      }
      ,
      openMessage(message, type) {
        this.$message({
          message: message,
          type: type
        })
      }
      ,
      formatTime(date, time) {
        return '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    width: 65%;
  }
</style>
