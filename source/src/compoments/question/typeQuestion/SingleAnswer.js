import React, { Component } from 'react'

import {Checkbox, Form, Col, Row, Button, Card, Input } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import BaseTable from "../../../compoments/common/table/BaseTable";

class SingleAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            answerList: Array.isArray(props.answer) ? [...props.answer] : [],
            currentFocus: undefined,
         };
        this.columns = [
            { 
                title: "Nội dung", 
                dataIndex: "content",
                render: (content, record, i) => (
                    <span>
                          <Form.Item name={[this.props.fieldName, i, 'content']} style={{margin: "8px 0"}}>
                            <Input required
                             onChange={(e)=>{this.handleChangeInput(e , i)}}
                            />
                          </Form.Item>
                    </span>
                )
            },
            { 
              title: "Đáp án", 
              align: "right",
              width: "100px",
              dataIndex: "rightAnswer",
              render: (rightAnswer, record, i) => {
                return (
                    <Form.Item 
                    style={{margin: "8px 0"}}
                    name={[this.props.fieldName, i, 'rightAnswer']} 
                    valuePropName="checked" >
                    <Checkbox 
                        onChange={(e)=>{this.handleChangeCheckbox(e , i)}}
                        />
                    </Form.Item>
                )
              }
                    
            },
            {
                width: "100px",
                align: "right",
                render: (text, record, index)=>(
                    <Button type="link" onClick={() => this.handleDelete(index) } className="no-padding">
                                <DeleteOutlined/>
                    </Button>
                )
            }
        ];
    }

    handleChangeCheckbox = (e, i) => {
        const { answerList } = this.state;
        let newAnswerList = [...answerList];
        if(!newAnswerList[i].rightAnswer){
            newAnswerList = newAnswerList.map(e=>{
                e.rightAnswer = false;
                return e;
            })
            newAnswerList[i].rightAnswer = true;
        }
        this.handleChangeContent(newAnswerList);
    }

    handleChangeInput = (e, i) => {
        const { answerList } = this.state;
        const newAnswerList = [...answerList];
        newAnswerList[i].content = e.target.value;
        this.handleChangeContent(newAnswerList);
    }

    handleAddQuest = () => {
        const { answerList } = this.state;
        const newAnswerList = [...answerList, {
            content: "",
            rightAnswer: answerList.length <= 0 ? true : false
        }];
        this.setState({
            answerList: newAnswerList
        })
        this.handleChangeContent(newAnswerList);
    }
    handleDelete = (i) => {
        const { answerList } = this.state;
        const newAnswerList = answerList.filter((item, index) => index !== i);
        if(newAnswerList.length > 0 && !newAnswerList.find(e=>e.rightAnswer===true))newAnswerList[0].rightAnswer = true;
        this.setState({
            answerList: newAnswerList,
        });
        this.handleChangeContent(newAnswerList);
    }

    handleChangeContent = (newAnswerList) => {
        const { handleChangeOtherData } = this.props;
        handleChangeOtherData(newAnswerList);
    }
    render() {
        const { disabled, fieldName } = this.props;
        const { answerList } = this.state;
        return (
            <Card size="small"  style={{ width: '100%', marginBottom: '4px' }}>
            <Row>
                <Col span={12}>
                    Danh sách câu trả lời
                </Col>
                <Col span={12}>
                    <div style={{ textAlign: "right"}}>
                        <Button  type="primary" onClick={() => {this.handleAddQuest()}}>
                        <PlusOutlined /> Thêm câu trả lời
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item name={fieldName}
                            required
                            rules={[
                                { required: true, message: 'Vui lòng nhập câu trả lời'}
                            ]}
                        >
                            <BaseTable
                            columns={this.columns}
                            rowKey={(record, i) => i}
                            dataSource={answerList}
                            loading={disabled}
                            pagination={false}
                            />
                           
                    </Form.Item>
                </Col>
            </Row>
            </Card>
        )
    }
}

export default SingleAnswer