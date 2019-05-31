<template>
  <div>
    <el-table :data="tableData.list" ref="repairTable" v-loading="isLoading">
      <el-table-column 
        v-for="(config,index) in tableConfig"
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
          <el-button type="primary" @click="openReplyList(scope.row)">查看回复</el-button>
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
            :visible.sync="replyDialogVisible"
            width="60%">
      <el-table :data="replyTableData" ref="replyTable" >
      <el-table-column v-for="(config,index) in replyTableConfig"
                       :key="index"
                       :prop="config.prop"
                       :label="config.label"
                       :sortable="config.sortable">
      </el-table-column>
     </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="openReplyDialog()">回复</el-button>
      </span>
    </el-dialog>
   

    <el-dialog
            title="新增回复"
            :visible.sync="dialogVisible3"
            width="40%">
         <el-input
           type=" textarea"
           :rows="2"
           placeholder="请输入回复内容"
           v-model="replyContent">
         </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="replyRepair()">确 定</el-button>
      </span>
    </el-dialog>

      <el-table-column label="身份">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reply_type===0" size="medium">管理员</el-tag>
          <el-tag v-else-if="scope.row.reply_type===1" size="medium">学生</el-tag>
        </template>
      </el-table-column>
      
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
        dialogVisible: false,
        replyDialogVisible: false,
        dialogVisible3: false,
        tableData: [],
        tableData2: [],
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
        replyTableConfig: [
          /*{
            label: '姓名',
            prop: 'reply_type',
            sortable: true
          },*/ {
            label: '回复内容',
            prop: 'content',
            sortable: true
          }, {
            label: '回复时间',
            prop: 'reply_time',
            sortable: true
          },
        ],
        replyContent: '', 
        status: '',
        page: {
          pageSize: 10,
          pages: 1,
          pageNum: 1,
          total: 0
        },
        selected: {}
      }
    },
    methods: {
      getRepairList() {
        this.isLoading = true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/getAllRepairs?pageNum=' +
         this.page.pageNum + 
         '&pageSize=' + 
         this.page.pageSize)
            .then(res => {
              if (res.success) {
                this.tableData = res.data
                this.page.pages = res.data.pages;
                this.page.pageNum = res.data.pageNum;
                this.page.pageSize = res.data.pageSize;
                this.page.total = res.data.total;
                this.id = res.data.id;
              } else {
                this.$message.error('获取维修列表出错')
              }
            })
        
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        })
        .then(_ => {
          this.isLoading = false;
        })
      },
      getReplys(id) {
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/getAllReplyById?id='+id)
            .then(res => {
              console.log(res)
              if (res.success) {
              this.replyTableData = res.data
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error('网络开了点小差哦~~')
            })
      }, 
     openReplyList(row) {
      this.selected = row;
      this.getReplys(row.id);
      this.replyDialogVisible = true;
      },
       openReplyDialog() {
        this.dialogVisible3 = true
      },
      updateState() {
        this.$axios.get('https://api.echo.ituoniao.net/api/web/repair/changeStatus?id=' + 
        this.selected.id + 
        '&status=' + 
        this.status)
            .then(res => {
              if (res.success) {
                this.$message({message: '修改成功', type: 'success'})
                this.getRepairList()
              } else {
                this.$message.error('出错了哦：' + res.errMsg)
              }
            })
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        })
      this.dialogVisible = false;
      },
      replyRepair() {
        this.$axios
        .post("https://api.echo.ituoniao.net/api/web/repair/repairReply?id=" + this.selected.id, this.replyContent,{
            headers:{
              "Content-Type": 'text/plain',
              'Cache-Control': 'no-cache'
            }
          })   
            .then(res=>{
              if (res.success){
                this.$message({message:'回复成功',type:'success'})
                this.getReplys(this.selected.id)
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
        this.isLoading = true;
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