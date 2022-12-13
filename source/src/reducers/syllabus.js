import { actionTypes, reduxUtil } from '../actions/syllabus';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } =
	reduxUtil;
const { GET_SYLLABUS_LIST, DELETE_SYLLABUS, GET_SYLLABUS_BY_ID, GET_CHAPTER_LESSON_CLIENT } = actionTypes;

const initialState = {
	syllabusData: {},
	chapterLessonClientData: [],
	tbSyllabusLoading: false,
};

const reducer = createReducer(
	{
		[defineActionLoading(GET_SYLLABUS_LIST)]: (state) => {
			return {
				...state,
				tbSyllabusLoading: true
			};
		},
		[defineActionSuccess(GET_SYLLABUS_LIST)]: (state, { syllabusData }) => {
			return {
				...state,
				syllabusData,
				tbSyllabusLoading: false
			};
		},
		
		[defineActionLoading(DELETE_SYLLABUS)]: (state) => {
			return {
				...state,
				tbSyllabusLoading: true
			};
		},
		[defineActionSuccess(GET_CHAPTER_LESSON_CLIENT)]: (state, { data }) => {
			return {
				...state,
				chapterLessonClientData: data,
			}
		},
		[defineActionFailed(DELETE_SYLLABUS)]: (state) => {
			return {
				...state,
				tbSyllabusLoading: false
			};
		}
	},
	initialState
);

export default {
	reducer
};
