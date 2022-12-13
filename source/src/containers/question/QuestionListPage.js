import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button, Collapse, List, Menu, Dropdown, Checkbox } from 'antd';
import { UserOutlined, PlusOutlined,EllipsisOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import QuestionForm from '../../compoments/question/QuestionForm';
import BaseTable from '../../compoments/common/table/BaseTable';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import { AppConstants } from '../../constants';
import { commonStatus, commonQuestionTypes } from '../../constants/masterData';

import { sitePathConfig } from '../../constants/sitePathConfig';

class QuestionListPage extends ListBasePage {
	initialSearch() {
		return { content: '', type: undefined };
	}

	constructor(props) {
		super(props);
		const { t } = props;
		const {
			location: { search }
		} = props;
		const { chapterId, chapterName, parentId, parentName } = qs.parse(search);
		this.assignmentId = parentId;
		this.assignmentName = parentName;
		this.objectName = t('objectName');
		this.breadcrumbs = [
			{
                name: `${t("breadcrumbs.teacherSubjectPage")}`,
                path: `${sitePathConfig.teacherMySubject.path}${this.handleRoutingParent('parentSearchparentSearchparentSearchparentSearch')}`
            },
            {
                name: `${t("breadcrumbs.syllabusPage")}`,
                path: `${sitePathConfig.syllabus.path}${this.handleRoutingParent('parentSearchparentSearchparentSearch')}`
            },
            {
                name: `Chương > Bài học`,
                path: `${sitePathConfig.chapter.path}${this.handleRoutingParent('parentSearchparentSearch')}`
            },
			{
				name: `${t('breadcrumbs.assignmentPage')}`,
				path: `${sitePathConfig.assignment.path}${this.handleRoutingParent(
					'parentSearch'
				)}`
			},
			{
				name: `${t('breadcrumbs.currentPage')}`
			}
		];
		this.columns = [
			{
				title: t('table.content'),
				dataIndex: 'content'
			},
			{
				title: t('table.type'),
				width: 300,
				render: (dataRow) => {
					return (
						<span>
							{
								commonQuestionTypes.find(
									(item) => item.value === dataRow.type
								).label
							}
						</span>
					);
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

	prepareUpdateData(data) {
        return {
            ...data,
            id: this.dataDetail.id,
			assignmentId: this.assignmentId
        };
    }

	prepareCreateData(data) {
		return {
			...data,
			assignmentId: this.assignmentId
		};
	}

	getList() {
		const { getDataList } = this.props;
		const page = this.pagination.current ? this.pagination.current - 1 : 0;
		const params = {
			page,
			size: this.pagination.pageSize,
			search: this.search,
			assignmentId: this.assignmentId
		};
		getDataList({ params });
	}

	componentDidMount(){
		this.getList();
	}

    handleOnclickMenu = (value, id) => {
		if (value === 1) {
			this.getDetail(id);
		} else {
			this.showDeleteConfirm(id);
		}
	};

	getSearchFields() {
		const { t } = this.props;
		return [
			{
				key: 'content',
				seachPlaceholder: t('searchPlaceHolder.content'),
				initialValue: this.search.content
			},
			{
				key: 'type',
				seachPlaceholder: t('searchPlaceHolder.type'),
				fieldType: FieldTypes.SELECT,
				options: commonQuestionTypes,
				initialValue: this.search.type
			}
		];
	}


	render() {
		const { dataList, loading, uploadFile, t } = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		const questionData =
			dataList.data?.map((data) => {
				return {
					...data,
					count: this.count++
				};
			}) || [];
		this.pagination.total = dataList.totalElements || 0;

		console.log("dataList.data", questionData)
		return (
			<div className='question_listPage'>
				{questionData.map((data, index) => {
					return (
						<List
							key={data.id}
							style={{
								borderRadius: '10px',
								marginBottom: '20px'
							}}
							header={
								<div style={{ display: 'flex', justifyContent: 'space-between'}} >
									<div style={{ fontSize: '17px',color: '#3131b7', marginLeft: '10px'}}
									>
										Câu {index + 1} <span>({data.point}đ)</span>
									</div>
									<Dropdown
										overlay={
											<Menu>
												<Menu.Item key='1'>
													<a
														onClick={() =>
															this.handleOnclickMenu(
																1,
																data.id
															)
														}
													>
														Chỉnh sửa
													</a>
												</Menu.Item>

												<Menu.Item key='2'>
													<a
														onClick={() =>
															this.handleOnclickMenu(
																2,
																data.id
															)
														}
													>
														Xoá
													</a>
												</Menu.Item>
											</Menu>
										}
										trigger={['click']}
									>
										<span style={{}}>
										<EllipsisOutlined rotate={90} style={{fontSize: '17px', marginTop: '5px', fontWeight: '600'}} />
										</span>
									</Dropdown>
								</div>
							}
							bordered
							dataSource={[data]}
							renderItem={(item) => (
								<List.Item key={item.id}>
									
									<div className="bodyList">
										<div className='content'
											dangerouslySetInnerHTML={{ __html: data.content }}
										></div>
										{
											
											data.answer &&
											JSON.parse(data.answer).map((d,i) => {
												return (
													<>
													<div style={{display: 'flex'}}>
														{
															d.rightAnswer === true ? <Checkbox defaultChecked={true} disabled  /> : <Checkbox defaultChecked={false} disabled />
														}
													
													<div className={d.rightAnswer === true ? 'rightAnswer' : ''} dangerouslySetInnerHTML={{ __html: d.content }}>
													</div>
													</div>
													</>
												)
											})
										}
										
									</div>
								</List.Item>
							)}
						/>
					);
				})}
				<div className="action-bar">
				<Button className="btnAdd" type="dashed" onClick={() => this.onShowModifiedModal(false)} block >
                                <PlusOutlined /> {t("createNewButton")}
                          </Button>
                </div>
				<BasicModal
					visible={isShowModifiedModal}
					isEditing={this.isEditing}
					objectName={this.objectName}
					loading={isShowModifiedLoading}
					onOk={this.onOkModal}
					onCancel={this.onCancelModal}
				>
					<QuestionForm
						isEditing={this.isEditing}
						dataDetail={this.isEditing ? this.dataDetail : {}}
						uploadFile={uploadFile}
						loadingSave={isShowModifiedLoading}
						t={t}
					/>
				</BasicModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.question.tbQuestionLoading,
	dataList: state.question.questionData || {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getQuestionList(payload)),
	getDataById: (payload) => dispatch(actions.getQuestionById(payload)),
	updateData: (payload) => dispatch(actions.updateQuestion(payload)),
	deleteData: (payload) => dispatch(actions.deleteQuestion(payload)),
	createData: (payload) => dispatch(actions.createQuestion(payload)),
	uploadFile: (payload) => dispatch(actions.uploadFile(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['questionListPage', 'listBasePage', 'constants', 'basicModal'])(
		QuestionListPage
	)
);
