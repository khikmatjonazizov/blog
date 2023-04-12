import React, { useState } from "react";
import { Form, Input, Button, Tabs } from 'antd'
import Apis from '../apis'
import { LoginProps, SignupProps } from "../apis/user";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
    const nav = useNavigate()
    const login = async (values: LoginProps['body']) => {
        const response = await Apis.user.login({ body: values })
    }

    const signup = async (values: SignupProps['body']) => {
        const response = await Apis.user.signup({ body: values })
    }
    return (
        <Tabs
            defaultActiveKey="1"
            type="card"
            size="small"
            items={[
                {
                    id: '1',
                    key: '1',
                    label: 'login',
                    children: (
                        <Form
                            key={1}
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600}}
                            onFinish={login}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    )
                },
                {
                    id: '2',
                    key: '2',
                    label: 'signup',
                    children: (
                        <Form
                            key={2}
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600}}
                            onFinish={signup}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Surname"
                                name="surname"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{required: true, message: 'Please input your username!'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>

                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    )
                }
            ]}
        />
    )
}
