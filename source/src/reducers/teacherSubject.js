import { actionTypes, reduxUtil } from '../actions/teacherSubject';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const { GET_TEACHER_SUBJECT_LIST, REMOVE_TEACHER_SUBJECT, GET_SUBJECT_AUTOCOMPLETE,GET_MY_SUBJECTS } = actionTypes;

const initialState = {
	teacherSubjectData: {},
	subjectAutocompleteData: {},
	tbTeacherSubjectLoading: false
};

const reducer = createReducer(
	{
		[defineActionLoading(GET_TEACHER_SUBJECT_LIST)]: (state) => {
			return {
				...state,
				tbTeacherSubjectLoading: true
			};
		},
		[defineActionSuccess(GET_TEACHER_SUBJECT_LIST)]: (state, { teacherSubjectData }) => {
			return {
				...state,
				teacherSubjectData,
				tbTeacherSubjectLoading: false
			};
		},
		[defineActionSuccess(GET_SUBJECT_AUTOCOMPLETE)]: (state, { subjectAutocompleteData }) => {
			return {
				...state,
				subjectAutocompleteData,
			};
		},
		[defineActionLoading(REMOVE_TEACHER_SUBJECT)]: (state) => {
			return {
				...state,
				tbTeacherSubjectLoading: true
			};
		},
		[defineActionFailed(REMOVE_TEACHER_SUBJECT)]: (state) => {
			return {
				...state,
				tbTeacherSubjectLoading: false
			};
		}
	},
	initialState
);

export default {
	reducer
};
