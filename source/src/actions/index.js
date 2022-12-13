import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import { actions as categoryActions, actionTypes as categoryTypes } from './category';
import { actions as newsActions, actionTypes as newsTypes } from './news';
import { actions as majorActions, actionTypes as majorTypes } from './major';
import { actions as subjectActions, actionTypes as subjectTypes } from './subject';
import { actions as provinceActions, actionTypes as provinceTypes } from './province';
import { actions as teacherActions, actionTypes as teacherTypes } from './teacher';
import { actions as studentActions, actionTypes as studentTypes } from './student';
import { actions as teacherSubjectActions, actionTypes as teacherSubjectTypes } from './teacherSubject';
import { actions as syllabusActions, actionTypes as syllabusTypes } from './syllabus';
import { actions as chapterActions, actionTypes as chapterTypes } from './chapter';
import { actions as lessonActions, actionTypes as lessonTypes } from './lesson';
import { actions as classActions, actionTypes as classTypes } from './classv1';
import { actions as studentClassActions, actionTypes as studentClassTypes } from './studentClass';
import { actions as assignmentActions, actionTypes as assignmentTypes } from './assignment';
import { actions as questionActions, actionTypes as questionTypes } from './question';
import { actions as resourceActions, actionTypes as resourceTypes } from './resource';
import { actions as classNewsActions, actionTypes as classNewsTypes } from './classNews';
import { actions as discussActions, actionTypes as discussTypes } from './discuss';
import { actions as assignmentClassActions, actionTypes as assignmentClassTypes } from './assignmentClass';
import { actions as examActions, actionTypes as examTypes } from './exam';
import { actions as answerActions, actionTypes as answerTypes } from './answer';

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...categoryActions,
    ...newsActions,
    ...majorActions,
    ...subjectActions,
    ...provinceActions,
    ...teacherActions,
    ...studentActions,
    ...teacherSubjectActions,
    ...syllabusActions,
    ...chapterActions,
    ...classActions,
    ...studentClassActions,
    ...assignmentActions,
    ...questionActions,
    ...resourceActions,
    ...lessonActions,
    ...classNewsActions,
    ...discussActions,
    ...assignmentClassActions,
    ...examActions,
    ...answerActions
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...categoryTypes,
    ...newsTypes,
    ...majorTypes,
    ...subjectTypes,
    ...provinceTypes,
    ...teacherTypes,
    ...studentTypes,
    ...teacherSubjectTypes,
    ...syllabusTypes,
    ...chapterTypes,
    ...classTypes,
    ...studentClassTypes,
    ...assignmentTypes,
    ...questionTypes,
    ...resourceTypes,
    ...lessonTypes,
    ...classNewsTypes,
    ...discussTypes,
    ...assignmentClassTypes,
    ...examTypes,
    ...answerTypes
}