import { actionTypes, reduxUtil } from '../actions/student';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } =
	reduxUtil;
const { GET_STUDENT_LIST, DELETE_STUDENT, GET_MAJOR_AUTOCOMPLETE_STUDENT } = actionTypes;

const initialState = {
	studentData: {},
	majorAutocompleteData: {},
	tbStudentLoading: false
};

const reducer = createReducer(
	{
		[defineActionLoading(GET_STUDENT_LIST)]: (state) => {
			return {
				...state,
				tbStudentLoading: true
			};
		},
		[defineActionSuccess(GET_STUDENT_LIST)]: (state, { studentData }) => {
			return {
				...state,
				studentData,
				tbStudentLoading: false
			};
		},
		[defineActionSuccess(GET_MAJOR_AUTOCOMPLETE_STUDENT)]: (state, { majorAutocompleteData }) => {
			return {
				...state,
				majorAutocompleteData,
			};
		},
		[defineActionLoading(DELETE_STUDENT)]: (state) => {
			return {
				...state,
				tbStudentLoading: true
			};
		},
		[defineActionFailed(DELETE_STUDENT)]: (state) => {
			return {
				...state,
				tbStudentLoading: false
			};
		}
	},
	initialState
);

export default {
	reducer
};
