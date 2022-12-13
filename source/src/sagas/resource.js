import { call, takeLatest, takeEvery } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes } from '../actions/resource';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse, handleApiResponseEx } from '../utils/apiHelper';

const {
    MATERIALS_UPLOAD_SYLLABUS,
    MATERIALS_UPLOAD_CLASS,
    MATERIALS_UPLOAD_LESSON,
    ASSIGNMENT_UPLOAD
} = actionTypes;

function* materialsUploadSyllabus({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
			...apiConfig.resource.materialsUploadSyllabus,
			path: `${apiConfig.resource.materialsUploadSyllabus.path}/${params.syllabusId}`
		};
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* materialsUploadLesson({ payload: { params, onCompleted, onError } }) {
    try {
        const result = yield call(sendRequest, apiConfig.resource.materialsUploadLesson, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* materialsUploadClass({ payload: { params, onCompleted, onError } }) {
    try {
        const result = yield call(sendRequest, apiConfig.resource.materialsUploadClass, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* assignmentUpload({ payload: { params, onCompleted, onError } }) {
    try {
        const result = yield call(sendRequest, apiConfig.resource.assignmentUpload, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* teacherDeleteFileSyllabus({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
			...apiConfig.resource.teacherDeleteFileSyllabus,
			path: apiConfig.resource.teacherDeleteFileSyllabus.path + params.fileUrl
		};

        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

const sagas = [
    takeEvery(actionTypes.MATERIALS_UPLOAD_SYLLABUS, materialsUploadSyllabus),
    takeLatest(actionTypes.MATERIALS_UPLOAD_LESSON, materialsUploadLesson),
    takeLatest(actionTypes.MATERIALS_UPLOAD_CLASS, materialsUploadClass),
    takeLatest(actionTypes.ASSIGNMENT_UPLOAD, assignmentUpload),
    takeLatest(actionTypes.TEACHER_DELETE_FILE_SYLLABUS, teacherDeleteFileSyllabus)
]

export default sagas;