import request from './request.js'

export const REMOVE_WORKER_BY_ID = (params) => request('/worker/removeById', 'delete', params)

export const SAVE_WORKER = (params) => request('/worker/saveWorker', 'post', params)

export const GET_ALL_WORKERS = (params) => request('/worker/getAllWorkers', 'get', params)
