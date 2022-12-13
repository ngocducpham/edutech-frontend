import React from 'react';
import { Divider } from 'antd';
import {
    UsergroupAddOutlined,
    ControlOutlined,
    FileTextOutlined,
    UserOutlined,
    QuestionOutlined,
    UnorderedListOutlined,
    InboxOutlined,
    UserAddOutlined,
    ShoppingCartOutlined,
    CarryOutOutlined,
    BookOutlined,
    FolderOutlined,
    ExperimentOutlined,
	FileSearchOutlined,
	ReconciliationOutlined,
	WechatOutlined,
	FilePdfOutlined,
	UserSwitchOutlined,
	ExceptionOutlined,
	TeamOutlined,
	ProfileOutlined
} from '@ant-design/icons';
import { sitePathConfig } from '../constants/sitePathConfig';
import store from '../store';
import { actions } from "../actions";
import { categoryKinds } from './masterData';
import qs from 'query-string';
import { showErrorMessage } from '../services/notifyService';
import apiConfig from './apiConfig';

const { CATEGORY_KIND_PRODUCT } = categoryKinds;
const strParams = params => {
    return qs.stringify(params)
}

const navMenuConfig = [
	{
		label: 'Account Management',
		icon: <UsergroupAddOutlined />,
		children: [
			{
				label: 'Admin',
				...sitePathConfig.admin
			},
			{
				label: 'Teacher',
				...sitePathConfig.teacher
			},
			{
				label: 'Student',
				...sitePathConfig.student
			}
		]
	},
	{
		label: 'Category',
		icon: <UnorderedListOutlined />,
		children: [
			{
				label: 'Category',
				...sitePathConfig.category
			}
		]
	},
	{
		label: 'Course',
		icon: <ExperimentOutlined />,
		children: [
			{
				label: 'Major',
				...sitePathConfig.major
			},
			{
				label: 'Subject',
				...sitePathConfig.subject
			},
			{
				label: 'Class',
				...sitePathConfig.classv1
			}
		]
	},
	{
		label: 'News',
		icon: <FileTextOutlined />,
		children: [
			{
				label: 'News',
				...sitePathConfig.news
			}
		]
	},
	{
		label: 'System',
		icon: <ControlOutlined />,
		children: [
			{
				label: 'Role',
				...sitePathConfig.groupPermission
			},
			{
				label: 'Province',
				...sitePathConfig.province
			}
		]
	}
];

const teacherNavMenuConfig = [
	{
		label: 'ClassList',
		icon: <ControlOutlined />,
		...sitePathConfig.classListClient
	},
	{
		label: 'NewsCommon',
		icon: <FileTextOutlined />,
		...sitePathConfig.allClassNews
	},
	
];

const studentNavMenuConfig = [
	{
		label: 'ClassList',
		icon: <ControlOutlined />,
		...sitePathConfig.classListClient
	},
	{
		label: 'NewsCommon',
		icon: <FileTextOutlined />,
		...sitePathConfig.allClassNews
	},
	
];

const customNavMenuConfig = [
	{
		label: 'Bảng tin lớp',
		icon: <ReconciliationOutlined />,
		...sitePathConfig.classNews
	},
	{
		label: 'Bài học',
		icon: <FilePdfOutlined />,
		...sitePathConfig.chapterLessonClient
	},
	{
		label: 'Thảo luận',
		icon: <WechatOutlined />,
		...sitePathConfig.discussClass
	},

	{
		label: 'Thành viên',
		icon: <TeamOutlined />,
		...sitePathConfig.studentClassListClient
	},
	{
		label: 'Bài tập',
		icon: <QuestionOutlined />,
		...sitePathConfig.assignmentClass
	},
	{
		label: 'Bảng điểm',
		icon: <ProfileOutlined />,
	},
];


export { navMenuConfig, teacherNavMenuConfig, customNavMenuConfig, studentNavMenuConfig };
