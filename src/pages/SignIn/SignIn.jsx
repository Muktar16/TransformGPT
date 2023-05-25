import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Spin, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
      for (let entry of formData.entries()) {
        console.log(entry);
      }
      const response = await axios.post(`http://192.168.0.198:8000/auth/login`, formData);
      console.log(response);
      if (values.remember) {
        localStorage.setItem('token', response?.data?.access_token);
        navigate('/');
      } else {
        sessionStorage.setItem('token', response?.data?.access_token);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      //   if(error?.response?.status===500) message.error("Incorrect Email.");
      //   else if(error?.response?.status===401) message.error("Incorrect password.");
      //   else message.error("Server not responding....");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <Spin spinning={loading} tip="Please wait...">
      <Row style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1 style={{ color: 'gray' }} level={1}>
          Welcome to TransformGPT
        </h1>
        <Col
          style={{
            width: 400,
            padding: 24,
            margin: '5px',
            borderRadius: 8,
            background: '#f5f5f5',
          
          }}
        >
          <Title level={2} style={{ color: 'green', textAlign: 'center', marginBottom: 24 }}>
            Login
          </Title>

          <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item className="custom-form-item" name="username" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input className="input-box" prefix={<UserOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password className="input-box" prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/signup">Click here to Sign Up</Link>
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default Login;
