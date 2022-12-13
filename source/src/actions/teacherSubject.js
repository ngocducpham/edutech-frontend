
import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('TEACHER_SUBJECT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
	GET_TEACHER_SUBJECT_LIST: defineAction('GET_TEACHER_SUBJECT_LIST'),
	ADD_TEACHER_SUBJECT: defineAction('ADD_TEACHER_SUBJECT'),
	REMOVE_TEACHER_SUBJECT: defineAction('REMOVE_TEACHER_SUBJECT'),
	GET_SUBJECT_AUTOCOMPLETE: defineAction('GET_SUBJECT_AUTOCOMPLETE'),
};

export const actions = {
	getTeacherSubjectList: createActionWithLoading(actionTypes.GET_TEACHER_SUBJECT_LIST),
	addTeacherSubject: createAction(actionTypes.ADD_TEACHER_SUBJECT),
	removeTeacherSubject: createActionWithLoading(actionTypes.REMOVE_TEACHER_SUBJECT),
	getSubjectAutocomplete: createActionWithLoading(actionTypes.GET_SUBJECT_AUTOCOMPLETE),
	
};