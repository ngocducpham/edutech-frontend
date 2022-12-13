import React from 'react';
import { Form, Col, Row } from 'antd';

import BasicForm from '../common/entryForm/BasicForm';
import DropdownField from '../common/entryForm/DropdownField';
import {
	questionTypeEssay,
	commonQuestionTypes
	
} from '../../constants/masterData';
import RichTextField from '../common/entryForm/RichTextField';
import NumericField from '../common/entryForm/NumericField';
import TextField from '../common/entryForm/TextField';

class QuestionEssayForm extends BasicForm {
	constructor(props) {
		super(props);
		this.state = {
			type: props.isEditing ? props.dataDetail.type : questionTypeEssay[0].value
		};
	}

	getInitialValue = () => {
		const { dataDetail, isEditing } = this.props;
		const {type} = this.state;
		if (!isEditing) {
			return {
				...dataDetail,
				type
			};
		}
		return {
			...dataDetail,
			type
		};
	};

	handleSubmit(formValues) {
		const { onSubmit, dataDetail } = this.props;
		const type = formValues.type || dataDetail.type;
		onSubmit({
			...formValues,
			type: questionTypeEssay[0].value
		});
	}

	render() {
		const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
		const {type} = this.props;
		return (
			<Form
				id={formId}
				ref={this.formRef}
				layout='vertical'
				onFinish={this.handleSubmit}
				initialValues={this.getInitialValue()}
			>
				<Row gutter={16}>
					<Col span={12}>
						<DropdownField
							fieldName='type'
							label={t('form.label.type')}
							required
							options={questionTypeEssay}
							disabled={true}
						/>
					</Col>
					<Col span={12}>
					<NumericField 
							fieldName='point'
							label={t('form.label.point')}
							required
							min={0}
							max={10}
							disabled={loadingSave}	
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<RichTextField
							label={t('form.label.content')}
							fieldName='content'
							disabled={loadingSave}
							required={true}
						/>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default QuestionEssayForm;
