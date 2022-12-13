import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string';
import { actions} from '../../../actions';

import MutilpleChoicePage from '../../../compoments/common/appLayoutClient/client/assignment/MutilpleChoicePage';
import EssayPage from '../../../compoments/common/appLayoutClient/client/assignment/EssayPage';
import SubmitFilePage from '../../../compoments/common/appLayoutClient/client/assignment/SubmitFilePage';
import { examAssignmentSelector } from '../../../selectors/ClientExam';
import { assignmentClientSelector } from '../../../selectors/ClientAssignmentClass';


const AssignmentClient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState(null);
    const [listLoading, setListLoading] = useState(false);
    const [assignmentData, setAssigmentData] = useState(null);
    const assignmentClientData = useSelector(assignmentClientSelector);
    const examAssignmentData = useSelector(examAssignmentSelector);
    // const id = useLocation().state.assignmentId;
    console.log("text", useLocation())
    

    const createExam = () => {
        dispatch(
            actions.createClientDoExam({
                params: {
                    assignmentClassId: Number(localStorage.getItem("assignmentClassId"))
                },
                onCompleted: (responseData) =>{
                        setData(responseData?.data?.data)
					},
				onError: () => {
					
				}
            })
        )
    }

    const getExamAssignment = () => {
        setListLoading(true)
        dispatch(
            actions.getExamAssignment({
                params: {assignmentId: Number(localStorage.getItem("assignmentId"))},
                omCompleted: (resp) => {
                    setAssigmentData(resp?.data?.data)
                    setListLoading(false)
                },
                onError: () => { 
                    setListLoading(false)
                },
            })
        )
    }

    const getAssignmentClassById = () => {
        setListLoading(true)
        dispatch(
            actions.getAssignmentClassById({
                params: {id: Number(localStorage.getItem("assignmentId"))},
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

    useEffect(() => {
        getAssignmentClassById();
        getExamAssignment();
    },[])

    console.log('assignmentClientData', assignmentClientData)
    return (
        <div className='assignment-container client-container'>
            {
                Number(localStorage.getItem('typeAsm')) === 1 ?
                assignmentClientData && <MutilpleChoicePage
                data = {assignmentClientData} 
                examAssignmentData = {examAssignmentData }
                createExam = {createExam}
                /> 
                :  Number(localStorage.getItem('typeAsm')) === 2 ?<EssayPage /> : <SubmitFilePage />
            }
        </div>
    )
}

export default AssignmentClient