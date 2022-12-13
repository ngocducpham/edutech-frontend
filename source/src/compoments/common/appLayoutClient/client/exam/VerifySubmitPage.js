import React, { useState } from 'react';
import {
	Row,
	Col,
	Button,
	Popover,
	Card,
	Avatar,
	Space,
	Table,
	Dropdown,
	Menu,
	List,
	Typography,
	Checkbox
} from 'antd';
import { UserOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';

import { sitePathConfig } from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';
import RichTextField from '../../../entryForm/RichTextField';

const columns = [
	{
		title: 'Câu hỏi',
		dataIndex: 'question',
		key: 'question'
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status'
	}
];

const VerifySubmitPage = ({ studentAnswers, assignmentTitle }) => {
	let index = 1;
	const answers = studentAnswers?.map((ans) => ({
		question: index++,
		status: !!ans.answer ? 'Đã lưu câu trả lời' : 'Chưa lưu câu trả lời'
	}));

	const history = useHistory();
	return (
		<div className='verify-exam-page'>
			<div className='title-name'>{assignmentTitle}</div>
			<div className='time-remain'>Tổng quan bài làm</div>
			<div className='table-verify'>
				<Table columns={columns} dataSource={answers} pagination={false} />
			</div>
			<div className='btn-verify'>
				<Button type='primary'>Xác nhận nộp bài</Button>
			</div>
		</div>
	);
};

export default VerifySubmitPage;
