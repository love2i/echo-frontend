import request from './request.js'

export const GET_ALL_FEES = (params) => request('/fee/getAllFees', 'get', params)

export const GET_WATER_FEES = (params) => request('/fee/getWaterFees','get',params)

export const GET_ELECTRICITY_FEES = (params) => request('fee/getElectricityFees','get',params)
