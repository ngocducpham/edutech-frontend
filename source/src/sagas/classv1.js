import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/classv1';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_CLASS_LIST,
    GET_CLASS_BY_ID,
    UPDATE_CLASS,
    DELETE_CLASS,
    CREATE_CLASS,
    TEACHER_AUTO_COMPLETE,
    SUBJECT_AUTO_COMPLETE_CLASS,
    GET_CLASS_LIST_CLIENT,
    GET_STUDENT_CLASS_LIST_CLIENT,
    GET_SYLLABUS_CLIENT,
    UPDATE_CLASS_CLIENT,
    GET_SYLLABUS_LIST_CLASS
} = actionTypes;


function* getClassList({ payload: { params } }) {

    const apiParams = apiConfig.classv1.getList;
    const searchParams = { page: params.page, size: params.size };

    if (params.search) {
        if (params.search.title) {
            searchParams.title = params.search.title
        }
        if (params.search.status) {
            searchParams.status = params.search.status
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_CLASS_LIST),
            classData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_CLASS_LIST) });
    }
}

function* getClassById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.classv1.getById,
            path: `${apiConfig.classv1.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.classv1.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.classv1.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteClass({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.classv1.delete,
            path: `${apiConfig.classv1.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_CLASS) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_CLASS) });
        onError(error);
    }
}

function* teacherAutoComplete({ payload: { params } }) {
    const apiParams = apiConfig.teacher.getAutoComplete;
    const searchParams = [];
    if (params.subjectId) {
        searchParams.subjectId = params.subjectId
    }

    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(TEACHER_AUTO_COMPLETE),
            teacherAutocompleteData: result.responseData && {
                ...result.responseData.data,
            },

        })
    }
    catch (error) {
        yield put({ type: defineActionFailed(TEACHER_AUTO_COMPLETE) });
    }
}

function* subjectAutocompleteClass({ payload: { params } }) {
    const apiParams = apiConfig.classv1.getSubjectAutoCompleteClass;
    try {
        const result = yield call(sendRequest, apiParams, params);
        yield put({
            type: defineActionSuccess(SUBJECT_AUTO_COMPLETE_CLASS),
            subjectAutocompleteClassData: result.responseData && {
                ...result.responseData.data,
            },

        })
    }
    catch (error) {
        yield put({ type: defineActionFailed(SUBJECT_AUTO_COMPLETE_CLASS) });
    }
}

function* getClassListClient({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.classv1.getClassListClient;
    try {
        const result = yield call(sendRequest, apiParams, params);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData.data?.data);
                yield put({
                    type: defineActionSuccess(GET_CLASS_LIST_CLIENT),
                    data: responseData.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getStudentClassListClient({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.classv1.getStudentClassListClient,
        path: `${apiConfig.classv1.getStudentClassListClient.path}/${params.id}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData.data?.data);
                yield put({
                    type: defineActionSuccess(GET_STUDENT_CLASS_LIST_CLIENT),
                    data: responseData.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getSyllabusClient({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.classv1.getSyllabusClassClient,
        path: `${apiConfig.classv1.getSyllabusClassClient.path}/${params.id}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_SYLLABUS_CLIENT),
                    data: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getSyllabusListClass({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.syllabus.getList;
    if(params.subjectId){
        params.subjectId = params.subjectId
    }

    try {
        const result = yield call(sendRequest, apiParams, params);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_SYLLABUS_LIST_CLASS),
                    data: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* updateClassClient({ payload: { params, onCompleted, onError } }) {
    const param = {};
    param.id = params.classId;
    param.syllabusId = params.syllabusId;
    param.title = params.title;
    param.avatar = params.avatar
    try {
        const apiParams = apiConfig.classv1.updateClassClient;
        const result = yield call(sendRequest, apiParams, param);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}



const sagas = [
    takeLatest(defineActionLoading(GET_CLASS_LIST), getClassList),
    takeLatest(GET_CLASS_BY_ID, getClassById),
    takeLatest(UPDATE_CLASS, updateClass),
    takeLatest(CREATE_CLASS, createClass),
    takeLatest(defineActionLoading(DELETE_CLASS), deleteClass),
    takeLatest(defineActionLoading(TEACHER_AUTO_COMPLETE), teacherAutoComplete),
    takeLatest(defineActionLoading(SUBJECT_AUTO_COMPLETE_CLASS), subjectAutocompleteClass),
    takeLatest(GET_CLASS_LIST_CLIENT, getClassListClient),
    takeLatest(GET_STUDENT_CLASS_LIST_CLIENT, getStudentClassListClient),
    takeLatest(GET_SYLLABUS_CLIENT, getSyllabusClient),
    takeLatest(GET_SYLLABUS_LIST_CLASS, getSyllabusListClass),
    takeLatest(UPDATE_CLASS_CLIENT, updateClassClient)
]

export default sagas;