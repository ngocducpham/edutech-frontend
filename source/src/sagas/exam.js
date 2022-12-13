import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/exam';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_EXAM_LIST,
    GET_EXAM_BY_ID,
    GET_EXAM_CLIENT,
    GET_EXAM_ASSIGNMENT,
    GET_EXAM_POINT,
    GET_CLIENT_DO_EXAM,
    CREATE_EXAM,
    CREATE_CLIENT_DO_EXAM,
    CREATE_EXAM_SUBMIT,
    UPDATE_EXAM,
    DELETE_EXAM
} = actionTypes;


function* getExamList({ payload: { params } }) {

    const apiParams = apiConfig.exam.getExamList;
    try {
        const result = yield call(sendRequest, apiParams, params);
        yield put({
            type: defineActionSuccess(GET_EXAM_LIST),
            examListData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_EXAM_LIST) });
    }
}

function* getExamById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.exam.getExamById,
            path: `${apiConfig.exam.getExamById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* getExamClient({ payload: { params, onCompleted, onError } }) {
    if(params.examId){
        params.examId = params.examId
    }

    const apiParams = {
        ...apiConfig.exam.getExamClient,
        path: `${apiConfig.exam.getExamClient.path}/${params.examId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_EXAM_CLIENT),
                    examClientData: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getExamAssignment({ payload: { params, onCompleted, onError } }) {
    if(params.assignmentId){
        params.assignmentId = params.assignmentId
    }

    const apiParams = {
        ...apiConfig.exam.getExamClientAssignment,
        path: `${apiConfig.exam.getExamClientAssignment.path}/${params.assignmentId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_EXAM_ASSIGNMENT),
                    examAssignmentData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getClientDoExam({ payload: { params, onCompleted, onError } }) {
    if(params.assignmentId){
        params.assignmentId = params.assignmentId
    }
    const apiParams = {
        ...apiConfig.exam.getClientDoExam,
        path: `${apiConfig.exam.getClientDoExam.path}/${params.assignmentId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_CLIENT_DO_EXAM),
                    examClientDoExamData: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* createClientDoExam({ payload: { params, onCompleted, onError } }) {
    if(params.assignmentClassId){
        params.assignmentClassId = params.assignmentClassId
    }
    const apiParams = {
        ...apiConfig.exam.createClientDoExam,
        path: `${apiConfig.exam.createClientDoExam.path}/${params.assignmentClassId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createExam({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.exam.createExamClient;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createExamSubmit({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.exam.createExamClientSubmit;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateExam({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.exam.updateExamClient;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteExam({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.exam.deleteExam,
            path: `${apiConfig.exam.deleteExam.path}/${params.examId}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_EXAM) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_EXAM) });
        onError(error);
    }
}


const sagas = [
    takeLatest(defineActionLoading(GET_EXAM_LIST), getExamList),
    takeLatest(GET_EXAM_BY_ID, getExamById),
    takeLatest(GET_EXAM_CLIENT, getExamClient),
    takeLatest(GET_EXAM_ASSIGNMENT, getExamAssignment),
    takeLatest(GET_CLIENT_DO_EXAM, getClientDoExam),
    takeLatest(CREATE_EXAM, createExam),
    takeLatest(CREATE_CLIENT_DO_EXAM, createClientDoExam),
    takeLatest(CREATE_EXAM_SUBMIT, createExamSubmit),
    takeLatest(UPDATE_EXAM, updateExam),
    takeLatest(DELETE_EXAM, deleteExam)
]

export default sagas;