import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('STUDENT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
	GET_STUDENT_LIST: defineAction('GET_STUDENT_LIST'),
	GET_STUDENT_BY_ID: defineAction('GET_STUDENT_BY_ID'),
	CREATE_STUDENT: defineAction('CREATE_STUDENT'),
	UPDATE_STUDENT: defineAction('UPDATE_STUDENT'),
	DELETE_STUDENT: defineAction('DELETE_STUDENT'),
	GET_MAJOR_AUTOCOMPLETE_STUDENT: defineAction('GET_MAJOR_AUTOCOMPLETE_STUDENT')
};

export const actions = {
	getStudentList: createActionWithLoading(actionTypes.GET_STUDENT_LIST),
	getStudentById: createAction(actionTypes.GET_STUDENT_BY_ID),
	createStudent: createAction(actionTypes.CREATE_STUDENT),
	updateStudent: createAction(actionTypes.UPDATE_STUDENT),
	deleteStudent: createActionWithLoading(actionTypes.DELETE_STUDENT),
	getMajorAutoCompleteStudent: createActionWithLoading(actionTypes.GET_MAJOR_AUTOCOMPLETE_STUDENT)
};
