import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from 'antd/es/typography/Title';

const SignUp = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

  const onFinish = async(values) => {
    try {
        setLoading(true);
        const response = await axios.post(`http://192.168.0.198:8000/users/create`, values);
        console.log(response)
        message.success('Successfully Created Account');
        navigate('/signin');
    } catch (error) {
        console.log(error)
        message.error(error?.response?.data?.detail);
    }finally{
        setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip='Please wait a while....'>
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1 style={{ color: 'gray' }} >
          Welcome to TransformGPT
        </h1>
      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: 400, padding: 20, background: '#f5f5f5', borderRadius: 8 }}
      >
        <Title level={2} style={{ color: 'green', textAlign: 'center', marginBottom: 24 }}>
            Sign Up
          </Title>
        <Form.Item
            className='custom-form-item'
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input className='input-box' placeholder="Username" />
        </Form.Item>
        <Form.Item
        className='custom-form-item'
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password className='input-box' placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button size='large' type="primary" htmlType="submit" style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/signin">Log in</Link>
        </div>
      </Form>
    </div>
    </Spin>
  );
};

export default SignUp;
