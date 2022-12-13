import { actionTypes, reduxUtil } from '../actions/major';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_MAJOR_LIST,
    DELETE_MAJOR,
} = actionTypes;

const initialState = {
    majorData: [],
    tbMajorLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_MAJOR_LIST)]: (state) => {
        return {
            ...state,
            tbMajorLoading: true
        }
    },
    [defineActionSuccess(GET_MAJOR_LIST)]: (state, { majorData }) => {
        return {
            ...state,
            majorData,
            tbMajorLoading: false
        }
    },
    [defineActionLoading(DELETE_MAJOR)]: (state) => {
        return {
            ...state,
            tbMajorLoading: true,
        }
    },
    [defineActionFailed(DELETE_MAJOR)]: (state) => {
        return {
            ...state,
            tbMajorLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
