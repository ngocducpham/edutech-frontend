import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('CHAPTER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_CHAPTER_LIST: defineAction('GET_CHAPTER_LIST'),
    GET_CHAPTER_BY_ID: defineAction('GET_CHAPTER_BY_ID'),
    CREATE_CHAPTER: defineAction('CREATE_CHAPTER'),
    UPDATE_CHAPTER: defineAction('UPDATE_CHAPTER'),
    DELETE_CHAPTER: defineAction('DELETE_CHAPTER'),
    GET_CHAPTER_CLIENT_CLASS: defineAction('GET_CHAPTER_CLIENT_CLASS'),
    GET_LESSON_LIST: defineAction('GET_LESSON_LIST'),
    GET_LESSON_BY_ID: defineAction('GET_LESSON_BY_ID'),
    CREATE_LESSON: defineAction('CREATE_LESSON'),
    UPDATE_LESSON: defineAction('UPDATE_LESSON'),
    DELETE_LESSON: defineAction('DELETE_LESSON'),
    UP_LESSON: defineAction('UP_LESSON'),
    DOWN_LESSON: defineAction('DOWN_LESSON'),
    GET_SYLLABUS_DATA: defineAction('GET_SYLLABUS_DATA'),
    MOVE_LESSON: defineAction('MOVE_LESSON')
}

export const actions = {
    getChapterList: createActionWithLoading(actionTypes.GET_CHAPTER_LIST),
    getChapterById: createAction(actionTypes.GET_CHAPTER_BY_ID),
    createChapter: createAction(actionTypes.CREATE_CHAPTER),
    updateChapter: createAction(actionTypes.UPDATE_CHAPTER),
    deleteChapter: createActionWithLoading(actionTypes.DELETE_CHAPTER),
    getChapterClientClass: createAction(actionTypes.GET_CHAPTER_CLIENT_CLASS),
    getLessonList: createAction(actionTypes.GET_LESSON_LIST),
    getLessonById: createAction(actionTypes.GET_LESSON_BY_ID),
    createLesson: createAction(actionTypes.CREATE_LESSON),
    updateLesson: createAction(actionTypes.UPDATE_LESSON),
    deleteLesson: createAction(actionTypes.DELETE_LESSON),
    getSyllabusData: createActionWithLoading(actionTypes.GET_SYLLABUS_DATA),
    upLesson: createAction(actionTypes.UP_LESSON),
    downLesson: createAction(actionTypes.DOWN_LESSON),
    moveLesson: createAction(actionTypes.MOVE_LESSON),
}