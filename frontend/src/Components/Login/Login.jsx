import React from 'react';
import {Button, Row, Col, Form, Input, Flex, Alert} from 'antd';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {API_ENDPOINT} from '../../config';

const Login = () => {

    const navigate = useNavigate();
    const [formInstance] = Form.useForm();

    const onLogin = async (userType) => {

        const values = formInstance.getFieldsValue();

        console.log('Success for login:', values, userType);


        try {
            const {data} = await axios.post(`${API_ENDPOINT}login-site-manager`, values);
            console.log(data)
            if (data) {
                // jump to some webpage

            } else {
                console.log("eerrrr login site manager")
            }

        } catch (e) {
            console.log(e);
        }

    };


    const onFinish_Customer = async (values) => {

        console.log('Success for customer:', values);
        try {
            const {data} = await axios.post(`${API_ENDPOINT}login`, values);
            console.log(data)

            navigate("/customer-view")
        } catch (e) {
            console.log(e);
        }
        navigate("/customer-view")
    };

    const onFinish_CreateStore = async (values) => {

        console.log('create store called.');
        navigate("/create-store")
    };

    return (
        <div className='loginPage'>
            <h2 style={{textAlign: 'center'}}>Welcome to Our Anime Recommendation System</h2>
            <br/>
            <br/>
            <Row>
                <Col className="gutter-row" lg={{span: 9, offset: 3}}>
                    <Form
                        name="siteOwnerLogin"
                        labelCol={{span: 8,}}
                        wrapperCol={{span: 16,}}
                        style={{
                            maxWidth: 600, marginTop: "50px"
                        }}
                        // onFinish={onLogin}
                        form={formInstance}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Flex gap="small" wrap="wrap" style={{marginLeft: '150px'}}>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >

                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" name="Store" htmlType="submit" onClick={e => onLogin('store')}>
                                    Log in as Store Owner
                                </Button>
                            </Form.Item>
                        </Flex>

                    </Form>

                </Col>


            </Row>
        </div>
    )
}

export default Login
