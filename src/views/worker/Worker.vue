<template>
  <div class="wrapper">
    <el-table :data="res.list" border v-loading="isLoading">
      <el-table-column v-for="(config,index) in tableConfig"
                       :key="index"
                       :prop="config.prop"
                       :label="config.label"
                       :width="config.width"
                       :sortable="config.sortable">
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope" slot="header">
<!--          <el-input type="text" size="small" v-model="search" placeholder="type something"></el-input>-->
              <span>操作</span>
        </template>
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleViewDetail(scope.row)">view detail</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination :page-size="res.pageSize"
                     :page-count="res.pageCount"
                     :current-page="res.currentPage"
                     :total="res.total"
                     @current-change="handleChange"
                     layout="prev, pager, next">
      </el-pagination>
    </div>

    <div>
      <el-dialog :visible.sync="showDetailDialog" title="员工信息">
        <h1><strong>姓名：</strong>{{workerInfo.name}}</h1>
        <h2><strong>员工类型：</strong>{{workerInfo.type}}</h2>
        <h2><strong>联系电话：</strong>{{workerInfo.telephone}}</h2>
        <h2><strong>工号：</strong>{{workerInfo.worker_id}}</h2>
      </el-dialog>

      <el-dialog :visible.sync="showDeleteDialog" title="确认删除？">
        <span>是否删除员工 <strong>{{workerInfo.name}}</strong> </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDeleteDialog">取 消</el-button>
          <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
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
  import {GET_ALL_WORKERS} from "../../apis/worker";

  export default {
    name: 'Worker',
    data() {
      return {
        showDetailDialog: false,
        showDeleteDialog: false,
        showDialog: false,
        dialogVisible:false,
        isLoading: false,
        workerInfo: {},
        search: '',
        res: {},

        msg: '请选择文件上传',
        file: '',

        tableConfig: [
          {
            label: '姓名',
            prop: 'name',
            width: 200,
            sortable: false
          },
          {
            label: '电话',
            prop: 'telephone',
            sortable: true
          },
          {
            label: '员工类型',
            prop: 'type',
            width: 180,
            sortable: false
          },
          {
            label: '工号',
            prop: 'worker_id',
            width: 240,
            sortable: true
          }
        ],
        page:{
          pageSize:10,
          pages:1,
          pageNum:1,
          total:0
        }
      }
    },
    computed:{

    },
    methods: {
      getWorkers() {
        console.log('call get workers')
        this.isLoading = true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/worker/getAllWorkers?pageNum='+this.page.pageNum+'&pageSize='+this.page.pageSize)
            .then(res => {
              if (res.success) {
                this.res = res.data
              }
            })
            .then(_ => {
              this.isLoading = false
            })
      },
      handleChange(val) {
        this.page.pageNum=val
        this.getWorkers()
      },
      handleViewDetail(info) {
        this.workerInfo = info
        this.showDetailDialog = true
      },
      handleDelete(info) {
        this.workerInfo = info
        this.showDeleteDialog = true
      },
      handleDeleteConfirm(){
        this.$axios.get('https://api.echo.ituoniao.net/api/web/worker/removeById?id='+this.workerInfo.id)
            .then(res=>{
              if (res.success){
                this.$message({message:'删除成功',type:'success'})
                this.getWorkers()
              }else{
                this.$message.error('删除失败了哦:'+res.errMsg)
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error('请求失败，您可以重新尝试')
            })
            .then(_ =>{
              this.showDeleteDialog=false
            })
      },
      closeDeleteDialog(){
        this.showDeleteDialog=false
      }
    },
    mounted() {
      this.getWorkers()
    },

    getFile:function (event) { 
        this.file = event.target.files[0]; 
        console.log(this.file); 
        }, 
    submit:function (event) { //阻止元素发生默认的行为 
        event.preventDefault(); 
        let formData = new FormData(); 
        formData.append("file", this.file); 
        axios.post('/api/web/worker/uploadWorkers', formData) 
        .then(function (response) { alert(response.data); console.log(response); 
        window.location.reload(); }) .catch(function (error) { alert("上传失败");
         console.log(error); window.location.reload(); }); 
         }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 1em;
  }
</style>
