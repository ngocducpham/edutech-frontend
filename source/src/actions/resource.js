import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('RESOURCE');

const { defineAction, createAction } = reduxUtil;

export const actionTypes = {
    MATERIALS_UPLOAD_SYLLABUS: defineAction('MATERIALS_UPLOAD_SYLLABUS'),
    MATERIALS_UPLOAD_LESSON: defineAction('MATERIALS_UPLOAD_LESSON'),
    MATERIALS_UPLOAD_CLASS: defineAction('MATERIALS_UPLOAD_CLASS'),
    ASSIGNMENT_UPLOAD: defineAction('ASSIGNMENT_UPLOAD'),
    TEACHER_DELETE_FILE_SYLLABUS: defineAction('TEACHER_DELETE_FILE_SYLLABUS'),
}

export const actions = {
    materialsUploadSyllabus: createAction(actionTypes.MATERIALS_UPLOAD_SYLLABUS),
    materialsUploadLesson: createAction(actionTypes.MATERIALS_UPLOAD_LESSON),
    materialsUploadClass: createAction(actionTypes.MATERIALS_UPLOAD_CLASS),
    assignmentUpload: createAction(actionTypes.ASSIGNMENT_UPLOAD),
    teacherDeleteFileSyllabus: createAction(actionTypes.TEACHER_DELETE_FILE_SYLLABUS),
}