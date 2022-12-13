import { actionTypes, reduxUtil } from '../actions/assignment';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_ASSIGNMENT_LIST,
    DELETE_ASSIGNMENT,
} = actionTypes;

const initialState = {
    assignmentData: [],
    tbAssignmentLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_ASSIGNMENT_LIST)]: (state) => {
        return {
            ...state,
            tbAssignmentLoading: true
        }
    },
    [defineActionSuccess(GET_ASSIGNMENT_LIST)]: (state, { assignmentData }) => {
        return {
            ...state,
            assignmentData,
            tbAssignmentLoading: false
        }
    },
    [defineActionLoading(DELETE_ASSIGNMENT)]: (state) => {
        return {
            ...state,
            tbAssignmentLoading: true,
        }
    },
    [defineActionFailed(DELETE_ASSIGNMENT)]: (state) => {
        return {
            ...state,
            tbAssignmentLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
