import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/discuss';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;
const { GET_DISCUSS_LIST, GET_DISCUSS_CLIENT, CREATE_DISSCUSS_CLIENT, DELELE_DISCUSS, GET_LESSON_DISCUSS_CLIENT, GET_CLASS_DISCUSS_CLIENT, GET_COMMENT_LIST_CLIENT, CREATE_COMMENT_CLIENT, UPDATE_COMMENT_CLIENT, DELETE_COMMENT_CLIENT, GET_COMMENT_CLIENT, GET_CHILD_COMMENT_LIST } = actionTypes;

function* getDiscussList({ payload: { params, onCompleted, onError } }) {
	const apiParams = apiConfig.discuss.getDiscussList
	try {
		const result = yield call(sendRequest, apiParams, params);
		yield put({
			type: defineActionSuccess(GET_DISCUSS_LIST),
			discussListData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_DISCUSS_LIST) });
	}
}

function* getLessonDiscussListClient({ payload: { params } }) {
	if(params.classId){
        params.classId = params.classId
    }
	if(params.lessonId){
        params.lessonId = params.lessonId
    }
    const apiParams = {
        ...apiConfig.discuss.getLessonDiscussListClient,
        path: `${apiConfig.discuss.getLessonDiscussListClient.path}/${params.classId}/${params.lessonId}`
    }
	try {
		const result = yield call(sendRequest, apiParams, params);
		yield put({
			type: defineActionSuccess(GET_LESSON_DISCUSS_CLIENT),
			lessonDiscussListData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_LESSON_DISCUSS_CLIENT) });
	}
}

function* getClassDiscussListClient({ payload: { params } }) {
	if(params.classId){
        params.classId = params.classId
    }
    const apiParams = {
        ...apiConfig.discuss.getClassDiscussListClient,
        path: `${apiConfig.discuss.getClassDiscussListClient.path}/${params.classId}`
    }
	try {
		const result = yield call(sendRequest, apiParams, params);
		yield put({
			type: defineActionSuccess(GET_CLASS_DISCUSS_CLIENT),
			classDiscussListData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_CLASS_DISCUSS_CLIENT) });
	}
}

function* getDiscussClient({ payload: { params, onCompleted, onError } }) {
    if(params.discussId){
        params.discussId = params.discussId
    }
    const apiParams = {
        ...apiConfig.discuss.getDiscussClient,
        path: `${apiConfig.discuss.getDiscussClient.path}/${params.discussId}`
    }
    try {
        const result = yield call(sendRequest, apiParams);
        const { success, responseData } = result;
            if(success && responseData.result) {
                onCompleted && onCompleted(responseData?.data);
                yield put({
                    type: defineActionSuccess(GET_DISCUSS_CLIENT),
                    discussClientData: responseData?.data
                })
            }else
                onError(responseData);
            }
    catch (error) {
        onError(error)
    }
}

function* createDiscussClient({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.discuss.createDiscussClient;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}



function* deleteDiscuss({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.discuss.deleteDiscussClient,
			path: `${apiConfig.discuss.deleteDiscussClient.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}




function* getCommentListClient({ payload: { params } }) {
	if(params.discussId){
        params.discussId = params.discussId
    }
	
	const apiParams = {
		...apiConfig.comment.getCommentListClient,
		path: `${apiConfig.comment.getCommentListClient.path}/${params.discussId}`
	}
	try {
		const result = yield call(sendRequest, apiParams);
		yield put({
			type: defineActionSuccess(GET_COMMENT_LIST_CLIENT),
			commentListData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_COMMENT_LIST_CLIENT) });
	}
}

function* getChildCommentList({ payload: { params } }) {
	if(params.commentId){
        params.commentId = params.commentId
    }
	const searchParams = { page: params.page, size: params.size };
	const apiParams = {
		...apiConfig.comment.getChildCommentList,
		path: `${apiConfig.comment.getChildCommentList.path}/${params.commentId}`
	}
	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_CHILD_COMMENT_LIST),
			childCommentListData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_CHILD_COMMENT_LIST) });
	}
}

function* getCommentClient({ payload: { params, onCompleted, onError } }) {
	if(params.id){
        params.commentId = params.id
    }
    try {
        const apiParams = {
            ...apiConfig.comment.getCommentClient,
            path: `${apiConfig.comment.getCommentClient.path}/${params.commentId}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}


function* createCommentClient({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.comment.createCommentClient;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}


function* updateCommentClient({ payload: { params, onCompleted, onError } }) {
    if(params.commentId){
        params.commentId = params.commentId
    }
	try {
        const apiParams = {
            ...apiConfig.comment.updateCommentClient,
            path: `${apiConfig.comment.updateCommentClient.path}/${params.commentId}`
        }
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}



function* deleteCommentClient({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.comment.deleteCommentClient,
			path: `${apiConfig.comment.deleteCommentClient.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}



const sagas = [
	takeLatest(CREATE_DISSCUSS_CLIENT, createDiscussClient),
	takeLatest(defineActionLoading(GET_DISCUSS_LIST), getDiscussList),
	takeLatest(defineActionLoading(GET_LESSON_DISCUSS_CLIENT), getLessonDiscussListClient),
	takeLatest(defineActionLoading(GET_CLASS_DISCUSS_CLIENT), getClassDiscussListClient),
	takeLatest(GET_DISCUSS_CLIENT, getDiscussClient),
	takeLatest(DELELE_DISCUSS, deleteDiscuss),
	takeLatest(defineActionLoading(GET_COMMENT_LIST_CLIENT), getCommentListClient),
	takeLatest(defineActionLoading(GET_CHILD_COMMENT_LIST), getChildCommentList),
	takeLatest(GET_COMMENT_CLIENT, getCommentClient),
    takeLatest(CREATE_COMMENT_CLIENT, createCommentClient),
	takeLatest(UPDATE_COMMENT_CLIENT, updateCommentClient),
	takeLatest(defineActionLoading(DELETE_COMMENT_CLIENT), deleteCommentClient)
];

export default sagas;
