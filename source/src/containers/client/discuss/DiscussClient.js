import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation  } from 'react-router-dom'
import qs from 'query-string';

import DiscussClientPage from '../../../compoments/common/appLayoutClient/client/discuss/DiscussClientPage';
import { actions} from '../../../actions';
import {discussSelector, discussClientSelector, commentSelector, childCommentSelector } from '../../../selectors/ClientDiscuss';
import { showSucsessMessage, showErrorMessage } from '../../../services/notifyService';


const DiscussClient = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const lessonId = Number(window.localStorage.getItem("lessonId"));
    const discussId = Number(window.localStorage.getItem("discussId"));
    const commentId = Number(window.localStorage.getItem("commentId"));
    const [listLoading, setListLoading] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [size, setSize] = useState(3)
    const [page, setPage] = useState(0)

    const lessonDiscussListData = useSelector(discussSelector)
    const discussClientData = useSelector(discussClientSelector)
    const commentListData = useSelector(commentSelector);
    const childCommentListData = useSelector(childCommentSelector);

    const createCommentClient = (values) => {
        dispatch(
            actions.createCommentClient({
                params: {
                    ...values,
                    discussId: discussId,
                },
                onCompleted: () =>{
					dispatch(
						actions.getChildCommentList({
							params: {commentId, page: page, size: size}
						}),
                        getCommentListClient()
					)},
				onError: (err) => {
                    console.log(err)
				}
            })
        )
    }

    const updateCommentClient = (values) => {
        dispatch(
            actions.updateCommentClient({
                params: {
                    ...values,
                    commentId: window.localStorage.getItem("commentId"),
                },
                onCompleted: () =>{
					dispatch(
						actions.getChildCommentList({
							params: {commentId, page: page, size: size}
						}),
                        getCommentListClient()
					)},
				onError: (err) => {
                    console.log(err)
				}
            })
        )
    }

    const deleteCommentClient = (id) => {
        dispatch(
            actions.deleteCommentClient({
                params: {id: id},
                onCompleted: () =>{
					showSucsessMessage('Xóa thành công');
					dispatch(
						actions.getChildCommentList({
							params: {commentId, page: page, size: size}
						}),
                        getCommentListClient()
					)
                },
				onError: () => {
					showErrorMessage('Xóa thất bại');
				}
            })
        )
    }


    

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

    const getDiscussClient = () => {
        dispatch(
            actions.getDiscussClient({
                params: {discussId},
            })
        )
    }

    const getCommentListClient = () => {
        dispatch(
            actions.getCommentListClient({
                params: {discussId},
            })
        )
    }

    const getChildCommentList = (commentId, pageNew, sizeNew) => {
        const params = {};
        if(Number(localStorage.commentId) !== commentId){
            setPage(0);
            setSize(3)
        }
        if(commentId){
            params.commentId = commentId;
        }
        if(pageNew !== undefined){
            params.page = pageNew;
            setPage(pageNew)
        }else{
            params.page = page;
        }
       
        if(sizeNew !== undefined){
            params.size = sizeNew;
            setSize(sizeNew)
        }else{
            params.size = size;
        }
       
        dispatch(
            actions.getChildCommentList({
                params
            }),
            
        )
    }


    useEffect(() => {
        getDiscussClient();
        getCommentListClient();
    },[])


    useEffect(() => {
        getSyllabus();
    }, [lessonId])


    console.log("childCommentListData", childCommentListData)
    return (
        <div className='discuss-container' style={{width: '75%'}}>
                {
               discussClientData && 
               <DiscussClientPage
                syllabus={dataDetail}
                data={discussClientData} 
                commentData={commentListData}
                childCommentData={childCommentListData}
                onCreate={createCommentClient}
                onDelete={deleteCommentClient}
                onUpdate={updateCommentClient}
                onGetChild={getChildCommentList}
                getCommentList={getCommentListClient}
                page={page}
                size={size}
                />
                }
        </div>
    )
}

export default DiscussClient