import React from "react";
import { Form, Col, Row, Button } from "antd";

import BasicForm from "../../../entryForm/BasicForm";
import TextField from "../../../entryForm/TextField";
import RichTextField from "../../../entryForm/RichTextField";

class CommentPage extends BasicForm {
    constructor(props) {
        super(props);
    }

    handleSubmit(formValues) {
        const { onSubmit, onClose, parentId } = this.props;
        let id = null;
        if(parentId !== null){
            id = parentId
        }else{
            id = null
        }
        onSubmit({
            ...formValues,
            parentId: id,
            ...this.otherData,
        });
        onClose()   
    }


    render() {
        const {onClose, onShow, parentId, numberCmt} = this.props;
        console.log("numberCmt", numberCmt)
        return (
            <div className="comment-page">
                <Form
                layout="vertical"
                onFinish={this.handleSubmit}
                >
                <Row gutter={16}>
                    <Col span={24}>
                    <TextField
                                type="textarea"
                                fieldName="content"
                                label="nội dung câu trả lời"
                                required
                                style={{
                                    height: 100
                                }}
                                />
                    </Col>
                </Row>
                <Row gutter={16} hidden>
                    <Col span={24}>
                    <TextField
                                fieldName="parentId"
                                label="ParentId"
                                />
                    </Col>
                </Row>
                <Row gutter={16} className="frame_btn">
                        <Col >
                        <Button type="dash" onClick={onClose}>
                            Đóng
                        </Button>
                        </Col>
                        <Col >
                        <Button type="primary" htmlType="submit">
                            Gửi đi
                        </Button>
                        </Col>
                </Row>
            </Form>
        </div>
        );
    }
}

export default CommentPage;
