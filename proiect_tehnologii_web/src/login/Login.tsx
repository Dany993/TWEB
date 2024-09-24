import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import "../css/login.css";
import { useNavigate } from 'react-router-dom';
import localStorageWrapper from '../localStorage/LocalStorageWrapper';

const LoginComponent: React.FC = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
      const { username, password } = values;
  
      try {
          const response = await fetch('http://localhost:8080/api/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, password })
          });
  
          if (!response.ok) {
              throw new Error('Login failed');
          }
  
          const userData = await response.json();
  
          // Verifică dacă userData are tokenul și rolul
          if (userData.accessToken) {
              localStorageWrapper.setToken(userData.accessToken); 
              navigate("/telefoane");
          } else {
              alert('Login failed: Invalid response data');
          }
  
      } catch (error) {
          alert('Nume de utilizator sau parolă incorecte.');
      }
  };
  
  

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginComponent;
