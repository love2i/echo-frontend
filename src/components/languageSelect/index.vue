<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{this.$t('chooseLanguage')}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="changeLanguage('zh_CN')">中文</span></el-dropdown-item>
        <el-dropdown-item><span @click="changeLanguage('en')">English</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    methods:{
      changeLanguage(locale){
        this.$i18n.locale=locale
      }
    }
  }
</script>

<style scoped>
.el-dropdown-link{
  color: white;
}
</style>