<template>
  <div>
    <el-button @click="test()">aaa</el-button>
  </div>
</template>

<script>
  import {TEST} from "../../apis/user";

  export default {
    methods:{
      test() {
        let postData={
          username:'2222',
          password:'111'
        }
        TEST(postData)
            .then(res=>{
              console.log(res)
            })
      }
    }
  }

</script>