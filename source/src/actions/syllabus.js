import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('SYLLABUS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_SYLLABUS_LIST: defineAction('GET_SYLLABUS_LIST'),
    CREATE_SYLLABUS: defineAction('CREATE_SYLLABUS'),
    GET_SYLLABUS_BY_ID: defineAction('GET_SYLLABUS_BY_ID'),
    UPDATE_SYLLABUS: defineAction('UPDATE_SYLLABUS'),
    DELETE_SYLLABUS: defineAction('DELETE_SYLLABUS'),
    GET_CHAPTER_LESSON_CLIENT: defineAction('GET_CHAPTER_LESSON_CLIENT')
}

export const actions = {
    getSyllabusList: createActionWithLoading(actionTypes.GET_SYLLABUS_LIST),
    createSyllabus: createAction(actionTypes.CREATE_SYLLABUS),
    getSyllabusById: createAction(actionTypes.GET_SYLLABUS_BY_ID),
    updateSyllabus: createAction(actionTypes.UPDATE_SYLLABUS),
    deleteSyllabus: createActionWithLoading(actionTypes.DELETE_SYLLABUS),
    getChapterLessonClient: createAction(actionTypes.GET_CHAPTER_LESSON_CLIENT)
}