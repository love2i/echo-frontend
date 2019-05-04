import request from './request.js'

export const GET_QUESTIONNAIRE_DETAIL = (params) => request('/questionnaires/getQuestionnaireDetail', 'get', params)

export const GET_ALL_QUESTIONNAIRE = (params) => request('/questionnaires/getAllQuestionnaires', 'get', params)

export const POST_QUESTIONNAIRE = (params) => request('/questionnaires/postQuestionnaire', 'post', params)
