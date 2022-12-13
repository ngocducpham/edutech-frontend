import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import SubjectForm from "../../compoments/subject/SubjectForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";


class SubjectListPage extends ListBasePage {
    initialSearch() {
        return { name: "", status: null, code: "" };
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
                title: t("table.code"),
                dataIndex: 'code',
                width: 100
            },
            {
                title: t("table.name"),
                dataIndex: 'name',
            },
            this.renderStatusColumn(),
            this.renderActionColumn(),
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false,
        };
    }

    prepareCreateData(data) {
        return {
            ...data,
        };
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
                key: "name",
                seachPlaceholder: t("searchPlaceHolder.name"),
                initialValue: this.search.name,
            },
            {
                key: "code",
                seachPlaceholder: t("searchPlaceHolder.code"),
                initialValue: this.search.code,
            },
            {
                key: "status",
                seachPlaceholder: t("searchPlaceHolder.status"),
                fieldType: FieldTypes.SELECT,
                options: commonStatus,
                initialValue: this.search.status,
            },
        ];
    }

    render() {
        const {
            dataList,
            loading,
            uploadFile,
            t,
        } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const subjectData = dataList.data || [];
        this.pagination.total = dataList.totalElements || 0;
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
                    dataSource={subjectData}
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
                    <SubjectForm
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
    loading: state.subject.tbSubjectLoading,
    dataList: state.subject.subjectData || {},
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getSubjectList(payload)),
    getDataById: (payload) => dispatch(actions.getSubjectById(payload)),
    updateData: (payload) => dispatch(actions.updateSubject(payload)),
    deleteData: (payload) => dispatch(actions.deleteSubject(payload)),
    createData: (payload) => dispatch(actions.createSubject(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['subjectListPage', 'listBasePage', 'constants', 'basicModal'])(SubjectListPage));
