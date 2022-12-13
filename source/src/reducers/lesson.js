import { actionTypes, reduxUtil } from '../actions/lesson';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_LESSON_CLIENT,
    GET_CHAPTER_CLIENT
} = actionTypes;

const initialState = {
    lessonClientData: [],
    chapterClientData: [],
    tbLessonLoading: false,
};

const reducer = createReducer({
    [defineActionSuccess(GET_LESSON_CLIENT)]: (state, { data }) => {
        return {
            ...state,
            lessonClientData: data,
        }
    },
    [defineActionSuccess(GET_CHAPTER_CLIENT)]: (state, { data }) => {
        return {
            ...state,
            chapterClientData: data,
        }
    },
    initialState
})

export default {
    reducer
};
