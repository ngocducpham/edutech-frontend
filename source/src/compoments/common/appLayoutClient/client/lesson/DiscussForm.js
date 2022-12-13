import React from "react";
import { Form, Col, Row, Button } from "antd";

import BasicForm from "../../../entryForm/BasicForm";
import TextField from "../../../entryForm/TextField";
import RichTextField from "../../../entryForm/RichTextField";

class DiscussForm extends BasicForm {
    constructor(props) {
        super(props);
    }

    handleSubmit(formValues) {
        const { onSubmit, onClose } = this.props;
        onSubmit({
            ...formValues,
            ...this.otherData,
        });
        onClose()
    }


    render() {
        const {onShow, onClose} = this.props
        return (
            <Form
                layout="vertical"
                onFinish={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={24}>
                    <TextField
                            fieldName="title"
                            label="Tiêu đề"
                            required
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <RichTextField label="Nội dung" fieldName="content"  />
                    </Col>
                </Row>
                <Row gutter={16} className="frame_btn">
                    <Col >
                    <Button type="primary" htmlType="submit">
                        Tạo thảo luận
                    </Button>
                    </Col>
                   
                </Row>
            </Form>
        );
    }
}

export default DiscussForm;
