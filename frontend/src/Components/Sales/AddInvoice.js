import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import axios from 'axios';
import jsPDF from 'jspdf';

const { Option } = Select;

const AddInvoice = ({ onAddInvoice }) => {
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
    fetchWarehouses();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (values) => {
    try {
      const { customer, warehouse, ...restValues } = values; // Extract customer and warehouse IDs

      // Ensure customer object is populated with the necessary properties
      const customerObject = {
        id: customer,
        // Set other properties of the customer object if necessary
      };

      // Ensure warehouse object is populated with the necessary properties
      const warehouseObject = {
        id: warehouse,
        // Set other properties of the warehouse object if necessary
      };

      const invoiceData = {
        ...restValues,
        customer: customerObject, // Send the customer object directly
        warehouse: warehouseObject, // Send the warehouse object directly
        // Add shippingCharges to the invoiceData
      };

      await axios.post('http://localhost:8080/api/invoices', invoiceData);
      form.resetFields();
      alert('Invoice added successfully!');
      onAddInvoice(); // Fetch updated invoices
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadInvoicePDF = () => {
    const invoice = form.getFieldsValue();

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add invoice details to the PDF
    doc.text(`Customer: ${invoice.customer}`, 10, 10);
    doc.text(`Date of Generation: ${invoice.dateOfGeneration}`, 10, 20);
    doc.text(`Product: ${invoice.product}`, 10, 30);
    doc.text(`Warehouse: ${invoice.warehouse}`, 10, 40);
    doc.text(`Quantity: ${invoice.quantity}`, 10, 50);
    doc.text(`Unit Price: ${invoice.price}`, 10, 60);
    doc.text(`Shipping Charges: ${shippingCharges}`, 10, 80); 
    doc.text(`Total Amount: ${invoice.totalAmount}`, 10, 70);

    // Download the PDF on the client-side
    doc.save('invoice.pdf');
  };

  // Add the following handleShippingChargesChange function to handle the shippingCharges field change
const handleShippingChargesChange = (value) => {
  setShippingCharges(value);
  const price = form.getFieldValue('price');
  const quantity = form.getFieldValue('quantity');
  const amount = quantity * price + parseFloat(value);
  setTotalAmount(amount);
  form.setFieldsValue({
    totalAmount: amount,
  });
};

  const handleQuantityChange = (value) => {
    const price = form.getFieldValue('price');
    const amount = value * price;
    setTotalAmount(amount);
    form.setFieldsValue({
      totalAmount: amount,
      quantity: value,
    });
  };

  const handlePriceChange = (value) => {
    const quantity = form.getFieldValue('quantity');
    const amount = quantity * parseFloat(value) + parseFloat(shippingCharges);
    setTotalAmount(amount);
    form.setFieldsValue({
      totalAmount: amount,
      price: value,
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add Invoice</h1>
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
              <Select placeholder="Select a customer">
                {customers.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="dateOfGeneration" label="Date of Generation" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="product" label="Product" rules={[{ required: true }]}>
              <Input placeholder="Enter product name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="warehouse" label="Warehouse" rules={[{ required: true }]}>
              <Select placeholder="Select a warehouse">
                {warehouses.map((warehouse) => (
                  <Option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="quantity" label="Quantity"  rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter quantity" onChange={(e) => handleQuantityChange(e.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="price" label="Unit Price"  rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter price" onChange={(e) => handlePriceChange(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
            <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <Form.Item name="shipping" label="Shipping Charges"  rules={[{ required: false }]}>
          <Input type="number"
            placeholder="Enter shipping charges"
            onChange={(e) => handleShippingChargesChange(e.target.value)}
          />
        </Form.Item>
      </Col>
    </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="totalAmount" label="Total Amount" rules={[{ required: false }]}>
              <Input
                value={totalAmount}
                disabled
                style={{
                  color: '#1a237e',
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Add Invoice
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={handleDownloadInvoicePDF}>
          Download Invoice as PDF
        </Button>
      </Form>
    </div>
  );
};

export default AddInvoice;
