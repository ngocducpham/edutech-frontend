import React, {useMemo, useState, useCallback} from 'react'
import { Divider, Tag, Avatar, Comment, Tooltip, Menu, Form, Button, Input, Collapse, Modal, Dropdown, Row, Col } from 'antd';
import { UserOutlined, PlusOutlined, FolderOutlined, DownloadOutlined, DeleteOutlined, EditOutlined,EllipsisOutlined, CommentOutlined  } from '@ant-design/icons';
import { AppConstants, UserTypes } from '../../../../../constants';
import qs from 'query-string';
import apiConfig from '../../../../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../../../utils';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';


const strParams = params => {
    return qs.stringify(params)
}

const DiscussClassPage = ({data}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classId = 
    console.log("data", data)
    return (
        <>
        <div className='discuss-class-page'>
            <div className='main-title'>Diễn đàn thảo luận</div>
            {
                data.map((d, idx) => (
                    
                    <div className='topic'>
                       
                        <div className='frame_discuss'>
                                <div className='title_fr'><span className='title' onClick={() => {window.localStorage.setItem("discussId",d.id); history.push(`${sitePathConfig.discussClient.path}`)}}>{d.title}</span></div>
                                <div className='main'>
                                    <div className='avatar'>
                                        <Avatar src={`${AppConstants.contentRootUrl}${d.userAvatar}`}/>
                                    </div>
                                    <div className='by'>Bởi <a className='author'>{d.userName}</a> - {d.created_date}</div>
                                </div>
                        </div>
                        <div className='lesson'><span className='lesson_name' onClick={() => {window.localStorage.setItem("classId",d.classId); window.localStorage.setItem("lessonId", d.lessonId);history.push(`${sitePathConfig.lessonClient.path}`)}}>{d.lessonName}</span></div>
                    </div>
                ))
            }
           
        </div>
        </>
    )
}
export default DiscussClassPage

