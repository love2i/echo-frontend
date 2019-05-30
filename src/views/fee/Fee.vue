<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="水费查询" name="waterFee" class="pane">
        <water-fee></water-fee>
      </el-tab-pane>
      <el-tab-pane label="电费查询" name="electricityFee" class="pane">
        <electricity-fee></electricity-fee>
      </el-tab-pane>
      <el-tab-pane label="全部" name="allFee" class="pane">
        <fee-table></fee-table>
      </el-tab-pane>
    </el-tabs>
      <el-form>
        <el-form-item>
          <el-button plain type="primary" size="normal" @click="showDialog=!showDialog">上传文件</el-button>
        </el-form-item>
      </el-form>
      <el-dialog :visible.sync="showDialog">
        <h1>{{ msg }}</h1> 
        <form> <input type="file" @change="getFile($event)"> 
        <button class="button button-primary button-pill button-small" @click="submit($event)">提交</button> 
        </form> 
      </el-dialog>
  </div>
</template>

<script>
  import WaterFee from './WaterFee'
  import ElectricityFee from './ElectricityFee'
  import FeeTable from './FeeTable'

  import {GET_ALL_FEES, GET_ELECTRICITY_FEES, GET_WATER_FEES} from "../../apis/fee";

  export default {
    name: 'Fee',
    components: {
      ElectricityFee, WaterFee, FeeTable
    },
    data() {
      return {
        showDialog: false,
        activeName: 'waterFee',
        tableData: {},
        waterData: {},
        msg: '请选择文件上传',
        file: '',
        electricityData: {}
      }
    },
    methods: {
      handleClick() {
      },
      reloadFees() {
        console.log('reload')
      }
    },
    mounted() {
    },
    getFile:function (event) { 
        this.file = event.target.files[0]; 
        console.log(this.file); 
        }, 
    submit:function (event) { //阻止元素发生默认的行为 
        event.preventDefault(); 
        let formData = new FormData(); 
        formData.append("file", this.file); 
        axios.post('/api/web/fee/uploadFees', formData) 
        .then(function (response) { alert(response.data); console.log(response); 
        window.location.reload(); }) .catch(function (error) { alert("上传失败");
         console.log(error); window.location.reload(); }); 
         }
  }
</script>

<style scoped>

</style>
