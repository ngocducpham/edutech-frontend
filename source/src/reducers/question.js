import { actionTypes, reduxUtil } from '../actions/question';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_QUESTION_LIST,
    GET_QUESTION_CLIENT_ASSIGNMENT,
    DELETE_QUESTION,
} = actionTypes;

const initialState = {
    questionData: [],
    questionClientData: [],
    tbQuestionLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_QUESTION_LIST)]: (state) => {
        return {
            ...state,
            tbQuestionLoading: true
        }
    },
    [defineActionSuccess(GET_QUESTION_LIST)]: (state, { questionData }) => {
        return {
            ...state,
            questionData,
            tbQuestionLoading: false
        }
    },
    [defineActionSuccess(GET_QUESTION_CLIENT_ASSIGNMENT)]: (state, { questionClientData }) => {
        return {
            ...state,
            questionClientData,
        }
    },
    [defineActionLoading(DELETE_QUESTION)]: (state) => {
        return {
            ...state,
            tbQuestionLoading: true,
        }
    },
    [defineActionFailed(DELETE_QUESTION)]: (state) => {
        return {
            ...state,
            tbQuestionLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
