import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List } from 'antd';
import { UserOutlined, PlusOutlined,  } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';


const ChapterLessonClientStudentPage = ({data}) => {
    const history = useHistory();
    console.log("dataStudent", data)
    return (
        <div className="chapter-lesson-page">
             <div className='title'>Danh sách các bài học</div>
            {
            data.map((chapter, index) => (
                <List
                    locale={{ emptyText: "Chưa có bài học" }}
                    className="list"
                    header={
                        <div className="header">
                           Chương {index + 1}. {chapter.title}
                        </div>
                    }
                    bordered
                    dataSource={chapter.lessons}
                    renderItem={(lesson, index) => (
                        <div className="content">
                            <List.Item >
                                <a onClick={() => {
                                    history.push(`${sitePathConfig.lessonClient.path}`);
                                    window.localStorage.setItem("lessonId",lesson.id);
                                    window.localStorage.setItem("chapterId",chapter.id) }}
                                >
                                    {lesson.title}
                                </a>
                            </List.Item>
                        </div>
                    )}
                />
            ))
            }
        </div>
    )
}

export default ChapterLessonClientStudentPage
