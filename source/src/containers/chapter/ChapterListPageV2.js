
import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button, Divider, Modal, List, Dropdown, Menu, Input } from "antd";
import { UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined, MenuOutlined, EllipsisOutlined, CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import ChapterForm from "../../compoments/chapter/ChapterForm";
import LessonForm from "../../compoments/lesson/LessonForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";


import { actions } from "../../actions";
import { sitePathConfig } from "../../constants/sitePathConfig";

import { showErrorMessage, showSucsessMessage } from "../../services/notifyService";
import { commonAction, commonActionChapter } from "../../constants/masterData";
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{
        cursor: 'grab',
        color: '#999',
      }}
    />
  ));

  const columns = [
    {
      title: 'Sort',
      dataIndex: 'sort',
      width: 30,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      index: 0,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      index: 1,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      index: 2,
    },
  ];
  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);

const { confirm } = Modal;

class ChapterListPage extends ListBasePage {
    initialSearch() {
        return { title: "", };
    }

    constructor(props) {
        super(props);
        this.state = {
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
            isShowModifiedModalLesson: false,
            isShowModifiedLoadingLesson: false,
        }
        const { t } = props;
        const { location: { search } } = props;
		const {
            parentName,
            parentId,
            parentSearchparentName,
        } = qs.parse(search);
        this.syllabusId = parentId;
		this.parentName = parentName;
        this.objectName = t("objectName");
        this.objectNameLesson = t("objectNameLesson")
        this.breadcrumbs = [
            {
                name: `${t("breadcrumbs.teacherSubjectPage")}`,
                path: `${sitePathConfig.teacherMySubject.path}${this.handleRoutingParent('parentSearchparentSearch')}`
            },
            {
                name: `${t("breadcrumbs.syllabusPage")}`,
                path: `${sitePathConfig.syllabus.path}${this.handleRoutingParent('parentSearch')}`
            },
            {
                name: `${t("breadcrumbs.currentPage")}`,
            },
        ];
        this.chapterId = "";
        this.totalOrder = "";
        this.rowIdLesson=[];
        this.onOkModalLesson = this.onOkModalLesson.bind(this);
        this.onCancelModalLesson = this.onCancelModalLesson.bind(this);
        this.onModifyCompletedLesson = this.onModifyCompletedLesson.bind(this);
        this.onModifyErrorLesson = this.onModifyErrorLesson.bind(this);
        this.onModifyCompletedLessonOrder = this.onModifyCompletedLessonOrder.bind(this);
        this.onModifyErrorLessonOrder = this.onModifyErrorLessonOrder.bind(this);
        this.onDeleteCompletedLesson = this.onDeleteCompletedLesson.bind(this);
        this.onDeleteErrorLesson = this.onDeleteErrorLesson.bind(this);
    }



    onShowModifiedModalLesson(isEditing) {
        this.isEditing = isEditing;
        this.setState({ isShowModifiedModalLesson: true });
    }



    handleRoutingParent(prName) {
        const { location: { search } } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            if(q.startsWith(prName))
                result[q.substring(prName.length, q.length)] = queryString[q];
        })
        const qsMark = Object.keys(result).length > 0 ? "?" : "";
        return qsMark + qs.stringify(result);
    }

    getDetailChapter(chapterId) {
        const { getLessonList, showFullScreenLoading, hideFullScreenLoading } = this.props;
        const params = { chapterId };
        getLessonList({
            params,
            onCompleted: ({ data }) => {
                let dta = this.getDataDetailMapping(data);
                if(dta.data === undefined){
                    this.totalOrder = 0;
                    return;
                }else{
                    dta = dta.data.length
                    if(dta > 0){
                        this.totalOrder = dta
                    }else{
                        this.totalOrder = 0
                    }
                }
            },
            onError: (err) => {
                if (err && err.message)
                    showErrorMessage(err.message);
                else
                    showErrorMessage(`${this.getActionName()} ${this.objectName} thất bại. Vui lòng thử lại!`);
            }
        });
    }


    prepareCreateData(data) {
        return {
            ...data,
            order: 0,
            syllabusId: this.syllabusId
        };
    }

    getList() {
        const { getDataList, getLessonList, getSyllabusData, updateLesson } = this.props;
        const page = this.pagination.current ? this.pagination.current - 1 : 0;
        const params = {id: parseInt(this.syllabusId) };
        this.setState({
            loading: true,
        })
        getSyllabusData({ 
            params, 
            onCompleted: () => {
                this.setState({ loading: false})
            },
            onError: () => {
                this.setState({ loading: false})
            }
        });
    }


    showDeleteConfirm(id) {
        const { t } = this.props;
        const defaultMessage = `Are you sure delete?`;
        confirm({
            title: t ? t(
                'listBasePage:titleConfirm',
                {
                    actionName: 'xóa',
                    objectName: this.objectName,
                    defaultValue: defaultMessage
                },
            ) : defaultMessage,
            content: '',
            okText: t ? t('listBasePage:okText') : 'Yes',
            okType: 'danger',
            cancelText: t ? t('listBasePage:cancleText') : 'No',
            onOk: () => {
                this.onDelete(id);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    showDeleteConfirmLesson(id) {
        const { t } = this.props;
        const defaultMessage = `Are you sure delete?`;
        confirm({
            title: t ? t(
                'listBasePage:titleConfirm',
                {
                    actionName: 'xóa',
                    objectName: this.objectName,
                    defaultValue: defaultMessage
                },
            ) : defaultMessage,
            content: '',
            okText: t ? t('listBasePage:okText') : 'Yes',
            okType: 'danger',
            cancelText: t ? t('listBasePage:cancleText') : 'No',
            onOk: () => {
                this.onDeleteLesson(id);
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    onDelete(id) {
        const { deleteData } = this.props;
        if (id) {
            deleteData({
                params: { id },
                onCompleted: this.onDeleteCompleted,
                onError: this.onDeleteError
            });
        }
    }

    onDeleteLesson(id){
        const {deleteLesson, updateLesson} = this.props;
        if(id){
            deleteLesson({
                params: {id},
                onCompleted: this.onDeleteCompleted,
                onError: this.onDeleteError
            })
        }
    }


    onDeleteCompletedLesson() {
        const { dataList, t } = this.props;
        this.getList();
        const defaultSuccessMessage = 'Successful!';
        showSucsessMessage(
            t ? t(
                'listBasePage:showDeleteSuccessMessage',
                {
                    objectName: this.objectNameLesson,
                    defaultValue: defaultSuccessMessage
                },
            )
                : defaultSuccessMessage,
            t ? { t, ns: 'listBasePage' } : null,
        );
    }

    onDeleteErrorLesson() {
        const { t } = this.props;
        const defaultFailedMessage = 'Failed!';
        showErrorMessage(
            t ? t(
                'listBasePage:showDeleteErrorMessage',
                {
                    objectName: this.objectNameLesson,
                    defaultValue: defaultFailedMessage
                }
            )
                : defaultFailedMessage,
            t ? { t, ns: 'listBasePage' } : null
        );
    }


    getDetailLesson(id, index) {
        const { getLessonById, showFullScreenLoading, hideFullScreenLoading } = this.props;
        const params = { id };
        showFullScreenLoading();
        getLessonById({
            params,
            onCompleted: ({ data }) => {
                this.dataDetailLesson = this.getDataDetailMapping(data);
                this.onShowModifiedModalLesson(true);
                hideFullScreenLoading();
            },
            onError: (err) => {
                if (err && err.message)
                    showErrorMessage(err.message);
                else
                    showErrorMessage(`${this.getActionName()} ${this.objectName} thất bại. Vui lòng thử lại!`);
                hideFullScreenLoading();
            }
        })
       
    }



    prepareUpdateDataLesson(data) {
        return {
            ...data,
            id: this.dataDetailLesson.id,
        };
    }

    prepareCreateDataLesson(data) {
        return {
            ...data,
            chapterId: this.chapterId
        };
    }


    onOkModalLesson(values) {
        const { createLesson, updateLesson } = this.props;
        this.setState({ isShowModifiedLoadingLesson: true, });
        if (this.isEditing) {
            updateLesson({
                params: this.prepareUpdateDataLesson(values),
                onCompleted: this.onModifyCompletedLesson,
                onError: this.onModifyErrorLesson
            });
        }
        else {
            createLesson({
                params: this.prepareCreateDataLesson(values),
                onCompleted: this.onModifyCompletedLesson,
                onError: this.onModifyErrorLesson
            });
        }
    }

    onCancelModalLesson() {
        this.setState({ isShowModifiedModalLesson: false, isShowModifiedLoadingLesson: false });
    }

    onModifyCompletedLesson(responseData) {
        const { t } = this.props;
        const defaultSuccessMessage = 'Successful!';
        const defaultFailedMessage = 'Failed!';
        if (responseData) {
            this.onCancelModalLesson();
            this.getList();
            showSucsessMessage(
                t ? t(
                    'listBasePage:showSuccessMessage',
                    {
                        actionName: this.getActionName(),
                        objectName: this.objectNameLesson,
                        defaultValue: defaultSuccessMessage
                    },
                )
                    : defaultSuccessMessage,
                t ? { t, ns: 'listBasePage' } : null,
            );
        }
        else {
            this.setState({ isShowModifiedLoadingLesson: false });
            showErrorMessage(
                t ? t(
                    'listBasePage:showErrorMessage',
                    {
                        actionName: this.getActionName(),
                        objectName: this.objectNameLesson,
                        defaultValue: defaultFailedMessage
                    }
                )
                    : defaultFailedMessage,
                { t, ns: 'listBasePage' }
            );
        }
    }

    onModifyErrorLesson(err) {
        const { t } = this.props;
        const defaultFailedMessage = 'Failed!';
        this.setState({ isShowModifiedLoadingLesson: false });
        if (err && err.message)
            showErrorMessage(err.message, t ? { t, ns: 'listBasePage' } : null);
        else
            showErrorMessage(
                t ? t(
                    'listBasePage:showErrorMessage',
                    {
                        actionName: this.getActionName(),
                        objectName: this.objectNameLesson,
                        defaultValue: defaultFailedMessage
                    }
                )
                    : defaultFailedMessage,
                t ? { t, ns: 'listBasePage' } : null
            );
    }

    handleOnclickMenu = (value, id) => {
        if(value === 1){
            this.chapterId = id;
            this.onShowModifiedModalLesson(false)
        }else if(value === 2){
            this.getDetail(id)
        }else{
            this.showDeleteConfirm(id)
        }
        
    }

    handleOnclickMenuLesson = (value, id, title, chapterId, chapterName, index) => {
        if(value === 2){
            this.getDetailLesson(id, index)
        }else if (value === 3){
            this.showDeleteConfirmLesson(id)
        }else{
            this.redirectAssignment(id, title, chapterId, chapterName);
        }
    }
    
    redirectAssignment = (parentId, parentName, chapterId, chapterName) => {
        const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.assignment.path}?${qs.stringify({ ...result, parentId, parentName, chapterId, chapterName })}`);
    }





    handleUp(id, order){
        const {upLesson} = this.props;
        if(id){
            upLesson({
                params: {id},
                onCompleted: this.onModifyCompletedLessonOrder,
                onError: this.onModifyErrorLessonOrder
            })
        }
    }

    handleDown(id, order){
        const {downLesson} = this.props;
        if(id){
            downLesson({
                params: {id},
                onCompleted: this.onModifyCompletedLessonOrder,
                onError: this.onModifyErrorLessonOrder
            })
        }
    }

    onModifyCompletedLessonOrder(responseData) {
        const { t } = this.props;
        if (responseData) {
            this.onCancelModalLesson();
            this.getList();

        }
    }

    onModifyErrorLessonOrder(err) {
        const { t } = this.props;
        const defaultFailedMessage = 'Failed!';
        if (err && err.message)
            showErrorMessage(err.message, t ? { t, ns: 'listBasePage' } : null);
    }


    render() {
        const {
            dataList,
            uploadFile,
            t,
        } = this.props;
        const { 
            isShowModifiedModal, 
            isShowModifiedLoading,
            isShowModifiedModalLesson,
            isShowModifiedLoadingLesson,
        } = this.state;
        
        const chapterData = dataList.chapters || [];
        return(
            <>
            {
            chapterData.map(chapter => (
                <List
                    locale={{ emptyText: "Chưa có bài học" }}
                    className="list"
                    header={
                        <div className="header">
                            {chapter.title}
                            <div  onClick={() => this.getDetailChapter(chapter.id)}>
                            <Dropdown overlay={
                                <Menu>
                                    {commonActionChapter.map((c,i) => (
                                        <Menu.Item key={i}>
                                            <a onClick={() => this.handleOnclickMenu(c.value, chapter.id)}>
                                                {c.label}
                                            </a>
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            } 
                            placement="bottomRight" 
                            trigger={['hover']}> 
                                <EllipsisOutlined rotate={90} />
                            </Dropdown>
                            </div>
                        </div>
                    }
                    bordered
                    dataSource={chapter.lessons}
                    renderItem={(lesson, index) => (
                        <div className="content">
                            <List.Item >
                            {lesson.title}
                            </List.Item>
                            <div className="action"> 
                                <div className="upDown">
                                    {
                                        index+1 === 1 ?  <Button 
                                        size="small" 
                                        disabled={true} 
                                        type="primary" onClick={() => this.handleUp(lesson.id, index+1)} 
                                        icon={<CaretUpOutlined />} >
                                        </Button> 
                                        :  
                                        <Button 
                                        size="small" 
                                        disabled={false} 
                                        type="primary" onClick={() => this.handleUp(lesson.id, index+1)} 
                                        icon={<CaretUpOutlined />} >
                                        </Button>
                                    }
                                    {
                                        index+1 === chapter.lessons.length ? 
                                        <Button 
                                        size="small" 
                                        disabled={true} 
                                        type="primary" 
                                        onClick={() => this.handleDown(lesson.id, index+1)} 
                                        icon={<CaretDownOutlined />}>
                                        </Button> :
                                        <Button 
                                        size="small" 
                                        disabled={false} 
                                        type="primary" 
                                        onClick={() => this.handleDown(lesson.id, index+1)} 
                                        icon={<CaretDownOutlined />}>
                                        </Button>
                                    }
                                    
                                </div>
                                <div className="menu">
                                <Dropdown overlay={
                                    <Menu>
                                        {commonAction.map((c,i) => (
                                            <Menu.Item key={i}>
                                                <a onClick={() => this.handleOnclickMenuLesson(c.value, lesson.id, lesson.title, chapter.id, chapter.title, index+1)}>
                                                    {c.label}
                                                </a>
                                            </Menu.Item>
                                        ))}
                                    </Menu>
                                } 
                                placement="bottomRight" 
                                trigger={['hover']}> 
                                    <EllipsisOutlined rotate={90} />
                                </Dropdown>
                                </div>
                            </div>
                        </div>
                    )}
                />
            ))
            }
             <div className="action-bar">
                    {
                        this.renderCreateNewButton((
                            <Button className="btnAdd" type="dashed" onClick={() => this.onShowModifiedModal(false)} block >
                                <PlusOutlined /> {t("createNewButton")}
                          </Button>
                        ))
                    }
                </div>
                <BasicModal
                    visible={isShowModifiedModal}
                    isEditing={this.isEditing}
                    objectName={this.objectName}
                    loading={isShowModifiedLoading}
                    onOk={this.onOkModal}
                    onCancel={this.onCancelModal}
                    width={500}
                >
                    <ChapterForm
                        isEditing={this.isEditing}
                        dataDetail={this.isEditing ? this.dataDetail : {}}
                        uploadFile={uploadFile}
                        loadingSave={isShowModifiedLoading}
                        t={t}
                       
                    />
                </BasicModal>

                <BasicModal
                    visible={isShowModifiedModalLesson}
                    isEditing={this.isEditing}
                    objectName={this.objectNameLesson}
                    loading={isShowModifiedLoadingLesson}
                    onOk={this.onOkModalLesson}
                    onCancel={this.onCancelModalLesson}
                >
                    <LessonForm
                        totalOrder={this.totalOrder}
                        isEditing={this.isEditing}
                        dataDetail={this.isEditing ? this.dataDetailLesson : {}}
                        uploadFile={uploadFile}
                        loadingSave={isShowModifiedLoadingLesson}
                        t={t}
                    />
                </BasicModal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.chapter.tbSyllabusLoading,
    dataList: state.chapter.syllabusData || {},
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getChapterList(payload)),
    getDataById: (payload) => dispatch(actions.getChapterById(payload)),
    updateData: (payload) => dispatch(actions.updateChapter(payload)),
    deleteData: (payload) => dispatch(actions.deleteChapter(payload)),
    createData: (payload) => dispatch(actions.createChapter(payload)),
    getLessonList: (payload) => dispatch(actions.getLessonList(payload)),
    getLessonById: (payload) => dispatch(actions.getLessonById(payload)),
    updateLesson: (payload) => dispatch(actions.updateLesson(payload)),
    deleteLesson: (payload) => dispatch(actions.deleteLesson(payload)),
    createLesson: (payload) => dispatch(actions.createLesson(payload)),
    getSyllabusData: (payload) => dispatch(actions.getSyllabusData(payload)),
    upLesson: (payload) => dispatch(actions.upLesson(payload)),
    downLesson: (payload) => dispatch(actions.downLesson(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['chapterListPage', 'listBasePage', 'constants', 'basicModal'])(ChapterListPage));
