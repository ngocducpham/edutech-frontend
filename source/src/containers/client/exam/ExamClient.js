import React, { Component, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import qs from 'query-string';
import { actions} from '../../../actions';
import { showSucsessMessage, showErrorMessage } from '../../../services/notifyService';
import ExamPage from '../../../compoments/common/appLayoutClient/client/exam/ExamPage';
import { assignmentClientSelector } from '../../../selectors/ClientAssignmentClass';
import { examClientDoExam } from '../../../selectors/ClientExam';
import { render } from 'react-dom';
import { addSeconds, isAfter, isBefore, sub } from 'date-fns';
import moment from 'moment';



const ExamClient = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [qsData, setQsData] = useState(null)
    const [listLoading, setListLoading] = useState(false);
    const [assignmentData, setAssigmentData] = useState(null);
    const assignmentClientData = useSelector(assignmentClientSelector);
    const examClientDoExamData = useSelector(examClientDoExam)

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


    const getClientDoExam = () => {
        setListLoading(true)
        dispatch(
            actions.getClientDoExam({
                params: {assignmentId: localStorage.getItem("assignmentId")},
                onCompleted: (dataqs) =>{
                    setQsData(dataqs?.data)
                    setListLoading(false)
                },
				onError: () => {
                    setListLoading(false)
				}
            })
        )
    }


    const createClientAnswer = (exam_id, question_id, answer) => {
        dispatch(
            actions.createClientAnswer({    
                params: {
                    exam_id: exam_id,
                    question_id: question_id,
                    answer: answer
                },
                onCompleted: () =>{
                    
				},
				onError: () => {
					
				}
            })
        )
    }
    const updateClientAnswer = () => {
        dispatch(
            actions.updateClientAnswer({
                params: {
                   id: 1,
                   answer: "2"
                },
                onCompleted: () =>{
                    
				},
				onError: () => {
					
				}
            })
        )
    }

    const getAnswerClientAnswerList = () => {
        dispatch(
            actions.getAnswerClientAnswerList({
                params: {},
                onCompleted: () => {

                },
                onError: () => {

                }
            })
        )
    }




    useEffect(() => {
        getClientDoExam();
        getAssignmentClassById();
    },[])
    const endDuration = useMemo(()=> {
        console.log('adasdasdasdasdasd',examClientDoExamData);
        if(!assignmentClientData?.duration || !examClientDoExamData) return null;

        const apptemptDate = moment(examClientDoExamData.attempt_time, 'DD/MM/YY HH:mm:ss').toDate();
        // console.log('apptemptDate', apptemptDate);
        let endDuration = addSeconds(new Date(), assignmentClientData.duration);
        const endDate = moment(assignmentClientData.endDate, 'DD MM YY HH:mm:ss').toDate();
        if(isAfter(endDuration, endDate)){
            endDuration = endDate;
        }
        // console.log('apptemptDate', endDuration - apptemptDate);

        return endDuration;
    }, [examClientDoExamData, assignmentClientData])


    return (
        <div className='exam-container' style={{width: '75%'}}>
            {
                examClientDoExamData && 
                <ExamPage endDuration={endDuration}
                assignmentClientData={assignmentClientData}
                examClientDoExamData = {examClientDoExamData}
                createClientAnswer={createClientAnswer}
                updateClientAnswer={updateClientAnswer}
                />
            }
        </div>
    )
}



export default ExamClient