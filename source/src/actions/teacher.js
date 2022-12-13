import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('TEACHER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
	GET_TEACHER_LIST: defineAction('GET_TEACHER_LIST'),
	GET_TEACHER_BY_ID: defineAction('GET_TEACHER_BY_ID'),
	CREATE_TEACHER: defineAction('CREATE_TEACHER'),
	UPDATE_TEACHER: defineAction('UPDATE_TEACHER'),
	DELETE_TEACHER: defineAction('DELETE_TEACHER'),
	GET_MY_SUBJECTS_TEACHER: defineAction('GET_MY_SUBJECTS_TEACHER'),
};

export const actions = {
	getTeacherList: createActionWithLoading(actionTypes.GET_TEACHER_LIST),
	getTeacherById: createAction(actionTypes.GET_TEACHER_BY_ID),
	createTeacher: createAction(actionTypes.CREATE_TEACHER),
	updateTeacher: createAction(actionTypes.UPDATE_TEACHER),
	deleteTeacher: createActionWithLoading(actionTypes.DELETE_TEACHER),
	getMySubjectTeacher: createActionWithLoading(actionTypes.GET_MY_SUBJECTS_TEACHER),
};
