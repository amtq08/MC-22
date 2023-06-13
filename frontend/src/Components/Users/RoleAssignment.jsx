


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Row, Col, Modal,Select, Form, Input, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const { Option } = Select;
const RoleAssignment = ({ history }) => {
    const { register, handleSubmit, reset } = useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [emailExists, setEmailExists] = useState(false);
    const [user, setUser] = useState({
      
        email: '',
        designation: '',
        
      });

    const handleClose = () => {
        history.push('/Users/UsersList')
      };

  
      const onSubmit = async (values) => {
        const data = {
          email: values.email,
          designation: values.designation,
        };
        try {
          // Check if the email already exists
          const existingUserResponse = await axios.get(
            `http://localhost:8080/api/users?email=${data.email}`
          );
          if (existingUserResponse.data === 'emailExists') {
            // Email already exists, show error message
            setEmailExists(true);
            notification.error({
              message: 'Error',
              description: 'Email already exists. Please enter a different email.',
            });
          } else {
            try {
              const response = await axios.post('http://localhost:8080/api/users', values);
              if (response.status === 200 || response.status === 201) {
                // Handle signup success
                notification.success({
                  message: 'Success',
                  description: 'User added successfully.',
                });
                history.goBack();
              } else {
                notification.error({
                  message: 'Error',
                  description: 'An error occurred. Please try again.',
                });
              }
            } catch (error) {
              console.error(error);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      
  const validateEmail = (_, value) => {
    if (!value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid email address'));
  };
  const [form] = Form.useForm();
 
  return (
    <div>
    <h1>Accounts</h1>
    {formSubmitted ? <div>Form submitted successfully!</div>:
    <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
         
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { validator: validateEmail },
          ]}
          style={{ width: '300px' }}
        >
          <Input placeholder="Enter email" value={user.email}/>
        </Form.Item>

        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true, message: 'Designation is required' }]}
          style={{ width: '300px' }}
        >
          <Select placeholder="Enter designation" value={user.designation}>
          <Option value="">Select</Option>
          <Option value="sales">Sales Manager</Option>
          <Option value="purchase">Purchase Manager</Option>
          <Option value="inventory">Inventory Manager</Option>
          <Option value="admin">Admin</Option>
          <Option value="accounts">Accounts Manager</Option>
            </Select>
            </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Permit
          </Button>
        </Form.Item>
        <Form.Item style={{ marginRight:"8px"}}> 
               <Button type="default" onClick={handleClose}>
                 Close
               </Button>
             </Form.Item>
      </Form>
}</div>
  );
};



export default RoleAssignment;
