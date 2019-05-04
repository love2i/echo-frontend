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
</style>
