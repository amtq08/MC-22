const { Column } = Table;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [form] = Form.useForm();

  const { path, url } = useRouteMatch();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
      setLoading(false);
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/customers/${id}`);
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (modalType === 'add') {
        const response = await axios.post('http://localhost:8080/api/customers', values);
        setCustomers([...customers, response.data]);
      } else if (modalType === 'edit') {
        const response = await axios.put(`http://localhost:8080/api/customers/${values.id}`, values);
        setCustomers(customers.map((customer) => (customer.id === values.id ? response.data : customer)));
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleEdit = (customer) => {
    setModalType('edit');
    setModalVisible(true);
    form.setFieldsValue(customer);
  };

  const handleAdd = () => {
    setModalType('add');
    setModalVisible(true);
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          Add Customer
        </Button>
      </div>
      <Table dataSource={customers} loading={loading}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <span>
              <Button type="link" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button type="link" danger onClick={() => handleDelete(record.id)}>
                Delete
              </Button>
            </span>
          )}
        />
      </Table>
      <Modal
        title={modalType === 'add' ? 'Add Customer' : 'Edit Customer'}
        visible={modalVisible}
        onCancel={handleModalCancel}
        onOk={handleModalOk}
      >
        <Form form={form} layout="vertical">
          {modalType === 'edit' && (
            <Form.Item name="id" label="ID" rules={[{ required: true, message: 'Please input the customer ID!' }]}>
              <Input disabled />
            </Form.Item>
          )}
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the customer Name!' }]}>
<Input />
</Form.Item>
<Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the customer email!' }]}>
<Input />
</Form.Item>
</Form>
</Modal>
</div>
);
};