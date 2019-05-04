import request from './request.js'

export const LOGIN = (params) => request('/user/login', 'post', params)

export const ADMIN_LOGIN = (params) => request('/user/adminlogin', 'post', params)

export const TEST = (params) => request('/user/login', 'post', params)

