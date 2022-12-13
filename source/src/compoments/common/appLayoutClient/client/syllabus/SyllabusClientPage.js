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
        dataIndex: 'avatar',
        align: 'center',
        width: 100,
        render: (avatar) => (
            <Avatar
                className='table-avatar'
                size='large'
                icon={<UserOutlined />}
                src={
                    avatar
                        ? `${AppConstants.contentRootUrl}${avatar}`
                        : null
                }
            />
        )
    },
    { title: "Tên giáo án", dataIndex: 'title' },
];

const SyllabusClientPage = ({data}) => {
    const history = useHistory();
    let syllabusId = data.id 
    let dataSyllabus = [data];
    window.localStorage.setItem("syllabusId", syllabusId);
    return (
        <div className="syllabus-page">
             <div className='title'>Danh sách giáo án</div>
             <BaseTable columns={columns} dataSource={dataSyllabus} />
        </div>
    )
}

export default SyllabusClientPage
