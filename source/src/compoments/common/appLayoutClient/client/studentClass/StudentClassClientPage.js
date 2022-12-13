import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';


const columns = [
    {
        title: '#',
        dataIndex: 'avatarPath',
        align: 'center',
        width: 100,
        render: (avatarPath) => (
            <Avatar
                className='table-avatar'
                size='large'
                icon={<UserOutlined />}
                src={
                    avatarPath
                        ? `${AppConstants.contentRootUrl}${avatarPath}`
                        : null
                }
            />
        )
    },
    { title: "Tên", dataIndex: 'fullName' },
   
    {
        title: "Chuyên ngành",
        dataIndex: ["major", "name"],
    },
    {
        title: "Năm nhập học",
        dataIndex: 'admissionYear',
    },
    { title: "Lần truy cập cuối", dataIndex: 'modifiedDate', width: '250px' },
];

const StudentClassClientPage = ({data}) => {
    console.log("data", data)
    return (
        <div className="student-class-client-page">
             <div className='title'>Danh sách thành viên trong lớp</div>
             <div className='table'>
             <BaseTable columns={columns} dataSource={data} />
             </div>
        </div>
    )
}

export default StudentClassClientPage
