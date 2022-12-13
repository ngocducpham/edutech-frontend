import { combineReducers } from 'redux';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';
import category from './category';
import news from './news';
import major from './major';
import subject from './subject';
import province from './province';
import teacher from './teacher';
import student from './student';
import teacherSubject from './teacherSubject';
import syllabus from './syllabus';
import chapter from './chapter';
import classv1 from './classv1';
import studentClass from './studentClass';
import assignment from './assignment';
import question from './question';
import lesson from './lesson';
import classNews  from './classNews';
import discuss from './discuss';
import assignmentClass from './assignmentClass';
import exam from './exam';
import answer from './answer';

const rootReducer = combineReducers({
	appCommon: appCommon.reducer,
	account: account.reducer,
	user: user.reducer,
	groupPermission: groupPermission.reducer,
	category: category.reducer,
	news: news.reducer,
	major: major.reducer,
	subject: subject.reducer,
	province: province.reducer,
	teacher: teacher.reducer,
	student: student.reducer,
	teacherSubject: teacherSubject.reducer,
	syllabus: syllabus.reducer,
	chapter: chapter.reducer,
	classv1: classv1.reducer,
	studentClass: studentClass.reducer,
	assignment: assignment.reducer,
	question: question.reducer,
	lesson: lesson.reducer,
	classNews: classNews.reducer,
	discuss: discuss.reducer,
	assignmentClass: assignmentClass.reducer,
	exam: exam.reducer,
	answer: answer.reducer
});

export default rootReducer;