import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/assignmentClass';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ASSIGNMENT_CLASS_LIST,
    GET_ASSIGNMENT_CLASS_BY_ID,
    GET_ASSIGNMENT_CLASS_CLIENT,
    GET_ASSIGNMENT_CLASS_LESSON,
    CREATE_ASSIGNMENT_CLASS,
    UPDATE_ASSIGNMENT_CLASS,
    DELETE_ASSIGNMENT_CLASS
} = actionTypes;


function* getAssignmentClassList({ payload: { params } }) {

    const apiParams = apiConfig.assignmentClass.getAssignmentClassList;
    try {
        const result = yield call(sendRequest, apiParams, params);
        yield put({
            type: defineActionSuccess(GET_ASSIGNMENT_CLASS_LIST),
            assignmentClassListData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_ASSIGNMENT_CLASS_LIST) });
    }
}

function* getAssignmentClassById({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.assignmentClass.getAssignmentClassById,
        path: `${apiConfig.assignmentClass.getAssignmentClassById.path}/${params.id}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_ASSIGNMENT_CLASS_BY_ID),
                    assignmentClientData: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getAssignmentClassLesson({ payload: { params, onCompleted, onError } }) {
    if(params.lessonId){
        params.lessonId = params.lessonId
    }
    if(params.classId){
        params.classId = params.classId
    }
    const apiParams = {
        ...apiConfig.assignmentClass.getAssignmentClassLesson,
        path: `${apiConfig.assignmentClass.getAssignmentClassLesson.path}/${params.classId}/${params.lessonId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_ASSIGNMENT_CLASS_LESSON),
                    assignmentClassLessonData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getAssignmentClassClient({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.assignmentClass.getAssignmentClass,
            path: `${apiConfig.assignmentClass.getAssignmentClass.path}/${params.classId}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createAssignmentClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.assignmentClass.createAssignmentClass;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateAssignmentClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.assignmentClass.updateAssignmentClass;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteAssignmentClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.assignmentClass.deleteAssignmentClass,
            path: `${apiConfig.assignmentClass.deleteAssignmentClass.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_ASSIGNMENT_CLASS) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_ASSIGNMENT_CLASS) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_ASSIGNMENT_CLASS_LIST), getAssignmentClassList),
    takeLatest(GET_ASSIGNMENT_CLASS_BY_ID, getAssignmentClassById),
    takeLatest(GET_ASSIGNMENT_CLASS_CLIENT, getAssignmentClassClient),
    takeLatest(GET_ASSIGNMENT_CLASS_LESSON, getAssignmentClassLesson),
    takeLatest(CREATE_ASSIGNMENT_CLASS, createAssignmentClass),
    takeLatest(UPDATE_ASSIGNMENT_CLASS, updateAssignmentClass),
    takeLatest(defineActionLoading(DELETE_ASSIGNMENT_CLASS), deleteAssignmentClass),
]

export default sagas;