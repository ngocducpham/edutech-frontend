import { actionTypes, reduxUtil } from "../actions/province";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_PROVINCE_LIST,
    DELETE_PROVINCE,
    GET_PROVINCE_COMBOBOX_LIST,
    GET_DISTRICT_COMBOBOX_LIST,
    GET_COMMUNE_COMBOBOX_LIST
} = actionTypes;

const initialState = {
    provinceData: [],
    provinceComboboxData: [],
    districtComboboxData: [],
    communeComboboxData: [],
    tbProvinceLoading: false,
}

const reducer = createReducer({
    [defineActionLoading(GET_PROVINCE_LIST)]: (state) => {
        return {
            ...state,
            tbProvinceLoading: true,
        }
    },
    [defineActionSuccess(GET_PROVINCE_LIST)]: (state, { provinceData }) => {
        return {
            ...state,
            provinceData,
            tbProvinceLoading: false,
        }
    },
    [defineActionSuccess(GET_PROVINCE_COMBOBOX_LIST)]: (state, { provinceComboboxData }) => {
        return {
            ...state,
            provinceComboboxData,
        }
    },
    [defineActionSuccess(GET_DISTRICT_COMBOBOX_LIST)]: (state, { districtComboboxData }) => {
        return {
            ...state,
            districtComboboxData,
        }
    },
    [defineActionSuccess(GET_COMMUNE_COMBOBOX_LIST)]: (state, { communeComboboxData }) => {
        return {
            ...state,
            communeComboboxData,
        }
    },
    [defineActionLoading(DELETE_PROVINCE)]: (state) => {
        return {
            ...state,
            tbProvinceLoading: true,
        }
    },
    [defineActionFailed(DELETE_PROVINCE)]: (state) => {
        return {
            ...state,
            tbProvinceLoading: DELETE_PROVINCE,
        }
    },
    initialState
})

export default {
    reducer
};