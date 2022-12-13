import React, {useEffect, useRef, useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List, Typography , Checkbox } from 'antd';
import { UserOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';

import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';
import RichTextField from "../../../entryForm/RichTextField";
import VerifySubmitPage from './VerifySubmitPage';
import { addSeconds, format, isBefore, isFuture } from 'date-fns';
import moment from 'moment';


const ExamPage = ({examClientDoExamData, createClientAnswer,updateClientAnswer , assignmentClientData, endDuration}) => {
    const [countDown, setCountDown] = useState(endDuration ? calculateCountDown(endDuration) : null);

    const history = useHistory();
    const questionList = examClientDoExamData.questionList || [];

    // console.clear();
    // console.log('assignmentClientData', assignmentClientData)

    function calculateCountDown(duration){
        const diff = duration - new Date();
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor(diff / 1000) % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        const id = setInterval(() => {
            if(!isFuture(endDuration)){
                clearInterval(id);
                return;
            }
            setCountDown(calculateCountDown(endDuration));
        }, 1000);

        return () => clearInterval(id);

    }, [assignmentClientData, endDuration])

    const handleScrollQs = (id) => {
        const ques = document.getElementById(id);
        window.scrollTo(0, getOffset(ques).top - 100)
    }
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY
        };
      }
    return (
        <>
        <div className={'exam-page client-container'}>
        {questionList && questionList.map((data, index) => {
					return (
                        <div id={index+1}>
						<List
                             
							key={data.id}
							style={{
								borderRadius: '5px',
								marginBottom: '20px'
							}}
							header={
								<div style={{ display: 'flex', justifyContent: 'space-between'}} >
									<div style={{ fontSize: '17px',color: '#3131b7'}}
									>
										Câu {index + 1} <span>({data.point}đ)</span>
									</div>
									
								</div>
							}
							bordered
							dataSource={[data]}
							renderItem={(item) => (
								<List.Item >
									<ExamQuestion question={data} createClientAnswer={createClientAnswer} examClientDoExamData={examClientDoExamData} item={item}  />
								</List.Item>
							)}
						/>
                        </div>
					);
				})}
        </div>
        <div className='client-container table-question' style={{height: '100%',top: 66, overflow: 'scroll', position: 'fixed', right: '2px', width: '20%'}}>
            <div className='title-ques' >{assignmentClientData.title}</div>
            {countDown && <div className='title-ques' style={{color: 'red'}} >Thời gian còn lại: {countDown}</div>}
            <div className='title-ques' >Bảng câu hỏi</div>
            <div className='table-ques'>
                {
                    questionList && questionList.map((q, i) => {
                        return (
                            <a onClick={() => handleScrollQs(1)} className='item-ques'>{i+1}</a>
                        )
                    })
                }

            </div>
            <div  className='btn-ques'>
                <Button onClick={() => history.push(`${sitePathConfig.verifyExam.path}`)} style={{width: '100%'}} type='primary'>Nộp bài</Button>
            </div>
        </div>
         </>
    )
}

const ExamQuestion = ({question, createClientAnswer, examClientDoExamData, item}) => {

    const answer = useRef([])
    return (
        <div className="bodyList">
            <div className='content'
                dangerouslySetInnerHTML={{ __html: question.content }}
            ></div>
            {
                question.answer &&
                JSON.parse(question.answer).map((d,i) => {
                    return (
                        <>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Checkbox onClick={(e) => {
                                const ans = answer.current.find(a => a === d.content)
                                const ansIndex = answer.current.findIndex(a => a === d.content)
                                if(e.target.checked === false){
                                    answer.current.splice(ansIndex, 1)
                                }
                                if(!ans && e.target.checked === true) {
                                    answer.current.push(d.content)
                                }

                                const body = {contents: []}
                                answer.current.forEach(a => {
                                    body.contents.push({content: a})
                                })
                                console.log("body", JSON.stringify(body));
                                createClientAnswer(examClientDoExamData.id, item.id, JSON.stringify(body))
                            }} />
                            <div style={{marginRight: '10px'}}  dangerouslySetInnerHTML={{ __html: d.content }}>
                            </div>
                        </div>
                        </>
                    )
                })
            }
            
        </div>
    )
}

export default ExamPage
