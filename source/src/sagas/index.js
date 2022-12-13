import { all } from 'redux-saga/effects';
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
import resource from './resource';
import lesson from './lesson';
import classNews from './classNews';
import discuss from './discuss';
import assignmentClass from './assignmentClass';
import exam from './exam';
import answer from './answer';

const sagas = [
	...appCommon,
	...account,
	...user,
	...groupPermission,
	...category,
	...news,
	...major,
	...subject,
	...province,
	...teacher,
	...student,
	...teacherSubject,
	...syllabus,
	...chapter,
	...classv1,
	...studentClass,
	...assignment,
	...question,
	...resource,
	...lesson,
	...classNews,
	...discuss,
	...assignmentClass,
	...exam,
	...answer
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
