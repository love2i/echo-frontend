<template>
  <div class="wrapper">
    <el-menu-item v-for="(menu,index) in menus"
                  :key="index"
                  background-color="#000000"
                  class="subitem"
                  style="padding: 0 0 0 30px">
      <router-link :to="menu.path" class="sub">
        <!--                {{menu.name}}-->
        <span>{{getTitle(menu.meta.title)}}</span>
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
    methods: {
      getTitle(title) {
        return this.$t('route.' + title)
      }
    }
  }
</script>

<style scoped>
  .sub {
    color: #fff;
    padding-left: 30px;
  }

  .subitem {
    background-color: black;
  }

  .wrapper {
    background-color: black;
  }

  .wrapper a {
    text-decoration: none;
  }

  .wrapper a:hover {
    color: #1e90ff;
  }

  .subitem a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    outline: none;
  }
</style>
