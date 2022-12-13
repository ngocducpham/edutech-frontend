import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/answer';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ANSWER_LIST,
    GET_ANSWER_BY_ID,
    GET_ANSWER_ANSWER_LIST,
    GET_ANSWER_CLIENT_ANSWER_LIST,
    CREATE_CLIENT_ANSWER,
    UPDATE_CLIENT_ANSWER
} = actionTypes;


function* getAnswerList({ payload: { params } }) {

    const apiParams = apiConfig.answer.getAnswerList;
    try {
        const result = yield call(sendRequest, apiParams, params);
        yield put({
            type: defineActionSuccess(GET_ANSWER_LIST),
            answerListData: result.responseData && result.responseData.data,
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_ANSWER_LIST) });
    }
}

function* getAnswerById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.answer.getAnswerById,
            path: `${apiConfig.answer.getAnswerById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* getAnswerClientAnswerList({ payload: { params, onCompleted, onError } }) {
    if(params.examId){
        params.examId = params.examId
    }

    const apiParams = {
        ...apiConfig.answer.getAnswerClientAnswerList,
        path: `${apiConfig.answer.getAnswerClientAnswerList.path}/${params.examId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_ANSWER_CLIENT_ANSWER_LIST),
                    answerClientAnswerListData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* getAnswerAnswerList({ payload: { params, onCompleted, onError } }) {
    if(params.examId){
        params.examId = params.examId
    }

    const apiParams = {
        ...apiConfig.answer.getAnswerAnswerList,
        path: `${apiConfig.answer.getAnswerAnswerList.path}/${params.examId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data?.data);
                yield put({
                    type: defineActionSuccess(GET_ANSWER_ANSWER_LIST),
                    answerAnswerListData: responseData?.data?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}


function* createClientAnswer({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.answer.createAnswerClient;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}
function* updateClientAnswer({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.answer.createAnswerClient;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}



const sagas = [
    takeLatest(defineActionLoading(GET_ANSWER_LIST), getAnswerList),
    takeLatest(GET_ANSWER_BY_ID, getAnswerById),
    takeLatest(GET_ANSWER_ANSWER_LIST, getAnswerAnswerList),
    takeLatest(GET_ANSWER_CLIENT_ANSWER_LIST, getAnswerClientAnswerList),
    takeLatest(CREATE_CLIENT_ANSWER, createClientAnswer),
    takeLatest(UPDATE_CLIENT_ANSWER, updateClientAnswer),
]

export default sagas;