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
        activeName: 'waterFee',
        tableData: {},
        waterData: {},
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
    }
  }
</script>

<style scoped>

</style>
