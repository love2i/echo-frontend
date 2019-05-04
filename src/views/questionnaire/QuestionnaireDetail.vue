<template>
  <div class="wrapper">
    <h1 class="">问卷详情</h1>
    <div class="detail">
      <div v-for="(q,index) in detail.questions">
        <div class="title">
          <h3>{{index+1}}.{{q.text}}</h3>
        </div>
        <div class="options">
          <span v-for="(op,index) in q.options" class="option">
            {{index+1}}.{{op.text}}[{{op.selectNum}}]
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {GET_QUESTIONNAIRE_DETAIL} from "../../apis/questionnaire";

  export default {
    name: "QuestionnaireDetail",
    data(){
      return {
        detail:{}
      }
    },
    methods:{
      getDetail(){
        this.$axios.get('https://api.echo.ituoniao.net/api/web/questionnaires/getQuestionnaireDetail?id='+this.$route.params.id)
            .then(res=>{
              if (res.success){
                this.detail=res.data
              }
            })
      }
    },
    mounted() {
      this.getDetail()
    }
  }
</script>

<style scoped>
.options{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
  .wrapper{
    width: 80%;
  }
</style>