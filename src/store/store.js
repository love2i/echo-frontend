import Vue from 'vue'
import Vuex from 'vuex'
import router, {resetRouter, asyncRoutes, constantRoutes} from '../router/router'
import Cookie from 'js-cookie'
import {removeToken} from "../utils/token";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roles: '',
    token: Cookie.get('token') || '',
    routes: [],
    addRoutes: [],
    dormitories: [],
    workerInfo: {},
    buildings: []
  },
  getters: {
    roles: (state) => state.roles,
    token: (state) => state.token,
    routes: (state) => state.routes,
    workerInfo: (state) => state.workerInfo,
    dormitories: (state) => {
      if (state.dormitories.length === 0) {
        state.dormitories = generateDormitories()
      }
      return state.dormitories
    },
    buildings: (state) => {
      if (state.buildings.length === 0) {
        state.buildings = generateBuildings(state.workerInfo.jurisdiction)
      }
      return state.buildings
    }
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setToken(state, token) {
      state.token = token
    },
    setRoutes: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    setWorkerInfo: (state, workerInfo) => {
      state.workerInfo = workerInfo
    },
    resetInfo: (state) => {
      state.token = ''
      state.role = ''
      state.routes = []
      state.workerInfo = {}
      state.addRoutes = []
      state.buildings=[]
    }
  },
  actions: {
    generateRoutes({commit}, roles) {
      return new Promise(resolve => {
        let accessedRoutes

        accessedRoutes = filterHiddenRoutes(asyncRoutes)

        accessedRoutes = filterAsyncRoutes(accessedRoutes, roles)

        commit('setRoutes', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setRoles', [])
        // commit('setWorkerInfo',{})
        commit('resetInfo')
        removeToken()
        resetRouter()
        resolve()
      })
    },
  }
})

export function filterHiddenRoutes(routes) {
  const res = []

  routes.forEach(route => {
    if (route.children) {
      route.children = filterHiddenRoutes(route.children)
    }
    if (route.hidden === undefined || !route.hidden) {
      res.push(route)
    }
  })

  return res
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function generateDormitories() {
  const res = [];

  for (let i = 1; i < 6; ++i) {
    for (let j = 1; j < 20; ++j) {
      res.push(i + (j < 10 ? '0' + j : '' + j))
    }
  }
  return res
}

function generateBuildings(zone) {
  const b = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  ]
  if (zone==0) return b
  const area=[[0,8],[8,20],[20,32],[32,40],[40]]
  return b.slice(area[zone-1][0],area[zone-1][1])
}