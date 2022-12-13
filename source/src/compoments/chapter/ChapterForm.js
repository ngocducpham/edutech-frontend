import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";
import TextField from "../common/entryForm/TextField";
import RichTextField from "../common/entryForm/RichTextField";


class ChapterForm extends BasicForm {
    constructor(props) {
        super(props);
    }

    getInitialValue = () => {
        const { dataDetail } = this.props;
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
                    <Col span={24}>
                        <TextField
                            fieldName="title"
                            label={t("form.label.title")}
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <RichTextField label={t('form.label.description')} fieldName="description" disabled={loadingSave} required />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default ChapterForm;
