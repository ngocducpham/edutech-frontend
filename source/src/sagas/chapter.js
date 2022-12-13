import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/chapter';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_CHAPTER_LIST,
    GET_CHAPTER_BY_ID,
    CREATE_CHAPTER,
    UPDATE_CHAPTER,
    DELETE_CHAPTER,
    GET_CHAPTER_CLIENT_CLASS,
    GET_LESSON_LIST,
    GET_LESSON_BY_ID,
    CREATE_LESSON,
    UPDATE_LESSON,
    DELETE_LESSON,
    UP_LESSON,
    DOWN_LESSON,
    GET_SYLLABUS_DATA,
    MOVE_LESSON
} = actionTypes;


function* getChapterList({ payload: { params, onCompleted } }) {

    const apiParams = apiConfig.chapter.getList;
    const searchParams = { };
    if(params.page || params.page === 0) {
        searchParams.page = params.page
    }

    if(params.size || params.size === 0) {
        searchParams.size = params.size
    }
    if(params.syllabusId){
        searchParams.syllabusId = params.syllabusId
    }

    if (params.search) {
        if (params.search.title) {
            searchParams.title = params.search.title
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_CHAPTER_LIST),
            chapterData: result.responseData && result.responseData.data,
        });
        onCompleted && onCompleted()
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_CHAPTER_LIST) });
    }
}

function* getChapterClientClass({ payload: { params, onCompleted, onError } }) {
    if(params.classId){
        params.classId = params.classId
    }

    const apiParams = {
        ...apiConfig.chapter.getChapterClientClass,
        path: `${apiConfig.chapter.getChapterClientClass.path}/${params.classId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_CHAPTER_CLIENT_CLASS),
                    chapterClientClassData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getChapterById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.chapter.getById,
            path: `${apiConfig.chapter.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createChapter({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.chapter.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}


function* updateChapter({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.chapter.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteChapter({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.chapter.delete,
            path: `${apiConfig.chapter.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_CHAPTER) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_CHAPTER) });
        onError(error);
    }
}

function* getLessonList({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.lesson.getList;
    const searchParams = {};
    if(params.chapterId){
        searchParams.chapterId = params.chapterId
    }

    try {
        const { success, responseData } = yield call(sendRequest, apiParams, searchParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);
    }
    catch(error) {
        onError && onError(error)
    }
}

function* getLessonById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.lesson.getById,
            path: `${apiConfig.lesson.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.lesson.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}


function* updateLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.lesson.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.lesson.delete,
            path: `${apiConfig.lesson.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_LESSON) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_LESSON) });
        onError(error);
    }
}


function* upLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.lesson.up,
            path: `${apiConfig.lesson.up.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* downLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.lesson.down,
            path: `${apiConfig.lesson.down.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* moveLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.lesson.move,
            path: `${apiConfig.lesson.move.path}/${params.lessonId}?newOrder=${params.newOrder}`
        }
        const result = yield call(sendRequest, apiParams );
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* getSyllabusData({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.syllabus.getById,
            path: `${apiConfig.syllabus.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        yield put({
            type: defineActionSuccess(GET_SYLLABUS_DATA),
            syllabusData: result.responseData && result.responseData.data,
        });
        onCompleted && onCompleted()
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_SYLLABUS_DATA) });
    }
}



const sagas = [
    takeLatest(defineActionLoading(GET_CHAPTER_LIST), getChapterList),
    takeLatest(GET_CHAPTER_BY_ID, getChapterById),
    takeLatest(CREATE_CHAPTER, createChapter),
    takeLatest(UPDATE_CHAPTER, updateChapter),
    takeLatest(defineActionLoading(DELETE_CHAPTER), deleteChapter),
    takeLatest(GET_CHAPTER_CLIENT_CLASS, getChapterClientClass),
    takeEvery(GET_LESSON_LIST, getLessonList),
    takeLatest(GET_LESSON_BY_ID, getLessonById),
    takeLatest(CREATE_LESSON, createLesson),
    takeLatest(UPDATE_LESSON, updateLesson),
    takeLatest(DELETE_LESSON, deleteLesson),
    takeLatest(defineActionLoading(GET_SYLLABUS_DATA), getSyllabusData),
    takeLatest(UP_LESSON, upLesson),
    takeLatest(DOWN_LESSON, downLesson),
    takeLatest(MOVE_LESSON, moveLesson),
]

export default sagas;