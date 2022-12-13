import reduxHelper from '../utils/redux';
export const reduxUtil = reduxHelper('EXAM');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_EXAM_LIST: defineAction('GET_EXAM_LIST'),
    GET_EXAM_BY_ID: defineAction('GET_EXAM_BY_ID'),
    GET_EXAM_CLIENT: defineAction('GET_EXAM_CLIENT'),
    GET_EXAM_ASSIGNMENT: defineAction('GET_EXAM_ASSIGNMENT'),
    GET_EXAM_POINT: defineAction('GET_EXAM_POINT'),
    GET_CLIENT_DO_EXAM: defineAction('GET_CLIENT_DO_EXAM'),
    CREATE_EXAM: defineAction('CREATE_EXAM'),
    CREATE_CLIENT_DO_EXAM: defineAction('CREATE_CLIENT_DO_EXAM'),
    CREATE_EXAM_SUBMIT: defineAction('CREATE_EXAM_SUBMIT'),
    UPDATE_EXAM: defineAction('UPDATE_EXAM'),
    DELETE_EXAM: defineAction('DELETE_EXAM')
}

export const actions = {
    getExamList: createActionWithLoading(actionTypes.GET_EXAM_LIST),
    getExamById: createAction(actionTypes.GET_EXAM_BY_ID),
    getExamClient: createAction(actionTypes.GET_EXAM_CLIENT),
    getExamAssignment: createAction(actionTypes.GET_EXAM_ASSIGNMENT),
    getExamPoint: createAction(actionTypes.GET_EXAM_POINT),
    getClientDoExam: createAction(actionTypes.GET_CLIENT_DO_EXAM),
    createExam: createAction(actionTypes.CREATE_EXAM),
    createClientDoExam: createAction(actionTypes.CREATE_CLIENT_DO_EXAM),
    createExamSubmit: createAction(actionTypes.CREATE_EXAM_SUBMIT),
    updateExam: createAction(actionTypes.UPDATE_EXAM),
    deleteExam: createActionWithLoading(actionTypes.DELETE_EXAM)
}