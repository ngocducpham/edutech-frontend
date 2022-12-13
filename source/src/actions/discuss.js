import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('DISCUSS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_DISCUSS_LIST: defineAction('GET_DISCUSS_LIST'),
    GET_DISCUSS_CLIENT: defineAction('GET_DISCUSS_CLIENT'),
    GET_LESSON_DISCUSS_CLIENT: defineAction('GET_LESSON_DISCUSS_CLIENT'),
    GET_CLASS_DISCUSS_CLIENT: defineAction('GET_CLASS_DISCUSS_CLIENT'),
    CREATE_DISSCUSS_CLIENT: defineAction('CREATE_DISSCUSS_CLIENT'),
    DELELE_DISCUSS: defineAction('DELELE_DISCUSS'),
    GET_COMMENT_LIST_CLIENT: defineAction('GET_COMMENT_LIST_CLIENT'),
    GET_COMMENT_CLIENT: defineAction('GET_COMMENT_CLIENT'),
    CREATE_COMMENT_CLIENT: defineAction('CREATE_COMMENT_CLIENT'),
    UPDATE_COMMENT_CLIENT: defineAction('UPDATE_COMMENT_CLIENT'),
    DELETE_COMMENT_CLIENT: defineAction('DELETE_COMMENT_CLIENT'),
    GET_CHILD_COMMENT_LIST: defineAction('GET_CHILD_COMMENT_LIST')
}

export const actions = {
    getDiscussList: createActionWithLoading(actionTypes.GET_DISCUSS_LIST),
    getDiscussClient: createAction(actionTypes.GET_DISCUSS_CLIENT),
    getLessonDiscussListClient: createActionWithLoading(actionTypes.GET_LESSON_DISCUSS_CLIENT),
    getClassDiscussListClient: createActionWithLoading(actionTypes.GET_CLASS_DISCUSS_CLIENT),
    createDiscussClient: createAction(actionTypes.CREATE_DISSCUSS_CLIENT),
    deleteDiscuss: createAction(actionTypes.DELELE_DISCUSS),
    getCommentListClient: createActionWithLoading(actionTypes.GET_COMMENT_LIST_CLIENT),
    getCommentClient: createAction(actionTypes.GET_COMMENT_CLIENT),
    createCommentClient: createAction(actionTypes.CREATE_COMMENT_CLIENT),
    updateCommentClient: createAction(actionTypes.UPDATE_COMMENT_CLIENT),
    deleteCommentClient: createActionWithLoading(actionTypes.DELETE_COMMENT_CLIENT),
    getChildCommentList: createActionWithLoading(actionTypes.GET_CHILD_COMMENT_LIST)
}