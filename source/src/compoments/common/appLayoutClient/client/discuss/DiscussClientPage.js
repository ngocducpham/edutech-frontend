import React, {useMemo, useState, useCallback, useEffect} from 'react'
import { Divider, Tag, Avatar, Comment, Tooltip, Menu, Form, Button, Input, Collapse, Modal, Dropdown, Row, Col } from 'antd';
import { UserOutlined, PlusOutlined, FolderOutlined, DownloadOutlined, DeleteOutlined, EditOutlined,EllipsisOutlined,SwapRightOutlined , CommentOutlined  } from '@ant-design/icons';
import { AppConstants, UserTypes } from '../../../../../constants';
import apiConfig from '../../../../../constants/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import Utils from '../../../../../utils';
import { useHistory } from 'react-router';
import { sitePathConfig} from '../../../../../constants/sitePathConfig';
import BaseTable from '../../../table/BaseTable';
import {actions} from '../../../../../actions';
import RichTextField from '../../../entryForm/RichTextField';
import TextField from '../../../entryForm/TextField';
import CommentPage from './CommentPage';

const {Panel} = Collapse;
const { confirm } = Modal;



const DiscussClientPage = ({data, commentData, syllabus, onCreate, onDelete, onUpdate, onGetChild, childCommentData, page, size, getCommentList}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openChild, setOpenChild] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isEditingChild, setIsEditingChild] = useState(null);
    const [isCmtChild, setIsCmtChild] = useState(null);
    const [showCmt, setShowCmt] = useState(false);
    const [isShowCmt, setIsShowCmt] = useState(null);
    const [isReadmore, setIsReadmore] = useState(null);
    const [numberCmt, setNumberCmt] = useState(1);
    const [showReadmore, setshowReadmore] = useState(false);
    const [parentId, setParentId] = useState(null)
    const [listLoading, setListLoading] = useState(false);
    const perPage = 3;
    const [form] = Form.useForm()
    const items = contentData(syllabus);
    const dataArr = [data];

  

    

    const commentDataFilter = commentData ? commentData.filter(element => !element.parentId) : [];

    console.log("commentDataFilter", commentDataFilter)
    const handleSubmitUpdate = (values) => {
        onUpdate({
            ...values
        });
        setIsEditing(null)
    }

    const handleSubmitUpdateChild = (values) => {
        onUpdate({
            ...values
        });
        setIsEditingChild(null);
    }

    const handleSubmitCreateChild = (formValues) => {
        let id = null;
        if(parentId !== null){
            id = parentId
        }else{
            id = null
        }
        onCreate({
            ...formValues,
            parentId: id,
        });
        setNumberCmt(numberCmt + 1)
        handleCloseCommentChild();
    }
    

    const subtraction = (total, size) => {
        setNumberCmt(total - size);
    }



    const deleteConfirm = useCallback((id) => {
			Modal.confirm({
				title: 'Xóa bình luận này',
				content: '',
				okText: 'Xóa',
				cancelText: 'Hủy',
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

    const deleteConfirmChild = useCallback((id) => {
        Modal.confirm({
            title: 'Xóa bình luận này',
            content: '',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger',
            onOk: () => {
                onDelete(id);
                setNumberCmt(numberCmt - 1)
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    },
    [onDelete]
);

    const handleContentClick = (item) => {
        history.push(`${sitePathConfig.lessonClient.path}`);
        window.localStorage.setItem("lessonId",item.key);
        window.localStorage.setItem("chapterId",item.keyPath[1]) 
    }

    const handleShowComment = () => {
        setOpen(true)
    }

    const handleCloseComment = () => {
        setOpen(false)
    }

    const handleShowCommentChild = () => {
        setOpenChild(true)
    }

    const handleCloseCommentChild = () => {
        setOpenChild(false)
    }

    const handleLoadShowComment = () => {
        setShowCmt(!showCmt)
    }

    const handleShowHideReadmore = () => {
        setshowReadmore(!showReadmore)
    }

    console.log("test", window.localStorage.getItem("commentId"))
 
    return (
        <>
            <div className={'discuss-client-page client-container'} >
                {
                    dataArr.map((d, i) => (
                        <div className='topic'>
                        <div className='header'>
                            <div className='maincontent'>Diễn đàn thảo luận</div>
                            <div className='title'>{d.title}</div>
                        </div>
                        <div className='body'>
                            <div className='frame_discuss'>
                                <div className='avatar'>
                                    <Avatar src={`${AppConstants.contentRootUrl}${d.userAvatar}`}/>
                                </div>
                                <div className='main'>
                                    <div className='title'>{d.title}</div>
                                    <div >Bởi <a className='author'>{d.userName}</a> - {d.created_date}</div>
                                </div>
                            </div>
                            <div className='content' dangerouslySetInnerHTML={{__html : d.content}}>                      
                            </div>
                            <div className='footer'>
                                <div></div>
                                <div className='reply'   >
                                    <span onClick={handleShowComment}>Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                }
                {
                    open ? <CommentPage onClose={handleCloseComment} onShow={handleShowComment} onSubmit={onCreate} /> : null
                }
                
                <div className='topic-reply'>
                    {
                        commentDataFilter && 
                        commentDataFilter.map((c, idx) => (
                        <div className='body' key={c.id}>
                            <div className='frame_discuss'>
                                <div className='avatar'>
                                    <Avatar src={`${AppConstants.contentRootUrl}${c.userAvatar}`}/>
                                </div>
                                <div className='main'>
                                    <div className='title'>Trả lời: {dataArr[0].title}</div>
                                    <div >Bởi<a className='author'> {c.userName}</a> - {c.created_date}</div>
                                </div>
                                <div className='action'>
                                    <Dropdown
                                                trigger={['click']}
                                                overlay={
                                                    <Menu>
                                                        <Menu.Item
                                                            onClick={() => {
                                                                window.localStorage.setItem("commentId", c.id)
                                                                setIsEditing(c.id)
                                                                form.setFieldsValue({content: c.content})
                                                            }}
                                                            icon={<EditOutlined />}
                                                        >
                                                            Chỉnh sửa
                                                        </Menu.Item>
                                                        <Menu.Item
                                                        onClick={() => deleteConfirm(c.id)}
                                                        icon={<DeleteOutlined />}>
                                                            Xóa
                                                        </Menu.Item>
                                                    </Menu>
                                                }
                                            >
                                                <Button type='text' icon={<EllipsisOutlined rotate={90} />} />
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='content'>                      
                                {
                                    isEditing === c.id ? 
                                    <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleSubmitUpdate}
                                    >
                                    <Row gutter={16}>
                                        <Col span={24}>
                                        <TextField
                                                    type="textarea"
                                                    fieldName="content"
                                                    label="Nội dung trả lời"
                                                    required
                                                    style={{
                                                        height: 100
                                                    }}
                                                    />
                                        </Col>
                                    </Row>
                                    <Row gutter={16} className="frame_btn">
                                            <Col >
                                            <Button type="dash" onClick={() => {setIsEditing(null)}}>
                                                Hủy
                                            </Button>
                                            </Col>
                                            <Col >
                                            <Button type="primary" htmlType="submit">
                                               Cập nhật
                                            </Button>
                                            </Col>
                                    </Row>
                                    </Form>  : <span>{c.content}</span>
                                }   
                            </div> 
                            <div className='footer'>
                                {
                                    c.childs ? <div className='cmt' onClick={() => {handleLoadShowComment(); setIsShowCmt(c.id); setIsReadmore(c.id); onGetChild(c.id); subtraction((c.childs).length, size); handleShowHideReadmore();localStorage.setItem("commentId", c.id)}}><CommentOutlined /> {(c.childs).length}</div> : <div className='cmt'><CommentOutlined /> 0</div>
                                }
                                <div></div>
                                <div className='reply'   >
                                    <span onClick={() => {handleShowCommentChild(); setIsCmtChild(c.id); setParentId(c.id)}}>Trả lời</span>
                                </div>
                            </div>
                            {
                                openChild && isCmtChild === c.id ? 
                                <div className="comment-page">
                                    <Form
                                    layout="vertical"
                                    onFinish={handleSubmitCreateChild}
                                    >
                                    <Row gutter={16}>
                                        <Col span={24}>
                                        <TextField
                                                    type="textarea"
                                                    fieldName="content"
                                                    label="nội dung câu trả lời"
                                                    required
                                                    style={{
                                                        height: 100
                                                    }}
                                                    />
                                        </Col>
                                    </Row>
                                    <Row gutter={16} hidden>
                                        <Col span={24}>
                                        <TextField
                                                    fieldName="parentId"
                                                    label="ParentId"
                                                    />
                                        </Col>
                                    </Row>
                                    <Row gutter={16} className="frame_btn">
                                            <Col >
                                            <Button type="dash" onClick={handleCloseCommentChild}>
                                                Đóng
                                            </Button>
                                            </Col>
                                            <Col >
                                            <Button type="primary" htmlType="submit">
                                                Gửi đi
                                            </Button>
                                            </Col>
                                    </Row>
                                </Form>
                            </div> : null
                                //<CommentPage numberCmt={numberCmt} parentId={c.id} onClose={handleCloseCommentChild} onShow={handleShowCommentChild} onSubmit={onCreate} /> : null
                            }
                            {
                                showCmt && isShowCmt === c.id  && childCommentData && childCommentData.map((child, i) => (
                                    <>
                                    <div className='body-child' key={child.id} >
                                        <div className='frame_discuss'>
                                            <div className='avatar'>
                                                <Avatar src={`${AppConstants.contentRootUrl}${child.userAvatar}`}/>
                                            </div>
                                            <div className='main'>
                                                <div className='title'>Trả lời: <span className='name'>{c.userName}</span></div>
                                                <div >Bởi<a className='author'> {child.userName}</a> - {child.created_date}</div>
                                            </div>
                                            <div className='action'>
                                            <Dropdown
                                                trigger={['click']}
                                                overlay={
                                                    <Menu>
                                                        <Menu.Item
                                                            onClick={() => {
                                                                window.localStorage.setItem("commentId", child.id)
                                                                setIsEditingChild(child.id)
                                                                form.setFieldsValue({content: child.content})
                                                            }}
                                                            icon={<EditOutlined />}
                                                        >
                                                            Chỉnh sửa
                                                        </Menu.Item>
                                                        <Menu.Item
                                                        onClick={() => {deleteConfirmChild(child.id); }}
                                                        icon={<DeleteOutlined />}>
                                                            Xóa
                                                        </Menu.Item>
                                                    </Menu>
                                                }
                                            >
                                                <Button type='text' icon={<EllipsisOutlined rotate={90} />} />
                                            </Dropdown>
                                            </div>
                                        </div>
                                        <div className='content'>                      
                                            {
                                                isEditingChild === child.id ? 
                                                <Form
                                                form={form}
                                                layout="vertical"
                                                onFinish={handleSubmitUpdateChild}
                                                >
                                                <Row gutter={16}>
                                                    <Col span={24}>
                                                    <TextField
                                                                type="textarea"
                                                                fieldName="content"
                                                                label="Nội dung trả lời"
                                                                required
                                                                style={{
                                                                    height: 100
                                                                }}
                                                                />
                                                    </Col>
                                                </Row>
                                                <Row gutter={16} className="frame_btn">
                                                        <Col >
                                                        <Button type="dash" onClick={() => {setIsEditingChild(null)}}>
                                                            Hủy
                                                        </Button>
                                                        </Col>
                                                        <Col >
                                                        <Button type="primary" htmlType="submit">
                                                            Cập nhật
                                                        </Button>
                                                        </Col>
                                                </Row>
                                                </Form>  : <span>{child.content}</span>
                                            }   
                                        </div>
                                        
                                    </div>
                                   
                                    </>
                                ))
                                
                            }
                            {
                                showReadmore && isReadmore === c.id && numberCmt > 0 ? <div className='readmore' onClick={() => {onGetChild(c.id, page, size+perPage); subtraction((c.childs).length, size+perPage)}} >{numberCmt} câu trả lời khác</div> : null
                            }
                        </div> 
                       )) 
                    }
                </div>
            </div>

            <div className='client-container' style={{height: '100%',top: 66, overflow: 'scroll', position: 'fixed', right: '2px', width: '20%'}}>
                <div style={{fontSize: '16px', fontWeight: '500', marginBottom: 10}}>Mục lục</div>
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


export default DiscussClientPage

