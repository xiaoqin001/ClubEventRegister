import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginFormPage.css';
import {  Button, Checkbox, Form, Input  } from 'antd';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // console.log(sessionUser)

    if (sessionUser) {
        return (
            <Redirect to='/home' />
        );
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    // const onFinish = (values) => {
    //     console.log('Success:', values);

    // };

    //  const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
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
            {/* <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
            <Form.Item
                label="Username/Email"
                name="username_email"
                rules={[{
                        required: true,
                        message: 'Please input your credential!',
                },]}
            >
                <Input
                    type='text'
                    value={credential}
                    onChange={(e)=>{setCredential(e.target.value)}}
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
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Login
            </Button>
            </Form.Item>
        </Form>
        </div>
    )
}


export default LoginFormPage;
