import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import StudentForm from '../../compoments/student/StudentForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants } from '../../constants';
import { commonStatus } from '../../constants/masterData';

class StudentListPage extends ListBasePage {
	initialSearch() {
		return { fullName: "", status: null };
	}
	constructor(props) {
		super(props);
		const { t } = props;
		this.objectName = t('objectName');
		this.breadcrumbs = [{ name: t('breadcrumbs.currentPage') }];
		this.columns = [
			{
				title: '#',
				dataIndex: 'avatarPath',
				align: 'center',
				width: 100,
				render: (avatarPath) => (
					<Avatar
						className='table-avatar'
						size='large'
						icon={<UserOutlined />}
						src={
							avatarPath
								? `${AppConstants.contentRootUrl}${avatarPath}`
								: null
						}
					/>
				)
			},
			{ title: t('table.fullName'), dataIndex: 'fullName' },
			{ title: t('table.username'), dataIndex: 'username' },
			{ title: t('table.phone'), dataIndex: 'phone' },
			{ title: t('table.email'), dataIndex: 'email', width: '250px' },
			{
				title: t('table.major'),
				dataIndex: ["major", "name"],
			},
			this.renderStatusColumn(),
			this.renderActionColumn()
		];
		this.actionColumns = {
			isEdit: true,
			isDelete: true,
			isChangeStatus: false
		};

		this.props.getMajorAutoCompleteStudent();
		this.majorData = [];
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
				key: 'fullName',
				seachPlaceholder: t('searchPlaceHolder.name'),
				initialValue: this.search.fullName
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

	render() {
		const { 
			dataList, 
			loading, 
			uploadFile, 
			t,
			majorAutocompleteData, 
			provinceComboboxData,
            districtComboboxData,
            communeComboboxData,
            getProvinceComboboxList,
            getDistrictComboboxList,
            getCommuneComboboxList,
		} = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		const studentData = dataList.data || [];
		this.pagination.total = dataList.totalElements || 0;
		this.majorData = majorAutocompleteData.data ? majorAutocompleteData.data.map(c => {
			return {
				value: c.id,
				label: c.name,
			}
		}) : [];
		return (
			<div>
				{this.renderSearchForm()}
				<div className='action-bar'>
					{this.renderCreateNewButton(
						<Button
							type='primary'
							onClick={() => this.onShowModifiedModal(false)}
						>
							<PlusOutlined /> {t('createNewButton')}
						</Button>
					)}
				</div>
				<BaseTable
					loading={loading}
					columns={this.columns}
					rowKey={(record) => record.id}
					dataSource={studentData}
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
					<StudentForm
						isEditing={this.isEditing}
						dataDetail={this.isEditing ? this.dataDetail : {}}
						uploadFile={uploadFile}
						majorData={this.majorData}
						loadingSave={isShowModifiedLoading}
						t={t}
						provinceComboboxData={provinceComboboxData?.data || []}
						districtComboboxData={districtComboboxData?.data || []}
						communeComboboxData={communeComboboxData?.data || []}
						getProvinceComboboxList={getProvinceComboboxList}
						getDistrictComboboxList={getDistrictComboboxList}
						getCommuneComboboxList={getCommuneComboboxList}
					/>
				</BasicModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.student.tbStudentLoading,
	dataList: state.student.studentData || {},
	majorAutocompleteData: state.student.majorAutocompleteData || {},
	provinceComboboxData: state.province.provinceComboboxData || {},
    districtComboboxData: state.province.districtComboboxData || {},
    communeComboboxData: state.province.communeComboboxData|| {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getStudentList(payload)),
	getDataById: (payload) => dispatch(actions.getStudentById(payload)),
	updateData: (payload) => dispatch(actions.updateStudent(payload)),
	deleteData: (payload) => dispatch(actions.deleteStudent(payload)),
	createData: (payload) => dispatch(actions.createStudent(payload)),
	getProvinceComboboxList: (payload) => dispatch(actions.getProvinceComboboxList(payload)),
	getDistrictComboboxList: (payload) => dispatch(actions.getDistrictComboboxList(payload)),
	getCommuneComboboxList: (payload) => dispatch(actions.getCommuneComboboxList(payload)),
	getMajorAutoCompleteStudent: (payload) => dispatch(actions.getMajorAutoCompleteStudent(payload)),
	uploadFile: (payload) => dispatch(actions.uploadFile(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['studentListPage', 'listBasePage', 'constants', 'basicModal'])(
		StudentListPage
	)
);
