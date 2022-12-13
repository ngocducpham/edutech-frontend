import { call, takeLatest, put } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/account";
import { actions } from "../actions";
import apiConfig from "../constants/apiConfig";
import { APP } from "../constants";
// import { handleApiResponse } from '../utils/apiHelper';
import { UserTypes } from "../constants";
import Utils from "../utils";

const { LOGIN, LOGOUT, UPDATE_PROFILE, GET_PROFILE } = actionTypes;

const {
  defineActionLoading,
  defineActionSuccess,
  defineActionFailed,
} = reduxUtil;

function* login({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.account.login, { ...params, app: APP });
    const { success, responseData } = result;
    if (success && responseData.result) {
      let apiParams;
      if (responseData.data?.kind === UserTypes.ADMIN) {
        apiParams = apiConfig.account.getAdminProfile;
      } else if(responseData.data.kind === UserTypes.STUDENT){
        apiParams = apiConfig.student.getProfile;
      }
      else if(responseData.data.kind === UserTypes.TEACHER){
        apiParams = apiConfig.teacher.getProfile;
      }
      else if(responseData.data?.kind === UserTypes.STUDENT) {
        apiParams = apiConfig.student.getMyProfile
      }else {

      }
      const profileResult = yield call(
        sendRequest,
        apiParams,
        {},
        responseData.data.token
      );
      if (profileResult.success && profileResult.responseData.result) {
        let permissions = Utils.getPermissionFromToken(responseData.data.token);
        onCompleted({
          token: responseData.data.token,
          id: profileResult.responseData.data.id,
          avatar: profileResult.responseData.data.avatar || profileResult.responseData.data.avatarPath,
          logo: profileResult.responseData.data.logoPath,
          username: profileResult.responseData.data.username || responseData.data.username,
          fullName: profileResult.responseData.data.fullName,
          kind: profileResult.responseData.data.kind || responseData.data?.kind,
          isSuperAdmin: profileResult.responseData.data.isSuperAdmin,
          permissions,
        });
      } else {
        onError(responseData);
      }
    } else {
      onError(responseData);
    }
  } catch (error) {
    console.log(error);
    onError(error);
  }
}

function* logout() {
  try {
    yield call(sendRequest, apiConfig.account.logout);
  } catch (error) {
    // onError(error);
  }
}

function* getProfile({ payload }) {
  try {
    let result;
    if (actions.getUserData()?.kind === UserTypes.ADMIN) {
      result = yield call(sendRequest, apiConfig.account.getAdminProfile);
    } else if(actions.getUserData()?.kind === UserTypes.STUDENT){
        result = yield call(sendRequest, apiConfig.student.getProfile);
    } else if(actions.getUserData()?.kind === UserTypes.TEACHER){
        result = yield call(sendRequest, apiConfig.teacher.getProfile);
    }
    else if(actions.getUserData()?.kind === UserTypes.TEACHER){
      result = yield call(sendRequest, apiConfig.teacher.getProfile)
    }
    else if(actions.getUserData()?.kind === UserTypes.STUDENT){
      result = yield call(sendRequest, apiConfig.student.getMyProfile)
    }else{
      
    }
    yield put({
      type: defineActionSuccess(GET_PROFILE),
      data: result.responseData && result.responseData.data,
    });
    yield put(actions.hideFullScreenLoading());
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PROFILE) });
  }
}

function* updateProfile({ payload: { params, onCompleted, onError } }) {
  try {
    let userData;
    if (actions.getUserData()?.kind === UserTypes.ADMIN) {
      userData = yield call(sendRequest, apiConfig.account.updateProfileAdmin, params);
    } else if(actions.getUserData()?.kind === UserTypes.TEACHER){
      userData = yield call(sendRequest, apiConfig.teacher.updateProfile, params);
    }
    else if(actions.getUserData()?.kind === UserTypes.STUDENT){
      userData = yield call(sendRequest, apiConfig.student.updateProfile, params);
    }
    onCompleted(userData);
  } catch (error) {
    onError();
  }
}

const sagas = [
  takeLatest(defineActionLoading(LOGIN), login),
  takeLatest(LOGOUT, logout),
  takeLatest(GET_PROFILE, getProfile),
  takeLatest(defineActionLoading(UPDATE_PROFILE), updateProfile),
];

export default sagas;