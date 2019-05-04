import request from './request.js'

export const GET_ALL_DORMITORIES = (params) => request('/dormitory/getAllDormitories', 'get', params)

export const REMOVE_DORMITORY_BY_ID = (params) => request('/dormitory/removeById', 'delete', params)

export const UPDATE_DORMITORY_BY_ID = (params) => request('/dormitory/updateById', 'put', params)

export const SAVE_DORMITORY = (params) => request('/dormitory/sveDormitory', 'put', params)
