import React, {useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Popover, Card, Avatar, Tooltip, Modal, Form } from 'antd';
import { AppConstants, UserTypes, UploadFileTypes } from '../../../../../constants';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig'
import { ContainerOutlined, PlusCircleOutlined, EditOutlined  } from "@ant-design/icons";
import { actions } from '../../../../../actions';
import Utils from '../../../../../utils';
import { showErrorMessage } from '../../../../../services/notifyService';
import DropdownField from '../../../entryForm/DropdownField';
import CropImageFiled from '../../../entryForm/CropImageFiled';
import TextField from '../../../entryForm/TextField';


import Calender from './Calender';

const { Meta } = Card;



const ClassClientPage = ({data, dataSyl, getSyllabusList, onUpdate}) => {
    const history = useHistory();
    const userKind = actions.getUserData().kind;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const formRef = useRef()
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
    const [avatar, setAvatar] = useState(null)

    const [uploading, setUploading] = useState(false)

    const syllabusOptions = dataSyl ? dataSyl.map(d => {
        return {
            value: d.id,
            label: d.title,
        }
    }) : [];

    console.log("dataSyl", data)
    function handleOnClick(syllabusId){
        if(syllabusId === true)
        {
            history.push(`${sitePathConfig.classNews.path}`)
        }else{
            return;
        }
           
    }

    const handleChangeAvatar = (info) => {
        if (info.file.status === "done") {
          Utils.getBase64(info.file.originFileObj, (avatar) =>
            setAvatar(avatar)
          );
        }
        console.log("ava", info)
    };

    const uploadFileAvatar = (file, onSuccess) => {
        setUploading(true)
        dispatch(
            actions.uploadFile({
                params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
                onCompleted: (result) => {
                    form.setFieldsValue({avatar: result.data.filePath})
                    console.log("check", form.getFieldsValue({avatar}))
                    setUploading(false)
                    onSuccess();
                  },
                  onError: (err) => {
                    if (err && err.message) {
                      showErrorMessage(err.message);
                      setUploading(false)
                    }
                  },
            })
        )
      };


    const handleSubmit = (values) => {
        onUpdate({
            classId: Number(localStorage.getItem("classId")),
            ...values
        });
        setModalVisible(false)
    }

    const handleSubmitUpdate = (values) => {
        onUpdate({
            classId: Number(localStorage.getItem("classId")),
            ...values
        });
        setModalVisibleUpdate(false)
    }

    return (
        
        <>  
            <div className={ 'class-list-page client-container ' +  (userKind === UserTypes.TEACHER && 'none-aside-barz')}>
                {
                    data &&
                    data.map(d => {
                        return (
                            <>
                            <Card
                            className='card'
                            
                            cover={
                            <img
                            onClick={() => {handleOnClick(!!d.syllabusId); window.localStorage.setItem("classId",d.id); window.localStorage.setItem("syllabusId", d.syllabusId); window.localStorage.setItem("className", d.title)}}
                                className='img'
                                alt="avatar"
                                src={d.avatar ? `${AppConstants.contentRootUrl}${d.avatar}` : null}
                            />
                            }
                        	>
                            <div className='frame'>
                                <div className='nameClass' onClick={() => {handleOnClick(!!d.syllabusId); window.localStorage.setItem("classId",d.id); window.localStorage.setItem("syllabusId", d.syllabusId); window.localStorage.setItem("className", d.title)}}>
                                    {d.title} 
                                </div>
                                {
                                    userKind === UserTypes.TEACHER ? (
                                        !!d.syllabusId ? <div onClick={() => {getSyllabusList(d.subject.id); window.localStorage.setItem("classId",d.id); setModalVisibleUpdate(true); form.setFieldsValue({title: d.title}); form.setFieldsValue({syllabusId: d.syllabusId}); setAvatar(`${AppConstants.contentRootUrl}${d.avatar}`)}}><EditOutlined /></div> 
                                        : 
                                        <div onClick={() => {getSyllabusList(d.subject.id); setModalVisible(true)}}><Tooltip title="Thêm giáo án cho lớp học này"><PlusCircleOutlined  /></Tooltip></div>
                                    )
                                    :
                                    <div></div>
                                }
                              
                            </div>
                           
                        </Card>
                        {
                            !!d.syllabusId === true ? 
                            <Modal
                            className='modal'
                            width={650}
                            onCancel={() => setModalVisibleUpdate(false)}
                            title='Cập nhật lớp học'
                            visible={modalVisibleUpdate}
                            onOk={form.submit}
                            >
                                <Form
                                form={form}
                                innerRef={formRef}
                                layout="vertical"
                                onFinish={handleSubmitUpdate}
                                >
                                <Row gutter={16}>
                                    <Col span={24}>
                                    <CropImageFiled
                                        fieldName="avatar"
                                        loading={uploading}
                                        label="Avatar"
                                        imageUrl={avatar}
                                        onChange={handleChangeAvatar}
                                        uploadFile={uploadFileAvatar}
                                    />
                                    </Col>
                                    <Col span={24}>
                                    <DropdownField
                                        fieldName="syllabusId"
                                        label="Giáo án"
                                        required
                                        options={syllabusOptions}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <TextField
                                        fieldName="title"
                                        label="Tên lớp"
                                        required
                                        />
                                    </Col>
                                </Row>
                                </Form>
                            </Modal> 
                            :
                            <Modal
                            className='modal'
                            width={650}
                            onCancel={() => setModalVisible(false)}
                            title='thêm giáo án lớp học'
                            visible={modalVisible}
                            onOk={form.submit}
                            >
                                <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                >
                                <Row gutter={16}>
                                    <Col span={24}>
                                    <DropdownField
                                        fieldName="syllabusId"
                                        label="Giáo án"
                                        required
                                        options={syllabusOptions}
                                        />
                                    </Col>
                                </Row>
                                </Form>
                            </Modal>
                        }
                       
                        </>
                        )
                    })
                }
              
            </div>
            
            <div className='client-page-height' style={{display: 'grid', gap: '10px 0px', gridTemplateRows: 'max-content 1fr'}}>
                <div className='client-container'><Calender /></div>
                <div className='client-container'>News
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>
        </>
    )
}

export default ClassClientPage
