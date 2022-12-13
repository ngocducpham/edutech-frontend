import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';

import { AppConstants, StorageKeys } from '../constants';
import { showErrorMessage } from '../services/notifyService';


import { actionTypes, reduxUtil } from '../actions/student';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
	GET_STUDENT_LIST,
	GET_STUDENT_BY_ID,
	UPDATE_STUDENT,
	DELETE_STUDENT,
	CREATE_STUDENT,
	GET_MAJOR_AUTOCOMPLETE_STUDENT
} = actionTypes;

function* getStudentList({ payload: { params } }) {
	const apiParams = apiConfig.student.getList;
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
			type: defineActionSuccess(GET_STUDENT_LIST),
			studentData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_STUDENT_LIST) });
	}
}

function* getMajorAutoCompleteStudent({ payload: { params } }) {
    const apiParams = apiConfig.student.getMajorAutoCompleteStudent;

    try {
        const result = yield call(sendRequest, apiParams, { params });
        yield put({
            type: defineActionSuccess(GET_MAJOR_AUTOCOMPLETE_STUDENT),
            majorAutocompleteData: result.responseData && {
                ...result.responseData.data,
            },

        })
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_MAJOR_AUTOCOMPLETE_STUDENT) });
    }
}


function* getStudentById({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.student.getById,
			path: `${apiConfig.student.getById.path}/${params.id}`
		};
		const result = yield call(sendRequest, apiParams);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* createStudent({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.student.create;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* updateStudent({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = apiConfig.student.update;
		const result = yield call(sendRequest, apiParams, params);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* deleteStudent({ payload: { params, onCompleted, onError } }) {
	try {
		const apiParams = {
			...apiConfig.student.delete,
			path: `${apiConfig.student.delete.path}/${params.id}`
		};
		const { success, responseData } = yield call(sendRequest, apiParams);
		handleApiResponse({ success, responseData }, onCompleted, onError);

		if (!success || !responseData.result)
			yield put({ type: defineActionFailed(DELETE_STUDENT) });
	} catch (error) {
		yield put({ type: defineActionFailed(DELETE_STUDENT) });
		onError(error);
	}
}

const sagas = [
	takeLatest(defineActionLoading(GET_STUDENT_LIST), getStudentList),
	takeLatest(defineActionLoading(GET_MAJOR_AUTOCOMPLETE_STUDENT), getMajorAutoCompleteStudent),
	takeLatest(GET_STUDENT_BY_ID, getStudentById),
	takeLatest(UPDATE_STUDENT, updateStudent),
	takeLatest(CREATE_STUDENT, createStudent),
	takeLatest(defineActionLoading(DELETE_STUDENT), deleteStudent)
];


export default sagas;
