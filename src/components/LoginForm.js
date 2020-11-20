import Layout from 'antd/lib/layout/layout'
import { Form, Input, Button, Checkbox, Select } from 'antd';
import React, { Component } from 'react'
import Avatar from 'antd/lib/avatar/avatar';
import HeadPic from '../assets/user.png'
import { message } from 'antd'
import { LoginApi } from '../api/LoginApi'

let handleLoginResponseData = (data) => {
    if (data.status === 'success') {
        message.success(data.info)
    } else if (data.status === 'error') {
        message.error(data.info)
    }
}

export class LoginForm extends Component {
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        const Login = () => {
            const onFinish = values => {
                let data = {
                    username: values.username,
                    password: values.password
                }
                if (values.type === 'student') {
                    LoginApi.loginStudent(data).then(res => {
                        handleLoginResponseData(res)
                        if(res.status === 'success') window.location.href = '#/StudentDashBoard'
                    })
                } else if (values.type === 'teacher') {
                    LoginApi.loginTeacher(data).then(res => {
                        handleLoginResponseData(res)
                        if(res.status === 'success') window.location.href = '#/TeacherDashBoard'
                    })
                } else if (values.type === 'admin') {
                    LoginApi.loginAdmin(data).then(res => {
                        if(res.status === 'success') handleLoginResponseData(res)
                    })
                }
            };

            const onFinishFailed = errorInfo => {
                console.log('Failed:', errorInfo);
            };

            return (
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >

                    <Avatar size={100} src={HeadPic} className="loginform-avatar" />
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '密码不能为空!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="用户类型"
                        name="type"
                        rules={[{ required: true, message: '类型不能为空!' }]}
                    >
                        <Select placeholder="选择一个登录类型">
                            <Select.Option value="student">学生</Select.Option>
                            <Select.Option value="teacher">教师</Select.Option>
                            <Select.Option value="admin">管理员</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked" className="login-adjust">
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout} className="login-adjust">
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            );
        };
        return (
            <Layout className="text-center content-body login-border">
                <div className="login-content">
                    <Login />
                </div>
            </Layout>
        )
    }
}

export default LoginForm
