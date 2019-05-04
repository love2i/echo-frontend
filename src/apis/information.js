import request from './request.js'

export const UPDATE_INFORMATION_BY_ID = (params) => request('/information/updateById', 'put', params)

export const GET_ALL_INFORMATIONS = (params) => request('/information/getAllInformations', 'get', params)

export const POST_INFORMATION = (params) => request('/information/postInformation', 'post', params)
