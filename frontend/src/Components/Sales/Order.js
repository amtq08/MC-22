import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/en-gb'; // Import the desired locale for the date picker
import AddOrder from './AddOrder';

const { Option } = Select;

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders');
      setOrders(response.data);
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

  const handleDelete = async (record) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${record.id}`);
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (record) => {
    setCurrentOrder(record);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setCurrentOrder(null);
    setModalVisible(false);
  };

  const handleModalSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/${currentOrder.id}`, currentOrder);
      if (response.status === 200) {
        fetchOrders();
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
    setCurrentOrder({ ...currentOrder, [field]: value });
  };
  

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key:'customerName',
  
      render: (_, record) => (record.customer ? record.customer.customerName : '-'),
 
    },
  
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
    },
    {
      title: 'Shipping Charges',
      dataIndex: 'shippingCharges',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
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

  // Set the locale for the date picker
  moment.locale('en-gb');

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Orders</h1>
        <Link to="/sales/add-order">
          <Button type="primary">Add Order</Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={orders} rowKey="id" />

      <Switch>
        <Route path="/orders/add-order">
          <AddOrder onAddOrder={fetchOrders} />
        </Route>
      </Switch>

      {currentOrder && (
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
              orderId: currentOrder.orderId,
              customerName: currentOrder.customerName,
              product: currentOrder.product,
              quantity: currentOrder.quantity,
              unitPrice: currentOrder.unitPrice,
              shippingCharges: currentOrder.shippingCharges,
              totalPrice: currentOrder.totalPrice,
              createdAt: moment(currentOrder.createdAt),
              updatedAt: moment(currentOrder.updatedAt),
            }}
            onFinish={handleModalSave}
          >
            {/* <Form.Item label="Order ID" name="orderId">
              <Input onChange={(e) => handleFormChange('orderId', e.target.value)} />
            </Form.Item> */}
            <Form.Item label="Customer Name" name="customer">
              <Select onChange={(value) => handleFormChange('customer', value)}>
                {customers.map((customer) => (
                  <Option key={customer.id} value={JSON.stringify(customer)}>
                    {customer.customerName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Product" name="product">
              <Input onChange={(e) => handleFormChange('product', e.target.value)} />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity">
              <Input onChange={(e) => handleFormChange('quantity', e.target.value)} />
            </Form.Item>
            <Form.Item label="Unit Price" name="unitPrice">
              <Input onChange={(e) => handleFormChange('unitPrice', e.target.value)} />
            </Form.Item>
            <Form.Item label="Shipping Charges" name="shippingCharges">
              <Input onChange={(e) => handleFormChange('shippingCharges', e.target.value)} />
            </Form.Item>
            <Form.Item label="Total Price" name="totalPrice">
              <Input onChange={(e) => handleFormChange('totalPrice', e.target.value)} />
            </Form.Item>
            <Form.Item label="Created At" name="createdAt">
              <DatePicker onChange={(date) => handleFormChange('createdAt', date)} />
            </Form.Item>
            <Form.Item label="Updated At" name="updatedAt">
              <DatePicker onChange={(date) => handleFormChange('updatedAt', date)} />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Order;
