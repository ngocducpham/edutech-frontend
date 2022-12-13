import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/classNews';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

// const { GET_CATEGORY_LIST, GET_CATEGORY_BY_ID, UPDATE_CATEGORY, DELETE_CATEGORY, CREATE_CATEGORY } = actionTypes;

const { GET_NEWS_CLASS_LIST, CREATE_NEWS_CLASS, UPDATE_NEWS_CLASS, DELETE_NEWS_CLASS, UPLOAD_NEWS_IMAGE, GET_ALL_CLASS_NEWS } = actionTypes;

function* createClassNews({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.classNews.create;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* getClassNewsList({ payload: { params } }) {
	const apiParams = {
		...apiConfig.classNews.getList,
		path: apiConfig.classNews.getList.path + '/' + params.classId
	};
	const searchParams = { page: params.page, size: params.size };

	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_NEWS_CLASS_LIST),
			classNewsData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_NEWS_CLASS_LIST) });
	}
}

function* deleteClassNews({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.classNews.delete,
			path: `${apiConfig.classNews.delete.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* uploadImage({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.classNews.uploadImage,
			path: `${apiConfig.classNews.uploadImage.path}/${params.classId}`
		};
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* updateClassNews({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.classNews.update,
			path: `${apiConfig.classNews.update.path}/${params.id}`
		};
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}


function* getAllClassNews({ payload: { params } }) {
	const apiParams = {
		...apiConfig.classNews.getAll,
		path: apiConfig.classNews.getAll.path
	};
	const searchParams = { page: params.page, size: params.size };

	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_ALL_CLASS_NEWS),
			classNewsData: result.responseData && result.responseData.data.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_NEWS_CLASS_LIST) });
	}
}

/*

function* getCategoryList({ payload: { params } }) {
	const apiParams = apiConfig.category.getList;
	const searchParams = { page: params.page, size: params.size };

	if (params.categoryKind) {
		searchParams.categoryKind = params.categoryKind;
	}

	if (params.parentId) {
		searchParams.parentId = params.parentId;
	}

	if (params.search) {
		if (params.search.name) {
			searchParams.name = params.search.name;
		}
		if (params.search.status) {
			searchParams.status = params.search.status;
		}
	}
	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_CATEGORY_LIST),
			categoryData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_CATEGORY_LIST) });
	}
}

function* getCategoryById({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.category.getById,
			path: `${apiConfig.category.getById.path}/${params.id}`
		};
		const result = yield call(sendRequest, apiParams);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* createCategory({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.category.create;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* updateCategory({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.category.update;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* deleteCategory({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.category.delete,
			path: `${apiConfig.category.delete.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);

		if (!success || !responseData.result) yield put({ type: defineActionFailed(DELETE_CATEGORY) });
	} catch (error) {
		yield put({ type: defineActionFailed(DELETE_CATEGORY) });
		onError(error);
	}
}
*/

const sagas = [
	takeLatest(CREATE_NEWS_CLASS, createClassNews),
	takeLatest(defineActionLoading(GET_NEWS_CLASS_LIST), getClassNewsList),
	takeLatest(DELETE_NEWS_CLASS, deleteClassNews),
	takeLatest(UPLOAD_NEWS_IMAGE, uploadImage),
	takeLatest(UPDATE_NEWS_CLASS, updateClassNews),
	takeLatest(defineActionLoading(GET_ALL_CLASS_NEWS), getAllClassNews)
];

export default sagas;
