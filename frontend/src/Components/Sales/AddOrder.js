import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

const AddOrder = ({ onAddOrder }) => {
  const [customers, setCustomers] = useState([]);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (values) => {
    try {
      const { customer, ...restValues } = values; // Extract customer ID

      // Ensure customer object is populated with the necessary properties
      const customerObject = {
        id: customer,
        // Set other properties of the customer object if necessary
      };

      const orderData = {
        ...restValues,
        customer: customerObject, // Send the customer object directly
        // Add other order properties if necessary
        shipping: shippingCharges, // Assign shipping charges to the 'shipping' field
        totalPrice: totalAmount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await axios.post('http://localhost:8080/api/orders', orderData);
      form.resetFields();
      alert('Order added successfully!');
      onAddOrder(); // Fetch updated orders
    } catch (error) {
      console.log(error);
    }
  };

  const handleShippingChargesChange = (value) => {
    const price = form.getFieldValue('unitPrice');
    const quantity = form.getFieldValue('quantity');
    const amount = quantity * price + parseFloat(value);
    setTotalAmount(amount);
    form.setFieldsValue({
      totalPrice: amount, // Set the value for totalprice field
    });
  };

  const handleQuantityChange = (value) => {
    const price = form.getFieldValue('unitPrice');
    const amount = value * price + shippingCharges;
    setTotalAmount(amount);
    form.setFieldsValue({
      totalPrice: amount, // Set the value for totalprice field
      quantity: value,
    });
  };

  const handleUnitPriceChange = (value) => {
    const quantity = form.getFieldValue('quantity');
    const amount = quantity * parseFloat(value) + shippingCharges;
    setTotalAmount(amount);
    form.setFieldsValue({
      totalPrice: amount, // Set the value for totalprice field
      unitPrice: value,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add Order</h1>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="customer" label="Customer Name" rules={[{ required: true }]}>
              <Select placeholder="Select a customer">
                {customers.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.customerName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="product" label="Product" rules={[{ required: true }]}>
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
              <Input
                type="number"
                placeholder="Enter quantity"
                onChange={(e) => handleQuantityChange(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="unitPrice" label="Unit Price" rules={[{ required: true }]}>
              <Input
                type="number"
                placeholder="Enter unit price"
                onChange={(e) => handleUnitPriceChange(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="shippingCharges" label="Shipping Charges" rules={[{ required: false }]}>
              <Input
                type="number"
                placeholder="Enter shipping charges"
                onChange={(e) => handleShippingChargesChange(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="totalPrice" label="Total Amount" rules={[{ required: false }]}>
              <Input type="number" placeholder="Enter total amount" readOnly style={{ color: 'blue' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="createdAt" label="Created At" rules={[{ required: false }]}>
              <DatePicker showTime disabled defaultValue={moment()} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="updatedAt" label="Updated At" rules={[{ required: false }]}>
              <DatePicker showTime disabled defaultValue={moment()} />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add Order
        </Button>
      </Form>
    </div>
  );
};

export default AddOrder;
