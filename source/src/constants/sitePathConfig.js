import apiConfig from './apiConfig';
import { actions } from '../actions';
import { UserTypes } from '.';

export const sitePathConfig = {
	login: {
		path: '/login'
	},
	profile: {
		path: '/profile'
	},
	admin: {
		path: '/admins',
		permissions: [
			apiConfig.user.getAdminList.path,
			apiConfig.user.getAdminById.path,
			apiConfig.user.createAdmin.path,
			apiConfig.user.updateAdmin.path,
			apiConfig.user.deleteAdmin.path
		]
	},

	forbidden: {
		path: '/forbidden'
	},
	groupPermission: {
		path: '/groupPermission',
		permissions: [
			apiConfig.groupPermission.getList.path,
			apiConfig.groupPermission.getById.path,
			apiConfig.groupPermission.create.path,
			apiConfig.groupPermission.update.path,
			'not_have_delete',
			apiConfig.groupPermission.getPermissionList.path
		]
	},

	category: {
		path: '/category',
		permissions: [
			apiConfig.category.getList.path,
			apiConfig.category.getById.path,
			apiConfig.category.create.path,
			apiConfig.category.update.path,
			apiConfig.category.delete.path
		]
	},
	news: {
		path: '/news',
		permissions: [
			apiConfig.news.getList.path,
			apiConfig.news.getById.path,
			apiConfig.news.create.path,
			apiConfig.news.update.path,
			apiConfig.news.delete.path
		]
	},
	major: {
		path: '/major',
		permissions: [
			apiConfig.major.getList.path,
			apiConfig.major.getById.path,
			apiConfig.major.create.path,
			apiConfig.major.update.path,
			apiConfig.major.delete.path
		]
	},
	subject: {
		path: '/subject',
		permissions: [
			apiConfig.subject.getList.path,
			apiConfig.subject.getById.path,
			apiConfig.subject.create.path,
			apiConfig.subject.update.path,
			apiConfig.subject.delete.path,
			apiConfig.subject.getAutoComplete.path
		]
	},
	province: {
		path: '/province',
		permissions: [
			apiConfig.province.getList.path,
			apiConfig.province.getById.path,
			apiConfig.province.create.path,
			apiConfig.province.update.path,
			apiConfig.province.delete.path,
			apiConfig.province.getAutoComplete.path
		]
	},
	teacher: {
		path: '/teacher',
		childrenKeys: ['/teacherSubject'],
		permissions: [
			apiConfig.teacher.getList.path,
			apiConfig.teacher.getById.path,
			apiConfig.teacher.create.path,
			apiConfig.teacher.update.path,
			apiConfig.teacher.delete.path,
			apiConfig.teacher.getProfile.path
		],
		siteConfig: {
            contentClass: 'teacher-subject-site',
        }
	},
	teacherMySubject:{
		path: '/my-subject',
		childrenKeys: ['/syllabus', '/chapter', '/lesson','/assignment','/question','/questionEssay'],
		permissions: [
			apiConfig.teacher.getMySubject.path
		]
	},
	student: {
		path: '/student',
		permissions: [
			apiConfig.student.getList.path,
			apiConfig.student.getById.path,
			apiConfig.student.create.path,
			apiConfig.student.update.path,
			apiConfig.student.delete.path,
			apiConfig.student.getMajorAutoCompleteStudent.path,
			apiConfig.student.getProfile.path
		]
	},
	teacherSubject: {
		path: '/teacherSubject',
		permissions: [
			apiConfig.teacherSubject.getList.path,
			apiConfig.teacherSubject.add.path,
			apiConfig.teacherSubject.remove.path,
			apiConfig.teacherSubject.getSubjectAutoComplete.path
		],
		siteConfig: {
            contentClass: 'teacher-subject-site',
        }
	},
	syllabus: {
		path: '/syllabus',
		permissions: [
			apiConfig.syllabus.getList.path,
			apiConfig.syllabus.getById.path,
			apiConfig.syllabus.create.path,
			apiConfig.syllabus.update.path,
			apiConfig.syllabus.delete.path,
			apiConfig.syllabus.getAutoComplete.path
		]
	},
	chapter: {
		path: '/chapter',
		permissions: [
			apiConfig.chapter.getList.path,
			apiConfig.chapter.getById.path,
			apiConfig.chapter.create.path,
			apiConfig.chapter.update.path,
			apiConfig.chapter.delete.path,
			apiConfig.chapter.getChapterClientClass,
			apiConfig.chapter.getAutoComplete,
		]
	},
	lesson: {
		path: '/lesson',
		permissions: [
			apiConfig.lesson.getList.path,
			apiConfig.lesson.getById.path,
			apiConfig.lesson.create.path,
			apiConfig.lesson.update.path,
			apiConfig.lesson.delete.path,
			apiConfig.lesson.getAutoComplete.path,
			apiConfig.lesson.up,
			apiConfig.lesson.down,
			apiConfig.lesson.move,
		]
	},
	classv1: {
		path: '/class',
		childrenKeys: ['/studentClass'],
		permissions: [
			apiConfig.classv1.getList.path,
			apiConfig.classv1.getById.path,
			apiConfig.classv1.create.path,
			apiConfig.classv1.update.path,
			apiConfig.classv1.delete.path,
			apiConfig.classv1.getSubjectAutoCompleteClass.path,
		]
	},

	studentClass: {
		path: '/studentClass',
		permissions: [
			apiConfig.studentClass.listStudentClass.path,
			apiConfig.studentClass.addStudentClass.path,
			apiConfig.studentClass.removeStudentClass.path,
			apiConfig.studentClass.getStudentAutoComplete.path
		],
		siteConfig: {
            contentClass: 'student-class-site',
        }
	},
	assignment: {
		path: '/assignment',
		permissions: [
			apiConfig.assignment.getList.path,
			apiConfig.assignment.getById.path,
			apiConfig.assignment.create.path,
			apiConfig.assignment.update.path,
			apiConfig.assignment.delete.path,
			apiConfig.assignment.getAutoComplete.path
		]
	},
	question: {
		path: '/question',
		permissions: [
			apiConfig.question.getList.path,
			apiConfig.question.getById.path,
			apiConfig.question.getQuestionClientAssignment,
			apiConfig.question.create.path,
			apiConfig.question.update.path,
			apiConfig.question.updateQuestionAssignment,
			apiConfig.question.delete.path,
		]
	},
	questionEssay: {
		path: '/questionEssay',
		permissions: [
			apiConfig.question.getList.path,
			apiConfig.question.getById.path,
			apiConfig.question.create.path,
			apiConfig.question.update.path,
			apiConfig.question.delete.path,
		]
	},

	classListClient: {
		path: '/classListClient',
		permissions: [
			apiConfig.classv1.getClassListClient.path
		]
	},
	studentClassListClient: {
		path: '/studentClassListClient',
		permissions: [
			apiConfig.classv1.getStudentClassListClient.path
		]
	},
	syllabusClient: {
		path: '/syllabusClient',
		permissions: [
			apiConfig.classv1.getSyllabusClassClient.path
		]
	},
	chapterLessonClient: {
		path: '/chapterLessonClient',
		childrenKeys: ['/lessonClient','/discussClient'],
		permissions: [
			apiConfig.syllabus.getById.path
		]
	},
	lessonClient: {
		path: '/lessonClient',
		childrenKeys: ['/discussClient'],
		permissions: [
			apiConfig.lesson.getLessonClient.path,
			apiConfig.lesson.getChapterClient.path
		]
	},
	discussClient: {
		path: '/discussClient',
		permissions: [
			apiConfig.discuss.getDiscussClient,
			apiConfig.discuss.createDiscussClient,
			apiConfig.discuss.deleteDiscussClient,
			apiConfig.discuss.getDiscussList,
			apiConfig.discuss.getLessonDiscussListClient,
		]
	},
	discussClass: {
		path: '/discussClass',
		permissions: [
			apiConfig.discuss.getClassDiscussListClient,
		]
	},
	classNews: {
		path: '/classNews',
		permissions: [
			apiConfig.classNews.getList.path,
			apiConfig.classNews.getByClassId.path,
			apiConfig.classNews.create.path,
			apiConfig.classNews.update.path,
			apiConfig.classNews.delete.path,
		]
	},
	allClassNews: {
		path: '/allClassNews',
		permissions: [
			apiConfig.classNews.getAll.path,
		]
	},
	assignmentClient: {
		path: '/assignmentClient',
		permissions: [
			apiConfig.assignmentClass.getAssignmentClassList,
			apiConfig.assignmentClass.getAssignmentClassClient,
			apiConfig.assignmentClass.getAssignmentClass,
			apiConfig.assignmentClass.getAssignmentClassLesson,
			apiConfig.assignmentClass.createAssignmentClass,
			apiConfig.assignmentClass.updateAssignmentClass,
			apiConfig.assignmentClass.deleteAssignmentClass,
		]
	},
	assignmentClass: {
		path: '/assignmentClass',
		permissions: [
			apiConfig.assignmentClass.getAssignmentClassList,
			apiConfig.assignmentClass.getAssignmentClassClient,
			apiConfig.assignmentClass.getAssignmentClass,
			apiConfig.assignmentClass.getAssignmentClassLesson,
			apiConfig.assignmentClass.createAssignmentClass,
			apiConfig.assignmentClass.updateAssignmentClass,
			apiConfig.assignmentClass.deleteAssignmentClass,
		]
	},
	exam: {
		path: '/exam',
		permissions: [
			apiConfig.exam.getExamList,
			apiConfig.exam.getExamById,
			apiConfig.exam.getExamClient,
			apiConfig.exam.getExamClientAssignment,
			apiConfig.exam.getExamClientPoint,
			apiConfig.exam.createExamClient,
			apiConfig.exam.getClientDoExam,
			apiConfig.exam.createClientDoExam,
			apiConfig.exam.createExamClientSubmit,
			apiConfig.exam.updateExamClient,
			apiConfig.exam.deleteExam
		]
	},
	verifyExam: {
		path: '/verifyExam',
		permissions: [
			apiConfig.exam.getExamList,
			apiConfig.exam.getExamById,
			apiConfig.exam.getExamClient,
			apiConfig.exam.getExamClientAssignment,
			apiConfig.exam.getExamClientPoint,
			apiConfig.exam.getClientDoExam,
			apiConfig.exam.createClientDoExam,
			apiConfig.exam.createExamClient,
			apiConfig.exam.createExamClientSubmit,
			apiConfig.exam.updateExamClient
		]
	},
	answer: {
		path: '/answer',
		permissions: [
			apiConfig.answer.getAnswerList,
			apiConfig.answer.getAnswerById,
			apiConfig.answer.getAnswerClientAnswerList,
			apiConfig.answer.getAnswerClientAnswerPoint,
			apiConfig.answer.getAnswerClientPoint,
			apiConfig.answer.getAnswerListById,
			apiConfig.answer.createAnswerClient,
			apiConfig.answer.updateAnswerClient
		]
	}
};