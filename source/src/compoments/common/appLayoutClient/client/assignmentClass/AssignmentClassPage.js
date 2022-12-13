import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List } from 'antd';
import { UserOutlined, PlusOutlined,  } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';

import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';
import RichTextField from "../../../../common/entryForm/RichTextField";

const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Bài',
        dataIndex: 'lesson',
        key: 'lesson',
    },
    {
      title: 'Chương',
      dataIndex: 'chapter',
      width: 100,
      key: 'chapter',
    },
    {
        title: 'Thời gian hết hạn',
        dataIndex: 'timeremain',
        width: 250,
        key: 'timeremain',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        width: 100,
        key: 'status',
      },
  ];

  const data = [
    {
      question: 'Bài tập trắc nghiệm',
      lesson: 'Ngôn ngữ lập trình',
      chapter: 'Chương 1',
      timeremain: "00:30:00",
      status: 'Chưa làm',
    },
    {
        question: 'Bài tập tự luận',
        lesson: 'Ngôn ngữ lập trình',
        chapter: 'Chương 1',
        timeremain: "00:30:00",
        status: 'Chưa làm',
    },
    {
        question: 'Bài tập nộp file',
        lesson: 'Ngôn ngữ lập trình',
        chapter: 'Chương 1',
        timeremain: "2 ngày 3 giờ còn lại",
        status: 'Chưa làm',
    },
  ];

const AssignmentClassPage = ({}) => {
    const history = useHistory();
    return (
        <div className="assginment-class-page">
             <div className='title'>Danh sách bài tập trong lớp</div>
             <div className='table'> 
             <Table columns={columns} dataSource={data} pagination={false} />
             </div>
            
        </div>
    )
}

export default AssignmentClassPage