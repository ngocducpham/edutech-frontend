import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ASSIGNMENT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ASSIGNMENT_LIST: defineAction('GET_ASSIGNMENT_LIST'),
    CREATE_ASSIGNMENT: defineAction('CREATE_ASSIGNMENT'),
    GET_ASSIGNMENT_BY_ID: defineAction('GET_ASSIGNMENT_BY_ID'),
    UPDATE_ASSIGNMENT: defineAction('UPDATE_ASSIGNMENT'),
    DELETE_ASSIGNMENT: defineAction('DELETE_ASSIGNMENT'),
    GET_ASSIGNMENT_AUTO_COMPLETE: defineAction('GET_ASSIGNMENT_AUTO_COMPLETE'),
}

export const actions = {
    getAssignmentList: createActionWithLoading(actionTypes.GET_ASSIGNMENT_LIST),
    createAssignment: createAction(actionTypes.CREATE_ASSIGNMENT),
    getAssignmentById: createAction(actionTypes.GET_ASSIGNMENT_BY_ID),
    updateAssignment: createAction(actionTypes.UPDATE_ASSIGNMENT),
    deleteAssignment: createActionWithLoading(actionTypes.DELETE_ASSIGNMENT),
    getAssignmentAutoComplete: createActionWithLoading(actionTypes.GET_ASSIGNMENT_AUTO_COMPLETE)
}