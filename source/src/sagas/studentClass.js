import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/studentClass';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    LIST_STUDENT_CLASS,
    ADD_STUDENT_CLASS,
    REMOVE_STUDENT_CLASS,
	GET_STUDENT_AUTOCOMPLETE
} = actionTypes;


function* listStudentClass({ payload: { params } }) {
	const apiParams = {
		...apiConfig.studentClass.listStudentClass,
		path: `${apiConfig.studentClass.listStudentClass.path}/${params.classId}`
	};
	const searchParams = { page: params.page, size: params.size };
	try {
		const result = yield call(sendRequest, apiParams, searchParams);
		yield put({
			type: defineActionSuccess(LIST_STUDENT_CLASS),
			studentClassData: result.responseData && result.responseData.data
		});
	} catch (error) {
		yield put({ type: defineActionFailed(LIST_STUDENT_CLASS) });
	}
}



function* addStudentClass({ payload: { params, onCompleted, onError } }) {
	const param = {};
	param.classId = parseInt(params[0].classId);	;
	param.studentIds = params.map(s => s.studentId)
	try {
		const apiParams = apiConfig.studentClass.addStudentClass
		const result = yield call(sendRequest, apiParams, param);
		handleApiResponse(result, onCompleted, onError);
	} catch (error) {
		onError(error);
	}
}


function* removeStudentClass({ payload: { params, onCompleted, onError } }) {
	const param = {};
	param.classId = parseInt(params[0].classId);
	param.studentIds = params.map(s => s.studentId)
	try {
        const result = yield call(sendRequest, apiConfig.studentClass.removeStudentClass, param);
        handleApiResponse(result, onCompleted, onError);
        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(REMOVE_STUDENT_CLASS) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(REMOVE_STUDENT_CLASS) });
        onError(error);
    }
}

function* getStudentAutocomplete({ payload: { params, onCompleted } }) {
	try {
        const { responseData, success } = yield call(sendRequest, apiConfig.studentClass.getStudentAutoComplete, params);
        if (success && responseData.result) {
            const totalElements = responseData.data?.totalElements;
            onCompleted && onCompleted(responseData.data?.data || [])
        }
    }
    catch (error) {
    }
}



const sagas = [
    takeLatest(defineActionLoading(LIST_STUDENT_CLASS), listStudentClass),
    takeLatest(ADD_STUDENT_CLASS, addStudentClass),
    takeLatest(defineActionLoading(REMOVE_STUDENT_CLASS), removeStudentClass),
	takeLatest(defineActionLoading(GET_STUDENT_AUTOCOMPLETE), getStudentAutocomplete),

]

export default sagas;