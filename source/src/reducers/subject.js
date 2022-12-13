import { actionTypes, reduxUtil } from '../actions/subject';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_SUBJECT_LIST,
    DELETE_SUBJECT,
} = actionTypes;

const initialState = {
    subjectData: [],
    tbSubjectLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_SUBJECT_LIST)]: (state) => {
        return {
            ...state,
            tbSubjectLoading: true
        }
    },
    [defineActionSuccess(GET_SUBJECT_LIST)]: (state, { subjectData }) => {
        return {
            ...state,
            subjectData,
            tbSubjectLoading: false
        }
    },
    [defineActionLoading(DELETE_SUBJECT)]: (state) => {
        return {
            ...state,
            tbSubjectLoading: true,
        }
    },
    [defineActionFailed(DELETE_SUBJECT)]: (state) => {
        return {
            ...state,
            tbSubjectLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
