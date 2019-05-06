<template>
  <div class="bread-wrapper">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: routePath }">{{routeName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data() {
      return {
        routePath: '',
        routeName: ''
      }
    },
    watch: {
      $route() {
        this.routePath = this.$route.fullPath
        // this.routeName = this.$route.name
        this.routeName=this.getTitle(this.$route.meta.title)
      }
    },
    methods: {
      getTitle(title){
        return this.$t('route.'+title)
      }
    }
  }
</script>

<style scoped>
  .bread-wrapper {

  }
</style>
