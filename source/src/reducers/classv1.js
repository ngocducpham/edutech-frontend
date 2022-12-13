import { actionTypes, reduxUtil } from '../actions/classv1';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_CLASS_LIST,
    DELETE_CLASS,
    TEACHER_AUTO_COMPLETE,
    SUBJECT_AUTO_COMPLETE_CLASS,
    GET_CLASS_LIST_CLIENT,
    GET_STUDENT_CLASS_LIST_CLIENT,
    GET_SYLLABUS_CLIENT,
    GET_SYLLABUS_LIST_CLASS
} = actionTypes;

const initialState = {
    classData: [],
    teacherAutocompleteData: {},
    subjectAutocompleteClassData: {},
    classListClientData: [],
    studentClassListClientData: [],
    syllabusClientData: [],
    syllabusListData: [],
    tbClassLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_CLASS_LIST)]: (state) => {
        return {
            ...state,
            tbClassLoading: true
        }
    },
    [defineActionSuccess(GET_CLASS_LIST)]: (state, { classData }) => {
        return {
            ...state,
            classData,
            tbClassLoading: false
        }
    },
    [defineActionSuccess(GET_CLASS_LIST_CLIENT)]: (state, { data }) => {
        return {
            ...state,
            classListClientData: data,
        }
    },
    [defineActionSuccess(GET_STUDENT_CLASS_LIST_CLIENT)]: (state, { data }) => {
        return {
            ...state,
            studentClassListClientData: data,
        }
    },
    [defineActionSuccess(GET_SYLLABUS_CLIENT)]: (state, { data }) => {
        return {
            ...state,
            syllabusClientData: data,
        }
    },
    [defineActionSuccess(GET_SYLLABUS_LIST_CLASS)]: (state, { data }) => {
        return {
            ...state,
            syllabusListData: data,
        }
    },
    [defineActionSuccess(TEACHER_AUTO_COMPLETE)]: (state, { teacherAutocompleteData }) => {
        return {
            ...state,
            teacherAutocompleteData,
        }
    },
    [defineActionSuccess(SUBJECT_AUTO_COMPLETE_CLASS)]: (state, { subjectAutocompleteClassData }) => {
        return {
            ...state,
            subjectAutocompleteClassData,
        }
    },
    [defineActionLoading(DELETE_CLASS)]: (state) => {
        return {
            ...state,
            tbClassLoading: true,
        }
    },
    [defineActionFailed(DELETE_CLASS)]: (state) => {
        return {
            ...state,
            tbClassLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
