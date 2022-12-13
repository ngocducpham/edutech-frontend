import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import {
    AppConstants,
    UploadFileTypes,
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class SyllabusForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
			avatar: props.dataDetail.avatar
				? `${AppConstants.contentRootUrl}${props.dataDetail.avatar}`
				: "",
			uploading: false,
		};
    }

    getInitialValue = () => {
        const { dataDetail, isEditing } = this.props;
        return {
            ...dataDetail,
        }
    }



    handleChangeLogo = (info) => {
		console.log(info);
		if (info.file.status === "done") {
		Utils.getBase64(info.file.originFileObj, (avatar) =>
			this.setState({ avatar })
           
		);
		}
        console.log("ava", info)
	};

	uploadFileLogo = (file, onSuccess) => {
		const { uploadFile } = this.props;
		this.setState({ uploading: true });
		uploadFile({
		params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
		onCompleted: (result) => {
			// this.otherData.avatarPath = result.data.filePath;
			this.setFieldValue("avatar", result.data.filePath);
            console.log("check", this.getFieldValue("avatar"))
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

    render() {
        const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
        const {avatar, uploading} = this.state;
        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={this.getInitialValue()}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageFiled
                        fieldName="avatar"
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
                            fieldName="title"
                            label={t("form.label.title")}
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            type="textarea"
                            fieldName="description"
                            label={t("form.label.description")}
                            style={{
                                height: 100
                            }}
                            disabled={loadingSave} />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default SyllabusForm;
