import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import NumericField from "../common/entryForm/NumericField";
import FileUploadField from "../common/entryForm/FileUploadField";
import RichTextField from "../common/entryForm/RichTextField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from "../../utils";
import { AppConstants, UploadFileTypes } from "../../constants";
import { showErrorMessage } from "../../services/notifyService";
import apiConfig from "../../constants/apiConfig";
import { sendRequest } from "../../services/apiService";

class LessonForm extends BasicForm {
    constructor(props) {
        super(props);

        let attachment;
        try {
            attachment = JSON.parse(props.dataDetail.attachment);
        } catch (error) {
            attachment = null;
        }   

        this.fileDownloadUri = AppConstants.apiRootUrl + apiConfig.resource.teacherDownloadFileSyllabus.path;
        this.fileDeleteUri = AppConstants.apiRootUrl + apiConfig.resource.teacherDeleteFileSyllabus.path;

        this.state = {
            uploading: false,
            attachmentList: attachment ? 
            attachment?.map((url,index) => ({
                    uid: index,
                    name: Utils.getFileNameFromPath(decodeURI(this.fileDownloadUri + url)).split('/').pop().split('_').splice(1).join('_'),
                    url: this.fileDownloadUri + url
                }
            )) : [],
            attachmentPath: attachment || [],
            icon: props.dataDetail.icon
            ? props.dataDetail.icon
            : "",
            attachmentAccept: ".png,.jpeg,.jpg,.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.exe,.zip,.rar,.txt",
            avatarAccept: ".png,.jpeg,.jpg"
        }
        
    }

    handleChangeAvatar = (info) => {
        console.log(info);
        if (info.file.status === "done") {
            Utils.getBase64(info.file.originFileObj, (icon) =>
                this.setState({ icon })
            );
        }
    };

    uploadFileAvatar = (file, onSuccess, onError) => {
        const { materialsUploadSyllabus, syllabusId } = this.props;
        const {avatarAccept} = this.state;
        if (!this.validateFileUpload(file, avatarAccept)) {
            setTimeout(() => {
                onError();
            }, 100);
            return;
        }

        this.setState({ uploading: true });
        materialsUploadSyllabus({
            params: { files: { file }, type: UploadFileTypes.AVATAR, syllabusId: syllabusId },
            onCompleted: (result) => {
                this.setFieldValue("icon", this.fileDownloadUri + result.data[0].fileDownloadUri);
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

    handleChangeAttachment = info => {
        const {teacherDeleteFileSyllabus, updateLesson, dataDetail} = this.props;

        let fileList = [...info.fileList];
        if(fileList.length <= 0){
          this.setFieldValue("attachment", '');
        }
        
        this.setState({ attachmentList: fileList });
        if(info.file.status === "done"){
          this.setFieldValue("attachment", this.state.attachmentPath);
        }else if(info.file.status === "removed"){
            this.setState(state => ({
                attachmentPath: state.attachmentPath.filter((item) => {       
                    let fileUrl;          
                    if(info.file.originFileObj){
                        fileUrl = info.file.originFileObj.url;
                    }else{
                        fileUrl = info.file.url.replace(this.fileDownloadUri,'');
                    }
                    if(item.includes(fileUrl)){
                        teacherDeleteFileSyllabus({
                            params: {fileUrl: fileUrl},
                            onCompleted: (result) => {},
                            onError: (err) => {}
                        },)
                        return false;
                    }
                    return true;
                })
            }))
            this.setFieldValue("attachment", this.state.attachmentPath);
            setTimeout(() => {
                updateLesson({
                    params: {id: dataDetail.id, attachment: JSON.stringify(this.state.attachmentPath)},
                    onCompleted: () => {},
                    onError: () => {}
                });
            }, 500);
        }
      };
    
      uploadAttachment = (file, onSuccess, onError) => {
        const { materialsUploadSyllabus, syllabusId, updateLesson, dataDetail } = this.props;
        const {attachmentAccept} = this.state
        
        if(!this.validateFileUpload(file, attachmentAccept)){
            setTimeout(() => {
                onError();
            }, 100);
            return;
        }

        materialsUploadSyllabus({
            params: { files: { file }, syllabusId: syllabusId },
            onCompleted: (result) => {
                const path = this.state.attachmentPath;
                path.push(...result.data.map(r => r.fileDownloadUri))
                this.setState((state) => ({
                    attachmentPath: path
                }));
                file.url = path[path.length-1]
                setTimeout(() => {
                    updateLesson({
                        params: {id: dataDetail.id, attachment: JSON.stringify(this.state.attachmentPath)},
                        onCompleted: () => {},
                        onError: () => {}
                    });
                }, 500);
                onSuccess();
            },
            onError: (err) => {
                if (err && err.message) {
                    showErrorMessage("Upload file thất bại");
                }
                onError();
            },
        });
      };

    getInitialValue = () => {
        const { dataDetail, isEditing, totalOrder } = this.props;
        if (!isEditing) {
            return {
                ...dataDetail,
                order: totalOrder + 1,
            }
        }
        return {
            ...dataDetail,
        }
    }


    handleSubmit(formValues) {
        const { onSubmit } = this.props;
        onSubmit({
            ...formValues,
            attachment: JSON.stringify(this.state.attachmentPath)
        });
    }

    validateFileUpload(file, accept) {
        if (!accept.includes(`.${file.name.split('.').pop().toLowerCase()}`)) {
            showErrorMessage(`${file.name} không đúng định dạng`);
            return false;
        }
        if (file.size > 1048576 * 20) {
            showErrorMessage(`${file.name} dung lượng vượt qua 20MB`);
            return false;
        }
        return true;
    }

    render() {
        const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
        const {attachmentList, uploading, icon,attachmentAccept, avatarAccept } = this.state;
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
                                fieldName="icon"
                                beforeUpload={this.beforeUploadAvatar}
                                accept={avatarAccept}
                                loading={uploading}
                                label={t("form.label.avatar")}
                                imageUrl={icon}
                                onChange={this.handleChangeAvatar}
                                uploadFile={this.uploadFileAvatar}
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
                    <Col span={9}>
                        <FileUploadField 
                            fieldName="attachment"
                            multiple={true}
                            label={t("form.label.attachment")}
                            accept={attachmentAccept}
                            fileList={attachmentList}
                            onChange={this.handleChangeAttachment}
                            uploadFile={this.uploadAttachment}
                            disabled={loadingSave}
                            loading={uploading}
                            requiredMsg="Vui lòng chọn tệp đính kèm"
                            
                        />
                    </Col>
                    <Col span={3} hidden>
                        <NumericField
                            min={0}
                            fieldName="order"
                            label={t("form.label.order")}
                            disabled
                            width="100%"
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <RichTextField label={t('form.label.content')} fieldName="content" disabled={loadingSave} required />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default LessonForm;
