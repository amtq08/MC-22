
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';

const { Option } = Select;
const{Item}=Form;
const ViewExpense = ({match, history}) => {
  const [form] = Form.useForm();
  const [expenseData, setExpenseData] = useState(null);
  const [productCode, setProductCode] = useState("");
  const { id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      const [Response, productCodeResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/expenses/${id}`),
        axios.get('http://localhost:8080/api/expenses/servicecode')
      ]);
      setExpenseData(Response.data);
      setProductCode(productCodeResponse.data);
    };
    fetchData();
  }, [id]);

  if (!expenseData) {
    return <div>Loading...</div>;
  }
  const handleRevise = (id) => {
    history.push(`/add-expense/${id}`);/*/-1*/
};

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>
        View Expense
      </h1>
      <div className = "card-body">
                        <div className = "row">
                            <label> Number: </label>
                            <div> {`${productCode}-${expenseData.id}`}</div>
                        </div>
                        <div className = "row">
                            <label> Reference: </label>
                            <div> { expenseData.reference}</div>
                        </div>
                        <div className = "row">
                            <label> Date: </label>
                            <div> { expenseData.date }</div>
                        </div>
                        
                    </div>
      <Form form={form} layout="vertical" initialValues={expenseData}>
        <Form.Item name="payfrom" label="Pay From" initialValue={expenseData.payfrom}>
          <Input disabled />
        </Form.Item>

        <Form.Item name="contact" label="Contact" initialValue={expenseData.contact}>
          <Input disabled />
        </Form.Item>


        <Form.List name="expenseList" initialValue={expenseData.expenseList}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div key={field.key} style={{ display: 'flex' }}>
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'Expense Account' : ''}
                    name={[field.name, 'expenseAccount']}
                    fieldKey={[field.fieldKey, 'expenseAccount']}
                    initialValue={field.expenseAccount}
                    style={{ marginRight: '8px', flex: '1' }}
                  >
                    <Select placeholder="Select a type" disabled>
                      {/* Render your expense account options here */}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label={index === 0 ? 'Amount' : ''}
                    name={[field.name, 'amount']}
                    fieldKey={[field.fieldKey, 'amount']}
                    initialValue={field.amount}
                    style={{ marginRight: '8px', flex: '1' }}
                  >
                    <Input type="number" placeholder="Amount" disabled />
                  </Form.Item>

                  {fields.length > 1 && (
                    <Button type="link" danger onClick={() => remove(field.name)} style={{ alignSelf: 'center' }}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block disabled>
                  Add Expense
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item name="description" label="Description" initialValue={expenseData.description}>
          <Input.TextArea placeholder="Description" rows={4} disabled />
        </Form.Item>

        <Form.Item>
          
              
          <Button type="primary" onClick={() => handleRevise(expenseData.id)}>Revise</Button>
          <Button type="primary" onClick={() => {history.goBack(); }}>Close</Button>
      
      </Form.Item>
      </Form>
    </div>
  );
};

export default ViewExpense;








