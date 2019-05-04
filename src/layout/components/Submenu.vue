<template>
    <div class="wrapper">
        <el-menu-item v-for="(menu,index) in menus"
                      :key="index"
                      background-color="#000000"
                      class="subitem">
            <router-link :to="menu.path" class="sub">
                {{menu.name}}
            </router-link>
        </el-menu-item>
    </div>
</template>

<script>
export default {
  name: 'Submenu',
  props: [
    'menus'
  ],
  mounted () {
  }
}
</script>

<style scoped>
    .sub {
        color: #fff;
    }
    .subitem{
        background-color: black;
    }
    .wrapper{
        background-color: black;
    }
    .wrapper a{
        text-decoration: none;
    }
    .wrapper a:hover{
        color: #1e90ff;
    }
</style>
