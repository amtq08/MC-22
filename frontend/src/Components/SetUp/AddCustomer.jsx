import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const AddCustomer = ({ match, history }) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updating, setUpdate] = useState(false);

  const [customer, setCustomer] = useState({
  
    customerName: '',
    email: '',
    contact: '',
    opening: '',
  });

  useEffect(() => {
    if (id === '_add') {
      return;
    } else {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/customers/${id}`);
        setCustomer(response.data);
      };

      fetchData();
    }
  }, [id]);

  const onSubmit = async () => {
    const data = {
     
      customerName: customer.customerName,
      email: customer.email,
      contact: customer.contact,
      opening: customer.opening,
    };

    setCustomer(data);

    if (id === '_add') {
      try {
        const response = await axios.post('http://localhost:8080/api/customers', data);
        console.log(response.data);
        console.log('Customer created successfully!');
        setFormSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.put(`http://localhost:8080/api/customers/${id}`, data);
        history.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (name, value) => {
    setCustomer((prevState) => ({ ...prevState, [name]: value }));
  };

  const Update = (event) => {
    const name = event.target.name;
    if (updating) {
      if (name === 'id') {
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Add Customer</h1>
      {formSubmitted ? (
        <div>Form submitted successfully!</div>
      ) : (
        <Form onFinish={handleSubmit(onSubmit)}>


          <Form.Item label="Customer Name">
            <Input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={customer.customerName}
              disabled={updating}
              onChange={(e) => handleChange('customerName', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Contact">
            <Input
              type="number"
              name="contact"
              placeholder="Contact"
              value={customer.contact}
              disabled={updating}
              onChange={(e) => handleChange('contact', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={customer.email}
              disabled={updating}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Opening (PKR)">
            <Input
              type="number"
              name="opening"
              placeholder="Opening amount"
              value={customer.opening}
              disabled={updating}
              onChange={(e) => handleChange('opening', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {updating ? 'Update' : 'Save'}
            </Button>
            <Button type="button" onClick={() => history.push('/Users/Customers')}>
              Close
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddCustomer;
