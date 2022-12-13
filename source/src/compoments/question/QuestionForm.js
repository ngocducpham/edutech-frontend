import React from 'react';
import { Form, Col, Row } from 'antd';

import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';
import DropdownField from '../common/entryForm/DropdownField';
import BaseQuestion from './BaseQuestion';
import { commonQuestionTypes } from '../../constants/masterData';
import NumericField from '../common/entryForm/NumericField';
import RichTextField from '../common/entryForm/RichTextField';
import { showWarningMessage } from '../../services/notifyService';

class QuestionForm extends BasicForm {
	constructor(props) {
		super(props);
		this.state = {
			type: props.isEditing ? props.dataDetail.type : commonQuestionTypes[0].value
		};
		this.otherData = commonQuestionTypes.map((e) => {
			let answer = [];
			if (e.value === this.state.type && props.isEditing) {
				answer =
					props.dataDetail && props.dataDetail.answer
						? JSON.parse(props.dataDetail.answer)
						: props.dataDetail.answer;
			}
			return answer;
		});
	}

	isJson = (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
	};

	canJsonStringify = (json) => {
		try {
			JSON.stringify(json);
		} catch (e) {
			return false;
		}
		return true;
	};

	getInitialValue = () => {
		const { dataDetail, isEditing } = this.props;
		const { type } = this.state;
		return {
			...dataDetail,
			type,
			answer: this.otherData[type - 1]
		};
	};

	handleChangeType = (value) => {
		this.setFieldValue('answer', this.otherData[value - 1]);
		this.setState({
			type: value
		});
	};

	handleSubmit(formValues) {
		const { onSubmit } = this.props;
		const answer = this.getFieldValue("answer")
        if(answer === undefined || answer.length === 0){
            showWarningMessage("Vui lòng thêm vào đáp án");
            return;
        }
        let res = [];
        for(let i=0; i< answer.length; i++){
            if(answer[i].rightAnswer === false){
                res[i]=1
            }else{
                res[i]=0
            }
        }
        let tamp = 0;
        for(let j=0; j<res.length; j++){
            tamp += res[j]
            if(tamp === res.length){
                showWarningMessage("Vui lòng chọn đáp án đúng");
                return;
            }
        }
		console.log(formValues.answer)
		console.log(JSON.stringify(formValues.answer))
		onSubmit({
			...formValues,
			answer: this.canJsonStringify(formValues.answer)
				? JSON.stringify(formValues.answer)
				: formValues.answer
		});
	}

	handleChangeOtherData = (answer) => {
		const { type } = this.state;
		this.otherData[type - 1] = answer;
		this.setFieldValue('answer', this.otherData[type - 1]);
	};

	validatePoint(rule, point) {
        return (!!(/^[0-10_]+$/.exec(point))
            ? Promise.resolve()
            : Promise.reject('Điểm chỉ bao gồm các số từ 0-10'))
    }

	render() {
		const { formId, dataDetail, loadingSave, isEditing, t } = this.props;
		const { type } = this.state;
		console.log(dataDetail)
		return (
			<Form
				id={formId}
				ref={this.formRef}
				layout='vertical'
				onFinish={this.handleSubmit}
				initialValues={this.getInitialValue()}
			>
				<Row gutter={16}>
					<Col span={12}>
						{
							<DropdownField
								fieldName='type'
								label={t('form.label.type')}
								required
								options={commonQuestionTypes.filter((e) => e.value !== 3)}
								disabled={loadingSave}
								onChange={this.handleChangeType}
							/>
						}
					</Col>
					<Col span={12}>
						<NumericField 
							fieldName='point'
							label={t('form.label.point')}
							required
							min={0}
							max={10}
							validators={[this.validatePoint]}
							disabled={loadingSave}	
						/>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<RichTextField
							fieldName='content'
							label={t('form.label.content')}
							required
							disabled={loadingSave}	
						/>
					</Col>
				</Row>
				<Row gutter={16} style={{ minHeight: 150 }}>
					<Col span={24}>
						<BaseQuestion
							type={type}
							fieldName='answer'
							isEditing={isEditing}
							disabled={loadingSave}
							answer={this.otherData[type - 1] || []}
							handleChangeOtherData={this.handleChangeOtherData}
						/>
					</Col>
				</Row>
			</Form>
		);
	}
}

export default QuestionForm;
