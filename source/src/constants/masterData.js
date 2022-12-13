import {
    STATUS_ACTIVE,
    STATUS_LOCK,
    STATUS_PENDING,
    GroupPermissonTypes,
    CREATE,
    EDIT,
    DELETE,
    ASSIGNMENT
} from '.';

import React from 'react';
import SingleAnswer from '../compoments/question/typeQuestion/SingleAnswer';
import MutipleAnswer from '../compoments/question/typeQuestion/MutipleAnswer';
import FillAnswer from '../compoments/question/typeQuestion/FillAnswer';
import { EditOutlined, DeleteOutlined, ReadOutlined, PlusOutlined,FileProtectOutlined } from "@ant-design/icons";


export const groupPermissionTypes = [
    { value: GroupPermissonTypes.ADMIN, label: 'Quản trị viên' },
    { value: GroupPermissonTypes.CUSTOMER, label: 'Khách hàng' }
]

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Kích hoạt', color: 'green' },
    { value: STATUS_PENDING, label: 'Đang chờ', color: 'warning' },
    { value: STATUS_LOCK, label: 'Đang khóa', color: 'red' },
]

export const commonLanguages = [
    { value: 'vi', label: 'Việt Nam' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'German' },
]

export const commonKinds = [
    { value: 1, label: 'Tin tức' },
    { value: 2, label: 'Dịch vụ' },
]

export const commonSex = [
    { value: 0, label: 'Nữ' },
    { value: 1, label: 'Nam' }
]

const GENDER_MALE = 1
const GENDER_FEMALE = 2
const GENDER_OTHER = 3

export const genders = [
    { value: GENDER_MALE, label: 'Nam' },
    { value: GENDER_FEMALE, label: 'Nữ' },
    { value: GENDER_OTHER, label: 'Khác' },
]

const CATEGORY_KIND_IMPORT = 1;
const CATEGORY_KIND_EXPORT = 2;
const CATEGORY_KIND_PRODUCT = 3;
const CATEGORY_KIND_COLLABORATOR = 4;
const CATEGORY_KIND_NEWS_INTERNAL = 5;
const CATEGORY_KIND_NEWS_COLLABORATOR = 6;

export const categoryKinds = {
    CATEGORY_KIND_EXPORT,
    CATEGORY_KIND_IMPORT,
    CATEGORY_KIND_PRODUCT,
    CATEGORY_KIND_COLLABORATOR,
    CATEGORY_KIND_NEWS_INTERNAL,
    CATEGORY_KIND_NEWS_COLLABORATOR,
}

export const IMPORT_EXPORT_KIND_IMPORT = 1;
export const IMPORT_EXPORT_KIND_EXPORT = 2;

export const COLLABORATOR_PRODUCT_KIND_MONEY = 1;
export const COLLABORATOR_PRODUCT_KIND_PERCENT = 2;

export const SALARY_PERIOD_STATE_PENDING = 1;
export const SALARY_PERIOD_STATE_CALCULATED = 2;
export const SALARY_PERIOD_STATE_DONE = 3;

export const CustomerLoyaltyLevelColorConfig = {
    platinum: '#9470AA',
    diamond: '#70D1F4',
    gold: 'orange',
    silver: '#C0C0C0',
}

export const KPIResult = [
    {
        value: true,
        label: 'Done',
        color: 'green',
    },
    {
        value: false,
        label: 'NotDone',
        color: 'red',
    },
]

export const SETTING_KIND_ON_OFF = 1;
export const SETTING_KIND_TEXT = 2;
export const SETTING_KIND_DATE = 3;
export const SETTING_KIND_TIME = 4;
export const SETTING_KIND_TIMESTAMP = 5;
export const SETTING_KIND_UPLOAD = 6;


export const kindProvince = [
    {
        value: 'PROVINCE_KIND_PROVINCE'
    },
    {
        value: 'PROVINCE_KIND_DISTRICT'
    },
    {
        value: 'PROVINCE_KIND_COMMUNE'
    }
]

export const commonRatioImageSetting = [
    {
        value: 16 / 9,
        label: "16:9",
    },
    {
        value: 1 / 1,
        label: "1:1",
    },
    {
        value: 40 / 9,
        label: "40:9",
    },
]

export const newsKinds = [
    { value: CATEGORY_KIND_NEWS_INTERNAL, label: 'NewsKindInternal' },
    { value: CATEGORY_KIND_NEWS_COLLABORATOR, label: 'NewsKindCollaborator' },
]

const DegreeTypes = {
	master: {
		name: 'DOCTOR',
		value: 'Thạc sĩ'
	},
	doctor: {
		name: 'MASTER',
		value: 'Tiến sĩ'
	},
	professor: {
		name: 'PROFESSOR',
		value: 'Giáo sư'
	}
};

export const commonDegree = [
	{
		value: 'MASTER',
		label: 'Thạc sĩ'
	},
    {
		value: 'DOCTOR',
		label: 'Tiến sĩ'
	},
	{
		value: 'PROFESSOR',
		label: 'Giáo sư'
	}
];

export const ASPECT_CATEGORY_AVATAR = 16 / 9


export const commonActionChapter = [
    { value: CREATE, label: 'Thêm bài học', icon: <PlusOutlined />},
    { value: EDIT, label: 'Chỉnh sửa chương', icon: <EditOutlined />},
    { value: DELETE, label: 'Xóa chương', icon: <DeleteOutlined />},
]

export const commonAction = [
    { value: EDIT, label: 'Chỉnh sửa bài học',  icon: <EditOutlined /> },
    { value: DELETE, label: 'Xóa bài học', icon: <DeleteOutlined />},
    { value: ASSIGNMENT, label: 'Bài kiểm tra', icon: <FileProtectOutlined />},
]

export const commonAssignmentTypes = [
    { value: 1, label: 'Trắc nghiệm'},
    { value: 2, label: 'Tự luận'},
    { value: 3, label: 'Nộp file'},
]

export const commonQuestionTypes = [
    { 
        value: 1, 
        label: 'Trắc nghiệm một đáp án',
        Component: (props) => <div className="component"><SingleAnswer {...props}/></div>
    },
    { 
        value: 2, 
        label: 'Trắc nghiệm nhiều đáp án',
        Component: (props) => <div className="component"><MutipleAnswer {...props}/></div>
    },
]

export const questionTypeEssay = [
    { 
        value: 3, 
        label: 'Tự luận',
    },
]