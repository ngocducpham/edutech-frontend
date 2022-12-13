import React from "react";
import { Form, Col, Row, Button, message } from "antd";
import { KeyOutlined, CopyOutlined } from '@ant-design/icons';

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";

import { commonStatus, commonLanguages, commonDegree, kindProvince } from "../../constants/masterData";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import DatePickerField from "../common/entryForm/DatePickerField";
import { convertStringToDateTime, convertDateTimeToString } from "../../utils/datetimeHelper";
import {
  AppConstants,
  UploadFileTypes,
  STATUS_ACTIVE,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";
import PasswordGeneratorField from "../common/entryForm/PasswordGeneratorField";

import { actions } from "../../actions";
const { getUserData } = actions;

class TeacherForm extends BasicForm {
	constructor(props) {
		super(props);
		this.state = {
			avatar: props.dataDetail.avatarPath
				? `${AppConstants.contentRootUrl}${props.dataDetail.avatarPath}`
				: "",
			uploading: false,
			curPassword: null,
		};
		const {
            getProvinceComboboxList, getDistrictComboboxList, getCommuneComboboxList, dataDetail
        } = this.props;
		getProvinceComboboxList();
		dataDetail.province?.id && dataDetail.district?.id && getDistrictComboboxList({
            params: {
                parentId: dataDetail.province.id
            }
        })
		dataDetail.district?.id && dataDetail.commune?.id && getCommuneComboboxList ({
			params: {
				  parentId: dataDetail.district.id,
			},
		})
	}

	handleProvinceChange = (value) => {
        const {getDistrictComboboxList} = this.props
        getDistrictComboboxList({
            params: {
                parentId: value
            }
        })
        this.setFieldValue("districtId", undefined)
        this.setFieldValue("communeId", undefined)
    }
	

    handleDistrictChange = (value) => {
        const {getCommuneComboboxList, communeComboboxList} = this.props;
        getCommuneComboboxList({
            params: {
                parentId: value
            }
        })
        this.setFieldValue("communeId", undefined)
    }

	mappingComboboxListToOptions(comboboxData){
        return comboboxData && comboboxData.map(c => ({
            value: c.id,
            label: c.name
        })) || []	
    }

	componentDidMount() {
		const { dataDetail } = this.props;
		this.setFieldValue("avatar", dataDetail.avatarPath);
	}

	handleChangeLogo = (info) => {
		console.log(info);
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (avatar) =>
			this.setState({ avatar })
		);
		}
	};

	uploadFileLogo = (file, onSuccess) => {
		const { uploadFile } = this.props;
		this.setState({ uploading: true });
		uploadFile({
		params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
		onCompleted: (result) => {
			// this.otherData.avatarPath = result.data.filePath;
			this.setFieldValue("avatarPath", result.data.filePath);
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
		return {
            ...dataDetail,
			birthDay: convertStringToDateTime(dataDetail.birthDay, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY'),
			provinceId: dataDetail.province?.id,
			districtId: dataDetail.district?.id,
			communeId: dataDetail.commune?.id
        };
	};


	onChangeDateBDate = (value) => {
        const Date = this.getFieldValue('birthDay');
        if(Date) {
            this.setFieldValue('birthDay', value);
        }
    }

	handleSubmit(formValues) {
        const { onSubmit } = this.props;
        if(formValues.birthDay) {
            formValues.birthDay = formValues.birthDay
        }
        onSubmit({
            ...formValues,
            ...this.otherData,
            birthDay: convertDateTimeToString(formValues.birthDay, 'DD/MM/YYYY HH:mm:ss'),
        });
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
        return Promise.reject(t("validationMessage.password"));
        } else {
        return Promise.resolve();
        }
    };

    copyToClipboardAlert = () => {
        const { t } = this.props;
        message.success( t('constants:successMessage.copied'));
    };


	render() {
		const { 
			isEditing, 
			formId, 
			loadingSave, 
			t, 
			provinceComboboxData,
            districtComboboxData,
            communeComboboxData,
		} = this.props;
		const {
			uploading,
			avatar,
			curPassword,
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
				fieldName="avatarPath"
				loading={uploading}
				label={t("form.label.avatar")}
				imageUrl={avatar}
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
                    label={t("form.label.username")}
                    required
                    disabled={isEditing ||loadingSave}/>
                </Col>
				<Col span={12}>
				<TextField
                    fieldName="fullName"
                    label={t("form.label.fullName")}
                    required
                    disabled={loadingSave}/>
                </Col>
			</Row>
			<Row gutter={16}>
			<Col span={12}>
                <TextField
                    fieldName="phone"
                    label={t("form.label.phone")}
                    type="number"
                    minLength={10}
                    maxLength={11}
                    required
                    disabled={loadingSave}
                    />
                </Col>
				<Col span={12}>
					<DatePickerField
						fieldName="birthDay"
						label={t("form.label.birthDay")}
						width="60%"
						onChange={this.onChangeDateBDate}
						format={"DD/MM/YYYY"}
						disabled={loadingSave}
						placeholder={t("form.placeholder.birthDay")}
					/>
                </Col>
			</Row>
            <Row gutter={16}>
            <Col span={12}>
                    <PasswordGeneratorField
                        type="password"
                        fieldName="password"
                        label={isEditing ? t("form.label.newPassword") : t("form.label.password")}
                        required={!isEditing}
                        minLength={6}
                        disabled
                        value={this.getFieldValue('password')}
                        suffix={
                            <>
                                <Button onClick={
                                    () => {
                                        const curPass = Utils.generateRandomPassword(8, true, true, false, false, true)
                                        this.setState({curPassword: curPass})
                                        this.setFieldValue('password', curPass)
                                    }}
                                >
                                    <KeyOutlined style={{ alignSelf: 'center'}}/>
                                </Button>
                                <Button disabled={!curPassword} 
                                    onClick={()=>{
										Utils.copyToClipboard(this.getFieldValue('password'))
										this.copyToClipboardAlert()
									}}>
                                <CopyOutlined style={{ alignSelf: 'center' }}/></Button>
                            </>
                        }
                    />
                </Col>
				<Col span={12}>
                    <TextField
                    fieldName="email"
                    label="E-mail"
                    type="email"
                    disabled={loadingSave}
                    required
                    />
                </Col>
			</Row>
			<Row gutter={16}>
                
				<Col span={12}>
                    <DropdownField
                        fieldName="degree"
                        label={t("form.label.degree")}
                        required
                        options={commonDegree}
                        disabled={loadingSave}
                    />
                </Col>
				<Col span={12}>
					<TextField
                    fieldName="address"
                    label={t("form.label.address")}
                    required
                    disabled={loadingSave}/>
					
                </Col>
			</Row>
			
			<Row gutter={16}>
            
                <Col span={12}>
                    <DropdownField
                        fieldName="provinceId"
                        label={t("form.label.province")}
                        required
                        options={this.mappingComboboxListToOptions(provinceComboboxData)}
						onChange={this.handleProvinceChange}
						disabled={loadingSave || provinceComboboxData.length <= 0}
                    />
                </Col>
                <Col span={12}>
				<DropdownField
                        fieldName="districtId"
                        label={t("form.label.district")}
                        options={this.mappingComboboxListToOptions(districtComboboxData)}
						onChange={this.handleDistrictChange}
						disabled={loadingSave || !this.getFieldValue("provinceId")}
                    />
                </Col>
			</Row>
			<Row gutter={16}>
           
                <Col span={12}>
                    <DropdownField
                        fieldName="communeId"
                        label={t("form.label.commune")}
						options={this.mappingComboboxListToOptions(communeComboboxData)}
						disabled={(loadingSave || !this.getFieldValue("provinceId")) && !this.getFieldValue("districtId")}
                    />
                </Col>
                <Col span={12}>
                    <DropdownField
                        fieldName="status"
                        label={t("form.label.status")}
                        required
                        options={commonStatus}
                        disabled={loadingSave}
                    />
                </Col>
			</Row>
		</Form>
		);
	}
}

export default TeacherForm;
