import React from 'react';

import { Form, Upload, Button } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import BaseField from './BaseField';

import { withTranslation } from 'react-i18next';

class FileUploadField extends BaseField {
    
    uploadFile = ({file, onSuccess, onError}) => {
        const { uploadFile } = this.props;
        if(uploadFile) {
            uploadFile(file, onSuccess, onError);
        }
        else {
            setTimeout(() => {
                onSuccess("ok");
              }, 0);
        }
    }

    render() {
        const {
            label,
            fileList,
            disabled,
            fieldName,
            accept,
            onChange,
            beforeUpload,
            t,
            multiple
        } = this.props;

        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={this.getRules()}
                valuePropName={fieldName}
            >
                <Upload
                    multiple={multiple}
                    fileList={fileList}
                    disabled={disabled}
                    accept={accept}
                    customRequest={this.uploadFile}
                    beforeUpload={beforeUpload}
                    onChange={onChange}
                    showUploadList={true}
                >
                    <Button>
                        <UploadOutlined /> {t('clickToUpload')}
                    </Button>
                    
                </Upload>
               
            </Form.Item>
        )
    }
}

export default withTranslation(['fileUploadField', 'baseField'])(FileUploadField);
