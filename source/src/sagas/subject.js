import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/subject';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_SUBJECT_LIST,
    GET_SUBJECT_BY_ID,
    UPDATE_SUBJECT,
    DELETE_SUBJECT,
    CREATE_SUBJECT,
} = actionTypes;


function* getSubjectList({ payload: { params } }) {

    const apiParams = apiConfig.subject.getList;
    const searchParams = { page: params.page, size: params.size };

    if (params.search) {
        if (params.search.name) {
            searchParams.name = params.search.name
        }
        if (params.search.code) {
            searchParams.code = params.search.code
        }
        if (params.search.status) {
            searchParams.status = params.search.status
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_SUBJECT_LIST),
            subjectData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_SUBJECT_LIST) });
    }
}

function* getSubjectById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.subject.getById,
            path: `${apiConfig.subject.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createSubject({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.subject.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateSubject({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.subject.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteSubject({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.subject.delete,
            path: `${apiConfig.subject.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_SUBJECT) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_SUBJECT) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_SUBJECT_LIST), getSubjectList),
    takeLatest(GET_SUBJECT_BY_ID, getSubjectById),
    takeLatest(UPDATE_SUBJECT, updateSubject),
    takeLatest(CREATE_SUBJECT, createSubject),
    takeLatest(defineActionLoading(DELETE_SUBJECT), deleteSubject),
]

export default sagas;