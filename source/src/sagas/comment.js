// import { call, put, takeLatest } from 'redux-saga/effects';

// import { sendRequest } from '../services/apiService';
// import { actionTypes, reduxUtil } from '../actions/comment';
// import apiConfig from '../constants/apiConfig';
// import { handleApiResponse } from '../utils/apiHelper';

// const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;
// const { GET_COMMENT_LIST_CLIENT, CREATE_COMMENT_CLIENT, UPDATE_COMMENT_CLIENT, DELETE_COMMENT_CLIENT } = actionTypes;

// function* getCommentListClient({ payload: { params } }) {
// 	const apiParams = apiConfig.comment.getCommentListClient
// 	try {
// 		const result = yield call(sendRequest, apiParams, params);
// 		yield put({
// 			type: defineActionSuccess(GET_COMMENT_LIST_CLIENT),
// 			commentListData: result.responseData && result.responseData.data.data
// 		});
// 	} catch (error) {
// 		yield put({ type: defineActionFailed(GET_COMMENT_LIST_CLIENT) });
// 	}
// }


// function* createCommentClient({ payload: { params, onCompleted, onError } }) {
// 	try {
// 		const apiParams = apiConfig.comment.createCommentClient;
// 		const result = yield call(sendRequest, apiParams, params);
// 		handleApiResponse(result, onCompleted, onError);
// 	} catch (error) {
// 		onError(error);
// 	}
// }


// function* updateCommentClient({ payload: { params, onCompleted, onError } }) {
//     if(params.commentId){
//         params.commentId = params.commentId
//     }
// 	try {
//         const apiParams = {
//             ...apiConfig.comment.updateCommentClient,
//             path: `${apiConfig.comment.updateCommentClient.path}/${params.commentId}`
//         }
// 		const result = yield call(sendRequest, apiParams, params);
// 		handleApiResponse(result, onCompleted, onError);
// 	} catch (error) {
// 		onError(error);
// 	}
// }



// function* deleteCommentClient({ payload: { params, onCompleted, onError } }) {
// 	try {
// 		const apiParams = {
// 			...apiConfig.comment.deleteCommentClient,
// 			path: `${apiConfig.comment.deleteCommentClient.path}/${params.id}`
// 		};
// 		const { success, responseData } = yield call(sendRequest, apiParams);
// 		handleApiResponse({ success, responseData }, onCompleted, onError);
// 	} catch (error) {
// 		onError(error);
// 	}
// }



// const sagas = [
// 	takeLatest(defineActionLoading(GET_COMMENT_LIST_CLIENT), getCommentListClient),
//     takeLatest(CREATE_COMMENT_CLIENT, createCommentClient),
// 	takeLatest(UPDATE_COMMENT_CLIENT, updateCommentClient),
// 	takeLatest(defineActionLoading(DELETE_COMMENT_CLIENT), deleteCommentClient)
// ];

// export default sagas;
