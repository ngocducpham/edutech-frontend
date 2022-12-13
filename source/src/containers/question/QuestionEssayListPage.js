import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Tag, Button, Collapse, List, Menu, Dropdown } from 'antd';
import { UserOutlined, PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import qs from 'query-string';
import { withTranslation } from 'react-i18next';

import ListBasePage from '../ListBasePage';
import BasicModal from '../../compoments/common/modal/BasicModal';

import { actions } from '../../actions';
import { FieldTypes } from '../../constants/formConfig';
import {
	commonQuestionTypes,
	commonAssignmentTypes
} from '../../constants/masterData';
import QuestionEssayForm from '../../compoments/question/QuestionEssayForm';
import { sitePathConfig } from '../../constants/sitePathConfig';

class QuestionEssayListPage extends ListBasePage {
	initialSearch() {
		return { title: '', type: undefined };
	}

	constructor(props) {
		super(props);
		const { t } = props;
        const { location: { search } } = props;
		const {
            chapterId,
            chapterName,
            parentId, parentName
        } = qs.parse(search);
        this.assignmentId = parentId;
		this.assignmentName = parentName;
        this.objectName = t("objectName");
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
                name: `${t("breadcrumbs.assignmentPage")}`,
                path: `${sitePathConfig.assignment.path}${this.handleRoutingParent('parentSearch')}`
            },
            {
                name: `${t("breadcrumbs.currentPage")}`,
            },
        ];

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
        const params = { page, size: this.pagination.pageSize, search: this.search, assignmentId: this.assignmentId };
        getDataList({ params });
    }


	getSearchFields() {
		const { t } = this.props;
		const { assignmentType } = this.props;
		const quesitionType =
			assignmentType === commonAssignmentTypes[1].value
				? [commonQuestionTypes[2]]
				: commonQuestionTypes.filter(
						(type) => type.value !== commonQuestionTypes[2].value
				  );

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
				options: quesitionType,
				initialValue: this.search.type
			}
		];
	}

	handleOnclickMenu = (value, id) => {
		if (value === 1) {
			this.getDetail(id);
		} else {
			this.showDeleteConfirm(id);
		}
	};

	render() {
		this.count = 1;
		const { dataList, loading, t, assignmentType } = this.props;
		const { isShowModifiedModal, isShowModifiedLoading } = this.state;
		let questionData =
			dataList.data?.map((data) => {
				return {
					...data,
					count: this.count++
				};
			}) || [];

		this.pagination.total = dataList.totalElements || 0;
		return (
			<div>
				{questionData.map((data, index) => {
                    console.log('data',data.id);
					return (
						<List key={data.id}
							style={{
								borderRadius: '10px',
								marginBottom: '20px'
							}}
							header={
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between'
									}}
								>
									<div
										style={{
											marginBottom: '5px',
											fontSize: '17px',
											color: '#3131b7'
										}}
									>
										Câu {index + 1} <span style={{fontSize: '17px', color: '#3131b7'}}>({data.point}đ)</span>
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
										<EllipsisOutlined rotate={90} style={{fontSize: '17px', marginTop: '5px', fontWeight: '600'}} />
									</Dropdown>
								</div>
							}
							bordered
							dataSource={[data]}
							renderItem={(item) => (
								<List.Item key={item.id}>
									<div
										dangerouslySetInnerHTML={{ __html: data.content }}
									></div>
								</List.Item>
							)}
						/>
					);
				})}
                 <div className="action-bar">
                    {
                        this.renderCreateNewButton((
                            <Button className="btnAdd" type="dashed" onClick={() => this.onShowModifiedModal(false)} block >
                                <PlusOutlined /> {t("createNewButton")}
                          </Button>
                        ))
                    }
                </div>
				<BasicModal
					visible={isShowModifiedModal}
					isEditing={this.isEditing}
					objectName={this.objectName}
					loading={isShowModifiedLoading}
					onOk={this.onOkModal}
					onCancel={this.onCancelModal}
				>
					<QuestionEssayForm
						isEditing={this.isEditing}
						dataDetail={this.isEditing ? this.dataDetail : {}}
						type={commonQuestionTypes}
						loadingSave={isShowModifiedLoading}
						assignmentType={assignmentType}
						t={t}
					/>
				</BasicModal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.question.tbQuestionLoading,
	dataList: state.question.questionData || {},
	assignmentType: state.question.assignmentType || {}
});

const mapDispatchToProps = (dispatch) => ({
	getDataList: (payload) => dispatch(actions.getQuestionList(payload)),
	getDataById: (payload) => dispatch(actions.getQuestionById(payload)),
	updateData: (payload) => dispatch(actions.updateQuestion(payload)),
	deleteData: (payload) => dispatch(actions.deleteQuestion(payload)),
	createData: (payload) => dispatch(actions.createQuestion(payload)),
	getAssignmentById: (payload) => dispatch(actions.getAssignmentById(payload))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	withTranslation(['questionEssayListPage', 'listBasePage', 'constants', 'basicModal'])(
		QuestionEssayListPage
	)
);
