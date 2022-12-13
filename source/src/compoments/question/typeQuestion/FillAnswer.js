import React, { Component } from 'react'

import {Form, Input } from "antd";
const { TextArea } = Input;


class FillAnswer extends Component {
    handleChangeQuestionContent = (newAnswer) => {
        const { handleChangeOtherData } = this.props;
        handleChangeOtherData(newAnswer);
    }
    handleChangeInput = (e) => {
        if(e.target.value)
            this.handleChangeQuestionContent(e.target.value);
    }
    render() {
        const { fieldName, disabled } = this.props;
        return (
            <Form.Item
            name={fieldName}
            label="Câu trả lời"
            disabled={disabled}
            required
            rules={[
                { required: true, message: 'Vui lòng nhập câu trả lời'}
            ]}
            
        >
            <TextArea onChange={(e)=> {
            this.handleChangeInput(e);
        }}/>
            </Form.Item>
        )
    }
}

export default FillAnswer
