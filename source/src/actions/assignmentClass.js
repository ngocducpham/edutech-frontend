import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ASSIGNMENT_CLASS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ASSIGNMENT_CLASS_LIST: defineAction('GET_ASSIGNMENT_CLASS_LIST'),
    GET_ASSIGNMENT_CLASS_LESSON: defineAction('GET_ASSIGNMENT_CLASS_LESSON'),
    GET_ASSIGNMENT_CLASS_BY_ID: defineAction('GET_ASSIGNMENT_CLASS_BY_ID'),
    GET_ASSIGNMENT_CLASS_CLIENT: defineAction('GET_ASSIGNMENT_CLASS_CLIENT'),
    CREATE_ASSIGNMENT_CLASS: defineAction('CREATE_ASSIGNMENT_CLASS'),
    UPDATE_ASSIGNMENT_CLASS: defineAction('UPDATE_ASSIGNMENT_CLASS'),
    DELETE_ASSIGNMENT_CLASS: defineAction('DELETE_ASSIGNMENT_CLASS'),
}

export const actions = {
    getAssignmentClassList: createActionWithLoading(actionTypes.GET_ASSIGNMENT_CLASS_LIST),
    getAssignmentClassLesson: createAction(actionTypes.GET_ASSIGNMENT_CLASS_LESSON),
    getAssignmentClassById: createAction(actionTypes.GET_ASSIGNMENT_CLASS_BY_ID),
    getAssignmentClassClient: createActionWithLoading(actionTypes.GET_ASSIGNMENT_CLASS_CLIENT),
    createAssignmentClass: createAction(actionTypes.CREATE_ASSIGNMENT_CLASS),
    updateAssignmentClass: createAction(actionTypes.UPDATE_ASSIGNMENT_CLASS),
    deleteAssignmentClass: createActionWithLoading(actionTypes.DELETE_ASSIGNMENT_CLASS),

}