import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('QUESTION');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
	GET_QUESTION_LIST: defineAction('GET_QUESTION_LIST'),
	GET_QUESTION_BY_ID: defineAction('GET_QUESTION_BY_ID'),
	GET_QUESTION_CLIENT_ASSIGNMENT: defineAction('GET_QUESTION_CLIENT_ASSIGNMENT'),
	CREATE_QUESTION: defineAction('CREATE_QUESTION'),
	UPDATE_QUESTION: defineAction('UPDATE_QUESTION'),
	UPDATE_QUESTION_ASSIGNMENT: defineAction('UPDATE_QUESTION_ASSIGNMENT'),
	DELETE_QUESTION: defineAction('DELETE_QUESTION')};

export const actions = {
	getQuestionList: createActionWithLoading(actionTypes.GET_QUESTION_LIST),
	getQuestionById: createAction(actionTypes.GET_QUESTION_BY_ID),
	getQuestionClientAssignment: createAction(actionTypes.GET_QUESTION_CLIENT_ASSIGNMENT),
	createQuestion: createAction(actionTypes.CREATE_QUESTION),
	updateQuestion: createAction(actionTypes.UPDATE_QUESTION),
	updateQuestionAssignment: createAction(actionTypes.UPDATE_QUESTION_ASSIGNMENT),
	deleteQuestion: createActionWithLoading(actionTypes.DELETE_QUESTION),
};
