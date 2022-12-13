import { actionTypes, reduxUtil } from '../actions/chapter';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_CHAPTER_LIST,
    GET_SYLLABUS_DATA,
    DELETE_CHAPTER,
    GET_CHAPTER_CLIENT_CLASS
} = actionTypes;

const initialState = {
    chapterData: [],
    chapterClientClassData: [],
    tbChapterLoading: false,
    syllabusData: [],
	tbSyllabusLoading: false,
};

const reducer = createReducer({
    [defineActionLoading(GET_CHAPTER_LIST)]: (state) => {
        return {
            ...state,
            tbChapterLoading: true
        }
    },
    [defineActionSuccess(GET_CHAPTER_LIST)]: (state, { chapterData }) => {
        return {
            ...state,
            chapterData,
            tbChapterLoading: false
        }
    },
    [defineActionLoading(GET_SYLLABUS_DATA)]: (state) => {
        return {
            ...state,
            tbSyllabusLoading: true
        };
    },
    [defineActionSuccess(GET_SYLLABUS_DATA)]: (state, { syllabusData }) => {
        return {
            ...state,
            syllabusData,
            tbSyllabusLoading: false
        };
    },
    [defineActionSuccess(GET_CHAPTER_CLIENT_CLASS)]: (state, { chapterClientClassData }) => {
        return {
            ...state,
            chapterClientClassData,
        };
    },
    [defineActionLoading(DELETE_CHAPTER)]: (state) => {
        return {
            ...state,
            tbChapterLoading: true,
        }
    },
    [defineActionFailed(DELETE_CHAPTER)]: (state) => {
        return {
            ...state,
            tbChapterLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
