<template>
  <div class="wrapper">
    <div class="content">
      <el-table v-loading="isLoading"
                :data="tableList.filter(data=> !search||data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="学生 ID">
                <span>{{ props.row.student_id }}</span>
              </el-form-item>
              <el-form-item label="学生姓名">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="学生电话">
                <span>{{ props.row.telephone }}</span>
              </el-form-item>
              <el-form-item label="所在小区">
                <span>{{ props.row.zone }}</span>
              </el-form-item>
              <el-form-item label="所在楼">
                <span>{{ props.row.building }}</span>
              </el-form-item>
              <el-form-item label="宿舍号">
                <span>{{ props.row.room }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
                label="学生id"
                prop="student_id">
        </el-table-column>
        <el-table-column
                label="学生姓名"
                prop="name">
        </el-table-column>
        <el-table-column
                label="电话"
                prop="telephone">
        </el-table-column>
        <el-table-column
                label="区"
                prop="zone">
        </el-table-column>
        <el-table-column
                label="楼"
                prop="building">
        </el-table-column>
        <el-table-column
                label="宿舍号"
                prop="room">
        </el-table-column>
        <el-table-column
                align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="search"
                    size="mini"
                    placeholder="按名字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

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
    <div>
      <el-dialog
              :title="dialogConfig.title"
              :visible.sync="dialogConfig.showDelete"
              width="30%">
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogConfig.showDelete = false">取 消</el-button>
                <el-button type="primary" @click="handleDeleteConfirm">确 定</el-button>
                </span>
      </el-dialog>
      <el-dialog
              title="修改信息"
              :visible.sync="dialogConfig.showEdit"
              width="30%">
        <el-form>
          <el-form-item label="学号">
            <el-input v-model="form.student_id"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.telephone"></el-input>
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
                <el-option v-for="(v,index) in 50" :label="v+'号楼'" :value="v" :key="index"></el-option>
              </el-select>
              <el-select v-model="form.room" placeholder="请选择宿舍">
                <el-option v-for="(v,index) in dormitories" :label="v+'宿舍'" :value="v" :key="index"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogConfig.showEdit = false">取 消</el-button>
                <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {GET_ALL_DORMITORIES, REMOVE_DORMITORY_BY_ID, UPDATE_DORMITORY_BY_ID} from '../../apis/dormitory'

  export default {
    name: 'Dormitory',
    data() {
      return {
        isLoading: false,
        search: '',
        tableList: [],
        dialogConfig: {
          title: '是否删除',
          showDelete: false,
          showEdit: false
        },
        form: {
          id:'',
          zone: '',
          building: '',
          room: '',
          student_id: '',
          telephone: '',
          name: ''
        },
        dormitories: this.$store.getters.dormitories,
        selected: {},
        page: {
          pageSize: 10,
          pages: 1,
          pageNum: 1,
          total: 0
        }
      }
    },
    mounted() {
      this.getDormitoryList()
    },
    methods: {
      handleChange(val) {
        this.page.pageNum = val
        this.getDormitoryList()
      },
      getDormitoryList() {
        this.isLoading = true
        this.$axios.get('https://api.echo.ituoniao.net/api/web/dormitory/getAllDormitories?pageSize='+this.page.pageSize+'&pageNum='+this.page.pageNum)
            .then(res => {
              console.log('dormitory list ', res)
              if (res.success) {
                this.tableList = res.data.list
                this.page.pages=res.data.pages
                this.page.pageNum=res.data.pageNum
                this.page.pageSize=res.data.pageSize
                this.page.total=res.data.total
              } else {
                this.$message.error('获取宿舍列表出错了哦:' + res.errMsg)
              }
            })
            .then(() => {
              this.isLoading = false
            })
      },
      handleDelete(index, row) {
        this.selected = row
        this.dialogConfig.showDelete = true
      },
      handleEdit(index, row) {
        this.selected = row

        this.dialogConfig.showEdit = true

        this.form.zone = this.tableList[index].zone
        this.form.building = this.tableList[index].building
        this.form.room = this.tableList[index].room
        this.form.student_id = this.tableList[index].student_id
        this.form.name = this.tableList[index].name
        this.form.telephone = this.tableList[index].telephone
      },
      handleDeleteConfirm() {
        this.$axios.delete('https://api.echo.ituoniao.net/api/web/dormitory/removeById?id='+this.selected.id)
            .then(res => {
              if (res.success) {
                this.$message({message: '删除成功', type: 'success'})
                this.getDormitoryList()
              } else {
                this.$message.error('操作失败:'+res.errMsg)
              }
            })
            .catch(err=>{
              console.error(err)
              this.$message.error('网络出了点问题哦~~')
            })
        this.dialogConfig.showDelete = false
      },
      handleEditConfirm() {
        let postData={
          zone:Number.parseInt(this.form.zone),
          building:Number.parseInt(this.form.building),
          room:Number.parseInt(this.form.room)
        }
        this.$axios.post('https://api.echo.ituoniao.net/api/web/dormitory/updateById?id='+this.selected.id,postData)
            .then(res => {
              console.log(res)
              if (res.success) {
                this.$message({message: '更新成功', type: 'success'})
                this.getDormitoryList()
              } else {
                this.$message.error('操作失败:'+res.errMsg)
              }
            })
        this.dialogConfig.showEdit = false
      }
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
  }

  .pagination {
    margin: 20px auto;
  }
</style>
