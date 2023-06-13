import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import AddInvoice from './AddInvoice';

const { Option } = Select;

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchWarehouses();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/invoices');
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:8080/api/invoices/${record.id}`);
      fetchInvoices();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (record) => {
    setCurrentInvoice(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setCurrentInvoice(null);
    setModalVisible(false);
  };

  const handleModalSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/invoices/${currentInvoice.id}`, currentInvoice);
      if (response.status === 200) {
        fetchInvoices();
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (field, value) => {
    if (field === 'customer') {
      // Parse the selected customer object back to JSON
      value = JSON.parse(value);
    }
    if (field === 'warehouse') {
      // Parse the selected customer object back to JSON
      value = JSON.parse(value);
    }
    setCurrentInvoice({ ...currentInvoice, [field]: value });
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      render: (customer) => customer.name,
    },
    {
      title: 'Date of Generation',
      dataIndex: 'dateOfGeneration',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Warehouse',
      dataIndex: 'warehouse',
      render: (warehouse) => warehouse.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Shipping Charges',
      dataIndex: 'shipping',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Sales Invoices</h1>
        <Link to="/sales/add-invoice">
          <Button type="primary">Add Invoice</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={invoices} rowKey="id" />

      <Switch>
        <Route path="/sales/add-invoice">
          <AddInvoice onAddInvoice={fetchInvoices} />
        </Route>
      </Switch>

      <Modal
        visible={modalVisible}
        onCancel={handleModalClose}
        onOk={handleModalSave}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            customer: currentInvoice?.customer?.id,
            dateOfGeneration: moment(currentInvoice?.dateOfGeneration),
            product: currentInvoice?.product,
            warehouse: currentInvoice?.warehouse?.id,
            quantity: currentInvoice?.quantity,
            price: currentInvoice?.price,
            totalAmount: currentInvoice?.totalAmount,
          }}
          onFinish={handleModalSave}
        >
          <Form.Item label="Customer" name="customer">
          <Select onChange={(value) => handleFormChange('customer', value)}>
                {customers.map((customer) => (
                  <Option key={customer.id} value={JSON.stringify(customer)}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
          </Form.Item>
          <Form.Item label="Date of Generation" name="dateOfGeneration">
            <DatePicker onChange={(date) => handleFormChange('dateOfGeneration', date)} />
          </Form.Item>
          <Form.Item label="Product" name="product">
            <Input onChange={(e) => handleFormChange('product', e.target.value)} />
          </Form.Item>
          <Form.Item label="Warehouse" name="warehouse">
          <Select onChange={(value) => handleFormChange('warehouse', value)}>
                {warehouses.map((warehouse) => (
                  <Option key={warehouse.id} value={JSON.stringify(warehouse)}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
          </Form.Item>
          <Form.Item label="Quantity" name="quantity">
            <Input onChange={(e) => handleFormChange('quantity', e.target.value)} />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input onChange={(e) => handleFormChange('price', e.target.value)} />
          </Form.Item>
          <Form.Item label="Shipping Charges" name="shipping">
            <Input onChange={(e) => handleFormChange('shipping', e.target.value)} />
          </Form.Item>
          <Form.Item label="Total Amount" name="totalAmount">
            <Input onChange={(e) => handleFormChange('totalAmount', e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Invoice;
