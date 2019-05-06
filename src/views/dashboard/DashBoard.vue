<template>
  <div>
    <h1>{{this.$t('welcome')}}[{{workerId}}]</h1>
    <div class="date">
      <span>{{this.$t('date')}}</span>
      <countTo class="count" :startVal='1900' :endVal='date.getFullYear()' :duration='duration'></countTo><span class="tag">/</span>
      <countTo class="count" :startVal='0' :endVal='date.getMonth()+1' :duration='duration'></countTo><span class="tag">/</span>
      <countTo class="count" :startVal='0' :endVal='date.getDate()' :duration='duration'></countTo><span class="tag">&nbsp</span>
      <countTo class="count" :startVal='0' :endVal='date.getHours()' :duration='duration'></countTo><span class="tag">:</span>
      <countTo class="count" :startVal='0' :endVal='date.getMinutes()' :duration='duration'></countTo><span class="tag">:</span>
      <countTo class="count" :startVal='0' :endVal='date.getSeconds()' :duration='duration'></countTo>
    </div>
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
        workerId:this.$store.getters.workerInfo.workerId
      }
    },
    computed:{
      date:function () {
        return new Date()
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .date{
    font-size: 3em;
  }
  .count {
    color: #30B08F;
    display: inline-block;
    margin: 10px 0;
  }
</style>
