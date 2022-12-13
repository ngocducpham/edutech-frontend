import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('SUBJECT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_SUBJECT_LIST: defineAction('GET_SUBJECT_LIST'),
    CREATE_SUBJECT: defineAction('CREATE_SUBJECT'),
    GET_SUBJECT_BY_ID: defineAction('GET_SUBJECT_BY_ID'),
    UPDATE_SUBJECT: defineAction('UPDATE_SUBJECT'),
    DELETE_SUBJECT: defineAction('DELETE_SUBJECT'),
}

export const actions = {
    getSubjectList: createActionWithLoading(actionTypes.GET_SUBJECT_LIST),
    createSubject: createAction(actionTypes.CREATE_SUBJECT),
    getSubjectById: createAction(actionTypes.GET_SUBJECT_BY_ID),
    updateSubject: createAction(actionTypes.UPDATE_SUBJECT),
    deleteSubject: createActionWithLoading(actionTypes.DELETE_SUBJECT)
}