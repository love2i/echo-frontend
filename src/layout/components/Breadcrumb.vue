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
  data () {
    return {
      routePath: '',
      routeName: ''
    }
  },
  watch: {
    $route () {
      // console.log(this.$route);
      this.routePath = this.$route.fullPath
      this.routeName = this.$route.name
    }
  }
}
</script>

<style scoped>
.bread-wrapper{

}
</style>
