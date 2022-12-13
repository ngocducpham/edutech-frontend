import { actionTypes, reduxUtil } from '../actions/discuss';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_DISCUSS_LIST,
    GET_DISCUSS_CLIENT,
    GET_LESSON_DISCUSS_CLIENT,
    GET_CLASS_DISCUSS_CLIENT,
    GET_COMMENT_LIST_CLIENT,
    DELETE_COMMENT_CLIENT,
    GET_CHILD_COMMENT_LIST
} = actionTypes;

const initialState = {
    discussListData: [],
    discussClientData: [],
    lessonDiscussListData: [],
    classDiscussListData: [],
    commentListData: [],
    childCommentListData: [],
    commentLoading: false,
    childcommentLoading: false,
    tbdiscussLoading: false,
    tbLessonDiscussLoading: false,
    tbClassDiscussLoading: false
};

const reducer = createReducer({
    [defineActionLoading(GET_DISCUSS_LIST)]: (state) => {
        return {
            ...state,
            tbdiscussLoading: true
        }
    },
    [defineActionSuccess(GET_DISCUSS_LIST)]: (state, { discussListData }) => {
        return {
            ...state,
            discussListData,
            tbdiscussLoading: false
        }
    },
    [defineActionLoading(GET_LESSON_DISCUSS_CLIENT)]: (state) => {
        return {
            ...state,
            tbLessonDiscussLoading: true
        }
    },
    [defineActionSuccess(GET_LESSON_DISCUSS_CLIENT)]: (state, { lessonDiscussListData }) => {
        return {
            ...state,
            lessonDiscussListData,
            tbLessonDiscussLoading: false
        }
    },
    [defineActionSuccess(GET_CLASS_DISCUSS_CLIENT)]: (state, { classDiscussListData }) => {
        return {
            ...state,
            classDiscussListData,
            tbClassDiscussLoading: false
        }
    },
    [defineActionSuccess(GET_DISCUSS_CLIENT)]: (state, { discussClientData }) => {
        return {
            ...state,
            discussClientData,
        }
    },
    [defineActionLoading(GET_COMMENT_LIST_CLIENT)]: (state) => {
        return {
            ...state,
            commentLoading: true
        }
    },
    [defineActionSuccess(GET_COMMENT_LIST_CLIENT)]: (state, { commentListData }) => {
        return {
            ...state,
            commentListData,
            commentLoading: false
        }
    },
    [defineActionLoading(GET_CHILD_COMMENT_LIST)]: (state) => {
        return {
            ...state,
            childcommentLoading: true
        }
    },
    [defineActionSuccess(GET_CHILD_COMMENT_LIST)]: (state, { childCommentListData }) => {
        return {
            ...state,
            childCommentListData,
            childcommentLoading: false
        }
    },
    [defineActionLoading(DELETE_COMMENT_CLIENT)]: (state) => {
        return {
            ...state,
            commentLoading: true,
        }
    },
    [defineActionFailed(DELETE_COMMENT_CLIENT)]: (state) => {
        return {
            ...state,
            commentLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};
