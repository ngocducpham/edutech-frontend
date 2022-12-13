import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';



import { actions } from '../../../actions';
import { UserTypes } from '../../../constants';
import { chapterLessonSelector, chapterlsSelector } from '../../../selectors/ClientChapterLesson';
import ChapterLessonClientPage from '../../../compoments/common/appLayoutClient/client/chapterLesson/ChapterLessonClientPage';
import ChapterLessonClientStudentPage from '../../../compoments/common/appLayoutClient/client/chapterLesson/ChapterLessonClientStudentPage';

const { getUserData } = actions;

const ChapterLessonClient = ({syllabusClient, getSyllabusClient, showFullScreenLoading, hideFullScreenLoading}) => {
	const dispatch = useDispatch();
	const id = Number(window.localStorage.getItem('syllabusId'));
	const [listLoading, setListLoading] = useState(false);
	const [dataDetail, setDataDetail] = useState(null);
    const [dataChapter, setDataChapter] = useState(null);
	const chapterLessonClientData = useSelector(chapterLessonSelector);
    const chapterClientData = useSelector(chapterlsSelector);
    const userKind = actions.getUserData().kind;

	const getChapterLessonList = () => {
        setListLoading(true)
        showFullScreenLoading()
        dispatch(
            actions.getChapterLessonClient({
				params: { id },
                onCompleted: (data) => {
                    setDataDetail(data?.data)
                    setListLoading(false)
                    hideFullScreenLoading()
                },
                onError: () => { 
                    setListLoading(false)
                    hideFullScreenLoading()
                },
            })
        )
    }

    const getChapterClientClass = () => {
        setListLoading(true)
        dispatch(
            actions.getChapterClientClass({
                params: {classId: Number(localStorage.getItem("classId"))},
                omCompleted: (resdata) => {
                    setDataChapter(resdata?.data?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    useEffect(() => {
        getChapterLessonList();
        getChapterClientClass()
    }, [])

    console.log("chapterClientData", chapterClientData);
	return (
		<div className='chapter-lesson-container client-container'>
            {
                 userKind === UserTypes.TEACHER ? 
                 chapterLessonClientData && <ChapterLessonClientPage data={chapterLessonClientData} />
                 :
                 chapterClientData && <ChapterLessonClientStudentPage data={chapterClientData} />
            }
			

           
		</div>
	);
};


export default ChapterLessonClient;
