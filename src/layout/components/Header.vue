<template>
  <div class="header-wrapper">
    <div class="badge">
      <h2>Welcome to FZU management</h2>
    </div>
    <div class="info">
      <i class="el-icon-search"></i>
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <i class="el-icon-info"></i>
      <i class="el-icon-error"></i>
      <i class="el-icon-caret-bottom"></i>
      <el-dropdown size="small">
                <span class="el-dropdown-link">
                    下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><span @click="openInfoDialog">我的信息</span></el-dropdown-item>
<!--          <el-dropdown-item>个人设置</el-dropdown-item>-->
          <el-dropdown-item>
            <span style="display: block" @click="logout">登出</span>
          </el-dropdown-item>
<!--          <el-dropdown-item>其他</el-dropdown-item>-->
<!--          <el-dropdown-item>fuck</el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
            title="您的基本信息"
            :visible.sync="showInfoDialog"
            width="30%">
      <div>
        <h2><strong>工号：</strong>{{info.workerId}}</h2>
      </div>
      <div>
        <h2><strong>联系电话：</strong>{{info.telephone}}</h2>
      </div>
      <div>
        <h2><strong>角色：</strong>{{info.jurisdiction===0?'超级管理员':info.jurisdiction+'区管理员'}}</h2>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        showInfoDialog: false,
        info:this.$store.getters.workerInfo
      }
    },
    methods: {
      openInfoDialog() {
        this.showInfoDialog = true
      },
      async logout(){
        await this.$store.dispatch('logout')
        this.$router.push({path:'/login'})
      }
    }
  }
</script>

<style scoped>
  .header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .header-wrapper > div {
    display: inline-block;
  }

  .info > * {
    display: inline-block;
    line-height: 3em;
    margin-right: 16px;
    color: white;
  }

  .badge h2 {
    display: inline-block;
    line-height: 50px;
    padding: 0px;
    margin: 0 0 0 1em;
    height: 50px;
    color: #fff;
  }
</style>
