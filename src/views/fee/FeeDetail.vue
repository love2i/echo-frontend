<template>
  <div>
    <el-form class="form">
      <div>
        <div>
          <h3>ID: </h3>
          <span>{{detail.id}}</span>
        </div>
        <div>
          <h3>宿舍信息</h3>
          <div>
            <h4>发布员工ID:</h4>
              <span>{{detail.dorm.id}}</span>
          </div>
          <div>
            <h4>小区:</h4>
            <h4>{{detail.dorm.zone}}</h4>
          </div>
          <div>
            <h4>楼号:</h4>
            <span>{{detail.dorm.building}}</span>
          </div>
          <div>
            <h4>宿舍号:</h4>
            <span>{{detail.dorm.room}}</span>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h3>应付金额: </h3>
          <span>{{detail.amount}}</span>
        </div>
        <div>
          <h3>费用类型: </h3>
          <span>{{detail.start_time}}</span>
        </div>
        <div>
          <h3>缴费状态: </h3>
          <el-tag v-if="detail.status===1" type="success">已缴费</el-tag>
          <el-tag v-else type="warning">未缴费</el-tag>
        </div>
        <div>
          <h3>开始时间: </h3>
          <span>{{detail.start_time}}</span>
        </div>
        <div>
          <h3>结束时间: </h3>
          <span>{{detail.end_time}}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'FeeDetail',
    props: [
      'detail'
    ],
    mounted () {
    }
  }
</script>

<style scoped>
  .form{
    padding: 0 4em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  h3 {
    display: inline-block;
    height: 1.2em;
    line-height: 1.2em;
    margin-right: 20px;
  }

  h3 + span {
    display: inline-block;
    font-size: 16px;
    height: 1.2em;
    line-height: 1.2em;
  }

  h4, h4 + span {
    display: inline-block;
    line-height: 1.1em;
    height: 1.1em;
    margin-left: 25px;
  }
</style>
