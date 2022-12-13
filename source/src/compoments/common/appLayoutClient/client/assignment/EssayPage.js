import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List } from 'antd';
import { UserOutlined, PlusOutlined,  } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';

import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';
import RichTextField from "../../../../common/entryForm/RichTextField";


const EssayPage = ({}) => {
    const history = useHistory();
    return (
      <div className="essay-page">
        <div>
            <div className='title-name'>Bài tập tự luận</div>
            <div className='frame'>
                <Row>
                    <Col className='title-1' span={6}>
                        Trạng thái bài nộp:
                    </Col>
                    <Col className='title-2' span={18}>
                        Chưa nộp
                    </Col>
                </Row>
                <Row>
                    <Col className='title-1' span={6}>
                        Điểm số:
                    </Col>
                    <Col className='title-2' span={18}>
                        Chưa chấm điểm
                    </Col>
                </Row>  
                <Row>
                    <Col className='title-1' span={6}>
                        Thời gian hết hạn:
                    </Col>
                    <Col className='title-2' span={18}>
                        00:00:00
                    </Col>
                </Row>
                <Row>
                    <Col className='title-1' span={6}>
                        Chỉnh sửa lần cuối:
                    </Col>
                    <Col className='title-2' span={18}>
                      -
                    </Col>
                </Row>
                <Row>
                    <Col className='title-1' span={6}>
                        Văn bản trực tuyến:
                    </Col>
                    <Col className='title-2' span={18}>
                      <RichTextField />
                    </Col>
                </Row>
            </div>
            <div className='btn-submit'>
                <Button type='primary'>Nộp bài</Button>
            </div>
        </div>
    </div>
    )
}

export default EssayPage
