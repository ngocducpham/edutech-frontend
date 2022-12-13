import React from 'react';
import { Form, Col, Row } from 'antd';

import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import FieldSet from '../common/elements/FieldSet';
import DropdownField from '../common/entryForm/DropdownField';
import CropImageFiled from '../common/entryForm/CropImageFiled';
import { AppConstants, UploadFileTypes, STATUS_ACTIVE } from '../../constants';
import {
	ASPECT_CATEGORY_AVATAR,
	commonAssignmentTypes
} from '../../constants/masterData';

class AssignmentForm extends BasicForm {
	constructor(props) {
		super(props);
		this.state = {};
	}

	getInitialValue = () => {
		const { dataDetail, isEditing } = this.props;
		if (!isEditing) {
			return {
				...dataDetail
			};
		}
		return {
			...dataDetail
		};
	};

	handleSubmit(formValues) {
		const { onSubmit } = this.props;
		onSubmit({
			...formValues,
		});
	}

	render() {
		const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
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
						<TextField
							fieldName='title'
							label={t('form.label.title')}
							required
							disabled={loadingSave}
						/>
					</Col>
					<Col span={12}>
						{!isEditing && (
							<DropdownField
								fieldName='type'
								label={t('form.label.type')}
								required
								options={commonAssignmentTypes}
								disabled={loadingSave}
							/>
						)}
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<TextField
                            style={{ height: '200px' }}
                            type="textarea"
							fieldName='description'
							label={t('form.label.description')}
							disabled={loadingSave}
						/>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default AssignmentForm;
