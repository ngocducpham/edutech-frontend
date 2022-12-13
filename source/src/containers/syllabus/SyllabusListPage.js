import React from "react";
import { connect } from "react-redux";
import { Avatar, Tag, Button } from "antd";
import { UserOutlined, PlusOutlined, FileOutlined } from "@ant-design/icons";
import qs from 'query-string';
import { withTranslation } from "react-i18next";

import ListBasePage from "../ListBasePage";
import SyllabusForm from "../../compoments/syllabus/SyllabusForm";
import BaseTable from "../../compoments/common/table/BaseTable";
import BasicModal from "../../compoments/common/modal/BasicModal";

import { actions } from "../../actions";
import { FieldTypes } from "../../constants/formConfig";
import { AppConstants } from "../../constants";
import { commonStatus } from "../../constants/masterData";
import { sitePathConfig } from "../../constants/sitePathConfig";


class SyllabusListPage extends ListBasePage {
    initialSearch() {
        return { title: "" };
    }

    constructor(props) {
        super(props);
        const { t } = props;
        const { location: { search } } = this.props;
        const { parentId, parentName } = qs.parse(search);
        this.subjectId = parentId;
        this.subjectName = parentName;
        this.objectName = t("objectName");
        this.breadcrumbs = [
            {
                name: `${t("breadcrumbs.currentParentPage")}`,
                path: `${sitePathConfig.teacherMySubject.path}${this.handleRoutingParent()}`
            },
            {
                name: `${t("breadcrumbs.currentPage")}`,
            },
        ];
        this.columns = [
            {
				title: '#',
				dataIndex: 'avatar',
				align: 'center',
				width: 50,
				render: (avatar) => (
					<Avatar
						className='table-avatar'
						size='large'
						icon={<FileOutlined />}
						src={
							avatar
								? `${AppConstants.contentRootUrl}${avatar}`
								: null
						}
					/>
				)
			},
            {
                title: t("table.title"),
                render: (dataRow) => {
                    return (
                        <span className="routing" onClick={() => {
                            this.handleRouting(dataRow.id, dataRow.title,);
                        }}>
                            {dataRow.title}
                        </span>
                    )
                }
            },
            this.renderActionColumn(),
        ];
        this.actionColumns = {
            isEdit: true,
            isDelete: true,
            isChangeStatus: false,
        };
    }

    
	handleRouting(parentId, parentName) {
        const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.chapter.path}?${qs.stringify({ ...result, parentId, parentName })}`);
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

    prepareCreateData(data) {
        return {
            ...data,
            subjectId: this.subjectId
        };
    }

   
    prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
            subjectId: this.subjectId
        };
    }


    getList() {
        const { getDataList } = this.props;
        const page = this.pagination.current ? this.pagination.current - 1 : 0;
        const params = { page, size: this.pagination.pageSize, search: this.search, subjectId: this.subjectId };
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
            t,
            materialsUploadClass
        } = this.props;
        const { isShowModifiedModal, isShowModifiedLoading } = this.state;
        const syllabusData = dataList.data || [];
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
                    dataSource={syllabusData}
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
                    <SyllabusForm
                        isEditing={this.isEditing}
                        dataDetail={this.isEditing ? this.dataDetail : {}}
                        uploadFile={uploadFile}
                        materialsUploadClass={materialsUploadClass}
                        loadingSave={isShowModifiedLoading}
                        t={t}
                    />
                </BasicModal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.syllabus.tbSyllabusLoading,
    dataList: state.syllabus.syllabusData || {},
});

const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getSyllabusList(payload)),
    getDataById: (payload) => dispatch(actions.getSyllabusById(payload)),
    updateData: (payload) => dispatch(actions.updateSyllabus(payload)),
    deleteData: (payload) => dispatch(actions.deleteSyllabus(payload)),
    createData: (payload) => dispatch(actions.createSyllabus(payload)),
    uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
    materialsUploadClass: (payload) => dispatch(actions.materialsUploadClass(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['syllabusListPage', 'listBasePage', 'constants', 'basicModal'])(SyllabusListPage));
