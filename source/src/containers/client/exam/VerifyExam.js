import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import qs from 'query-string';
import { actions } from '../../../actions';
import VerifySubmitPage from '../../../compoments/common/appLayoutClient/client/exam/VerifySubmitPage';
import { assignmentClientSelector } from '../../../selectors/ClientAssignmentClass';
import { examClientDoExam } from '../../../selectors/ClientExam';

const VerifyExam = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const assignmentClientData = useSelector(assignmentClientSelector);
	const examClientDoExamData = useSelector(examClientDoExam);
	console.clear();
	console.log('assignmentClientData', assignmentClientData);
	console.log('examClientDoExamData', examClientDoExamData);

	useEffect(() => {
		dispatch(
			actions.getAssignmentClassById({
				params: { id: Number(localStorage.getItem('assignmentId')) },
				omCompleted: (dataDto) => {},
				onError: () => {}
			})
		);
		dispatch(
			actions.getClientDoExam({
				params: { assignmentId: localStorage.getItem('assignmentId') },
				onCompleted: (dataqs) => {},
				onError: () => {}
			})
		);
	}, [dispatch]);

    const onExamSubmit = (data) => {
        dispatch(
            actions.createExamSubmit({
                params: {
                    assignmentId: examClientDoExamData.id,
                    answerList: data
                },
                onCompleted: (dataqs) => {
                    
                },
                onError: () => {
                   
                }
            })
        )
    }

	return (
		<div className='verify-exam-container client-container'>
			{
				<VerifySubmitPage onSubmit={onExamSubmit}
					studentAnswers={examClientDoExamData?.answerList}
					assignmentTitle={assignmentClientData?.assignmentTitle}
				/>
			}
		</div>
	);
};

export default VerifyExam;