import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';



const ForgotPassword = ({ history }) => {
  const [loading, setLoading] = useState(false);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  
    const onFinish = async (values) => {
      setLoading(true);
      const data = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      try {
        // Check if the email already exists
        const existingUserResponse = await axios.get(`http://localhost:8080/api/signup?email=${data.email}`);
        if (existingUserResponse.data === "exists") {
          try {
            const response = await axios.post('http://localhost:8080/api/login/forgot-password', values);
            if (response.status === 200 || response.data === "success") {
              // Handle password reset success
              notification.success({
                message: 'Success',
                description: 'Password Reset Successfully.',
              });
            } else {
              notification.error({
                message: 'Error',
                description: 'An error occurred. Please try again.',
              });
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          notification.error({
            message: 'Error',
            description: 'Email does not exist. Please enter a different email.',
          });
        }
      } catch (error) {
        console.error(error);
      }
  
      // Simulating API call for password reset
      setTimeout(() => {
        setLoading(false);
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
  const [form] = Form.useForm();
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Form name="reset_password" onFinish={onFinish} layout="verticle">
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

        <Form.Item
  name="password"
  label="New Password"
  rules={[
    {
      required: true,
      message: 'Please enter your new password',
    },
    {
      validator: validatePassword,
    },
  ]}
  hasFeedback
>
  <Input.Password className="password-input" placeholder="Enter your new password" />
</Form.Item>

<Form.Item
  name="confirmPassword"
  label="Confirm New Password"
  dependencies={['password']}
  hasFeedback
  rules={[
    {
      required: true,
      message: 'Please confirm your new password',
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
  <Input.Password className="password-input" placeholder="Confirm your new password" />
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

export default ForgotPassword;
