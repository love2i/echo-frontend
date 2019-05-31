<template>
  <div>
    <el-table :data="tableData.list" ref="complaintTable" v-loading="isLoading">
      <el-table-column
        v-for="(config,index) in tableConfig"
        :key="index"
        :prop="config.prop"
        :label="config.label"
        :sortable="config.sortable"
      ></el-table-column>

      <el-table-column label="当前状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0" type="warning" size="medium">待处理</el-tag>
          <el-tag v-else-if="scope.row.status===1" type="primary" size="medium">处理中</el-tag>
          <el-tag v-else type="success" size="medium">已完成</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" @click="openDialog(scope.row)">修改状态</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openReplyList(scope.row)">查看回复</el-button>
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
        layout="prev, pager, next"
      ></el-pagination>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
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

    <el-dialog title="对申诉的回复" :visible.sync="replyDialogVisible" width="60%">
      <el-table :data="replyTableData" ref="replyTable">

      <el-table-column label="身份">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reply_type===0" size="medium">管理员</el-tag>
          <el-tag v-else-if="scope.row.reply_type===1" size="medium">学生</el-tag>
        </template>
      </el-table-column>

        <el-table-column
          v-for="(config,index) in replyTableConfig"
          :key="index"
          :prop="config.prop"
          :label="config.label"
          :sortable="config.sortable"
        ></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="openReplyDialog()">回复</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增回复" :visible.sync="dialogVisible3" width="40%">
      <el-input type=" textarea" :rows="2" placeholder="请输入回复内容" v-model="replyContent"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="replyComplaint()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { GET_ALL_COMPLAINTS } from "../../apis/complaint";

export default {
  name: "Complaint",
  data() {
    return {
      status: undefined,
      isLoading: false,
      dialogVisible: false,
      replyDialogVisible: false,
      dialogVisible3: false,
      tableData: [],
      replyTableData: [],
      tableConfig: [
        {
          label: "学生",
          prop: "student_id",
          sortable: true
        },
        {
          label: "投诉内容",
          prop: "content",
          sortable: false
        },
        {
          label: "联系电话",
          prop: "telephone",
          sortable: true
        },
        {
          label: "发布时间",
          prop: "time",
          sortable: true
        }
      ],
      replyTableConfig: [
        /*{
          label: "姓名",
          prop: "reply_type",
          sortable: true
        },*/
        {
          label: "回复内容",
          prop: "content",
          sortable: true
        },
        {
          label: "回复时间",
          prop: "reply_time",
          sortable: true
        }
      ],
      replyContent: '',
      page: {
        pageSize: 10,
        pages: 1,
        pageNum: 1,
        total: 0
      },
      selected: {}
    };
  },
  methods: {
    getComplaints() {
      this.isLoading = true;
      this.$axios
        .get(
          "https://api.echo.ituoniao.net/api/web/complaint/getAllComplaints?pageNum=" +
            this.page.pageNum +
            "&pageSize=" +
            this.page.pageSize
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.tableData = res.data;
            this.page.pages = res.data.pages;
            this.page.pageNum = res.data.pageNum;
            this.page.pageSize = res.data.pageSize;
            this.page.total = res.data.total;
            this.id = res.data.id;
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        })
        .then(_ => {
          this.isLoading = false;
        });
    },
    getReplys(id) {
      this.$axios .get( "https://api.echo.ituoniao.net/api/web/complaint/getAllReplyById?id=" + id )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.replyTableData = res.data;
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        });
    },
    openDialog(row) {
      this.selected = row;
      this.dialogVisible = true;
      this.status = row.status;
    },
    openReplyList(row) {
      this.selected = row;
      this.getReplys(row.id);
      this.replyDialogVisible = true;
    },
    openReplyDialog() {
      this.dialogVisible3 = true;
    },
    updateState() {
      this.$axios
        .get(
          "https://api.echo.ituoniao.net/api/web/complaint/changeStatus?id=" +
            this.selected.id +
            "&status=" +
            this.status
        )
        .then(res => {
          if (res.success) {
            this.$message({ message: "修改成功", type: "success" });
            this.getComplaints();
          } else {
            this.$message.error("出错了哦：" + res.errMsg);
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        })
      this.dialogVisible = false;
    },
    replyComplaint() {
      this.$axios
        .post(
          "https://api.echo.ituoniao.net/api/web/complaint/complaintReply?id=" + this.selected.id, this.replyContent,{
            headers:{
              "Content-Type": 'text/plain',
              'Cache-Control': 'no-cache'
            }
          })
        .then(res => {
          if (res.success) {
            this.$message({ message: "回复成功", type: "success" });
            this.getReplys(this.selected.id);
          } else {
            this.$message.error("出错了哦：" + res.errMsg);
          }
        })
        .catch(err => {
          console.error(err);
          this.$message.error("网络开了点小差哦~~");
        })
        .then(_ => {});
      this.dialogVisible3 = false;
    },
    filterHandler(value, row, column) {},
    handleChange(val) {
      this.isLoading = true;
      this.page.pageNum = val;
      this.getComplaints();
    }
  },
  mounted() {
    this.getComplaints();
  }
};
</script>

<style scoped>
</style>
