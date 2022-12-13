import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import SubjectForm from '../../compoments/subject/SubjectForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants } from '../../constants';
import { commonStatus } from '../../constants/masterData';
import { sitePathConfig } from '../../constants/sitePathConfig';


class TeacherMySubjectListPage extends ListBasePage {
	initialSearch() {
		return { name: '', status: null, code: '' };
	}

	constructor(props) {
		super(props);
		const { t } = props;
		this.objectName = t('objectName');
		this.breadcrumbs = [{ name: t('breadcrumbs.currentPage') }];
		this.columns = [
			{
				title: t('table.code'),
				dataIndex: 'code',
				width: 100
			},
			{
				title: t('table.name'),
				render: (dataRow) => {
                    return (
                        <span className="routing" onClick={() => {
                            this.handleRouting(dataRow.id, dataRow.name,);
                        }}>
                            {dataRow.name}
                        </span>
                    )
                }
			},
		];
	}

	handleRouting(parentId, parentName) {
        const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.syllabus.path}?${qs.stringify({ ...result, parentId, parentName })}`);
    }

	prepareCreateData(data) {
		return {
			...data
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
				key: 'code',
				seachPlaceholder: t('searchPlaceHolder.code'),
				initialValue: this.search.code
			},
			{
				key: 'name',
				seachPlaceholder: t('searchPlaceHolder.name'),
				initialValue: this.search.name
			},
			
		];
	}

	render() {
		const { dataList, loading, uploadFile, t } = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		const mySubjectTeacherData = dataList.data || [];
		this.pagination.total = dataList.totalElements || 0;
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
					dataSource={mySubjectTeacherData}
					pagination={this.pagination}
					onChange={this.handleTableChange}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.teacher.tbmySubjectTeacherLoading,
	dataList: state.teacher.mySubjectTeacherData || {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getMySubjectTeacher(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['subjectListPage', 'listBasePage', 'constants', 'basicModal'])(
		TeacherMySubjectListPage
	)
);
