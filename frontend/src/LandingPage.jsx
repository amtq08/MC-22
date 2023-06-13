

import React, { useState } from 'react';
import { Button, Row, Col, Modal, Form, Input, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import logo from './AIA.png';
import axios from 'axios';
import { useAuth } from './Hooks/useAuth';
import {login} from './auth'
import { useLocation } from "react-router-dom";

import { useEffect, useContext } from "react";


const LandingPage = ({onLogin}) => {
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [signupVisible, setSignupVisible] = useState(false);
  const [loginVisible, setLogInVisible] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";


  const [signUp, setSignUp] = useState({
    userName:'',
    email:'',
    contact:'',
    password:'',
    confirmpassword:'',
    designation: 'admin',
    
  });

  const handleLoginClick = () => {
    setLogInVisible(true);
  };

  const handleSignupClick = () => {
    setSignupVisible(true);
  };

  const handleSignupCancel = () => {
    setSignupVisible(false);
  };
  const handleLoginCancel = () => {
    setLogInVisible(false);
  };

  const onFinish = async (values,userRole) => {
    setLoading(true);
  
  
    if (signupVisible) {
      const data = {
        
        userName:values.userName,
        email: values.email,
        contact:values.contact,
        password:values.password,
        confirmpassword:values.confirmPassword,
        designation: 'admin', 
      };
      // Process signup form submission
    
      
      try {
        // Check if the email already exists
        const existingUserResponse = await axios.get(
          `http://localhost:8080/api/signup?email=${data.email}`
        );
        if (existingUserResponse.data === 'emailExists') {
          // Email already exists, show error message
          setEmailExists(true);
          notification.error({
            message: 'Error',
            description: 'Email already exists. Please enter a different email.',
          });
        }else {
      try {
        const response = await axios.post('http://localhost:8080/api/signup', data);
        if (response.status === 200) {
          // Handle signup success
          notification.success({
            message: 'Success',
            description: 'User created successfully.',
          });
          form.resetFields();
          setSignupVisible(false);
        } else {
          // Handle signup failure
          notification.error({
            message: 'Error',
            description: 'An error occurred. Please try again.',
          });
        }
      } catch (error) {
        console.error(error);
        // Handle signup failure
        notification.error({
          message: 'Error',
          description: 'An error occurred. Please try again.',
        });
      }}
    }catch(error){
      console.error(error);
    }
    }
    if (loginVisible) {
      // Process login form submission
      try {
        const response = await axios.post('http://localhost:8080/api/login', values);
        if (response.status === 200) {
          const userDesignation = await axios.get(`http://localhost:8080/api/login?userName=${values.userName}`); 
           
        

            setIsAuthenticated(true);
            onLogin(userDesignation.data);
            
            const userRole = userDesignation.data;
            {/*if (userRole === 'admin') {
              history.push('/'); // Redirect to the admin component
            } else if (userRole === 'sales') {
              history.push('/sales'); // Redirect to the sales component
            } else if (userRole === 'purchase') {
              history.push('/purchase'); // Redirect to the purchase component
            } else if (userRole === 'inventory') {
              history.push('/inventory'); // Redirect to the inventory component
            } else if (userRole === 'accounts') {
            history.push('/accounts'); // Redirect to the accounts component
            }else{
              history.push('/')
            }*/}
            //role based access
          
          // Handle login success
          
          notification.success({
            message: 'Success',
            description: 'Log In successful!.',
          });
        } else {
          // Handle login failure
          notification.error({
            message: 'Error',
            description: 'Invalid username or password. Please try again.',
          });
          form.resetFields();
        }} catch (error) {
        console.error(error);
        // Handle login failure
        // ...
      }
    }
  
    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      setSignupVisible(false);
    }, 2000);
  };
  

  const validatePassword = (_, value) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        'Password must be at least 8 characters long and contain at least one capital letter and a number'
      )
    );
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Enterprise Resource Planning System</h1>
      <div className="logo" style={{ height: '120px', margin: '50px' }}>
        <img src={logo} alt="AIA Logo" style={{ maxHeight: '100%', maxWidth: '100%' }} />
      </div>
      <Row justify="center" gutter={[16, 16]}>
        <Col>
          <Button type="primary" size="large" onClick={handleLoginClick}>
            Login
          </Button>
        </Col>
        <Col>
          <Button type="default" size="large" onClick={handleSignupClick}>
            Signup
          </Button>
        </Col>
      </Row>

      <Modal
        title="Sign Up"
        visible={signupVisible}
        onCancel={handleSignupCancel}
        footer={null}
      >
        <Form form={form} name="signup" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: 'Please enter your name',
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please enter your email',
              },
              {
                type: 'email',
                message: 'Please enter a valid email',
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="contact"
            label="Contact Number"
            rules={[
              {
                required: true,
                message: 'Please enter your contact number',
              },
              {
                pattern: /^\d+$/,
                message: 'Contact number should only contain digits',
              },
            ]}
          >
            <Input placeholder="Enter your contact number" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Please confirm your password',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Sign Up
            </Button>
           
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Log In"
        visible={loginVisible}
        onCancel={handleLoginCancel}
        footer={null}
      >
        <Form name="loginForm" initialValues={{ remember: true }} onFinish={onFinish} style={{ width: 300 }}>
          <h1 style={{ textAlign: 'center' }}>Log In</h1>
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              { required: true, message: 'Please input your user name!' },
              
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { validator: validatePassword },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
              Log In
            </Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'center' }}>
            <a href="/reset-password">Forgot Password?</a>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LandingPage;





