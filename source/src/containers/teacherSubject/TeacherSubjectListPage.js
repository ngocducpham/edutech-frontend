import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button, Divider, Modal } from 'antd';
import { UserOutlined, PlusOutlined, EditOutlined, LockOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import CreateTeacherSubject from './CreateTeacherSubject';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants, STATUS_ACTIVE } from '../../constants';
import { commonStatus, commonDegree } from '../../constants/masterData';

import { sitePathConfig } from '../../constants/sitePathConfig';
import StatusTag from '../../compoments/common/elements/StatusTag';
import ElementWithPermission from '../../compoments/common/elements/ElementWithPermission';

const { confirm } = Modal;


class TeacherSubjectListPage extends ListBasePage {
	initialSearch() {
		return { name: '', status: null };
	}

	constructor(props) {
		super(props);
		const { t, location: { search } ,history} = this.props;
        const {parentName,parentId} = qs.parse(search);
        this.teacherId=parentId
        this.history= history
        this.parentName=parentName
		this.objectName = t('objectName');
		this.breadcrumbs = [
			{ 
				name: `${t("breadcrumbs.parentPage")} (${parentName})`, 
				path: `${sitePathConfig.teacher.path}${this.handleRoutingParent('parentSearch')}`
			},
			{
				name: t("breadcrumbs.currentPage")
			}
		];
		this.columns = [
			
			{ title: t('table.code'), dataIndex: "code", width: 100 },
			{ title: t('table.name'), dataIndex: "name" },
			this.renderStatusColumn(),
		];
		this.props.getSubjectAutocomplete();
		this.filterdSubjecttOptions = []
	}

	renderStatusColumn() {
        const { t } = this.props;
        return {
            title: t ? t('listBasePage:titleStatusCol') : 'Status',
            dataIndex: "status",
            width: '100px',
            render: (status) => <StatusTag status={status} />
        }
    }




	handleRoutingParent = (prName) => {
        const queryString = qs.parse(this.props.location.search)
        const result = {};
        Object.keys(queryString).map(q => {
            if(q.startsWith(prName))
                result[q.substring(prName.length, q.length)] = queryString[q];
        })
        const qsMark = Object.keys(result).length > 0 ? "?" : "";
        return `${qsMark}${qs.stringify(result)}`;
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
	

	getList(size) {
		const { getDataList } = this.props;
		const page = this.pagination.current ? this.pagination.current - 1 : 0;
		const params = { page, size: size || this.pagination.pageSize, search: this.search, teacherId: this.teacherId };
		getDataList({ params });
	}

	prepareCreateData(values) {
        return {
            teacherId: this.teacherId,
            ...values,
        };
    }

	getSearchFields() {
		const { t } = this.props;
		return [
			{
				key: 'name',
				seachPlaceholder: t('searchPlaceHolder.name'),
				initialValue: this.search.name
			},
			{
				key: 'status',
				seachPlaceholder: t('searchPlaceHolder.status'),
				fieldType: FieldTypes.SELECT,
				options: commonStatus,
				initialValue: this.search.status
			}
		];
	}

	handleShowCreatePage(isEditing) {
        const { location: {pathname, search}, history} = this.props;
        this.isEditing = false;
        history.push(`${pathname}${search}&createPage=1`)
    }

	onCancelModal() {
        const { location: { pathname, search }, history} = this.props;
        const { createPage, ...queryString } = qs.parse(search)
        this.isEditing = false
        history.push(`${sitePathConfig.teacher.path}${this.handleRoutingParent('parentSearch')}`)
    }



	render() {
		const { 
			dataList,
			subjectAutocompleteData,
			loading, 
			uploadFile, 
			t, 
		} = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		const teacherSubjectData = dataList.data || [];
		this.pagination.total = dataList.totalElements || 0;


		let filterdSubject = null;
		if (teacherSubjectData && subjectAutocompleteData) {
			filterdSubject = subjectAutocompleteData?.data?.filter(
				subject => {
					return !teacherSubjectData?.find(teacherSubject => teacherSubject.id === subject.id)
				}
			)
		}
		
		this.filterdSubjectOptions = filterdSubject ? filterdSubject.map(s => {
			return{
				value: s.id,
				label: s.name
			}
		}): []
		return (
			<>
			<div  className={`list-page${!isShowModifiedModal ? '' : ''}`}>
				{this.renderSearchForm()}
				<div className='action-bar'>
					{this.renderCreateNewButton(
						<Button
							type='primary'
							onClick={() => this.handleShowCreatePage(false)}
						>
							{t("editButton")} <EditOutlined />
						</Button>
					)}
				</div>
				<BaseTable
					loading={loading}
					columns={this.columns}
					rowKey={(record) => record.id}
					dataSource={teacherSubjectData}
					pagination={this.pagination}
					onChange={this.handleTableChange}
				/>
			</div>
			{
            isShowModifiedModal ? (
                <div className="create-page">
                    <CreateTeacherSubject
                        handleBack={this.onCancelModal}
                        isEditing={this.isEditing}
                        teacherId={this.teacherId}
                        teacherSubjectData={teacherSubjectData}
                        fetchTeacherSubjectList={this.getList}
                        teacherName={this.parentName}
                    />
                </div>
            ) : null
        	}
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.teacherSubject.tbTeacherSubjectLoading,
	dataList: state.teacherSubject.teacherSubjectData || {},
	subjectAutocompleteData: state.teacherSubject.subjectAutocompleteData || {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getTeacherSubjectList(payload)),
	createData: (payload) => dispatch(actions.addTeacherSubject(payload)),
	deleteData: (payload) => dispatch(actions.removeTeacherSubject(payload)),
	getSubjectAutocomplete: (payload) => dispatch(actions.getSubjectAutocomplete(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['teacherSubjectListPage', 'listBasePage', 'constants', 'basicModal'])(
		TeacherSubjectListPage
	)
);
