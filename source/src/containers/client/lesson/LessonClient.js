import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom'
import qs from 'query-string';
import { Modal } from 'antd';

import { actions} from '../../../actions';
import {lessonSelector} from '../../../selectors/ClientLesson';
import { chapterSelector } from '../../../selectors/ClientChapter';
import {discussSelector} from '../../../selectors/ClientDiscuss';
import {assignmentClassLessonSelector} from '../../../selectors/ClientAssignmentClass';
import LessonClientPage from '../../../compoments/common/appLayoutClient/client/lesson/LessonClientPage';

import { showSucsessMessage, showErrorMessage } from '../../../services/notifyService';

const { getUserData } = actions;



const LessonClient = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const lessonId = Number(window.localStorage.getItem("lessonId"));
    const chapterId = Number(window.localStorage.getItem("chapterId"));
    const classId = Number(window.localStorage.getItem("classId"));
    let userData = getUserData();
    const userId = userData.id;
   
    const [listLoading, setListLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [assignmentData, setAssigmentData] = useState(null);
    const lessonClientData = useSelector(lessonSelector);
    const chapterClientData = useSelector(chapterSelector);
    const lessonDiscussListData = useSelector(discussSelector)
    const assignmentClassLessonData = useSelector(assignmentClassLessonSelector)

    const createDiscussClient = (values) => {
        dispatch(
            actions.createDiscussClient({
                params: {
                    ...values,
                    classId: classId,
                    userId: userId,
                    lessonId: lessonId
                },
                onCompleted: () =>{
					showSucsessMessage('Tạo thảo luận thành công');
					dispatch(
						actions.getLessonDiscussListClient({
							params: {classId, lessonId}
						})
					)},
				onError: () => {
					showErrorMessage('Tạo thảo luận thất bại');
				}
            })
        )
    }

   
    const deleteDiscuss = (id) => {
        dispatch(
            actions.deleteDiscuss({
                params: {id: id},
                onCompleted: () =>{
					showSucsessMessage('Xóa thảo luận thành công');
					dispatch(
						actions.getLessonDiscussListClient({
							params: {classId, lessonId}
						})
					)
                },
				onError: () => {
					showErrorMessage('Xóa thảo luận thất bại');
				}
            })
        )
    }

    const getLesson = () => {
        setListLoading(true)
        dispatch(
            actions.getLessonClient({
                params: {classId, lessonId},
                omCompleted: (dataDto) => {
                    setDataDetail(dataDto?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    

    const getAssignmentClassLesson = () => {
        setListLoading(true)
        dispatch(
            actions.getAssignmentClassLesson({
                params: {classId, lessonId},
                omCompleted: (dataDto) => {
                    setAssigmentData(dataDto?.data?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    const updateAssignmentClass = (values) => {
        dispatch(
            actions.updateAssignmentClass({
                params: {
                    ...values,
                },
                onCompleted: () =>{
					showSucsessMessage('Cập nhật bài tập thành công');
					dispatch(
						actions.getAssignmentClassLesson({
							params: {classId, lessonId}
						})
					)},
				onError: () => {
					showErrorMessage('Cập nhật bài tập thất bại');
				}
            })
        )
    }

    const getLessonDiscussListClient = () => {
        dispatch(
            actions.getLessonDiscussListClient({
                params: {classId, lessonId},
            })
        )
    }


    useEffect(() => {
        getLessonDiscussListClient();
        getAssignmentClassLesson();
    },[])


    useEffect(() => {
        getLesson()
        getSyllabus();
    }, [lessonId])
    
    const getSyllabus = () => {
        setListLoading(true);
        props.showFullScreenLoading();
        dispatch(
            actions.getChapterLessonClient({
				params: { id:  window.localStorage.getItem("syllabusId") },
                onCompleted: (data) => {
                    setDataDetail(data?.chapters)
                    setListLoading(false)
                    props.hideFullScreenLoading();
                },
                onError: () => { 
                    setListLoading(false)
                    props.hideFullScreenLoading();
                },
            })
        )
    }

    console.log("check data asm", assignmentClassLessonData)
    return (
        <div className='lesson-container' style={{width: '75%'}}>
                {
                lessonClientData && 
                <LessonClientPage 
                    data={lessonClientData} 
                    syllabus={dataDetail} 
                    lessonDiscussListData={lessonDiscussListData}
                    assignmentClassLessonData={assignmentClassLessonData}
                    onSubmit={createDiscussClient}
                    onDelete={deleteDiscuss}
                    updateAssignmentClass={updateAssignmentClass}
                />
                }
        </div>
    )
}

export default LessonClient