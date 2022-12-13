import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/lesson';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_LESSON_CLIENT,
    GET_CHAPTER_CLIENT
} = actionTypes;

function* getLessonClient({ payload: { params, onCompleted, onError } }) {
    if(params.classId){
        params.classId = params.classId
    }
    if(params.lessonId){
        params.lessonId = params.lessonId
    }
    
    const searchParams = {};
    if(params.lessonId) searchParams.lessonId = params.lessonId
    if(params.classId) searchParams.classId = params.classId

    const apiParams = {
        ...apiConfig.lesson.getLessonClient,
        path: `${apiConfig.lesson.getLessonClient.path}/${params.classId}/${params.lessonId}`
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_LESSON_CLIENT),
                    data: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getChapterClient({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.lesson.getChapterClient,
        path: `${apiConfig.lesson.getChapterClient.path}/${params.chapterId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_CHAPTER_CLIENT),
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
    takeLatest(GET_LESSON_CLIENT, getLessonClient),
    takeLatest(GET_CHAPTER_CLIENT, getChapterClient),
]

export default sagas;