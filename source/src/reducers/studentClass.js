import { actionTypes, reduxUtil } from '../actions/studentClass';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    LIST_STUDENT_CLASS,
    REMOVE_STUDENT_CLASS,
    GET_STUDENT_AUTOCOMPLETE
} = actionTypes;

const initialState = {
    studentClassData: {},
    studentAutocompleteData: {},
    tbStudentClassLoading: false
};

const reducer = createReducer({
    [defineActionLoading(LIST_STUDENT_CLASS)]: (state) => {
        return {
            ...state,
            tbStudentClassLoading: true
        }
    },
    [defineActionSuccess(LIST_STUDENT_CLASS)]: (state, { studentClassData }) => {
        return {
            ...state,
            studentClassData,
            tbStudentClassLoading: false
        }
    },
    [defineActionSuccess(GET_STUDENT_AUTOCOMPLETE)]: (state, { studentAutocompleteData }) => {
        return {
            ...state,
            studentAutocompleteData,
        };
    },
    [defineActionLoading(REMOVE_STUDENT_CLASS)]: (state) => {
        return {
            ...state,
            tbStudentClassLoading: true,
        }
    },
    [defineActionFailed(REMOVE_STUDENT_CLASS)]: (state) => {
        return {
            ...state,
            tbStudentClassLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
