import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button, Divider } from 'antd';
import { UserOutlined, PlusOutlined, CalculatorOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import TeacherForm from '../../compoments/teacher/TeacherForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';
import CreateTeacherSubject from '../teacherSubject/CreateTeacherSubject';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants, STATUS_ACTIVE } from '../../constants';
import { commonStatus, commonDegree } from '../../constants/masterData';
import { sitePathConfig } from '../../constants/sitePathConfig';
import ElementWithPermission from '../../compoments/common/elements/ElementWithPermission';

class TeacherListPage extends ListBasePage {
	initialSearch() {
		return { fullName: "", status: null };
		
	}

	constructor(props) {
		super(props);
		this.state = {
            isShowModifiedModal: false,
            isShowModifiedLoading: false,
			isShowModifiedModalSubject: false
        }
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
				title: t('table.degree'),
				dataIndex: 'degree',
				render: (datarow) => {
					const degreeLable = commonDegree.find(degree => degree.value === datarow).label
					return <span>{degreeLable}</span>
				}
			},
			{
                title: t("table.subject"),
                align: 'center',
                render: (dataRow) => (
                    <Button
                    type="primary"
                    onClick={(e) => {
                            e.stopPropagation()
                            this.handleRouting(dataRow.id, dataRow.fullName, sitePathConfig.teacherSubject.path)
                        }
                    }
                    >
                        {t("table.subjectConfig")}
                    </Button>
                )
           },
			this.renderStatusColumn(),
			this.renderActionColumn()
		];
		this.actionColumns = {
			isEdit: true,
			isDelete: true,
			isChangeStatus: false
		};
	}

	

	
	handleRouting(parentId, parentName, path) {
        const { location: { search }, history, } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${path}?${qs.stringify({ ...result, parentId, parentName })}&createPage=1`);
    }


	prepareCreateData(data) {
        return Object.entries({
            ...data,
        }).reduce((acc, [key, value]) => (
            value === null || value === undefined || value === "" ? acc : (acc[key]=value, acc)), {}
        )
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
			provinceComboboxData,
            districtComboboxData,
            communeComboboxData,
            getProvinceComboboxList,
            getDistrictComboboxList,
            getCommuneComboboxList,
		} = this.props;
		const { isShowModifiedModal, isShowModifiedLoading, isShowModifiedModalSubject } = this.state;
		const teacherData = dataList.data || [];
		this.pagination.total = dataList.totalElements || 0;
		return (
			<>
			<div className={`list-page${!isShowModifiedModalSubject ? ' active' : ''}`}>
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
					dataSource={teacherData}
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
					<TeacherForm
						isEditing={this.isEditing}
						dataDetail={this.isEditing ? this.dataDetail : {}}
						uploadFile={uploadFile}
						commonStatus={commonStatus}
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
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.teacher.tbTeacherLoading,
	dataList: state.teacher.teacherData || {},
	provinceAutocompleteTeacher: state.teacher.provinceAutocompleteTeacher || {},
	provinceComboboxData: state.province.provinceComboboxData || {},
    districtComboboxData: state.province.districtComboboxData || {},
    communeComboboxData: state.province.communeComboboxData|| {},
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getTeacherList(payload)),
	getDataById: (payload) => dispatch(actions.getTeacherById(payload)),
	updateData: (payload) => dispatch(actions.updateTeacher(payload)),
	deleteData: (payload) => dispatch(actions.deleteTeacher(payload)),
	createData: (payload) => dispatch(actions.createTeacher(payload)),
	getProvinceComboboxList: (payload) => dispatch(actions.getProvinceComboboxList(payload)),
	getDistrictComboboxList: (payload) => dispatch(actions.getDistrictComboboxList(payload)),
	getCommuneComboboxList: (payload) => dispatch(actions.getCommuneComboboxList(payload)),
	uploadFile: (payload) => dispatch(actions.uploadFile(payload)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['teacherListPage', 'listBasePage', 'constants', 'basicModal'])(
		TeacherListPage
	)
);
