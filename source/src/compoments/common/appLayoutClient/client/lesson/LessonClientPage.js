import React, {useCallback, useMemo, useState} from 'react'
import { Divider, Tag, Avatar, Dropdown, Tooltip, Menu, Form, Button, Input, Collapse, Modal, List, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, FolderOutlined, DownloadOutlined, DeleteOutlined, UpOutlined, DownOutlined, InboxOutlined  } from '@ant-design/icons';
import { AppConstants, UserTypes } from '../../../../../constants';
import { commonStatus, commonAssignmentTypes } from "../../../../../constants/masterData";
import apiConfig from '../../../../../constants/apiConfig';
import Utils from '../../../../../utils';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import { convertStringToDateTime, convertDateTimeToString } from "../../../../../utils/datetimeHelper";
import BaseTable from '../../../table/BaseTable';
import {actions} from '../.././../../../actions/account';
import DropdownField from '../../../entryForm/DropdownField';
import DatePickerField from '../../../entryForm/DatePickerField';
import DiscussForm from './DiscussForm';
import TextField from '../../../entryForm/TextField';
import NumericField from '../../../entryForm/NumericField';
const { getUserData } = actions;
const {Panel} = Collapse;
const { confirm } = Modal;



const LessonClientPage = ({data, syllabus, lessonDiscussListData, assignmentClassLessonData, onSubmit, onDelete, updateAssignmentClass}) => {
    const history = useHistory();
    const userKind = actions.getUserData().kind;
    const [form] = Form.useForm();
    const fileDownloadUri = AppConstants.apiRootUrl + apiConfig.resource.teacherDownloadFileSyllabus.path
    const attachment = Utils.parseJson(data.attachment);
    const [open, setOpen] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const lessonId = Number(window.localStorage.getItem("lessonId"));
    const chapterId = Number(window.localStorage.getItem("chapterId"));
    const classId = Number(window.localStorage.getItem("classId"));
    let userData = getUserData();
    const userId = userData.id;
    const kind = userData.kind

    console.log("assignmentClassLessonData", assignmentClassLessonData)

    const items = contentData(syllabus);

    const handleContentClick = (item) => {
        window.localStorage.setItem("lessonId",item.key);
        window.localStorage.setItem("chapterId",item.keyPath[1]) ;
        history.push(`${sitePathConfig.lessonClient.path}`);
    }

    const onChangeDateStart = (value) => {
        const Date = form.getFieldsValue('start');
        if(Date) {
            form.setFieldsValue('start', value);
        }
    }
    const onChangeDateEnd = (value) => {
        const Date = form.getFieldsValue('end');
        if(Date) {
            form.setFieldsValue('end', value);
        }
    }

    const display = (seconds) => {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60
        return [hours, minutes, seconds % 60].map(format).join(':')
    }

    function convertHMS(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
    }

    const convertStoM = (value) => {
        return Math.floor(value / 60)
    }

    const convertMtoS = (value) => {
        return Math.floor(value * 60)
    }
    
    const validateDate = () => {
        const dtEnd = form.getFieldsValue('end')
        const dtStart = form.getFieldsValue('start')
        const comp = dtEnd - dtStart;
        if(comp < 0){
            alert("1")
        }
    }

    const handleShowDiscuss = () => {
        setOpen(!open)
    }

    const handleCloseDiscuss = () => {
        setOpen(false)
    }

   const handleSubmit = (values) => {
        if(values.duration){
            values.duration = values.duration
        }
        if(values.start) {
            values.start = values.start
        }
        if(values.end) {
            values.end = values.end
        }
        const id = Number(localStorage.getItem("assignmentId"));
        updateAssignmentClass({
            ...values,
            id: id,
            start: convertDateTimeToString(values.start, 'DD/MM/YYYY HH:mm:ss'),
            end: convertDateTimeToString(values.end, 'DD/MM/YYYY HH:mm:ss'),
            duration: convertMtoS(values.duration),
        })
        setIsShowModal(false)
   }

   

    const deleteConfirm = useCallback(
		(id) => {
			Modal.confirm({
				title: 'X??a th???o lu???n n??y',
				content: '',
				okText: 'X??a',
				cancelText: 'H???y',
				okType: 'danger',
				onOk: () => {
					onDelete(id);
				},
                onCancel() {
                    // console.log('Cancel');
                },
			});
		},
		[onDelete]
	);

    
    const columns = [
        { 
            title: "Th???o lu???n",
            width: 500, 
            render: (dataRow) => {
                return (
                    <span className="routing" onClick={() => {window.localStorage.setItem("discussId",dataRow.id);history.push(`${sitePathConfig.discussClient.path}`); }}>
                        {dataRow.title}
                    </span>
                )
            }
        },
       
        {
            title: "Ng?????i kh???i t???o",
            render: (dataRow) => {
                return (
                    <span>
                        {dataRow.userName}
                    </span>
                )
            }
        },
        {
            title: "Ng??y kh???i t???o",
            dataIndex: 'created_date',
        },
        {
            title: "#",
            render: (dataRow) => { 
                return (
                    userData.kind === UserTypes.TEACHER ? 
                    <span>
                        <DeleteOutlined className='hv' onClick={() => deleteConfirm(dataRow.id)} />
                    </span> : 
                    <span>
    
                    </span>
                )
               
            }
        }
    ];

    return (
        <>
            <div className={'lesson-page client-container'} >
                <div className='content'>
                    <div className='video'  dangerouslySetInnerHTML={{ __html: data.content }}></div>
                </div>
                <Divider />
                {attachment?.length > 0 && 
                    <div className='document'>
                        <div className='title-document'>T??i li???u</div>
                        {
                            attachment?.map((d,i) => (
                                <Tooltip title="Click v??o ????? t???i xu???ng"><Tag className='tag' onClick={() => {
                                    window.open(fileDownloadUri + d, '_blank').focus();
                                }}>
                                    <DownloadOutlined style={{marginRight: '5px'}} />
                                    {Utils.getFileNameFromPath(decodeURI(fileDownloadUri +fileDownloadUri + d)).split('/').pop().split('_').splice(1).join('_')}
                                </Tag></Tooltip>
                            ))
                        }
                    <Divider />
                    </div>
                }
                <div className='assignment'>
                    <div className='title-assignment'>B??i t???p</div>
                    {
                        userKind === UserTypes.TEACHER ? 
                        <div className='item-assign'>
                        <List
                            itemLayout="horizontal"
                            dataSource={assignmentClassLessonData}
                            renderItem={(item) => (
                            <List.Item>
                                <div className='name-assign' onClick={() => { 
                                    window.localStorage.setItem("assignmentId", item.id); 
                                    window.localStorage.setItem('typeAsm',item.type);
                                    window.localStorage.setItem('assignmentClassId', item.id);
                                    alert("id" + item.id)
                                    history.push(`${sitePathConfig.assignmentClient.path}`,{assignmentId: item.id})
                                }}><InboxOutlined style={{fontSize: '16px'}} /> {item.title}</div>
                                <div className='action'>
                                <Dropdown
                                    trigger={['click']}
                                    overlay={
                                        <Menu>
                                            <Menu.Item
                                                onClick={() => {
                                                   
                                                    setIsShowModal(true);
                                                    form.setFieldsValue({duration: convertStoM(item.duration)});
                                                    form.setFieldsValue({max_attempt: item.maxAttempt});
                                                    form.setFieldsValue({status: item.status});
                                                    form.setFieldsValue({type: item.type});
                                                    form.setFieldsValue({start: convertStringToDateTime(item.start, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY')});
                                                    form.setFieldsValue({end: convertStringToDateTime(item.end, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY')});
                                                }}
                                                icon={<EditOutlined />}
                                            >
                                                Ch???nh s???a
                                            </Menu.Item>
                                            <Menu.Item
                                            
                                            icon={<DeleteOutlined />}>
                                                X??a
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type='text' icon={<EllipsisOutlined rotate={90} />} />
                                    </Dropdown>
                                </div>
                            </List.Item>
                            )}
                        />
                            <Modal
                            className='modal'
                            width={650}
                            onCancel={() => setIsShowModal(false)}
                            title='C???p nh???t b??i t???p'
                            visible={isShowModal}
                            onOk={form.submit}
                            >
                                <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <NumericField
                                          fieldName="duration"
                                          min={0}
                                          label="Th???i gian th???c hi???n (ph??t)"
                                          placeholder="Nh???p v??o s??? ph??t"
                                          required
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <NumericField 
                                            fieldName="max_attempt"
                                            min={1}
                                            label="S??? l???n cho ph??p"
                                            placeholder="Nh???p v??o s??? l???n cho ph??p"
                                            required
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <DropdownField
                                            fieldName="status"
                                            label="Tr???ng th??i"
                                            required
                                            options={commonStatus}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <DropdownField
                                            fieldName="type"
                                            label="Lo???i b??i t???p"
                                            required
                                            options={commonAssignmentTypes}
                                        />
                                    </Col>
                                    <Col span={12}>
                                    <DatePickerField
                                        fieldName="start"
                                        label="Th???i gian b???t ?????u"
                                        onChange={onChangeDateStart}
                                        format={"DD/MM/YYYY"}
                                        placeholder="Th???i gian b???t ?????u"
                                    />
                                    </Col>
                                    <Col span={12}>
                                    <DatePickerField
                                        fieldName="end"
                                        label="Th???i gian k???t th??c"
                                        onChange={onChangeDateEnd}
                                        format={"DD/MM/YYYY"}
                                        placeholder="Th???i gian k???t th??c"
                                    />
                                    </Col>
                                </Row>
                                </Form>
                            </Modal>
                    </div>
                        :
                        <div className='item-assign'>
                        <List
                            itemLayout="horizontal"
                            dataSource={assignmentClassLessonData}
                            renderItem={(item) => (
                            <List.Item>
                                <div className='name-assign' onClick={() => {window.localStorage.setItem("assignmentId", item.id); ; window.localStorage.setItem('typeAsm',item.type); window.localStorage.setItem('assignmentClassId', item.id);history.push(`${sitePathConfig.assignmentClient.path}`); }}><InboxOutlined style={{fontSize: '16px'}} /> {item.title}</div>
                            </List.Item>
                            )}
                        />
                    </div>
                    }
                 
                </div>
                <Button type="primary" onClick={handleShowDiscuss}><span>T???o m???t ch??? ????? ????? th???o lu???n </span>
                    {
                        open ? <UpOutlined /> : <DownOutlined />
                    }
                </Button>
                <div className='discuss'>
                    {
                        open ? 
                        <DiscussForm
                        onSubmit={onSubmit}
                        onShow={handleShowDiscuss}
                        onClose={handleCloseDiscuss}
                        /> 
                        :
                        null
                    }
                    
                </div>

                
                <div className='discuss'>
                    <div className='title-discuss'>Th???o lu???n</div>
                    {
                        lessonDiscussListData ?  <BaseTable columns={columns} dataSource={lessonDiscussListData} />
                        : <div>Ch??a c?? cu???c th???o lu???n n??o</div>
                    }
                   
                </div>
            </div>

            <div className='client-container' style={{height: '100%',top: 66, overflow: 'scroll', position: 'fixed', right: '2px', width: '20%'}}>
                <div style={{fontSize: '16px', fontWeight: '500', marginBottom: 10}}>M???c l???c</div>
                <Menu
                    onClick={handleContentClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={[window.localStorage.getItem('lessonId').toString()]}
                    defaultOpenKeys={[window.localStorage.getItem('chapterId').toString()]}
                    mode="inline"
                >
                    {items}
                </Menu>
            </div>
            
        </>
    )
}


function contentData(syllabus){
    return syllabus?.map((chapter) => {
        return chapter.lessons ? (
          <Menu.SubMenu key={chapter.id} title={chapter.title}>
            {chapter.lessons.map(lesson => {
              return (<Menu.Item key={lesson.id}>{lesson.title}</Menu.Item>)
            })}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={chapter.key}>{chapter.title}</Menu.Item>
        );
      });
}


export default LessonClientPage
