import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import {
    AppConstants,
    UploadFileTypes,
    STATUS_ACTIVE,
} from "../../constants";
import { commonStatus } from "../../constants/masterData";
import Utils from "../../utils";
import { showErrorMessage } from "../../services/notifyService";

class SubjectForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getInitialValue = () => {
        const { dataDetail, isEditing } = this.props;
        if (!isEditing) {
            return {
                ...dataDetail,
                status: STATUS_ACTIVE,
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
        });
    }

    render() {
        const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
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
                        <TextField
                            fieldName="name"
                            label={t("form.label.name")}
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            fieldName="code"
                            label={t("form.label.code")}
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    {
                        isEditing ? (
                            <Col span={12}>
                                <DropdownField
                                    fieldName="status"
                                    label={t("form.label.status")}
                                    required
                                    options={commonStatus}
                                    disabled={loadingSave}
                                />
                            </Col>
                        ) : null
                    }
                    <Col span={12}>
                        <TextField
                            type="textarea"
                            fieldName="description"
                            label={t("form.label.description")}
                            required
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

export default SubjectForm;
