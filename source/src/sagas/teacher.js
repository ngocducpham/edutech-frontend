import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';



import { actionTypes, reduxUtil } from '../actions/teacher';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
	GET_TEACHER_LIST,
	GET_TEACHER_BY_ID,
	UPDATE_TEACHER,
	DELETE_TEACHER,
	CREATE_TEACHER,
	GET_MY_SUBJECTS_TEACHER
} = actionTypes;

function* getTeacherList({ payload: { params } }) {
	const apiParams = apiConfig.teacher.getList;
	const searchParams = { page: params.page, size: params.size };

	if (params.search) {
		if (params.search.fullName) {
			searchParams.fullName = params.search.fullName;
		}

        if (params.search.status) {
			searchParams.status = params.search.status;
		}
	}

	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_TEACHER_LIST),
			teacherData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_TEACHER_LIST) });
	}
}



function* getTeacherById({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.teacher.getById,
			path: `${apiConfig.teacher.getById.path}/${params.id}`
		};
		const result = yield call(sendRequest, apiParams);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* createTeacher({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.teacher.create;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* updateTeacher({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.teacher.update;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* deleteTeacher({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.teacher.delete,
			path: `${apiConfig.teacher.delete.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);

		if (!success || !responseData.result)
			yield put({ type: defineActionFailed(DELETE_TEACHER) });
	} catch (error) {
		yield put({ type: defineActionFailed(DELETE_TEACHER) });
		onError(error);
	}
}

function* getMySubjectTeacher({ payload: { params } }) {
	const apiParams = apiConfig.teacher.getMySubject
	const searchParams = { page: params.page, size: params.size };
	if (params.search) {
		if (params.search.name) {
			searchParams.name = params.search.name;
		}
		if (params.search.code) {
			searchParams.code = params.search.code;
		}
	}
	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(GET_MY_SUBJECTS_TEACHER),
			mySubjectTeacherData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_MY_SUBJECTS_TEACHER) });
	}
}



const sagas = [
	takeLatest(defineActionLoading(GET_TEACHER_LIST), getTeacherList),
	takeLatest(GET_TEACHER_BY_ID, getTeacherById),
	takeLatest(UPDATE_TEACHER, updateTeacher),
	takeLatest(CREATE_TEACHER, createTeacher),
	takeLatest(defineActionLoading(DELETE_TEACHER), deleteTeacher),
	takeLatest(defineActionLoading(GET_MY_SUBJECTS_TEACHER), getMySubjectTeacher)
];


export default sagas;
