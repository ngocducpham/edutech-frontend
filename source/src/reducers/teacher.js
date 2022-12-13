import { actionTypes, reduxUtil } from '../actions/teacher';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } =
	reduxUtil;
const { GET_TEACHER_LIST, DELETE_TEACHER, GET_MY_SUBJECTS_TEACHER } = actionTypes;

const initialState = {
	teacherData: {},
	mySubjectTeacherData: {},
	tbTeacherLoading: false,
	tbmySubjectTeacherLoading: false,
};

const reducer = createReducer(
	{
		[defineActionLoading(GET_TEACHER_LIST)]: (state) => {
			return {
				...state,
				tbTeacherLoading: true
			};
		},
		[defineActionSuccess(GET_TEACHER_LIST)]: (state, { teacherData }) => {
			return {
				...state,
				teacherData,
				tbTeacherLoading: false
			};
		},
		[defineActionLoading(GET_MY_SUBJECTS_TEACHER)]: (state) => {
			return {
				...state,
				tbmySubjectTeacherLoading: true
			};
		},
		[defineActionSuccess(GET_MY_SUBJECTS_TEACHER)]: (state, { mySubjectTeacherData }) => {
			return {
				...state,
				mySubjectTeacherData,
				tbmySubjectTeacherLoading: false
			};
		},
		[defineActionLoading(DELETE_TEACHER)]: (state) => {
			return {
				...state,
				tbTeacherLoading: true
			};
		},
		[defineActionFailed(DELETE_TEACHER)]: (state) => {
			return {
				...state,
				tbTeacherLoading: false
			};
		}
	},
	initialState
);

export default {
	reducer
};
