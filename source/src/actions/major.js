import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('MAJOR');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_MAJOR_LIST: defineAction('GET_MAJOR_LIST'),
    CREATE_MAJOR: defineAction('CREATE_MAJOR'),
    GET_MAJOR_BY_ID: defineAction('GET_MAJOR_BY_ID'),
    UPDATE_MAJOR: defineAction('UPDATE_MAJOR'),
    DELETE_MAJOR: defineAction('DELETE_MAJOR'),
}

export const actions = {
    getMajorList: createActionWithLoading(actionTypes.GET_MAJOR_LIST),
    createMajor: createAction(actionTypes.CREATE_MAJOR),
    getMajorById: createAction(actionTypes.GET_MAJOR_BY_ID),
    updateMajor: createAction(actionTypes.UPDATE_MAJOR),
    deleteMajor: createActionWithLoading(actionTypes.DELETE_MAJOR)
}