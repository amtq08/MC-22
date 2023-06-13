import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const history = useHistory();

  const fetchWarehouses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/warehouses");
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch warehouses");
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleAddWarehouse = async (values) => {
    try {
      const response = await fetch("http://localhost:8080/api/warehouses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setWarehouses([...warehouses, data]);
      message.success("Warehouse added successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to add warehouse");
    }
  };

  const handleUpdateWarehouse = async (values) => {
    try {
      const response = await fetch(`http://localhost:8080/api/warehouses/${selectedWarehouse.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      const updatedWarehouses = warehouses.map((warehouse) =>
        warehouse.id === data.id ? data : warehouse
      );
      setWarehouses(updatedWarehouses);
      message.success("Warehouse updated successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to update warehouse");
    }
  };

  const handleDeleteWarehouse = async (record) => {
    try {
      await fetch(`http://localhost:8080/api/warehouses/${record.id}`, {
        method: "DELETE",
      });
      const filteredWarehouses = warehouses.filter((warehouse) => warehouse.id !== record.id);
      setWarehouses(filteredWarehouses);
      message.success("Warehouse deleted successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete warehouse");
    }
  };

  const columns = [
    {
      title: "Warehouse Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Zipcode",
      dataIndex: "zipcode",
      key: "zipcode",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => editWarehouse(record)}>
            <EditOutlined />
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteWarehouse(record)}>
<DeleteOutlined />
Delete
</Button>
</span>
),
},
];

const showModal = () => {
setIsModalVisible(true);
setSelectedWarehouse(null);
};

const hideModal = () => {
setIsModalVisible(false);
};

const editWarehouse = (record) => {
setSelectedWarehouse(record);
setIsModalVisible(true);
};

const onFinish = (values) => {
if (selectedWarehouse) {
handleUpdateWarehouse(values);
} else {
handleAddWarehouse(values);
}
setIsModalVisible(false);
};

return (
<div>
<div style={{ marginBottom: 16 }}>
<Button type="primary" onClick={() => showModal()}>
<PlusOutlined /> Add Warehouse
</Button>
</div>
<Table dataSource={warehouses} columns={columns} rowKey="id" />
<Modal
title={selectedWarehouse ? "Edit Warehouse" : "Add Warehouse"}
visible={isModalVisible}
onCancel={hideModal}
footer={null}
>
<Form
       initialValues={selectedWarehouse}
       onFinish={onFinish}
       layout="vertical"
     >
<Form.Item
label="Warehouse Name"
name="name"
rules={[{ required: true, message: "Please enter a warehouse name" }]}
>
<Input />
</Form.Item>
<Form.Item
label="Location"
name="location"
rules={[{ required: true, message: "Please enter a location" }]}
>
<Input />
</Form.Item>
<Form.Item
label="Zipcode"
name="zipcode"
rules={[{ required: true, message: "Please enter a zipcode" }]}
>
<Input />
</Form.Item>
<Form.Item
label="City"
name="city"
rules={[{ required: true, message: "Please enter a city" }]}
>
<Input />
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit">
Submit
</Button>
</Form.Item>
</Form>
</Modal>
</div>
);
};

export default Warehouse;
