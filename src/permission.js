import router from './router/router'
import store from './store/store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import axios from 'axios'

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const hasToken = getToken()
  if (to.path === '/test') {
    next()
  }
  if (hasToken) {
    const hasRoles = !!(store.state.roles && store.state.roles.length > 0)

    if (hasRoles) {
      next()
    } else {
      let roles = ['admin']
      const adminInfo = await getUserInfo(store.state.token)

      console.log('permission',adminInfo)
      console.log('role',roles)

      if (adminInfo.jurisdiction === 0) {
        roles = ['super']
      }
      store.commit('setRoles', roles[0])
      const accessRoutes = await store.dispatch('generateRoutes', roles)
      router.addRoutes(accessRoutes)
      next({...to, replace: true})
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
    }
  }
})

router.afterEach(_ => {
  NProgress.done()
})

function getToken() {
  return store.state.token && store.state.token.length > 0
}

function getUserInfo(token) {
  return new Promise((resolve, reject) => {
    axios.get('https://api.echo.ituoniao.net/api/web/user/getUserInfo', {
      headers: {
        token: token,
        'Cache-Control': 'no-cache'
      }
    })
        .then(res => {
          console.log('getUserInfo', res)
          let info = res.data.data
          store.commit('setWorkerInfo', info)
          resolve(info)
        })
        .catch(err => {
          reject(err)
        })
  })

}