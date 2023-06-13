

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddExpense = ({ match }) => {
  const [payFromAccountNames, setPayFromAccountNames] = useState([]);
  const [expenseAccountNames, setExpenseAccountNames] = useState([]);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/expenses/expenseaccountnames')
      .then(response => setExpenseAccountNames(response.data))
      .catch(error => console.error(error));

    axios
      .get('http://localhost:8080/api/expenses/payfromaccountnames')
      .then(response => setPayFromAccountNames(response.data))
      .catch(error => console.error(error));
  }, []);

  const onFinish = async values => {
    try {
      if (match.params.id === '_add') {
        await axios.post('http://localhost:8080/api/expenses', values);
        message.success('Expense created successfully!');
      } else {
        await axios.put(`http://localhost:8080/api/expenses/${match.params.id}`, values);
        message.success('Expense updated successfully!');
      }
      history.goBack();
    } catch (error) {
      console.error(error);
      message.error('An error occurred. Please try again.');
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Expense</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          payfrom: '',
          contact: '',
          date: null,
          reference: '',
          expenseList: [{ expenseAccount: '', amount: '' }],
          description: '',
        }}
      >
        <Form.Item name="payfrom" label="Pay From" rules={[{ required: true, message: 'Please select a type' }]}>
          <Select placeholder="Select a type">
            {payFromAccountNames.map(type => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="contact" label="Contact" rules={[{ required: true, message: 'Please enter a contact' }]}>
          <Input placeholder="Contact" />
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="reference" label="Reference" rules={[{ required: true, message: 'Please enter a reference' }]}>
          <Input placeholder="Reference" />
        </Form.Item>

        <Form.List name="expenseList">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} style={{ display: 'flex' }}>
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'Account' : ''}
                    name={[field.name, 'jeAccount']}
                    fieldKey={[field.fieldKey, 'jeAccount']}
                    rules={[{ required: true, message: 'Please select an account' }]}
                    style={{ marginRight: '8px', flex: '1' }}
                  >
                  
                    <Select placeholder="Select a type">
                      {accountnames.map(type => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'credit' : ''}
                    name={[field.name, 'credit']}
                    fieldKey={[field.fieldKey, 'credit']}
                    rules={[{ required: true, message: 'Please enter credit amount' }]}
                    style={{ marginRight: '8px', flex: '1' }}>
                    <Input type="number" placeholder="credit" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'debit' : ''}
                    name={[field.name, 'debit']}
                    fieldKey={[field.fieldKey, 'debit']}
                    rules={[{ required: true, message: 'Please enter debit amount' }]}
                    style={{ marginRight: '8px', flex: '1' }}>
                    <Input type="number" placeholder="debit" />
                  </Form.Item>
                  
                  {fields.length > 1 && (
                     <Button type="link" danger onClick={() => remove(field.name)} style={{ alignSelf: 'center' }}>
                     Remove
                   </Button>
                  )}
                </div>
              ))}
              
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add Entry
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => history.push('/accounts/expense')}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpense;

