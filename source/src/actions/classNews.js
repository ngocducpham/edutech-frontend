import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CLASS-NEWS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    CREATE_NEWS_CLASS: defineAction('CREATE_CLASS_NEWS'),
    DELETE_NEWS_CLASS: defineAction('DELETE_CLASS_NEWS'),
    GET_NEWS_CLASS_LIST: defineAction('GET_CLASS_NEWS_LIST'),
    GET_NEWS_CLASS_BY_CLASS_ID: defineAction('GET_CLASS_NEWS_BY_CLASS_ID'),
    UPDATE_NEWS_CLASS: defineAction('UPDATE_CLASS_NEWS'),
    UPLOAD_NEWS_IMAGE: defineAction('UPLOAD_NEWS_IMAGE'),
    GET_ALL_CLASS_NEWS: defineAction('GET_ALL_CLASS_NEWS'),
}

export const actions = {
    createClassNews: createAction(actionTypes.CREATE_NEWS_CLASS),
    deleteClassNews: createAction(actionTypes.DELETE_NEWS_CLASS),
    getClassNewsList: createActionWithLoading(actionTypes.GET_NEWS_CLASS_LIST),
    getClassNewsByClassId: createActionWithLoading(actionTypes.GET_NEWS_CLASS_BY_CLASS_ID),
    updateClassNews: createAction(actionTypes.UPDATE_NEWS_CLASS),
    uploadImage: createAction(actionTypes.UPLOAD_NEWS_IMAGE),
    getAllClassNews: createActionWithLoading(actionTypes.GET_ALL_CLASS_NEWS),
}