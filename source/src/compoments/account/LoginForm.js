import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Utils from '../../utils';

const FormItem = Form.Item;

const LoginForm = ({ loading, onLogin }) => {
    

    const handleSubmit = (values)  => {
        onLogin(values);
    }


    return (
        <Form onFinish={handleSubmit} className="login-form">
            <FormItem
                name= "username"
                rules = {[
                    { required: true, message: 'Hãy nhập tài khoản!' },
                    { validator: Utils.validateUsernameForm }
                ]}
            >
                <Input
                    className='input' 
                    size="large"
                    name="username"
                    placeholder="Tài khoản"
                    />
            </FormItem>
            <FormItem
                name= "password"
                rules={[{ required: true, message: 'Hãy nhập mật khẩu!' }]}
            >
                <Input
                    className='input' 
                    size="large"
                    name="password" 
                    type="password" 
                    placeholder="Mật khẩu"  />
            </FormItem>
            <a className="forgetPass"><small>Quên mật khẩu ?</small></a>
            <FormItem>
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button">
                    Đăng nhập
                </Button>
                
            </FormItem>
            
        </Form>
    );
}

export default LoginForm;