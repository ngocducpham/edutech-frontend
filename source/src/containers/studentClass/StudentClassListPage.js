import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import CreateStudentClass from "./CreateStudentClass";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";

import { sitePathConfig } from "../../constants/sitePathConfig";


class StudentClassListPage extends ListBasePage {

    constructor(props) {
        super(props);
        const { t } = props;
        const { location: { search } } = this.props;
        const { parentId, parentName } = qs.parse(search);
        this.classId = parentId;
        this.className = parentName;
        this.objectName = t("objectName");
        this.breadcrumbs = [
            {
                name: `${t("breadcrumbs.currentParentPage")} (${parentName})`,
                path: `${sitePathConfig.classv1.path}${this.handleRoutingParent()}`
            },
            {
                name: `${t("breadcrumbs.currentPage")}`,
            },
        ];
        this.columns = [
            {
                title: "#",
                dataIndex: "avatarPath",
                align: 'center',
                width: 50,
                render: (avatarPath) => (
                    <Avatar
                        className="table-avatar"
                        size="large"
                        icon={<UserOutlined />}
                        src={avatarPath ? `${AppConstants.contentRootUrl}${avatarPath}` : null}
                    />
                ),
            },
            { title: t('table.fullName'), dataIndex: 'fullName', width: 250 },
			{ title: t('table.phone'), dataIndex: 'phone', width: 250 }, ,
			{ title: t('table.email'), dataIndex: 'email', width: 250 },
            {
				title: t('table.major'),
				dataIndex: ["major", "name"],
			},
        ];
        this.props.getMajorAutoCompleteStudent();
        this.majorData=[];
    }

    handleRoutingParent() {
        const { location: { search } } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        const prName = 'parentSearch';
        Object.keys(queryString).map(q => {
            if (q.startsWith(prName))
                result[q.substring(prName.length, q.length)] = queryString[q];
        })
        const qsMark = Object.keys(result).length > 0 ? "?" : "";
        return qsMark + qs.stringify(result);
    }

    loadDataTable(currentProps) {
        const queryString = qs.parse(currentProps.location.search);
        this.pagination.current = 1;
        if(!isNaN(queryString.page))
            this.pagination.current = parseInt(queryString.page);
        Object.keys(this.search).forEach(key => this.search[key] = queryString[key]);
        this.getList(queryString.createPage === '1' && 1000);
        this.setState({
            isShowModifiedModal: queryString.createPage === '1'
        })
    }

    prepareCreateData(data) {
        return {
            ...data,
        };
    }

    getList() {
        const { getDataList } = this.props;
        const page = this.pagination.current ? this.pagination.current - 1 : 1000;
        const params = { page, size: this.pagination.pageSize, search: this.search, classId: this.classId };
        getDataList({ params });
    }


    handleShowCreatePage = (isEditing) => {
        const { location: { pathname, search }, history} = this.props;
        this.isEditing = false
        history.push(`${pathname}${search}&createPage=1`)
    }

    onCancelModal() {
        const { location: { pathname, search }, history} = this.props;
        const { createPage, ...queryString } = qs.parse(search)
        this.isEditing = false
        history.push(`${pathname}?${qs.stringify(queryString)}`)
    }
    render() {
        const {
            dataList,
            loading,
            uploadFile,
            majorAutocompleteData,
            t,
        } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const studentClassData = dataList.data || [];

        console.log("dataList.data ", dataList.data )
     
        const data = studentClassData.filter(s => s.status === 1)
        this.pagination.total = dataList.totalElements || 0;
        this.majorData = majorAutocompleteData.data ? majorAutocompleteData.data.map(c => {
			return {
				value: c.id,
				label: c.name,
			}
		}) : [];
        return (
            <>
            <div className={`list-page${!isShowModifiedModal ? ' active' : ''}`} >
                <div className="action-bar">
                    {
                        this.renderCreateNewButton((
                            <Button
                                type="primary"
                                onClick={() => this.handleShowCreatePage(false)}
                            >
                                <EditOutlined /> {t("createNewButton")}
                            </Button>
                        ))
                    }
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
            {
            isShowModifiedModal ? (
                <div className="create-page">
                    <CreateStudentClass
                        handleBack={this.onCancelModal}
                        isEditing={this.isEditing}
                        classId={this.classId}
                        studentClassData={studentClassData}
                        fetchStudentClassList={this.getList}
                        className={this.className}
                    />
                </div>
            ) : null
        	}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.studentClass.tbStudentClassLoading,
    dataList: state.studentClass.studentClassData || {},
    studentData: state.student.studentData || {},
    majorAutocompleteData: state.student.majorAutocompleteData || {}
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.listStudentClass(payload)),
    createData: (payload) => dispatch(actions.addStudentClass(payload)),
    deleteData: (payload) => dispatch(actions.removeStudentClass(payload)),
    getStudentAutoComplete: (payload) => dispatch(actions.getStudentAutoComplete(payload)),
    getMajorAutoCompleteStudent: (payload) => dispatch(actions.getMajorAutoCompleteStudent(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['studentClassListPage', 'listBasePage', 'constants', 'basicModal'])(StudentClassListPage));
