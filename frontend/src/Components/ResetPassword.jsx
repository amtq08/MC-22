import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ResetPassword = ({ history }) => {
  const [loading, setLoading] = useState(false);
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  

  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      email: values.email,
    };
    try {
      // Check if the email already exists
      const existingUserResponse = await axios.get(
        `http://localhost:8080/api/signup?email=${data.email}`
      );
      if (existingUserResponse.data === 'exists') {
        setEmailExists(true);
        history.push('/reset-password');
        
        
      }
      else{
        setEmailExists(false);
        notification.error({
          message: 'Error',
          description: 'Email do not exists. Please enter a different email.',
        });
      } }catch (error) {
        console.error(error);
      }


    // Simulating API call for password reset
    setTimeout(() => {
      setLoading(false);
     
    }, 2000);
  };

 
  const [form] = Form.useForm();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form name="reset_password" onFinish={onFinish} style={{ width: 300 }}>
        <h1 style={{ textAlign: 'center' }}>Forgot Password</h1>
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
          hasFeedback
        >
          <Input  placeholder="Enter your email" />
        </Form.Item>

        

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
