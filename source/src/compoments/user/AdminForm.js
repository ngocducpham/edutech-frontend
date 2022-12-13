import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";

import { commonStatus, commonLanguages } from "../../constants/masterData";
import CropImageFiled from "../common/entryForm/CropImageFiled";

import {
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

// import { actions } from "../../actions";
// const { getUserData } = actions;

class AdminForm extends BasicForm {
	constructor(props) {
		super(props);
		this.state = {
			logo: props.dataDetail.avatar
				? `${AppConstants.contentRootUrl}${props.dataDetail.avatar}`
				: "",
			uploading: false,
		};
	}

	componentDidMount() {
		const { dataDetail } = this.props;
		this.setFieldValue("avatar", dataDetail.avatar);
	}

	validateToConfirmPassword = (rule, value) => {
		const {
		current: { validateFields, isFieldTouched },
		} = this.formRef;
		if (isFieldTouched("confirmPassword")) {
		validateFields(["confirmPassword"], { force: true });
		}
		return Promise.resolve();
	};

	compareToPassword = (rule, newPassword) => {
		const { t } = this.props;
		const password = this.getFieldValue("password");
		if ((password || newPassword) && password !== newPassword) {
		return Promise.reject(t("form.validationMessage.comparePassword"));
		} else {
		return Promise.resolve();
		}
	};

	handleChangeLogo = (info) => {
		console.log(info);
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (logo) =>
			this.setState({ logo })
		);
		}
	};

	uploadFileLogo = (file, onSuccess) => {
		const { uploadFile } = this.props;
		this.setState({ uploading: true });
		uploadFile({
		params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
		onCompleted: (result) => {
			// this.otherData.logoPath = result.data.filePath;
			this.setFieldValue("avatar", result.data.filePath);
			this.setState({ uploading: false });
			onSuccess();
		},
		onError: (err) => {
			if (err && err.message) {
			showErrorMessage(err.message);
			this.setState({ uploading: false });
			}
		},
		});
	};

	getInitialFormValues = () => {
		const { isEditing, dataDetail } = this.props;
		if (!isEditing) {
		return {
			status: STATUS_ACTIVE,
		};
		}
		return dataDetail;
	};

  	handleSubmit(formValues) {
		const { onSubmit } = this.props;
		onSubmit({
			...formValues,
			...this.otherData,
		});
	}

	render() {
		const { isEditing, formId, loadingSave, t } = this.props;
		const {
			uploading,
			logo,
			color,
			displayColorPicker,
		} = this.state;
		return (
		<Form
			id={formId}
			ref={this.formRef}
			layout="vertical"
			onFinish={this.handleSubmit}
			initialValues={this.getInitialFormValues()}
		>
			<Row gutter={16}>
			<Col span={12}>
				<CropImageFiled
				fieldName="avatar"
				loading={uploading}
				label={t("form.label.avatar")}
				imageUrl={logo}
				onChange={this.handleChangeLogo}
				uploadFile={this.uploadFileLogo}
				disabled={loadingSave}
				/>
			</Col>
			</Row>
			<Row gutter={16}>
			<Col span={12}>
				<TextField
				fieldName="username"
				min={6}
				label={t("form.label.username")}
				disabled={isEditing || loadingSave}
				required={!isEditing}
				validators={[Utils.validateUsernameForm]}
				/>
			</Col>
			<Col span={12}>
				<TextField fieldName="fullName" label={t("form.label.fullName")} required disabled={loadingSave}/>
			</Col>
			</Row>
			<Row gutter={16}>
			<Col span={12}>
				<TextField
				type="password"
				fieldName="password"
				label={isEditing ? t("form.label.newPassword") : t("form.label.password")}
				required={!isEditing}
				validators={[this.validateToConfirmPassword]}
				minLength={6}
				disabled={loadingSave}
				/>
			</Col>
			<Col span={12}>
				<TextField
				type="password"
				fieldName="confirmPassword"
				label={isEditing ? t("form.label.confirmNewPassword") : t("form.label.confirmPassword")}
				required={!isEditing || this.getFieldValue("password")}
				validators={[this.compareToPassword]}
				disabled={loadingSave}
				/>
			</Col>
			</Row>
			<Row gutter={16}>
			<Col span={12}>
				<TextField fieldName="email" label="E-mail" type="email" disabled={loadingSave}/>
			</Col>
			<Col span={12}>
				<TextField
				type="number"
				fieldName="phone"
				label={t("form.label.phone")}
				required
				minLength={10}
				disabled={loadingSave}
				/>
			</Col>
			</Row>
		</Form>
		);
	}
}

export default AdminForm;
