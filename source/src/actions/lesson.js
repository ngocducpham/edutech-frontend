import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('LESSON');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_LESSON_CLIENT: defineAction('GET_LESSON_CLIENT'),
    GET_CHAPTER_CLIENT: defineAction('GET_CHAPTER_CLIENT')
}

export const actions = {
    getLessonClient: createAction(actionTypes.GET_LESSON_CLIENT),
    getChapterClient: createAction(actionTypes.GET_CHAPTER_CLIENT)
}