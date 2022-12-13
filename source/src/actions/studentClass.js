import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('STUDENT_CLASS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    LIST_STUDENT_CLASS: defineAction('LIST_STUDENT_CLASS'),
    ADD_STUDENT_CLASS: defineAction('ADD_STUDENT_CLASS'),
    REMOVE_STUDENT_CLASS: defineAction('REMOVE_STUDENT_CLASS'),
    GET_STUDENT_AUTOCOMPLETE: defineAction('GET_STUDENT_AUTOCOMPLETE'),
}

export const actions = {
    listStudentClass: createActionWithLoading(actionTypes.LIST_STUDENT_CLASS),
    addStudentClass: createAction(actionTypes.ADD_STUDENT_CLASS),
    removeStudentClass: createActionWithLoading(actionTypes.REMOVE_STUDENT_CLASS),
    getStudentAutoComplete: createActionWithLoading(actionTypes.GET_STUDENT_AUTOCOMPLETE)
}