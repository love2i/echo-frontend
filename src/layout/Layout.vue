<template>
  <div class="wrapper">
    <div class="header">
      <Header></Header>
    </div>
    <div class="container">
      <div class="left-menu" :style="{width:open?'240px':'0px'}">
        <!--                <h2>left menu</h2>-->
        <left-draw></left-draw>
      </div>
      <div class="content">
        <div class="bread">
          <span class="el-icon-menu toggle" @click="open=!open"></span>
          <Breadcrumb></Breadcrumb>
        </div>
        <app-main class="appmain"></app-main>
      </div>
    </div>
  </div>
</template>

<script>
  import AppMain from './components/AppMain'
  import LeftDraw from './components/LeftDraw'
  import Breadcrumb from './components/Breadcrumb'
  import Header from './components/Header'

  export default {
    name: 'Layout',
    components: {
      AppMain, LeftDraw, Breadcrumb, Header
    },
    data() {
      return {
        open: true
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  .header {
    height: 50px;
    width: 100%;
    background-color: #1e90ff;
  }

  .container {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    background-color: black;
    overflow: auto;
  }

  .left-menu {
    background-color: #57606f;
    transition: .5s;
    overflow: auto;
  }
  .left-menu h2 {
    color: #fff;
  }

  .content {
    flex-grow: 1;
    background-color: #eee;
    overflow: auto;
  }

  .content > div:nth-child(0) {
    margin: 10px 10px 0 10px;
  }

  .bread {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  .toggle {
    margin-right: 20px;
    cursor: pointer;
  }

  .appmain {
    width: 94%;
    margin: 20px auto 0;
  }

  @media screen and (max-width: 400px) {
    .left-menu {
      width: 0;
    }
  }
</style>
