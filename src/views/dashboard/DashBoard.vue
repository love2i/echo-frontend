<template>
  <div>
    <h1>dashboard</h1>
    <h3>you are now login as <strong>{{role}}</strong></h3>
    <countTo :startVal='1900' :endVal='date.getFullYear()' :duration='duration'></countTo>年
    <countTo :startVal='0' :endVal='date.getMonth()+1' :duration='duration'></countTo>月
    <countTo :startVal='0' :endVal='date.getDate()' :duration='duration'></countTo>日
    <countTo :startVal='0' :endVal='date.getHours()' :duration='duration'></countTo>:
    <countTo :startVal='0' :endVal='date.getMinutes()' :duration='duration'></countTo>:
    <countTo :startVal='0' :endVal='date.getSeconds()' :duration='duration'></countTo>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'

  export default {
    name: 'DashBoard',
    components: {
      countTo
    },
    data() {
      return {
        role: this.$store.getters.roles,
        duration:5000,
      }
    },
    computed:{
      date:()=>new Date()
    }
  }
</script>

<style scoped>

</style>
