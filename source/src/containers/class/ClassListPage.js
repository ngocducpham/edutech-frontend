import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import ClassForm from "../../compoments/class/ClassForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants, STATUS_ACTIVE } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import { sitePathConfig } from "../../constants/sitePathConfig";


class ClassListPage extends ListBasePage {
    initialSearch() {
        return { title: "" };
    }

    constructor(props) {
        super(props);
        const { t } = props;
        this.objectName = t("objectName");
        this.breadcrumbs = [
            { name: t("breadcrumbs.currentPage") },
        ];
        this.columns = [
            {
                title: "#",
                dataIndex: "avatar",
                align: 'center',
                width: 100,
                render: (avatar) => (
                    <Avatar
                        className="table-avatar"
                        size="large"
                        icon={<UserOutlined />}
                        src={avatar ? `${AppConstants.contentRootUrl}${avatar}` : null}
                    />
                ),
            },
            {
                title: t("table.title"),
                width: 250,
                render: (dataRow) => {
                    return (
                        <span className="routing" onClick={() => {
                            this.handleRouting(dataRow.id, dataRow.title);
                        }}>
                            {dataRow.title}
                        </span>
                    )
                }
            },
            {
                title: t("table.subject"),
                dataIndex: ["subject","name"],
                width: 300
            },
            {
                title: t("table.teacher"),
                dataIndex: ["teacher","fullName"],
            },
            this.renderActionColumn(),
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false,
        };
        this.props.teacherAutoComplete({params: {}});
        this.teacherData=[];
        this.props.subjectAutocompleteClass()
        this.subjectData=[];
    }

    handleRouting(parentId, parentName) {
        const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.studentClass.path}?${qs.stringify({ ...result, parentId, parentName })}`);
    }

    prepareCreateData(data) {
        return {
            ...data,
        };
    }

    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
            syllabusId: 0,
            status: STATUS_ACTIVE 
        }
    }

    getList() {
        const { getDataList } = this.props;
        const page = this.pagination.current ? this.pagination.current - 1 : 0;
        const params = { page, size: this.pagination.pageSize, search: this.search };
        getDataList({ params });
    }

    getSearchFields() {
        const { t } = this.props;
        return [
            {
                key: "title",
                seachPlaceholder: t("searchPlaceHolder.title"),
                initialValue: this.search.title,
            },
        ];
    }

    render() {
        const {
            dataList,
            loading,
            uploadFile,
            teacherAutocompleteData,
            subjectAutocompleteClassData,
            subjectAutocompleteClass,
            t,
            getSubjectAutocomplete,
            teacherAutoComplete
        } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const classData = dataList.data || [];
        this.pagination.total = dataList.totalElements || 0;
        this.subjectData = subjectAutocompleteClassData.data ? subjectAutocompleteClassData.data.map(c => {
			return {
				value: c.id,
				label: c.name,
			}
		}) : [];
        console.log("subjectData", this.subjectData)
        return (
            <div>
                {this.renderSearchForm()}
                <div className="action-bar">
                    {
                        this.renderCreateNewButton((
                            <Button
                                type="primary"
                                onClick={() => this.onShowModifiedModal(false)}
                            >
                                <PlusOutlined /> {t("createNewButton")}
                            </Button>
                        ))
                    }
                </div>
                <BaseTable
                    loading={loading}
                    columns={this.columns}
                    rowKey={(record) => record.id}
                    dataSource={classData}
                    pagination={this.pagination}
                    onChange={this.handleTableChange}
                />
                <BasicModal
                    visible={isShowModifiedModal}
                    isEditing={this.isEditing}
                    objectName={this.objectName}
                    loading={isShowModifiedLoading}
                    onOk={this.onOkModal}
                    onCancel={this.onCancelModal}
                >
                    <ClassForm
                        subjectAutocompleteClass={subjectAutocompleteClass}
                        teacherAutoComplete={teacherAutoComplete}
                        teacherAutocompleteData={teacherAutocompleteData?.data || []}
                        subjectData={this.subjectData}
                        isEditing={this.isEditing}
                        dataDetail={this.isEditing ? this.dataDetail : {}}
                        uploadFile={uploadFile}
                        commonStatus={commonStatus}
                        loadingSave={isShowModifiedLoading}
                        t={t}
                    />
                </BasicModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.classv1.tbClassLoading,
    dataList: state.classv1.classData || {},
    teacherAutocompleteData: state.classv1.teacherAutocompleteData || {},
    subjectAutocompleteClassData: state.classv1.subjectAutocompleteClassData || {},
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getClassList(payload)),
    getDataById: (payload) => dispatch(actions.getClassById(payload)),
    updateData: (payload) => dispatch(actions.updateClass(payload)),
    deleteData: (payload) => dispatch(actions.deleteClass(payload)),
    createData: (payload) => dispatch(actions.createClass(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
    teacherAutoComplete: (payload) => dispatch(actions.teacherAutoComplete(payload)),
    subjectAutocompleteClass: (payload) => dispatch(actions.subjectAutocompleteClass(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['classListPage', 'listBasePage', 'constants', 'basicModal'])(ClassListPage));
