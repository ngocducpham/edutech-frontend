import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';


import { actionTypes, reduxUtil } from '../actions/teacherSubject';

import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
	GET_TEACHER_SUBJECT_LIST,
    ADD_TEACHER_SUBJECT,
    REMOVE_TEACHER_SUBJECT,
	GET_SUBJECT_AUTOCOMPLETE,
	GET_MY_SUBJECTS
} = actionTypes;

function* getTeacherSubjectList({ payload: { params } }) {
	const apiParams = apiConfig.teacherSubject.getList;
	const searchParams = { page: params.page, size: params.size };
	if(params.teacherId){
		searchParams.teacherId = params.teacherId
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
			type: defineActionSuccess(GET_TEACHER_SUBJECT_LIST),
			teacherSubjectData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(GET_TEACHER_SUBJECT_LIST) });
	}
}



function* addTeacherSubject({ payload: { params, onCompleted, onError } }) {
	const param = {};
	param.teacherId = params[0].teacherId;
	param.subjectIds = params.map(d => d.subjectId)
	try {
		const apiParams = apiConfig.teacherSubject.add
		const result = yield call(sendRequest, apiParams, param);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}

function* getSubjectAutocomplete({ payload: { params, onCompleted } }) {
	try {
        const { responseData, success } = yield call(sendRequest, apiConfig.teacherSubject.getSubjectAutoComplete, params);
        if (success && responseData.result) {
            const totalElements = responseData.data?.totalElements;
            onCompleted && onCompleted(responseData.data?.data || [])
        }
    }
    catch (error) {
    }
}


function* removeTeacherSubject({ payload: { params, onCompleted, onError } }) {
	const param = {};
	param.teacherId = params[0].teacherId;	
	param.subjectIds = params.map(d => d.id)
	try {
        const result = yield call(sendRequest, apiConfig.teacherSubject.remove, param);
        handleApiResponse(result, onCompleted, onError);
        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(REMOVE_TEACHER_SUBJECT) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(REMOVE_TEACHER_SUBJECT) });
        onError(error);
    }
}



const sagas = [
	takeLatest(defineActionLoading(GET_TEACHER_SUBJECT_LIST), getTeacherSubjectList),
	takeLatest(defineActionLoading(GET_SUBJECT_AUTOCOMPLETE), getSubjectAutocomplete),
	takeLatest(ADD_TEACHER_SUBJECT, addTeacherSubject),
	takeLatest(defineActionLoading(REMOVE_TEACHER_SUBJECT), removeTeacherSubject),
];


export default sagas;
