<template>
    <div>
        <el-form class="form">
            <div>
                <div>
                    <h3>ID: </h3>
                    <span>{{detail.id}}</span>
                </div>
                <div>
                    <h3>标题: </h3>
                    <span>{{detail.title}}</span>
                </div>
                <div>
                    <h3>内容: </h3>
                    <span>{{detail.content}}</span>
                </div>
                <div>
                    <h3>员工信息</h3>
                    <div>
                        <h4>发布员工ID:</h4>
                        <span>{{detail.worker.id}}</span>
                    </div>
                    <div>
                        <h4>发布员工姓名:</h4>
                        <h4>{{detail.worker.name}}</h4>
                    </div>
                    <div>
                        <h4>员工电话:</h4>
                        <span>{{detail.worker.tel}}</span>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h3>发布时间: </h3>
                    <span>{{detail.time}}</span>
                </div>
                <div>
                    <h3>小区: </h3>
                    <span>{{detail.zone}}</span>
                </div>
                <div>
                    <h3>楼号: </h3>
                    <span>{{detail.building}}</span>
                </div>
                <div>
                    <h3>宿舍: </h3>
                    <span>{{detail.room}}</span>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>

export default {
  name: 'InformationDetail',
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
