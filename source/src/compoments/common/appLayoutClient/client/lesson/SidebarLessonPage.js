import React, {useState} from 'react'
import { Divider, Tag, Avatar, Comment, Tooltip } from 'antd';
import { UserOutlined, PlusOutlined, FolderOutlined, FileTextOutlined  } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import apiConfig from '../../../../../constants/apiConfig';
import Utils from '../../../../../utils';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';


const SidebarLessonPage = ({data}) => {
    const history = useHistory();
    const lessonId = Number(window.localStorage.getItem("lessonId"));
    return (
        <div className="sidebarLesson">
            <div className='title'>Danh sách bài học</div>
        </div>
    )
}

export default SidebarLessonPage
