import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/assignment';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ASSIGNMENT_LIST,
    GET_ASSIGNMENT_BY_ID,
    UPDATE_ASSIGNMENT,
    DELETE_ASSIGNMENT,
    CREATE_ASSIGNMENT,
} = actionTypes;


function* getAssignmentList({ payload: { params } }) {

    const apiParams = apiConfig.assignment.getList;
    const searchParams = { page: params.page, size: params.size };

    if (params.lessonId) {
        searchParams.lessonId = params.lessonId
    }

    if (params.search) {
        if (params.search.title) {
            searchParams.title = params.search.title
        }
        if (params.search.type) {
            searchParams.type = params.search.type
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_ASSIGNMENT_LIST),
            assignmentData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_ASSIGNMENT_LIST) });
    }
}

function* getAssignmentById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.assignment.getById,
            path: `${apiConfig.assignment.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createAssignment({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.assignment.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateAssignment({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.assignment.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteAssignment({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.assignment.delete,
            path: `${apiConfig.assignment.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_ASSIGNMENT) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_ASSIGNMENT) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_ASSIGNMENT_LIST), getAssignmentList),
    takeLatest(GET_ASSIGNMENT_BY_ID, getAssignmentById),
    takeLatest(UPDATE_ASSIGNMENT, updateAssignment),
    takeLatest(CREATE_ASSIGNMENT, createAssignment),
    takeLatest(defineActionLoading(DELETE_ASSIGNMENT), deleteAssignment),
]

export default sagas;