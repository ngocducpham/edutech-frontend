import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CLASS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_CLASS_LIST: defineAction('GET_CLASS_LIST'),
    CREATE_CLASS: defineAction('CREATE_CLASS'),
    GET_CLASS_BY_ID: defineAction('GET_CLASS_BY_ID'),
    UPDATE_CLASS: defineAction('UPDATE_CLASS'),
    DELETE_CLASS: defineAction('DELETE_CLASS'),
    TEACHER_AUTO_COMPLETE: defineAction('TEACHER_AUTO_COMPLETE'),
    SUBJECT_AUTO_COMPLETE_CLASS: defineAction('SUBJECT_AUTO_COMPLETE_CLASS'),
    GET_CLASS_LIST_CLIENT: defineAction('GET_CLASS_LIST_CLIENT'),
    GET_STUDENT_CLASS_LIST_CLIENT: defineAction('GET_STUDENT_CLASS_LIST_CLIENT'),
    GET_SYLLABUS_CLIENT: defineAction('GET_SYLLABUS_CLIENT'),
    GET_SYLLABUS_LIST_CLASS: defineAction('GET_SYLLABUS_LIST_CLASS'),
    UPDATE_CLASS_CLIENT: defineAction('UPDATE_CLASS_CLIENT')
}

export const actions = {
    getClassList: createActionWithLoading(actionTypes.GET_CLASS_LIST),
    createClass: createAction(actionTypes.CREATE_CLASS),
    getClassById: createAction(actionTypes.GET_CLASS_BY_ID),
    updateClass: createAction(actionTypes.UPDATE_CLASS),
    deleteClass: createActionWithLoading(actionTypes.DELETE_CLASS),
    teacherAutoComplete: createActionWithLoading(actionTypes.TEACHER_AUTO_COMPLETE),
    subjectAutocompleteClass: createActionWithLoading(actionTypes.SUBJECT_AUTO_COMPLETE_CLASS),
    getClassListClient: createAction(actionTypes.GET_CLASS_LIST_CLIENT),
    getStudentClassListClient: createAction(actionTypes.GET_STUDENT_CLASS_LIST_CLIENT),
    getSyllabusClient: createAction(actionTypes.GET_SYLLABUS_CLIENT),
    getSyllabusListClass: createAction(actionTypes.GET_SYLLABUS_LIST_CLASS),
    updateClassClient: createAction(actionTypes.UPDATE_CLASS_CLIENT)
}