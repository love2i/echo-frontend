<template>
  <div class="wrapper">
    <div>
      <h1>新增学生信息</h1>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-col :span="10">
            <el-input v-model="form.name"></el-input>
          </el-col>
          <el-col :span="3">
            <i></i>
          </el-col>
        </el-form-item>
        <el-form-item label="电话">
          <el-col :span="10">
            <el-input v-model="form.telephone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="学号">
          <el-col :span="10">
            <el-input v-model="form.studentId"></el-input>
          </el-col>
 
        </el-form-item>
        <el-form-item label="宿舍身份">
         <el-col :span="10" class="select">
            <el-select v-model="form.integer" placeholder="请选择是否是宿舍舍长">
              <el-option label="宿舍舍长" value="1"></el-option>
              <el-option label="宿舍成员" value="0"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="住宿信息">
          <el-col :span="10" class="select">
            <el-select v-model="form.zone" placeholder="请选择小区">
              <el-option label="一区" value="1"></el-option>
              <el-option label="二区" value="2"></el-option>
              <el-option label="三区" value="3"></el-option>
              <el-option label="四区" value="4"></el-option>
              <el-option label="五区" value="5"></el-option>
            </el-select>
            <el-select v-model="form.building" placeholder="请选择楼号">
              <el-option v-for="(v,index) in buildings" :label="v+'号楼'" :value="''+v" :key="index"></el-option>
            </el-select>
            <el-select v-model="form.room" placeholder="请选择宿舍">
              <el-option v-for="(v,index) in dormitories" :label="v+'宿舍'" :value="v" :key="index"></el-option>
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type>取消</el-button>
          <el-button plain type="primary" size="normal" @click="showDialog=!showDialog">批量导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="showDialog">
      <h1>{{ msg }}</h1>
        <form>
        <input type="file" @change="getFile($event)">
        <button class="button button-primary button-pill button-small" @click="submitFile($event)">提交</button>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SaveDormitoryInfo",
  data() {
    return {
      showDialog: false,
      form: {
        name: "",
        telephone: "",
        studentId: "",
        integer: "",
        zone: "",
        building: "",
        room: ""
      },
      dormitories: this.$store.getters.dormitories,
      buildings: this.$store.getters.buildings,
      msg: '请选择Excel上传',
      file: ''
    };
  },
  methods: {
    onSubmit() {
      if (!this.validate()) {
        this.$message.error("请填写全部字段");
        return;
      }
      let postData = {
        name: this.form.name,
        tel: this.form.telephone,
        studentId: this.form.studentId,
        integer: Number.parseInt(this.form.integer),
        zone: Number.parseInt(this.form.zone),
        building: Number.parseInt(this.form.building),
        room: Number.parseInt(this.form.room),
        is_leader: 0
      };
      this.$axios
        .post(
          "https://api.echo.ituoniao.net/api/web/dormitory/saveDormitory",
          postData
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$message({ message: "创建成功", type: "success" });
          } else {
            this.$message.error(res.errMsg);
          }
        });
    },
    validate() {
      return (
        this.form.name.length > 0 &&
        this.form.telephone > 0 &&
        this.form.studentId > 0 &&
        this.form.integer > 0 &&
        this.form.building > 0 &&
        this.form.room > 0 &&
        this.form.zone > 0
      );
    },
    getFile(event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
    submitFile(e) {
      event.preventDefault();
      let formData = new FormData()
      formData.append('file',this.file)
      console.log('form data file => ',formData)
      this.$axios.post('https://api.echo.ituoniao.net/api/web/dormitory/uploadDorms',formData)
        .then(res => {
          console.log(res)
          if (res.success) {
            this.$message({ message: "上传成功", type: "success" });
          } else {
            this.$message.error(res.errMsg);
          }
        })
    }
  }
};
</script>

<style scoped>
.select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
