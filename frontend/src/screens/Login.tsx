import React from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import styled from "styled-components";
import { login, signup } from "../redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const { loading } = useAppSelector(state => state.user)

    const onSubmit = async (values: any, key: 'login' | 'signup') => {
        if(key === 'login') {
            const { type } = await dispatch(login({ body: values }))
            if(type === 'login/fulfilled') {
                nav('/home')
            }
        }
        else {
            const { type } = await dispatch(signup({ body: values }))
            if(type === 'signup/fulfilled') {
                nav('/home')
            }
        }
    }

    return (
        <Wrapper>
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
                                onFinish={(values) => onSubmit(values, 'login')}
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
                                    <Button type="primary" htmlType="submit" loading={loading}>
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
                                onFinish={(values) => onSubmit(values, 'signup')}
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
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        )
                    }
                ]}
            />
        </Wrapper>
    )
}
