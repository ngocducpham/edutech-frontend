import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import CategoryForm from '../../compoments/category/CategoryForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants } from '../../constants';
import { commonAssignmentTypes, categoryKinds } from '../../constants/masterData';
import AssignmentForm from '../../compoments/assignment/AssignmentForm';
import {sitePathConfig} from '../../constants/sitePathConfig';

class AssignmentListPage extends ListBasePage {
	initialSearch() {
		return { title: '', type: undefined };
	}

	constructor(props) {
		super(props);
		const { t } = props;
		const { location: { search } } = props;
		const {
			parentSearchparentSearchparentId,
			parentSearchparentSearchparentName,
			parentSearchparentId,
			parentSearchparentName,
            chapterName,
            chapterId,
			parentId,
			parentName
        } = qs.parse(search);
		this.objectName = t('objectName');
		this.lessonId = parentId;
		this.breadcrumbs = [
			{
                name: `${t("breadcrumbs.teacherSubjectPage")}`,
                path: `${sitePathConfig.teacherMySubject.path}${this.handleRoutingParent('parentSearchparentSearchparentSearch')}`
            },
            {
                name: `${t("breadcrumbs.syllabusPage")}`,
                path: `${sitePathConfig.syllabus.path}${this.handleRoutingParent('parentSearchparentSearch')}`
            },
            {
                name: `Chương > Bài học`,
                path: `${sitePathConfig.chapter.path}${this.handleRoutingParent('parentSearch')}`
            },
			{
				name: `${t("breadcrumbs.currentPage")}`,
			}
        ];
		this.columns = [
			{
				title: t('table.title'),
				render: (dataRow) => {
					if(dataRow.type === 1){
						return (
							<Button
								className='btnRedirect'
								type='link'
								onClick={() => this.handleRedirectQuesionPage(dataRow.id, dataRow.title)}
							>
								{dataRow.title}
							</Button>
						);
					}else if(dataRow.type === 2){
						return (
							<Button
								className='btnRedirect'
								type='link'
								onClick={() => this.handleRedirectQuesionEssayPage(dataRow.id, dataRow.title)}
							>
								{dataRow.title}
							</Button>
						);
					}else if(dataRow.type === 3){
						return (
							<span>{dataRow.title}</span>
						);
					}
				}
			},
			{
				title: t('table.type'),
				render: (dataRow) => {
					return (
						<span>
							{
								commonAssignmentTypes.find(
									(item) => item.value === dataRow.type
								).label
							}
						</span>
					);
				}
			},
			{
				title: t('table.createdDate'),
				render: (dataRow) => {
					return <span>{dataRow.createdDate}</span>;
				}
			},
			this.renderActionColumn()
		];
		this.actionColumns = {
			isEdit: true,
			isDelete: true
		};
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

	handleRedirectQuesionPage = (parentId, parentName) => {
		const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.question.path}?${qs.stringify({ ...result, parentId, parentName })}`);
	};

	handleRedirectQuesionEssayPage = (parentId, parentName) => {
		const { location: { search }, history } = this.props;
        const queryString = qs.parse(search);
        const result = {};
        Object.keys(queryString).map(q => {
            result[`parentSearch${q}`] = queryString[q];
        })
        history.push(`${sitePathConfig.questionEssay.path}?${qs.stringify({ ...result, parentId, parentName })}`);
	};


	prepareCreateData(data) {
		return {
			...data,
			lessonId: this.lessonId
		};
	}

	getList() {
		const { getDataList } = this.props;
		const page = this.pagination.current ? this.pagination.current - 1 : 0;
		const params = {
			page,
			size: this.pagination.pageSize,
			search: this.search,
			lessonId: this.lessonId
		};
		getDataList({ params });
	}

	getSearchFields() {
		const { t } = this.props;
		return [
			{
				key: 'title',
				seachPlaceholder: t('searchPlaceHolder.title'),
				initialValue: this.search.title
			},
			{
				key: 'type',
				seachPlaceholder: t('searchPlaceHolder.type'),
				fieldType: FieldTypes.SELECT,
				options: commonAssignmentTypes,
				initialValue: this.search.type
			}
		];
	}

	render() {
		const { dataList, loading, t } = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		const assignmentData = dataList.data || [];
		this.pagination.total = dataList.totalElements || 0;
		console.log("data", assignmentData)
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
					dataSource={assignmentData}
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
					<AssignmentForm
						isEditing={this.isEditing}
						dataDetail={this.isEditing ? this.dataDetail : {}}
						type={commonAssignmentTypes}
						loadingSave={isShowModifiedLoading}
						t={t}
					/>
				</BasicModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.assignment.tbAssignmentLoading,
	dataList: state.assignment.assignmentData || {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getAssignmentList(payload)),
	getDataById: (payload) => dispatch(actions.getAssignmentById(payload)),
	updateData: (payload) => dispatch(actions.updateAssignment(payload)),
	deleteData: (payload) => dispatch(actions.deleteAssignment(payload)),
	createData: (payload) => dispatch(actions.createAssignment(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['assignmentListPage', 'listBasePage', 'constants', 'basicModal'])(
		AssignmentListPage
	)
);
