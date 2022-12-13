import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/syllabus';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_SYLLABUS_LIST,
    GET_SYLLABUS_BY_ID,
    UPDATE_SYLLABUS,
    DELETE_SYLLABUS,
    CREATE_SYLLABUS,
    GET_CHAPTER_LESSON_CLIENT
} = actionTypes;


function* getSyllabusList({ payload: { params } }) {

    const apiParams = apiConfig.syllabus.getList;
    const searchParams = { page: params.page, size: params.size };
    if(params.subjectId){
        searchParams.subjectId = params.subjectId
    }

    if (params.search) {
        if (params.search.title) {
            searchParams.title = params.search.title
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_SYLLABUS_LIST),
            syllabusData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_SYLLABUS_LIST) });
    }
}

function* getSyllabusById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.syllabus.getById,
            path: `${apiConfig.syllabus.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createSyllabus({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.syllabus.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateSyllabus({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.syllabus.update,
            path: `${apiConfig.syllabus.update.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteSyllabus({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.syllabus.delete,
            path: `${apiConfig.syllabus.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_SYLLABUS) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_SYLLABUS) });
        onError(error);
    }
}

function* getChapterLessonClient({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.syllabus.getChapterLessonClient,
        path: `${apiConfig.syllabus.getChapterLessonClient.path}/${params.id}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_CHAPTER_LESSON_CLIENT),
                    data: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}


const sagas = [
    takeLatest(defineActionLoading(GET_SYLLABUS_LIST), getSyllabusList),
    takeLatest(GET_SYLLABUS_BY_ID, getSyllabusById),
    takeLatest(UPDATE_SYLLABUS, updateSyllabus),
    takeLatest(CREATE_SYLLABUS, createSyllabus),
    takeLatest(defineActionLoading(DELETE_SYLLABUS), deleteSyllabus),
    takeLatest(GET_CHAPTER_LESSON_CLIENT, getChapterLessonClient),
]

export default sagas;