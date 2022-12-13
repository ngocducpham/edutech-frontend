import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/province';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';
import { ProvinceKinds } from '../constants';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_PROVINCE_LIST,
    GET_PROVINCE_BY_ID,
    UPDATE_PROVINCE,
    DELETE_PROVINCE,
    CREATE_PROVINCE,
    GET_PROVINCE_COMBOBOX_LIST,
    GET_DISTRICT_COMBOBOX_LIST,
    GET_COMMUNE_COMBOBOX_LIST
} = actionTypes;


function* getProvinceList({ payload: { params } }) {
    const apiParams = apiConfig.province.getList;
    const searchParams = { page: params.page, size: params.size };
    
    if(params.kind){
        searchParams.kind = params.kind
    }
    if(!params.parentId && params.parentId !== 0){
        delete params.parentId
    }
    if(params.parentId || params.parentId === 0){
        searchParams.parentId = params.parentId
    }

    if (params.search) {
        if (params.search.provinceName) {
            searchParams.provinceName = params.search.provinceName
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_PROVINCE_LIST),
            provinceData: result.responseData && 
            {
                ...result.responseData.data,
                kind: params.kind,
                parentId: params.parentId
            }
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_PROVINCE_LIST) });
    }
}

function* getProvinceById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.province.getById,
            path: `${apiConfig.province.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* createProvince({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.province.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* updateProvince({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.province.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch (error) {
        onError(error);
    }
}

function* deleteProvince({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.province.delete,
            path: `${apiConfig.province.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if (!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_PROVINCE) });
    }
    catch (error) {
        yield put({ type: defineActionFailed(DELETE_PROVINCE) });
        onError(error);
    }
}

function* getProvinceComboboxList({payload: {params}}) {
    const apiParams = apiConfig.province.getAutoComplete;
    try {
        const result = yield call(sendRequest, apiParams, {kind: ProvinceKinds.province.name});
        yield put({
            type: defineActionSuccess(GET_PROVINCE_COMBOBOX_LIST),
            provinceComboboxData: result.responseData && 
            {
                ...result.responseData.data,
            }
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_PROVINCE_COMBOBOX_LIST) });
    }
}

function* getDistrictComboboxList({payload: {params}}) {
    const apiParams = apiConfig.province.getAutoComplete;
    const searchParams = {}
    if(params && params.parentId){
        searchParams.parentId = params.parentId
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_DISTRICT_COMBOBOX_LIST),
            districtComboboxData: result.responseData && 
            {
                ...result.responseData.data,
            }
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_DISTRICT_COMBOBOX_LIST) });
    }
}

function* getCommuneComboboxList({payload: {params}}) {
    const apiParams = apiConfig.province.getAutoComplete;
    const searchParams = {}
    if(params && params.parentId){
        searchParams.parentId = params.parentId
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_COMMUNE_COMBOBOX_LIST),
            communeComboboxData: result.responseData && 
            {
                ...result.responseData.data,
            }
        });
    }
    catch (error) {
        yield put({ type: defineActionFailed(GET_COMMUNE_COMBOBOX_LIST) });
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_PROVINCE_LIST), getProvinceList),
    takeLatest(GET_PROVINCE_BY_ID, getProvinceById),
    takeLatest(UPDATE_PROVINCE, updateProvince),
    takeLatest(CREATE_PROVINCE, createProvince),
    takeLatest(defineActionLoading(DELETE_PROVINCE), deleteProvince),
    takeLatest(GET_PROVINCE_COMBOBOX_LIST, getProvinceComboboxList),
    takeLatest(GET_DISTRICT_COMBOBOX_LIST, getDistrictComboboxList),
    takeLatest(GET_COMMUNE_COMBOBOX_LIST, getCommuneComboboxList)
]

export default sagas;