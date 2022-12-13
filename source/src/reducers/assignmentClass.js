import { actionTypes, reduxUtil } from '../actions/assignmentClass';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_ASSIGNMENT_CLASS_LIST,
    GET_ASSIGNMENT_CLASS_LESSON,
    GET_ASSIGNMENT_CLASS_CLIENT,
    GET_ASSIGNMENT_CLASS_BY_ID,
    DELETE_ASSIGNMENT_CLASS,
} = actionTypes;

const initialState = {
    assignmentClassListData: [],
    assignmentClassLessonData: [],
    assignmentClassData: [],
    assignmentClientData: [],
    tbAssignmentClassLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_ASSIGNMENT_CLASS_LIST)]: (state) => {
        return {
            ...state,
            tbAssignmentClassLoading: true
        }
    },
    [defineActionSuccess(GET_ASSIGNMENT_CLASS_LIST)]: (state, { assignmentClassListData }) => {
        return {
            ...state,
            assignmentClassListData,
            tbAssignmentClassLoading: false
        }
    },
    [defineActionSuccess(GET_ASSIGNMENT_CLASS_LESSON)]: (state, { assignmentClassLessonData }) => {
        return {
            ...state,
            assignmentClassLessonData,
        }
    },
    [defineActionSuccess(GET_ASSIGNMENT_CLASS_CLIENT)]: (state, { assignmentClassData }) => {
        return {
            ...state,
            assignmentClassData,
        }
    },
    [defineActionSuccess(GET_ASSIGNMENT_CLASS_BY_ID)]: (state, { assignmentClientData }) => {
        return {
            ...state,
            assignmentClientData,
        }
    },
    [defineActionLoading(DELETE_ASSIGNMENT_CLASS)]: (state) => {
        return {
            ...state,
            tbAssignmentClassLoading: true,
        }
    },
    [defineActionFailed(DELETE_ASSIGNMENT_CLASS)]: (state) => {
        return {
            ...state,
            tbAssignmentClassLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
