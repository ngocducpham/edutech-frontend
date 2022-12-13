import React from "react";
import {Form, Button, Divider} from "antd";
import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import { FormItemLayoutConf } from "../../constants/formConfig";
import { showErrorMessage } from "../../services/notifyService";
import Utils from "../../utils";
import { AppConstants, UploadFileTypes, UserTypes } from "../../constants";
import { actions } from "../../actions";
import DatePickerField from "../common/entryForm/DatePickerField";
import {convertStringToDateTime} from "../../utils/datetimeHelper";
import { commonDegree } from "../../constants/masterData";

class TeacherProfileForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
            avatar: props.userData.avatar
                ? `${AppConstants.contentRootUrl}${props.userData.avatar}`
                : `${AppConstants.contentRootUrl}${props.userData.avatarPath}`,
            logo: props.userData.logoPath
                ? `${AppConstants.contentRootUrl}${props.userData.logoPath}`
                : "",
            avatarUploading: false,
        };

        this.isEmployee = actions.getUserData()?.kind === UserTypes.EMPLOYEE
    }

    componentDidMount() {
        const { userData } = this.props;
        this.setFieldValue("avatar", userData.avatar);
        this.setFieldValue("logo", userData.logoPath);
    }

    handleConfirmPasswordBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    validateToConfirmPassword = (rule, value) => {
        const {
            current: { validateFields, isFieldTouched },
        } = this.formRef;
        if (isFieldTouched("confirmPassword")) {
            validateFields(["confirmPassword"], { force: true });
        }
        return Promise.resolve();
    };

    compareToPassword = (rule, password) => {
        const newPassword = this.getFieldValue("password");
        if ((password || newPassword) && password !== newPassword) {
            return Promise.reject(this.props.t('form.validationMessage.passwordNotMatch'));
        } else {
            return Promise.resolve();
        }
    };

    handleChangeAvatar = (info) => {
        if (info.file.status === "done") {
            Utils.getBase64(info.file.originFileObj, (avatar) =>
                this.setState({ avatar })
            );
        }
    };

    uploadFileAvatar = (file, onSuccess) => {
        const { uploadFile } = this.props;
        this.setState({ avatarUploading: true });
        uploadFile({
            params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
            onCompleted: (result) => {
                this.setFieldValue("avatar", result.data.filePath);
                this.setState({ avatarUploading: false });
                onSuccess();
            },
            onError: (err) => {
                if (err && err.message) {
                    showErrorMessage(err.message);
                    this.setState({ avatarUploading: false });
                }
            },
        });
    };

    handleChangeLogo = (info) => {
        if (info.file.status === "done") {
            Utils.getBase64(info.file.originFileObj, (logo) =>
                this.setState({ logo })
            );
        }
    };

    uploadFileLogo = (file, onSuccess) => {
        const { uploadFile } = this.props;
        this.setState({ logoUploading: true });
        uploadFile({
            params: { fileObjects: { file }, type: UploadFileTypes.LOGO },
            onCompleted: (result) => {
                this.setFieldValue("logo", result.data.filePath);
                // this.otherData.logo = result.data.filePath;
                this.setState({ logoUploading: false });
                onSuccess();
            },
            onError: (err) => {
                if (err && err.message) {
                    showErrorMessage(err.message);
                    this.setState({ logoUploading: false });
                }
            },
        });
    };

    render() {
        const { loading, userData, t } = this.props;
        const { avatar, avatarUploading } = this.state;

        userData.birthDay = convertStringToDateTime(userData.birthDay, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY')
        userData.degree = commonDegree.find(degree => degree.value === userData.degree).label;

        return (
            <>
                <Divider orientation="left">Thông tin cá nhân</Divider>
                <Form
                    {...FormItemLayoutConf}
                    initialValues={userData}
                >
                    <CropImageFiled
                        fieldName="avatar"
                        loading={avatarUploading}
                        label={t('form.label.avatar')}
                        imageUrl={avatar}
                        onChange={this.handleChangeAvatar}
                        uploadFile={this.uploadFileAvatar}
                        disabled={this.isEmployee}
                    />
                    <TextField
                        fieldName="fullName"
                        label={t('form.label.fullName')}
                        disabled
                    />
                    <TextField
                        fieldName="email"
                        label={t('form.label.email')}
                        disabled
                    />
                    <TextField
                        fieldName="phone"
                        label={t('form.label.phone')}
                        disabled
                    />
                    <DatePickerField
                        fieldName="birthDay"
                        label={t("form.label.birthday")}
                        onChange={this.onChangeDateBDate}
                        format={"DD/MM/YYYY"}
                        disabled
                    />
                    <TextField
                        fieldName='degree'
                        label={t('form.label.degree')}
                        disabled
                    />
                    <TextField
                        fieldName="address"
                        label={t('form.label.address')}
                        disabled
                    />
                    <TextField
                        fieldName={['province','name']}
                        label={t('form.label.province')}
                        disabled
                    />
                    <TextField
                        fieldName={['district','name']}
                        label={t('form.label.district')}
                        disabled
                    />
                    <TextField
                        fieldName={['commune','name']}
                        label={t('form.label.commune')}
                        disabled
                    />

                </Form>
                <Divider orientation="left">Cập nhật thông tin</Divider>
                <Form  
                    {...FormItemLayoutConf}
                    ref={this.formRef}
                    onFinish={this.handleSubmit}
                    >
                <TextField
                    type="password"
                    fieldName="currentPassword"
                    label={t('form.label.oldPassword')}
                    required
                    requiredMsg={t('form.validationMessage.passwordRequire')}
                />
                <TextField
                    type="password"
                    fieldName="password"
                    required
                    label={t('form.label.newPassword')}
                    validators={[this.validateToConfirmPassword]}
                />
                <TextField
                    type="password"
                    fieldName="confirmPassword"
                    label={t('form.label.confirmNewPassword')}
                    required
                    validators={[this.compareToPassword]}
                />
                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button
                        loading={loading}
                        className="profile-form-button"
                        type="primary"
                        htmlType="submit"
                    >
                        {t('button.update')}
                    </Button>
                </Form.Item>
                </Form>
            </>
        );
    }
}

export default TeacherProfileForm;
