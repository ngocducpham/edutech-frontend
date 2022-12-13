import { actionTypes, reduxUtil } from '../actions/answer';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_ANSWER_LIST,
    GET_ANSWER_BY_ID,
    GET_ANSWER_CLIENT_ANSWER_LIST,
    GET_ANSWER_ANSWER_LIST
} = actionTypes;

const initialState = {
    answerListData: [],
    answerClientAnswerListData: [],
    answerAnswerListData: [],
    tbAnswerLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_ANSWER_LIST)]: (state) => {
        return {
            ...state,
            tbAnswerLoading: true
        }
    },
    [defineActionSuccess(GET_ANSWER_LIST)]: (state, { answerListData }) => {
        return {
            ...state,
            answerListData,
            tbAnswerLoading: false
        }
    },
    [defineActionSuccess(GET_ANSWER_CLIENT_ANSWER_LIST)]: (state, { answerClientAnswerListData }) => {
        return {
            ...state,
            answerClientAnswerListData,
        }
    },
    [defineActionSuccess(GET_ANSWER_ANSWER_LIST)]: (state, { answerAnswerListData }) => {
        return {
            ...state,
            answerAnswerListData,
        }
    },
    initialState
})

export default {
    reducer
};
