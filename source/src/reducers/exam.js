import { actionTypes, reduxUtil } from '../actions/exam';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_EXAM_LIST,
    GET_EXAM_ASSIGNMENT,
    GET_EXAM_CLIENT,
    GET_CLIENT_DO_EXAM,
    DELETE_EXAM
} = actionTypes;

const initialState = {
    examListData: [],
    examAssignmentData: [],
    examClientData: [],
    examClientDoExamData: [],
    tbExamLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_EXAM_LIST)]: (state) => {
        return {
            ...state,
            tbExamLoading: true
        }
    },
    [defineActionSuccess(GET_EXAM_LIST)]: (state, { examListData }) => {
        return {
            ...state,
            examListData,
            tbExamLoading: false
        }
    },
    [defineActionSuccess(GET_EXAM_ASSIGNMENT)]: (state, { examAssignmentData }) => {
        return {
            ...state,
            examAssignmentData,
        }
    },
    [defineActionSuccess(GET_EXAM_CLIENT)]: (state, { examClientData }) => {
        return {
            ...state,
            examClientData,
        }
    },
    [defineActionSuccess(GET_CLIENT_DO_EXAM)]: (state, { examClientDoExamData }) => {
        return {
            ...state,
            examClientDoExamData,
        }
    },
    [defineActionLoading(DELETE_EXAM)]: (state) => {
        return {
            ...state,
            tbExamLoading: true
        }
    },
    [defineActionSuccess(DELETE_EXAM)]: (state) => {
        return {
            ...state,
            tbExamLoading: false
        }
    },
    initialState
})

export default {
    reducer
};
