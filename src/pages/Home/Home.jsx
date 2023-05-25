import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Form, Row, Col } from 'antd';
import { getToken } from '../../utils/CommonServices';
import { useNavigate } from 'react-router';
import './Home.css';
import { SendOutlined, LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Text } = Typography;

const Home = () => {
  const [form] = Form.useForm();
  const [resultText, setResultText] = useState('');
  const [isVerifiedToken, setIsVerifiedToken] = useState(true);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const [message,setMessage] = useState('');
  const [index,setIndex] = useState(-1);
  const [result,setResult] = useState('');

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const token = getToken();
        if (!token) {
          setIsVerifiedToken(false);
        } else {
          //await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify-token`, { headers: { Authorization: `Bearer ${token}` } });
          setIsVerifiedToken(true);
        }
      } catch (error) {
        message.error('Login session Expired. Please login again.');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setIsVerifiedToken(false);
      }
    };
    isLoggedIn();
  }, []);

  useEffect(()=>{
    if(index<result.length && index>=0)
      setResultText((prevResult) => prevResult + result[index]);
      //setIndex((prevResult) => prevResult + 1);
  },[index])


  const handleSend = async(values) => {
    try {
      setIndex(-1);
      setLoading(true);
      setResultText('');
      setResult('');
      form.resetFields();
      const token = getToken();
      const response = await axios.post(`http://192.168.0.198:8000/prompt/generate`,values,{ headers: { Authorization: `Bearer ${token}` } });
      const result = response?.data?.result;
      setResult(result);
      console.log(result)
      setIndex(0);
      // Character-by-character typing effect
      const typingTimeout = setInterval(() => {
        if (index < result.length) {
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(typingTimeout);
        }
      }, 30);
    } catch (error) {
      console.log("Server error....",error)
      
    }finally{
      setLoading(false)
    }

  };

  const onFinishFailed = () => {
    //message.error('Enter valid input')
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/signin');
  };

  if (isVerifiedToken) {
    return (<>
      <Button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
          }}
          icon={<LogoutOutlined />}
        >
          Log out
        </Button>
      <Row justify='center' align='middle'>
        <Col xs={24} sm={16} style={{height:'100vh',backgroundColor:'#f2f1ed',display:'flex',overflowY: 'auto',  justifyContent:'center'}}>

          <Row style={{ flex: 'flex',flexDirection:'column', overflowY: 'auto', marginBottom: '16px'}}>
            {/* <div style={{height:'fit-content',minWidth:'95%', background:'white',margin:'20px',border:'5px',borderRadius:'10px'}}>
              <div style={{ padding: '8px' }}>
                <Text type="secondary">Prompt Pattern: </Text>
                <Text style={{ marginLeft: '8px' }}>{promptPattern}</Text>
              </div>
              <div style={{ padding: '8px' }}>
                <Text type="secondary">Propmt Content: </Text>
                <Text style={{ marginLeft: '8px' }}>{promptContent}</Text>
              </div>
            </div> */}
            <div style={{height:'fit-content', background:'white',margin:'20px',border:'5px',borderRadius:'10px'}}>
              
              <div style={{ padding: '8px' }}>
                <Text type="secondary">Response:</Text>
                <Text style={{ marginLeft: '8px' }}>{resultText}</Text>
              </div>
              
            </div>
          </Row>

          <Form onFinishFailed={onFinishFailed} onFinish={handleSend} form={form} layout='inline' className="floating-input-box-container">
            <div style={{display:'flex',flexWrap:'wrap'}}>
              <Form.Item name='prompt_pattern'>
                <Input
                  type="text"
                  className="floating-input-box input-box"
                  //value={promptPattern}
                  //onChange={(e)=>setPromptPattern(e.target.value)}
                  placeholder="Enter Prompt Pattern"
                />
              </Form.Item>
              <Form.Item name='prompt_content'>
                <Input
                  type="text"
                  className="floating-input-box input-box"
                  //value={promptContent}
                  //onChange={(e)=>setPromptContent(e.target.value)}
                  placeholder="Enter Prompt Content"
                />
              </Form.Item>
            </div>
            {loading?(<span style={{paddingTop:'15px'}}>typing.....</span>):(
              <Form.Item style={{ marginBottom: '10px', alignSelf: 'flex-end' }}>
                <Button type="primary" icon={<SendOutlined />} htmlType="submit" />
              </Form.Item>
            )}
          </Form>
        </Col>
      </Row>
    </>);
  } else {
    navigate('/signin');
    return null;
  }
};

export default Home;
