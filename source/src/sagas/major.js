import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/major';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_MAJOR_LIST,
    GET_MAJOR_BY_ID,
    UPDATE_MAJOR,
    DELETE_MAJOR,
    CREATE_MAJOR,
} = actionTypes;


function* getMajorList({ payload: { params } }) {

    const apiParams = apiConfig.major.getList;
    const searchParams = { page: params.page, size: params.size };

    if (params.search) {
        if (params.search.name) {
            searchParams.name = params.search.name
        }
        if (params.search.status) {
            searchParams.status = params.search.status
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_MAJOR_LIST),
            majorData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_MAJOR_LIST) });
    }
}

function* getMajorById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.major.getById,
            path: `${apiConfig.major.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createMajor({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.major.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateMajor({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.major.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteMajor({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.major.delete,
            path: `${apiConfig.major.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_MAJOR) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_MAJOR) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_MAJOR_LIST), getMajorList),
    takeLatest(GET_MAJOR_BY_ID, getMajorById),
    takeLatest(UPDATE_MAJOR, updateMajor),
    takeLatest(CREATE_MAJOR, createMajor),
    takeLatest(defineActionLoading(DELETE_MAJOR), deleteMajor),
]

export default sagas;