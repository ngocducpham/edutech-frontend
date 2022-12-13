import { actionTypes, reduxUtil } from '../actions/classNews';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_NEWS_CLASS_LIST,
    GET_ALL_CLASS_NEWS
} = actionTypes;

const initialState = {
    classNewsData: [],
    tbClassNewsLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_NEWS_CLASS_LIST)]: (state) => {
        return {
            ...state,
            tbClassNewsLoading: true
        }
    },
    [defineActionSuccess(GET_NEWS_CLASS_LIST)]: (state, { classNewsData }) => {
        return {
            ...state,
            classNewsData,
            tbClassNewsLoading: false
        }
    },
    [defineActionLoading(GET_ALL_CLASS_NEWS)]: (state) => {
        return {
            ...state,
            tbClassNewsLoading: true
        }
    },
    [defineActionSuccess(GET_ALL_CLASS_NEWS)]: (state, { classNewsData }) => {
        return {
            ...state,
            classNewsData,
            tbClassNewsLoading: false
        }
    },
    initialState
})

export default {
    reducer
};
