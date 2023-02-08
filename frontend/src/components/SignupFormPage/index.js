import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Button, Form, Input  } from 'antd';
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './SignupFormPage.css';


function SignupFormPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    if (sessionUser) {
        return (
            <Redirect to = '/' />
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ username, email, password })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }))
    }

    return (
        <div>
         <Form
            name="basic"
            labelCol={{span: 8,}}
            wrapperCol={{span: 16,}}
            style={{maxWidth: 600,}}
            initialValues={{remember: true,}}
            // onSubmit = {handleSubmit}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{
                        required: true,
                        message: 'Please input your username!',
                },]}
            >
                <Input
                    type='text'
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{
                        required: true,
                        message: 'Please input your Email!',
                },]}
            >
                <Input
                    type='text'
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{
                    required: true,
                    message: 'Please input your password!',
                },]}
            >
                <Input.Password
                    type='password'
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Sign Up
            </Button>
            </Form.Item>
        </Form>
        </div>
    );
}


export default SignupFormPage;
