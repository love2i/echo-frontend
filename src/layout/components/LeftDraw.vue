<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
              class="menu"
              background-color="#2f3640"
              active-text-color="#fff"
              text-color="#fff"
              :collapse-transition="false"
              mode="vertical">
        <el-submenu v-for="(route,index) in routes.filter(r=>!r.hidden)"
                    :key="index"
                    :index="index.toString()">

          <template slot="title" class="menu-title">
            <i class="fas" :class="'fa-'+route.meta.icon" style="margin-right: 10px"></i>
<!--            <font-awesome-icon :icon="route.meta.icon" />-->
<!--            <span>{{route.name}}</span>-->
            <span>{{getTitle(route.meta.title)}}</span>
          </template>
          <Submenu :menus="route.children"></Submenu>

        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import Submenu from './Submenu'

  export default {
    name: 'LeftDraw',
    components: {
      Submenu
    },
    data() {
      return {
        routes: this.$store.state.routes
      }
    },
    mounted() {
      this.routes = this.$store.state.routes
    },
    methods:{
      getTitle(title){
        return this.$t('route.'+title)
      }
    }
  }
</script>

<style scoped>
  .menu-title {
    width: 100%;
    height: 60px;
    background-color: lightblue;
    color: #000;
  }
</style>
