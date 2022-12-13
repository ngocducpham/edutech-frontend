import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import MajorForm from "../../compoments/major/MajorForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";


class MajorListPage extends ListBasePage {
    initialSearch() {
        return { name: "", status: undefined };
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
                dataIndex: "image",
                align: 'center',
                width: 100,
                render: (avatarPath) => (
                    <Avatar
                        className="table-avatar"
                        size="large"
                        icon={<UserOutlined />}
                        src={avatarPath ? `${AppConstants.contentRootUrl}${avatarPath}` : null}
                    />
                ),
            },
            {
                title: t("table.name"),
                render: (dataRow) => {
                    return (
                        <span>
                            {dataRow.name}
                        </span>
                    )
                }
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
        const majorData = dataList.data || [];
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
                    dataSource={majorData}
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
                    <MajorForm
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
    loading: state.major.tbMajorLoading,
    dataList: state.major.majorData || {},
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getMajorList(payload)),
    getDataById: (payload) => dispatch(actions.getMajorById(payload)),
    updateData: (payload) => dispatch(actions.updateMajor(payload)),
    deleteData: (payload) => dispatch(actions.deleteMajor(payload)),
    createData: (payload) => dispatch(actions.createMajor(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['majorListPage', 'listBasePage', 'constants', 'basicModal'])(MajorListPage));
