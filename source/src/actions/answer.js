import reduxHelper from '../utils/redux';
export const reduxUtil = reduxHelper('ANSWER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ANSWER_LIST: defineAction('GET_ANSWER_LIST'),
    GET_ANSWER_BY_ID: defineAction('GET_ANSWER_BY_ID'),
    GET_ANSWER_CLIENT_POINT: defineAction('GET_ANSWER_CLIENT_POINT'),
    GET_ANSWER_CLIENT_ANSWER_POINT: defineAction('GET_ANSWER_CLIENT_ANSWER_POINT'),
    GET_ANSWER_CLIENT_ANSWER_LIST: defineAction('GET_ANSWER_CLIENT_ANSWER_LIST'),
    GET_ANSWER_ANSWER_LIST: defineAction('GET_ANSWER_ANSWER_LIST'),
    CREATE_CLIENT_ANSWER: defineAction('CREATE_CLIENT_ANSWER'),
    UPDATE_CLIENT_ANSWER: defineAction('UPDATE_CLIENT_ANSWER'),
}

export const actions = {
    getAnswerList: createActionWithLoading(actionTypes.GET_ANSWER_LIST),
    getAnswerById: createAction(actionTypes.GET_ANSWER_BY_ID),
    getAnswerClientPoint: createAction(actionTypes.GET_ANSWER_CLIENT_POINT),
    getAnswerClientAnswerPoint: createAction(actionTypes.GET_ANSWER_CLIENT_ANSWER_POINT),
    getAnswerClientAnswerList: createAction(actionTypes.GET_ANSWER_CLIENT_ANSWER_LIST),
    getAnswerAnswerList: createAction(actionTypes.GET_ANSWER_ANSWER_LIST),
    createClientAnswer: createAction(actionTypes.CREATE_CLIENT_ANSWER),
    updateClientAnswer: createAction(actionTypes.UPDATE_CLIENT_ANSWER),
}