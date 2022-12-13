import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List } from 'antd';
import { UserOutlined, PlusOutlined,  } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import { convertDateTimeToString, convertStringToDateTime } from '../../../../../utils/datetimeHelper';


const columns = [
    {
      title: 'Thời gian làm bài',
      dataIndex: 'attempt_time',
    },
    {
      title: 'Điểm số',
      dataIndex: 'total_point',
      width: 100
    },
  ];

  

const MutilpleChoicePage = ({createExam, data, examAssignmentData}) => {
    const history = useHistory();


    const convertStoM = (value) => {
      return Math.floor(value / 60)
    }

    return (
        <div className="mutilple-choice-page">
              {
                [data] && [data].map((d, i) => {
                  return (
                    <div>
                      <div className='title-name'>{d.title}</div>
                      <div className='dead-line'>Thời gian hết hạn: {d.end}</div>  
                      <div className='frame'>
                          <div className='head'>
                              
                              <div>Thời gian làm bài: {convertStoM(d.duration)} phút</div>
                              
                              <div>Số lần cho phép: {d.maxAttempt}</div>  
                          </div>
                          <div className='body'>
                              <div className='items-body'>
                              <Table columns={columns} dataSource={examAssignmentData} pagination={false} />
                              </div>
                          </div>
                      </div>
                      <div className='btn-submit'>
                          <Button onClick={() => {createExam(); history.push(`${sitePathConfig.exam.path}`) }} type='primary'>Làm bài trắc nghiệm</Button>
                      </div>
                    </div>
                  )
                })
              }
           
        </div>
    )
}

export default MutilpleChoicePage
