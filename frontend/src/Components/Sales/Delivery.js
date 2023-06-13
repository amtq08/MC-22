import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, DatePicker, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import AddDelivery from './AddDelivery'; // Only import once
import moment from 'moment';
import axios from 'axios';



const { Option } = Select;

const Delivery = () => {
  const [form] = Form.useForm();
  const [deliveries, setDeliveries] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeliveries();
    fetchCustomers();
    fetchWarehouses();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/deliveries');
      setDeliveries(response.data);
      console.log('Deliveries:', response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleUpdateDelivery = async (id, values) => {
    setLoading(true);
    try {
      const customer = JSON.parse(values.customer);
      const warehouse = JSON.parse(values.warehouse);
      await axios.put(`http://localhost:8080/api/deliveries/${id}`, {
        ...values,
        customer: customer,
        warehouse: warehouse,
      });
      fetchDeliveries();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDelivery = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/deliveries/${id}`);
      fetchDeliveries();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDelivery = (record) => {
    setSelectedDelivery(record);
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setSelectedDelivery(null);
    setModalVisible(false);
  };

  const DeliveryStatus = {
    PENDING: { id: 1, label: 'Pending' },
    IN_TRANSIT: { id: 2, label: 'In Transit' },
    DELIVERED: { id: 3, label: 'Delivered' },
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => customer.name,
    },
    {
      title: 'Warehouse',
      dataIndex: 'warehouse',
      key: 'warehouse',
      render: (warehouse) => warehouse.name,
    },
    {
      title: 'Shipping Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Select
          defaultValue={record.status}
          onChange={(value) => handleUpdateDelivery(record.id, { status: value })}
        >
          {Object.values(DeliveryStatus).map((status) => (
            <Option value={status.label} key={status.id}>
              {status.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDelivery(record)}>
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteDelivery(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

 

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>Deliveries</h1>
        <Link to="/sales/add-delivery">
        <Button type="primary">Add Delivery</Button>
      </Link>
    </div>
    <Table columns={columns} dataSource={deliveries} rowKey="id" />
    <Switch>
      <Route path="/sales/add-delivery">
        <AddDelivery onAddDelivery={fetchDeliveries} />
      </Route>
    </Switch>

      {selectedDelivery && (
        <Modal
          visible={modalVisible}
          onCancel={handleModalCancel}
          onOk={() => form.submit()}
          okText="Save"
          cancelText="Cancel"
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              ...selectedDelivery,
              date: moment(selectedDelivery.date),
            }}
            onFinish={(values) => handleUpdateDelivery(selectedDelivery.id, values)}
          >
            <Form.Item label="Customer" name="customer">
              <Select>
                {customers.map((customer) => (
                  <Option key={customer.id} value={JSON.stringify(customer)}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Total Amount" name="totalAmount">
              <Input />
            </Form.Item>
            <Form.Item label="Warehouse" name="warehouse">
              <Select>
                {warehouses.map((warehouse) => (
                  <Option key={warehouse.id} value={JSON.stringify(warehouse)}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Status" name="status">
              <Select>
                {Object.values(DeliveryStatus).map((status) => (
                  <Option value={status.label} key={status.id}>
                    {status.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default Delivery;
