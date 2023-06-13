

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Input, Select, Button, Row, Col,Divider } from 'antd';

const { Option } = Select;

const AddBankAccount = ({ match, history }) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updating, setUpdate] = useState(false);

  const [bankAccount, setBankAccount] = useState({
    code: '',
    accountName: '',
    bankName: '',
    branchName: '',
    bankAccountTitle: '',
    bankAccountNumber: '',
    description: ''
  });

  useEffect(() => {
    if (id === '_add') {
      return;
    } else {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/bankaccounts/${id}`);
        setBankAccount(response.data);

      };

      fetchData();
    }
  }, [id]);

  const onSubmit = async () => {
    const data = {
      code: bankAccount.code,
      accountName: bankAccount.accountName,
      bankName: bankAccount.bankName,
      branchName: bankAccount.branchName,
      bankAccountTitle: bankAccount.bankAccountTitle,
      bankAccountNumber: bankAccount.bankAccountNumber,
      description: bankAccount.description
    };

    setBankAccount(data);

    if (id === '_add') {
      try {
        const response = await axios.post('http://localhost:8080/api/bankaccounts', data);
        console.log(response.data);
        console.log('Bank Account created successfully!');
        setFormSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.put(`http://localhost:8080/api/bankaccounts/${id}`, data);
        console.log(data);
        history.goBack();
      } catch (error) {
        console.log(data);
        console.error(error);
      }
    }
  };

  const handleChange = (value, name) => {
    setBankAccount((prevState) => ({ ...prevState, [name]: value }));
  };
  const changedisable = () => {
    if(id=='_add')
    return updating;
    else
    return !updating;
  
  };
  const getDefaultParentAccount = () => {
    if (id === '_add') {
      return 'Bank'; // Set default value for add mode
    } else {
      return bankAccount.parentAccount; // Set default value for edit mode
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Bank Account</h1>
      {formSubmitted ? (
        <div>Form submitted successfully!</div>
      ) : (
        <Form onFinish={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Account Code" 
                  
                  
                 
                  rules={[{ required: true, message: "Please enter code" }]}>
                <Input
                  type="text"
                  required
                  name="code" 
                  disabled={updating}
                  placeholder="Account Code" 
                  value={bankAccount.code}
                  onChange={(e) => handleChange(e.target.value, 'code')}
                  
                  
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Account Name" rules={[{ required: true, message: "Please enter account name" }]} >
                 
                 
                <Input
                  type="text"
      
                  required
                  name="accountName"
                  placeholder="Account Name"
                  value={bankAccount.accountName}
                  onChange={(e) => handleChange(e.target.value, 'accountName')} disabled={updating} 
                  
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          
            <Col span={12}>
              <Form.Item label="Bank Name" rules={[{ required: true, message: "Please enter bank name" }]}>
                <Input
                  type="text"
                  required
                  name="bankName"
                  placeholder="Bank Name"
                  value={bankAccount.bankName}
                  onChange={(e) => handleChange(e.target.value, 'bankName')}  disabled={updating} 
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Branch Name"   rules={[{ required: true, message: "Please enter bracnch name" }]}>
                <Input
                  type="text"
                  required
                  name="branchName"
                  placeholder="Branch Name"
                  value={bankAccount.branchName}
                  onChange={(e) => handleChange(e.target.value, 'branchName')} disabled={updating} 
                  
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Account Title" rules={[{ required: true, message: "Please enter bank account title" }]}>
                <Input
                  type="text"
                  required
                  name="bankAccountTitle"
                  placeholder="Bank Account Title"
                  value={bankAccount.bankAccountTitle}
                  onChange={(e) => handleChange(e.target.value, 'bankAccountTitle')} disabled={updating}   
                  
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Bank Account Number" >
                <Input
                  type="text"
                  required
                  name="bankAccountNumber"
                  placeholder="Bank Account Number"
                  value={bankAccount.bankAccountNumber}
                  onChange={(e) => handleChange(e.target.value, 'bankAccountNumber')} disabled={updating}  
                  
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Description"   

    >
                <Input.TextArea
                  rows={4}
                  name="description"
                  placeholder="Description"
                  value={bankAccount.description}
                  onChange={(e) => handleChange(e.target.value, 'description')} disabled={updating}   rules={[
                    {
                      required: true,
                      message: "Please enter description",},]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'right', marginRight: '10px' }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <Button type="button" onClick={() => history.push('/accounts/bank-accounts')}>
                Close
              </Button>
            </div>
          </div>
          <Divider />
          <div style={{ fontSize: '14px', fontStyle: 'italic', marginTop: '10px', textAlign: 'left' }}>
            For account openings, please add a journal entry
          </div>
            
        
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddBankAccount;












