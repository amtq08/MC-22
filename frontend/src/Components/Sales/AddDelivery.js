
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, Row, Col } from 'antd';
import moment from 'moment';
import axios from 'axios';

const { Option } = Select;

const AddDelivery = ({ onAddDelivery }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [status, setStatus] = useState("");


  useEffect(() => {
    fetchCustomers();
    fetchWarehouses();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
      console.log('Customers:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/warehouses');
      setWarehouses(response.data);
      console.log('Warehouses:', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddDelivery = async (values) => {
    try {
      const { customer, warehouse, ...restValues } = values;
  
      const selectedCustomer = customers.find((c) => c.id === customer);
      const selectedWarehouse = warehouses.find((w) => w.id === warehouse);
  
      const invoiceData = {
        ...restValues,
        customer: selectedCustomer,
        warehouse: selectedWarehouse,
        status: values.status.toUpperCase().replace(" ", "_"), // Convert to uppercase and replace spaces with underscores
      };
  
      setLoading(true);
      await axios.post('http://localhost:8080/api/deliveries', invoiceData);
      setLoading(false);
  
      form.resetFields();
      alert('Delivery added successfully!');
      onAddDelivery();
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ date: moment() }}
      onFinish={handleAddDelivery}
    >
      <Row>
        <Col span={12}>
        <Form.Item label="Customer" name="customer" rules={[{ required: true, message: 'Please select a customer' }]}>
  <Select placeholder="Select a customer" allowClear>
    {customers.map((customer) => (
      <Option key={customer.id} value={customer.id}>
        {customer.name}
      </Option>
    ))}
  </Select>
</Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Warehouse" name="warehouse" rules={[{ required: true, message: 'Please select a warehouse' }]}>
  <Select placeholder="Select a warehouse" allowClear>
    {warehouses.map((warehouse) => (
      <Option key={warehouse.id} value={warehouse.id}>
        {warehouse.name}
      </Option>
    ))}
  </Select>
</Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Shipping Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the shipping address' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter the shipping address" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
  <Col span={12}>
    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status' }]}>
      <Select placeholder="Select a status" allowClear>
        <Option value="Pending">Pending</Option>
        <Option value="In Transit">In Transit </Option>
        <Option value="Delivered">Delivered</Option>
      </Select>
    </Form.Item>
  </Col>
</Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please select a date' }]}>
             <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Total Amount" name="totalAmount" rules={[{ required: true, message: 'Please enter the total amount' }]}>
            <Input placeholder="Enter the total amount"  style={{ color: 'blue' }} />
          </Form.Item>
        </Col>
      </Row>


      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Delivery
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddDelivery;

