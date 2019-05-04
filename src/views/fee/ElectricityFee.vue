<template>
  <div>
    <el-table :data="tableData.list" v-loading="isLoading">
      <el-table-column v-for="(config, index) in tableConfig"
                       :key="index"
                       :sortable="config.sortable"
                       :prop="config.prop"
                       :label="config.label">
      </el-table-column>

      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===1" type="success" size="medium">已缴费</el-tag>
          <el-tag v-else type="warning" size="medium">未缴费</el-tag>
        </template>
      </el-table-column>

      <!--      <el-table-column label="费用类型">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.type===1" type="info" size="medium">水费</el-tag>-->
      <!--          <el-tag v-else type="info" size="medium">电费</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <el-table-column>
        <template slot-scope="scope" slot="header">
          <el-input type="text" size="small" v-model="search"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button type="primary" @click="openDialog(scope.row)">view detail</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
              background
              :page-size="tableData.pageSize"
              :page-count="tableData.pageCount"
              :current-page="tableData.currentPage"
              :total="tableData.total"
              @current-change="handleChange"
              layout="prev, pager, next">
      </el-pagination>
    </div>

    <div>
      <el-dialog
              title="水费信息"
              :visible.sync="showDialog"
              width="30%">
        <fee-detail :detail="detail"></fee-detail>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import FeeDetail from './FeeDetail'

  export default {
    name: "ElectricityFee",
    components:{
      FeeDetail
    },
    // props: {
    //   tableData:{
    //     type:Object,
    //     required:true
    //   },
    //   showType:{
    //     type:Boolean,
    //     required:false,
    //     default:false
    //   }
    // },
    data() {
      return {
        isLoading:false,
        search: '',
        tableConfig: [
          {
            label: 'id',
            prop: 'id',
            sortable: false
          }, {
            label: '金额',
            prop: 'amount',
            sortable: false
          }, {
            label: '开始时间',
            prop: 'start_time',
            sortable: true
          }, {
            label: '结束时间',
            prop: 'end_time',
            sortable: true
          },{
            label: '小区',
            prop: 'dorm.zone'
          }, {
            label: '楼号',
            prop: 'dorm.building',
            sortable: false
          }, {
            label: '宿舍号',
            prop: 'dorm.room',
            sortable: false
          }],
        page:{
          pageSize:10,
          pages:1,
          pageNum:1
        },
        tableData:{},
        showDialog:false,
        detail:{}
      }
    },
    methods: {
      handleChange(val) {
        this.page.pageNum=val
      },
      getFees() {
        this.isLoading=true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/fee/getElectricityFees?pageNum='+this.page.pageNum+'&pageSize='+this.page.pageSize+'&type=1')
            .then(res => {
              if (res.success) {
                this.tableData = res.data
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error(err)
            })
            .then(_ =>{
              this.isLoading=false
            })
      },
      openDialog(row){
        this.detail=row
        this.showDialog=true
      }
    },
    mounted() {
      this.getFees()
    }
  }
</script>

<style scoped>

</style>