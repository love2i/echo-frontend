<template>
  <div class="preview-wrapper">
    <h1>{{title}}</h1>
    <div v-for="(item,index) in list" class="item">
      <div class="title">
        <h3>{{index+1}}. {{item.title}}</h3>
        <span>[{{item.type==1?'单选':'多选'}}]</span>
      </div>

      <div class="options">
        <span v-for="(option, index) in item.options">
          {{index+1}}.{{option.content}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "QuestionPreview",
    props:['title','list'],
    mounted() {
      console.log(this.list)
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    flex-direction: row;
    justify-content: left;
  }
  .preview-wrapper{
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    background-color: #ddd;
  }
  .preview-wrapper *{
    text-align: center;
    align-items: center;
  }

  .options{
    width: 70%;
    margin-left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .item{
    width: 100%;
    margin: 15px auto;
  }
</style>