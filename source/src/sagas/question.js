import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/question';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_QUESTION_LIST,
    GET_QUESTION_BY_ID,
    GET_QUESTION_CLIENT_ASSIGNMENT,
    UPDATE_QUESTION,
    UPDATE_QUESTION_ASSIGNMENT,
    DELETE_QUESTION,
    CREATE_QUESTION,
} = actionTypes;


function* getQuestionList({ payload: { params } }) {

    const apiParams = apiConfig.question.getList;
    const searchParams = { page: 0, size: 1000 };
    if(params.assignmentId){
        searchParams.assignmentId = params.assignmentId
    }
    if (params.search) {
		if (params.search.content) {
			searchParams.content = params.search.content;
		}

        if (params.search.type) {
			searchParams.type = params.search.type;
		}
	}
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_QUESTION_LIST),
            questionData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_QUESTION_LIST) });
    }
}

function* getQuestionById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.question.getById,
            path: `${apiConfig.question.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* getQuestionClientAssignment({ payload: { params, onCompleted, onError } }) {
    if(params.assignmentId){
        params.assignmentId = params.assignmentId
    }

    const apiParams = {
        ...apiConfig.question.getQuestionClientAssignment,
        path: `${apiConfig.question.getQuestionClientAssignment.path}/${params.assignmentId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_QUESTION_CLIENT_ASSIGNMENT),
                    questionClientData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}


function* createQuestion({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.question.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateQuestion({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.question.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateQuestionAssignment({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.question.updateQuestionAssignment;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteQuestion({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.question.delete,
            path: `${apiConfig.question.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_QUESTION) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_QUESTION) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_QUESTION_LIST), getQuestionList),
    takeLatest(GET_QUESTION_BY_ID, getQuestionById),
    takeLatest(GET_QUESTION_CLIENT_ASSIGNMENT, getQuestionClientAssignment),
    takeLatest(UPDATE_QUESTION, updateQuestion),
    takeLatest(UPDATE_QUESTION_ASSIGNMENT, updateQuestionAssignment),
    takeLatest(CREATE_QUESTION, createQuestion),
    takeLatest(defineActionLoading(DELETE_QUESTION), deleteQuestion),
]

export default sagas;