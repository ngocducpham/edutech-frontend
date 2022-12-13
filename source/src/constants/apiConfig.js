const baseHeader = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data'
}


const apiConfig = {
	file: {
		upload: {
			path: '/v1/file/upload',
			method: 'POST',
			headers: multipartFormHeader
		}
	},
	account: {
		login: {
			path: '/v1/account/login',
			method: 'POST',
			headers: baseHeader
		},
		logout: {
			path: '/v1/account/logout',
			method: 'GET',
			headers: baseHeader
		},
		getAdminProfile: {
			path: '/v1/account/profile',
			method: 'GET',
			headers: baseHeader
		},
		updateProfileAdmin: {
			path: '/v1/account/update_profile',
			method: 'PUT',
			headers: baseHeader
		}
	},
	user: {
		getAdminList: {
			path: '/v1/account/list',
			method: 'GET',
			headers: baseHeader
		},

		getAdminById: {
			path: '/v1/account/get',
			method: 'GET',
			headers: baseHeader
		},
		createAdmin: {
			path: '/v1/account/create_admin',
			method: 'POST',
			headers: baseHeader
		},
		updateAdmin: {
			path: '/v1/account/update_admin',
			method: 'PUT',
			headers: baseHeader
		},
		deleteAdmin: {
			path: '/v1/account/delete',
			method: 'DELETE',
			headers: baseHeader
		}
	},
	groupPermission: {
		getList: {
			path: '/v1/group/list',
			method: 'GET',
			headers: baseHeader
		},
		getPermissionList: {
			path: '/v1/permission/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/group/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/group/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/group/update',
			method: 'PUT',
			headers: baseHeader
		},
		updateStatus: {
			path: '/v1/skills/status',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/skills',
			method: 'DELETE',
			headers: baseHeader
		}
	},
	category: {
		getList: {
			path: '/v1/category/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/category/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/category/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/category/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/category/delete',
			method: 'DELETE',
			headers: baseHeader
		}
	},
	news: {
		getList: {
			path: '/v1/news/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/news/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/news/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/news/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/news/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		categoryAutoComplete: {
			path: '/v1/category/auto-complete',
			method: 'GET',
			headers: baseHeader
		}
	},
	major: {
		getList: {
			path: '/v1/major/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/major/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/major/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/major/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/major/delete',
			method: 'DELETE',
			headers: baseHeader
		}
	},
	subject: {
		getList: {
			path: '/v1/subject/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/subject/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/subject/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/subject/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/subject/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/subject/auto-complete',
			method: 'GET',
			headers: baseHeader
		}
	},
	province: {
		getList: {
			path: '/v1/province/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/province/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/province/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/province/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/province/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/province/auto-complete',
			method: 'GET',
			headers: baseHeader
		}
	},
	teacher: {
		getList: {
			path: '/v1/teacher/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/teacher/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/teacher/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/teacher/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/teacher/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getProfile:{
			path: '/v1/teacher/my-profile',
			method: 'GET',
			headers: baseHeader
		},
		updateProfile:{
			path: '/v1/teacher/update-profile',
			method: 'PUT',
			headers: baseHeader
		},
		getMySubject: {
			path:  '/v1/teacher/my-subject',
            method: 'GET',
            headers: baseHeader,
		},
		getAutoComplete: {
			path:  '/v1/teacher/auto-complete',
            method: 'GET',
            headers: baseHeader,
		}
	},
	student: {
		getList: {
			path: '/v1/student/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/student/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/student/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/student/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/student/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getMyProfile: {
			path:  '/v1/student/my-profile',
            method: 'GET',
            headers: baseHeader,
		},
		getMajorAutoCompleteStudent: {
			path: '/v1/major/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
		getProfile: {
			path: '/v1/student/my-profile',
			method: 'GET',
			headers: baseHeader
		},
		updateProfile:{
			path: '/v1/student/update-profile',
			method: 'PUT',
			headers: baseHeader
		}
	},
	teacherSubject: {
		getList: {
			path: '/v1/teacher/subject/list',
			method: 'GET',
			headers: baseHeader
		},
		add: {
			path: '/v1/teacher/subject/add',
			method: 'POST',
			headers: baseHeader
		},
		remove: {
			path: '/v1/teacher/subject/remove',
			method: 'DELETE',
			headers: baseHeader
		},
		getSubjectAutoComplete: {
			path: '/v1/subject/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
	},
	syllabus: {
		getList: {
			path: '/v1/syllabus/list',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/syllabus/create',
			method: 'POST',
			headers: baseHeader
		},
		getById: {
			path: '/v1/syllabus/get',
			method: 'GET',
			headers: baseHeader
		},
		update: {
			path: '/v1/syllabus/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/syllabus/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/syllabus/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
		getChapterLessonClient: {
			path: '/v1/syllabus/get',
			method: 'GET',
			headers: baseHeader
		}
	},
	chapter: {
		getList: {
			path: '/v1/chapter/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/chapter/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/chapter/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/chapter/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/chapter/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/chapter/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
		getChapterClientClass: {
			path: '/v1/chapter/client/class',
			method: 'GET',
			headers: baseHeader
		}
	},
	lesson: {
		getList: {
			path: '/v1/lesson/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/lesson/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/lesson/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/lesson/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/lesson/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/lesson/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
		up: {
			path: '/v1/lesson/up',
			method: 'PUT',
			headers: baseHeader
		},
		down: {
			path: '/v1/lesson/down',
			method: 'PUT',
			headers: baseHeader
		},
		move: {
			path: '/v1/lesson/move',
			method: 'PUT',
			headers: baseHeader
		},
		getLessonClient: {
			path: '/v1/lesson/client/lesson',
			method: 'GET',
			headers: baseHeader
		},
		getChapterClient: {
			path: '/v1/chapter/get',
			method: 'GET',
			headers: baseHeader
		}
	},
	classv1: {
		getList: {
			path: '/v1/class/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/class/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/class/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/class/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/class/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getSubjectAutoCompleteClass: {
			path: '/v1/subject/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
		getClassListClient: {
			path: '/v1/class/client/class-list',
			method: 'GET',
			headers: baseHeader
		},
		getStudentClassListClient: {
			path: '/v1/class/client/student-list',
			method: 'GET',
			headers: baseHeader
		},
		getSyllabusClassClient: {
			path: '/v1/class/client/syllabus',
			method: 'GET',
			headers: baseHeader
		},
		updateClassClient: {
			path: '/v1/class/client/update',
			method: 'PUT',
			headers: baseHeader
		}
	},
	studentClass: {
		listStudentClass: {
			path: '/v1/class/student-list',
			method: 'GET',
			headers: baseHeader
		},
		addStudentClass: {
			path: '/v1/class/student/add',
			method: 'POST',
			headers: baseHeader
		},
		removeStudentClass: {
			path: '/v1/class/student/remove',
			method: 'DELETE',
			headers: baseHeader
		},
		getStudentAutoComplete: {
			path: '/v1/student/auto-complete',
			method: 'GET',
			headers: baseHeader
		},
	},
	assignment:{
		getList: {
			path: '/v1/assignment/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/assignment/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/assignment/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/assignment/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/assignment/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getAutoComplete: {
			path: '/v1/assignment/auto-complete',
			method: 'GET',
			headers: baseHeader
		}
	},
	question:{
		getList: {
			path: '/v1/question/list',
			method: 'GET',
			headers: baseHeader
		},
		getById: {
			path: '/v1/question/get',
			method: 'GET',
			headers: baseHeader
		},
		getQuestionClientAssignment: {
			path: '/v1/question/client/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/question/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/question/update',
			method: 'PUT',
			headers: baseHeader
		},
		updateQuestionAssignment: {
			path: '/v1/question/update-all',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/question/delete',
			method: 'DELETE',
			headers: baseHeader
		},
	},
	resource:{
		materialsUploadSyllabus: {
			path: '/v1/resource/materials-upload-syllabus',
			method: 'POST',
			headers: multipartFormHeader
		},
		materialsUploadLesson: {
			path: '/v1/resource/materials-upload-lesson',
			method: 'POST',
			headers: multipartFormHeader
		},
		materialsUploadClass: {
			path: '/v1/resource/materials-upload-class',
			method: 'POST',
			headers: multipartFormHeader
		},
		assignmentUpload: {
			path: '/v1/resource/assignment-upload',
			method: 'POST',
			headers: multipartFormHeader
		},
		teacherDownloadSyllabus: {
			path: '/v1/resource/teacher-download-syllabus',
			method: 'GET',
			headers: baseHeader
		},
		teacherDownloadTempUpload: {
			path: '/v1/resource/teacher_download_temp_upload',
			method: 'GET',
			headers: baseHeader
		},
		teacherDownloadAssignmentUpload: {
			path: '/v1/resource/teacher_download_assignment_upload',
			method: 'GET',
			headers: baseHeader
		},
		studentDownloadFileLesson: {
			path: '/v1/resource/teacher-download-file-lesson',
			method: 'GET',
			headers: baseHeader
		},
		studentDownloadFileAssignment: {
			path: '/v1/resource/teacher-download-file-assignment',
			method: 'GET',
			headers: baseHeader
		},
		teacherDownloadFileSyllabus:{
			path: '/v1/resource/teacher-download-file-syllabus',
			method: 'GET',
			headers: baseHeader
		},
		teacherDeleteFileSyllabus: {
			path: '/v1/resource/teacher-delete-file-syllabus',
			method: 'DELETE',
			headers: baseHeader
		}

	},
	classNews:{
		getList: {
			path: '/v1/classnews/client/news-list',
			method: 'GET',
			headers: baseHeader
		},
		getByClassId: {
			path: '/v1/classnews/get',
			method: 'GET',
			headers: baseHeader
		},
		create: {
			path: '/v1/classnews/create',
			method: 'POST',
			headers: baseHeader
		},
		update: {
			path: '/v1/classnews/client/update',
			method: 'PUT',
			headers: baseHeader
		},
		delete: {
			path: '/v1/classnews/client/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		uploadImage: {
			path: '/v1/resource/materials-upload-class',
			method: 'POST',
			headers: multipartFormHeader
		},
		getAll: {
			path: '/v1/classnews/client/news-list',
			method: 'GET',
			headers: baseHeader
		}
	},
	discuss: {
		getDiscussList: {
			path: '/v1/discuss/list',
			method: 'GET',
			headers: baseHeader
		},
		getDiscussClient: {
			path: '/v1/discuss/client/get',
			method: 'GET',
			headers: baseHeader
		},
		createDiscussClient: {
			path: '/v1/discuss/client/create',
			method: 'POST',
			headers: baseHeader
		},
		deleteDiscussClient: {
			path: '/v1/discuss/delete',
			method: 'DELETE',
			headers: baseHeader
		},
		getLessonDiscussListClient: {
			path: '/v1/discuss/client/get/lesson-discuss-list',
			method: 'GET',
			headers: baseHeader
		},
		getClassDiscussListClient: {
			path: '/v1/discuss/client/get/class-discuss-list',
			method: 'GET',
			headers: baseHeader
		}
	},
	comment: {
		getCommentListClient: {
			path: '/v1/comment/client/get/comment-list',
			method: 'GET',
			headers: baseHeader
		},
		getCommentClient: {
			path: '/v1/comment/client/get',
			method: 'GET',
			headers: baseHeader
		},
		getChildCommentList: {
			path: '/v1/comment/client/get/child-comment-list',
			method: 'GET',
			headers: baseHeader
		},
		createCommentClient: {
			path: '/v1/comment/client/create',
			method: 'POST',
			headers: baseHeader
		},
		updateCommentClient: {
			path: '/v1/comment/client/update',
			method: 'PUT',
			headers: baseHeader
		},
		deleteCommentClient: {
			path: '/v1/comment/client/delete',
			method: 'DELETE',
			headers: baseHeader
		},
	},
	assignmentClass: {
		getAssignmentClassList: {
			path: '/v1/class-assignment/list',
			method: 'GET',
			headers: baseHeader
		},
		getAssignmentClassById: {
			path: '/v1/class-assignment/client/get',
			method: 'GET',
			headers: baseHeader
		},
		getAssignmentClass: {
			path: '/v1/class-assignment/client/class',
			method: 'GET',
			headers: baseHeader
		},
		getAssignmentClassLesson: {
			path: '/v1/class-assignment/client/lesson',
			method: 'GET',
			headers: baseHeader
		},
		createAssignmentClass: {
			path: '/v1/class-assignment/create',
			method: 'POST',
			headers: baseHeader
		},
		updateAssignmentClass: {
			path: '/v1/class-assignment/client/update',
			method: 'PUT',
			headers: baseHeader
		},
		deleteAssignmentClass: {
			path: '/v1/class-assignment/delete',
			method: 'DELETE',
			headers: baseHeader
		},
	},
	exam: {
		getExamList: {
			path: '/v1/exam/list',
			method: 'GET',
			headers: baseHeader
		},
		getExamById: {
			path: '/v1/exam/get',
			method: 'GET',
			headers: baseHeader
		},
		getExamClient: {
			path: '/v1/exam/client/get',
			method: 'GET',
			headers: baseHeader
		},
		getExamClientAssignment: {
			path: '/v1/exam/client/get/assignment',
			method: 'GET',
			headers: baseHeader
		},
		getExamClientPoint: {
			path: '/v1/exam/client/get-point',
			method: 'GET',
			headers: baseHeader
		},
		getClientDoExam: {
			path: '/v1/exam/client/do-exam',
			method: 'GET',
			headers: baseHeader
		},
		createExamClient: {
			path: '/v1/exam/client/create',
			method: 'POST',
			headers: baseHeader
		},
		createClientDoExam: {
			path: '/v1/exam/client/do-exam',
			method: 'POST',
			headers: baseHeader
		},
		createExamClientSubmit: {
			path: '/v1/exam/client/submit',
			method: 'POST',
			headers: baseHeader
		},
		updateExamClient: {
			path: '/v1/exam/client/update',
			method: 'PUT',
			headers: baseHeader
		},
		deleteExam: {
			path: '/v1/exam/delete',
			method: 'DELETE',
			headers: baseHeader
		}
	},
	answer: {
		getAnswerList: {
			path: '/v1/answer/list',
			method: 'GET',
			headers: baseHeader
		},
		getAnswerById: {
			path: '/v1/answer/get',
			method: 'GET',
			headers: baseHeader
		},
		getAnswerClientPoint: {
			path: '/v1/answer/client/point',
			method: 'GET',
			headers: baseHeader
		},
		getAnswerClientAnswerPoint: {
			path: '/v1/answer/client/answer-point',
			method: 'GET',
			headers: baseHeader
		},
		getAnswerClientAnswerList: {
			path: '/v1/answer/client/answer-list',
			method: 'GET',
			headers: baseHeader
		},
		getAnswerAnswerList: {
			path: '/v1/answer/answer-list',
			method: 'GET',
			headers: baseHeader
		},
		createAnswerClient: {
			path: '/v1/answer/client/create',
			method: 'POST',
			headers: baseHeader
		},
		updateAnswerClient: {
			path: '/v1/answer/client/update',
			method: 'PUT',
			headers: baseHeader
		},
	}
};
export default apiConfig;
