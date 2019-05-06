<template>
  <div id="wrapper">
    <loading v-show="isLoading"></loading>
    <div class="middle content">
      <h1>login</h1>
      <div class="forms">
        <input type="text" placeholder="enter your username here" v-model="username"/>
        <input type="password" placeholder="enter your password here" v-model="password"/>
        <el-button class="btn" @click="login" value="登录" :loading="loading">登录</el-button>
<!--        <input type="submit" class="btn" @click="adminLogin" value="普通登录"/>-->
        <div class="errMsg" v-show="errMsg!==''">
          {{errMsg}}
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import {ADMIN_LOGIN, LOGIN} from '@/apis/user'
  import Cookie from 'js-cookie'
  import Loading from '../../components/topLoading/TopLoading'

  export default {
    name: 'Login',
    components: {
      Loading
    },
    data() {
      return {
        loading:false,
        username: '',
        password: '',
        errMsg: '',
        isLoading: false
      }
    },
    methods: {
      login() {
        this.errMsg = ''
        if (!this.validate()) {
          return
        }
        this.loading=true
        this.isLoading = true
        let postData = {
          username: this.username,
          password: this.password
        }
        this.$axios.post('https://api.echo.ituoniao.net/api/web/user/login', postData)
            .then(res => {
              if (res.success) {
                console.log('login',res)
                this.saveToStore(res.data)
                this.saveInfoToCookie(res.data)
                this.$router.push({name: 'dashboard'})
              } else {
                this.errMsg = res.errMsg
              }
              this.isLoading = false
            })
            .then(() => {

              this.loading=false
            })
            .catch(err => {
              console.error(err)
              this.isLoading = false
            })
      },
      saveToStore(data) {
        this.$store.commit('setToken', data.token)
        this.$store.commit('setWorkerInfo',data.adminInfo)
      },
      validate() {
        if (this.username.length === 0 || this.password.length === 0) {
          this.errMsg = 'please enter username and password first'
          return false
        }
        return true
      },
      saveInfoToCookie(data) {
        Cookie.set('token', data.token)
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    width: 100%;
    height: 100%;
    background: #2f3542;
  }

  .middle {
    width: 750px;
    height: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    /*background-color: #2f3640;*/
    /*box-shadow: 0 0 7px black;*/
  }

  .content h1 {
    display: block;
    width: 100%;
    height: auto;
    text-align: center;
    align-items: center;
    margin: 30px 0;
    font-size: 3.5em;
    text-transform: uppercase;
    color: #dcdde1;
  }

  .forms {
    display: block;
    width: 100%;
    height: auto;
  }

  .forms input, .forms .btn {
    display: block;
    height: 2.4em;
    width: 40%;
    margin: 2.5em auto;
    padding: 5px 15px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid #a5b1c2;
    outline: none;
    transition: .3s;
    color: #fff;
  }

  .forms input:focus {
    border-color: darkcyan;
  }

  .forms .btn {
    width: 40%;
    height: 40px;
    font-size: 16px;
    background-color: #26de81;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .forms .btn:hover {
    background-color: #20bf6b;
  }

  .errMsg {
    align-items: center;
    text-align: center;
    color: #f00;
  }
</style>
