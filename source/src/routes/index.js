import React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { sitePathConfig } from '../constants/sitePathConfig';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ClientRoute from './ClientRoute';


import LoginPage from '../containers/account/LoginPage';
import ProfilePage from '../containers/account/ProfilePage';

// import DashBoard from '../containers/Dashboard';
import UserAdminListPage from '../containers/users/UserAdminListPage';

import NotFound from '../compoments/common/NotFound';
import Forbidden from '../containers/Forbidden';
import GroupPermissionListPage from '../containers/groupPermission/GroupPermissionListPage';
import CategoryListPage from '../containers/category/CategoryListPage';
import NewsListPage from '../containers/adminNews/NewsListPage';
import MajorListPage from '../containers/major/MajorListPage';
import SubjectListPage from '../containers/subject/SubjectListPage';
import ProvinceListPage from '../containers/province/ProvinceListPage';
import TeacherListPage from '../containers/teacher/TeacherListPage';
import StudentListPage from '../containers/student/StudentListPage';
import TeacherSubjectListPage from '../containers/teacherSubject/TeacherSubjectListPage';
import TeacherMySubjectListPage from '../containers/teacher/TeacherMySubjectListPage';
import SyllabusListPage from '../containers/syllabus/SyllabusListPage';
import ChapterListPage from '../containers/chapter/ChapterListPage';
import ClassListPage from '../containers/class/ClassListPage';
import StudentClassListPage from '../containers/studentClass/StudentClassListPage';
import AssignmentListPage from '../containers/assignment/AssignmentListPage';
import QuestionListPage from '../containers/question/QuestionListPage';
import QuestionEssayListPage from '../containers/question/QuestionEssayListPage';

//client
import ClassClient from '../containers/client/class/ClassClient';
import StudentClassClient from '../containers/client/studentClass/StudentClassClient';
import SyllabusClient from '../containers/client/syllabus/SyllabusClient';
import ChapterLessonClient from '../containers/client/chapterLesson/ChapterLessonClient';
import LessonClient from '../containers/client/lesson/LessonClient';
import ClassNews from '../containers/client/classNews/ClassNews';
import DiscussClient from '../containers/client/discuss/DiscussClient';
import DiscussClass from '../containers/client/discussClass/DiscussClass';
import  AllNews from '../containers/client/allNews/AllNews';
import AssignmentClient from '../containers/client/assignment/AssignmentClient';
import ExamClient from '../containers/client/exam/ExamClient';
import AssignmentClass from '../containers/client/assignmentClass/AssignmentClass';
import VerifyExam from '../containers/client/exam/VerifyExam';

const RootRoute = () => {
    const {
        admin,
        login,
        profile,
        forbidden,
        groupPermission,
        category,
        news,
        major,
        subject,
        province,
        teacher,
        student,
        teacherSubject,
        teacherMySubject,
        syllabus,
        chapter,
        classv1,
        studentClass,
        assignment,
        question,
        questionEssay,
        classListClient,
        studentClassListClient,
        syllabusClient,
        chapterLessonClient,
        lessonClient,
        classNews,
        allClassNews,
        discussClient,
        discussClass,
        assignmentClass,
        assignmentClient,
        exam,
        verifyExam
    } = sitePathConfig;

    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to={{
                    pathname: admin.path,
                    state: { isRedirectToHomePage: true }
                }} />
                <PublicRoute exact path={login.path} component={LoginPage} />
                <ClientRoute exact path={profile.path} component={ProfilePage} />
                <PrivateRoute exact path={admin.path} component={UserAdminListPage} />
                <PrivateRoute exact path={groupPermission.path} component={GroupPermissionListPage} />
                <PrivateRoute exact path={category.path} component={CategoryListPage} />
                <PrivateRoute exact path={news.path} component={NewsListPage} />
                <PrivateRoute exact path={major.path} component={MajorListPage} />
                <PrivateRoute exact path={subject.path} component={SubjectListPage} />
                <PrivateRoute exact path={province.path} component={ProvinceListPage} />
                <PrivateRoute exact path={province.path} component={ProvinceListPage} />
                <PrivateRoute exact path={teacher.path} component={TeacherListPage} />
                <PrivateRoute exact path={student.path} component={StudentListPage} />
                <PrivateRoute exact path={teacherSubject.path} component={TeacherSubjectListPage} />
                <PrivateRoute exact path={syllabus.path} component={SyllabusListPage} />
                <PrivateRoute exact path={chapter.path} component={ChapterListPage} />
                <PrivateRoute exact path={classv1.path} component={ClassListPage} />
                <PrivateRoute exact path={studentClass.path} component={StudentClassListPage} />
                <PrivateRoute exact path={assignment.path} component={AssignmentListPage} />
                <PrivateRoute exact path={question.path} component={QuestionListPage} />
                <PrivateRoute exact path={questionEssay.path} component={QuestionEssayListPage} />

                {/* client */}
                <ClientRoute exact path={teacherMySubject.path} component={TeacherMySubjectListPage} />
                <ClientRoute exact path={classListClient.path} component={ClassClient} />
                <ClientRoute exact path={studentClassListClient.path} component={StudentClassClient} />
                <ClientRoute exact path={syllabusClient.path} component={SyllabusClient} />
                <ClientRoute exact path={chapterLessonClient.path} component={ChapterLessonClient} />
                <ClientRoute exact path={lessonClient.path} component={LessonClient} />
                <ClientRoute exact path={classNews.path} component={ClassNews} />
                <ClientRoute exact path={allClassNews.path} component={AllNews} />
                <ClientRoute exact path={discussClient.path} component={DiscussClient} />
                <ClientRoute exact path={discussClass.path} component={DiscussClass} />
                <ClientRoute exact path={assignmentClient.path} component={AssignmentClient} />
                <ClientRoute exact path={assignmentClass.path} component={AssignmentClass} />
                <ClientRoute exact path={exam.path} component={ExamClient} />
                <ClientRoute exact path={verifyExam.path} component={VerifyExam} />

                {/* Error Page */}
                <PrivateRoute exact path={forbidden.path} component={Forbidden} />
                {/* <Route exact path="/error" component={ErrorServer} /> */}
                {/* 404 Page */}
                <PublicRoute component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default RootRoute;
