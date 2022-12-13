import React, {useState} from 'react'
import { Row, Col, Button, Popover, Card, Avatar, Space, Table, Dropdown, Menu, List, Upload , message } from 'antd';
import { UserOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { AppConstants } from '../../../../../constants';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

const SubmitFilePage = ({}) => {
    const history = useHistory();

    

    return (
        <div className="submit-file-page">
            <div>
                <div className='title-name'>Bài tập nộp file</div>
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
                            Tệp:
                        </Col>
                        <Col className='title-2' span={18}>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Nhấp hoặc kéo tệp đến khu vực này để tải lên</p>
                        </Dragger>
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

export default SubmitFilePage
