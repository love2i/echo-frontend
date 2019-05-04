import request from './request.js'

export const GET_ALL_COMPLAINTS = (params) => request('/complaint/getAllComplaints', 'get', params)

export const GET_ALL_REPAIRS = (params) => request('/repair/getAllRepairs', 'get', params)
