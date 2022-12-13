import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import FieldSet from "../common/elements/FieldSet";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE
} from "../../constants";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";



class ClassForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
			avatar: props.dataDetail.avatarPath
				? `${AppConstants.contentRootUrl}${props.dataDetail.avatarPath}`
				: "",
			uploading: false,
		};
        const {dataDetail, subjectAutocompleteClass} = this.props
        
        if(!dataDetail.subject?.id){
            return
        }
        
        dataDetail.subject?.id && subjectAutocompleteClass()
        
    }

    handleSubjectChange = (value) => {
        const {teacherAutoComplete} = this.props
        teacherAutoComplete({
            params: {
                subjectId: value
            }
        })
        this.setFieldValue("teacherId", undefined)
    }

    mappingListToOptions(teacherAutocompleteData){
        return teacherAutocompleteData && teacherAutocompleteData.map(c => ({
            value: c.id,
            label: c.fullName
        })) || []	
    }

    handleChangeAvatar = (info) => {
        console.log(info);
        if (info.file.status === "done") {
            Utils.getBase64(info.file.originFileObj, (avatar) =>
                this.setState({ avatar })
            );
        }
    };

    uploadFileAvatar = (file, onSuccess) => {
        const { uploadFile } = this.props;
        this.setState({ uploading: true });
        uploadFile({
            params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
            onCompleted: (result) => {
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

    componentDidMount() {
		const { dataDetail } = this.props;
		this.setFieldValue("avatar", dataDetail.avatar);
	}


    getInitialValue = () => {
        const { dataDetail, isEditing } = this.props;
        console.log(dataDetail)
        if (!isEditing) {
            return {
                ...dataDetail,
            }
        }
        return {
            ...dataDetail,
            teacherId: dataDetail.teacher?.id,
            subjectId: dataDetail.subject?.id
        }
    }


    handleSubmit(formValues) {
        const { onSubmit } = this.props;
        onSubmit({
            ...formValues,
        });
    }

    render() {
        const { 
            formId, 
            dataDetail, 
            loadingSave, 
            isEditing, 
            t, 
            subjectData, 
            teacherSubjectData,
            teacherAutocompleteData 
        } = this.props;
        const {
			uploading,
			avatar,
		} = this.state;
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
                           onChange={this.handleChangeAvatar}
                           uploadFile={this.uploadFileAvatar}
                           required
                           disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <DropdownField
                            fieldName="subjectId"
                            label={t("form.label.subject")}
                            required
                            onChange={this.handleSubjectChange}
                            options={subjectData}
                            disabled={loadingSave}
                        />
                    </Col>
                    <Col span={12}>
                        <DropdownField
                            fieldName="teacherId"
                            label={t("form.label.teacher")}
                            required
                            options={this.mappingListToOptions(teacherAutocompleteData)}
                            disabled={loadingSave || !this.getFieldValue("subjectId")}
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
                            placeholder={t("placeholder.description")}
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

export default ClassForm;
