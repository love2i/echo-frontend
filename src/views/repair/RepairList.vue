<template>
  <div>
    <el-table :data="tableData.list" v-loading="isLoading">
      <el-table-column v-for="(config,index) in tableConfig"
                       :key="index"
                       :prop="config.prop"
                       :label="config.label"
                       :sortable="config.sortable">
      </el-table-column>

      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="warning" size="medium">待处理</el-tag>
          <el-tag v-else-if="scope.row.status===1" type="primary" size="medium">处理中</el-tag>
          <el-tag v-else type="success" size="medium">已完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" @click="fuck(scope.row)">修改状态</el-button>
        </template>
      </el-table-column>


    <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDialog2(scope.row)">查看回复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
      <el-form>
        <el-form-item label="当前状态">
          <el-select placeholder="当前状态" v-model="status">
            <el-option label="未处理" :value="0"></el-option>
            <el-option label="处理中" :value="1"></el-option>
            <el-option label="已完成" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateState()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
            title="对维修的回复"
            :visible.sync="dialogVisible2"
            width="60%">
      <el-table :data="tableData2" ref="replyTable" v-loading="isLoading2">
      <el-table-column v-for="(config,index) in tableConfig2"
                       :key="index"
                       :prop="config.prop"
                       :label="config.label"
                       :sortable="config.sortable">
      </el-table-column>
     </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="openDialog3()">回复</el-button>
      </span>
    </el-dialog>
   

    <el-dialog
            title="新增回复"
            :visible.sync="dialogVisible3"
            width="40%">
         <el-input
           type=" textarea"
           :rows="2"
           placeholder="请输入内容"
           v-model=" textarea">
         </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="updateState2()">确 定</el-button>
      </span>
    </el-dialog>

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
  import {GET_ALL_REPAIRS} from "../../apis/complaint";

  export default {
    name: "RepairList",
    data() {
      return {
        status: undefined,
        isLoading:false,
        isLoading2:false,
        dialogVisible2: false,
        dialogVisible3: false,
        tableData: {},
        tableData2: {},
        tableConfig: [
          // {
          //   label: 'id',
          //   prop: 'id',
          //   sortable: false
          // },
          {
            label: '学生',
            prop: 'student_id',
            sortable: false
          },
          {
            label: '楼号',
            prop: 'building',
            sortable: false
          }, {
            label: '宿舍',
            prop: 'room',
            sortable: false
          }, {
            label: '报修内容',
            prop: 'content',
            sortable: false
          }, {
            label: '联系电话',
            prop: 'telephone',
            sortable: false
          }],
        tableConfig2: [
          {
            label: '姓名',
            prop: 'reply_type',
            sortable: true
          }, {
            label: '回复内容',
            prop: 'content',
            sortable: true
          }, {
            label: '回复时间',
            prop: 'reply_time',
            sortable: true
          },
        ],
        textarea: '', 
        dialogVisible: false,
        status: '',
        page: {
          pageSize: 10,
          pages: 1,
          pageNum: 1,
          total: 0
        },
        selected: ''
      }
    },
    methods: {
      getRepairList() {
        this.isLoading = true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/getAllRepairs?pageNum=' + this.page.pageNum + '&pageSize=' + this.page.pageSize)
            .then(res => {
              if (res.success) {
                this.tableData = res.data
              } else {
                this.$message.error('获取维修列表出错')
              }
            })
        this.isLoading = false
      },
      getReplys(id) {
        this.isLoading2=true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/getAllReplyById?id='+id)
            .then(res => {
              console.log(res)
              if (res.success) {
              this.tableData2 = res.data
              this.reply_time = res.reply_time 
              this.reply_style = res.reply_style
              this.content = res.content 
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error('网络开了点小差哦~~')
            })
            .then(_ =>{
              this.isLoading2=false
            })
      }, 
      openDialog2(row) {
        console.log('openDialog2 row =>',row)
        this.selected=row
        this.getReplys(row.id)
        this.dialogVisible2 = true
        this.status = row.status
      },
      openDialog3(row) {
        this.selected=row
        this.dialogVisible3 = true
        this.status = row.status
      },
      updateState() {
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/changeStatus?id=' + this.selected.id + '&status=' + this.status)
            .then(res => {
              if (res.success) {
                this.$message({message: '修改成功', type: 'success'})
                this.getRepairList()
              } else {
                this.$message.error('出错了哦：' + res.errMsg)
              }
            })
        this.dialogVisible = false
      },
      updateState2() {
          let postData = {
          reply_type: this.reply_type,
          reply_time: Date(),
          content:this.textarea
          }
        this.$axios.post('https://api.echo.ituoniao.net/api/web/complaint/complaintReply?reply_type='+reply_type, postData)
            .then(res=>{
              if (res.success){
                this.$message({message:'回复成功',type:'success'})
                this.getReplys()
              } else{
                this.$message.error('出错了哦：'+res.errMsg)
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error('网络开了点小差哦~~')
            })
            .then(_ =>{
            })
        this.dialogVisible3 = false
      },
      handleChange(val) {
        this.pageNum.pageNum = val
        this.getRepairList()
      },
      fuck(row) {
        this.selected = row
        this.status = row.status
        this.dialogVisible = true
      }
    },
    mounted() {
      this.getRepairList()
    }
  }
</script>

<style scoped>

</style>