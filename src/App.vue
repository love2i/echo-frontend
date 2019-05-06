<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {TEST} from "./apis/user";

  export default {
    name: 'app',
    components: {},
    methods: {

    }
  }
</script>

<style>
  #app {
    height: 100%;
  }

  /*#app::before {*/
  /*  content: "";*/
  /*  position: absolute;*/
  /*  top: 0;*/
  /*  left: 0;*/
  /*  width: 100%;*/
  /*  height: 100%;*/
  /*  opacity: .05;*/
  /*  background: url('../static/img/left-bg.jpg');*/
  /*  background-size: contain;*/
  /*}*/
</style>
