import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Input, Select, Button, message,Table, Divider } from 'antd';

const { Option } = Select;

const AddAccount = ({ match, history }) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;

const [formSubmitted, setFormSubmitted] = useState(false);  
  const [updating, setUpdate] = useState(false);

  const [account, setAccount] = useState({
    code: '',
    accountName: '',
    parentAccount: 'CurrentAssets',
    description: '',
  });

  useEffect(() => {
    if (id === '_add') {
      return;
    } else {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
        setAccount(response.data);
      };

      fetchData();
    }
  }, [id]);

  const onSubmit = async () => {
    const data = {
      code: account.code,
      accountName: account.accountName,
      parentAccount: account.parentAccount,
      description: account.description,
    };

    setAccount(data);

    if (id === '_add') {
      try {
        const response = await axios.post('http://localhost:8080/api/accounts', data);
        console.log(response.data);
        console.log('Account created successfully!');
        setFormSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.put(`http://localhost:8080/api/accounts/${id}`, data);
        history.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (name, value) => {
    setAccount((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleClose = () => {
    history.push('/accounts/chartofaccounts')
  };
  const [form] = Form.useForm();

  return (
    <div>
    <h1>Accounts</h1>
    {formSubmitted ? <div>Form submitted successfully!</div>:
    <Form form={form} onFinish={onSubmit} layout="vertical">
         
               <Form.Item label="Account Code"rules={[{ required: true, message: "Please enter account code " }]}>
                
                <Input
                  type="text"
                  placeholder="Account Code"
                  name="code"
     value={account.code}
          disabled={updating}
          onChange={(e) => handleChange('code', e.target.value)}
          
                
                />
            </Form.Item>
            
              < Form.Item label="Account Name"  rules={[{ required: true, message: "Please enter account name" }]}>
                
                <Input
                  type="text"
                  name="accountName"
                  value={account.accountName}
                   disabled={updating}
                   onChange={(e) => handleChange('accountName', e.target.value)}
                   
                  
                  placeholder="Account Name"
                  
                 
                />
               </Form.Item>
          
            <Form.Item label="Parent Account"  rules={[{ required: true, message: "Please select Parent Account" }]} >
            <Select
            name="parentAccount"
            value={account.parentAccount}
            disabled={updating}
            onChange={(value) => handleChange('parentAccount', value)}
            
             
            >
          <Option value="">Select</Option>
          <Option value="CurrentAssets">Current Assets</Option>
          <Option value="NonCurrentAssets">Non Current Assets</Option>
          <Option value="Cash">Cash</Option>
          <Option value="Bank">Bank</Option>
          <Option value="Inventory">Inventory</Option>
          <Option value="FixedAssets">Fixed Assets</Option>
          <Option value="Equity">Equity</Option>
          <Option value="DirectCosts">Direct Costs</Option>
          <Option value="Depreciation">Depreciation</Option>
          <Option value="Expense">Expense</Option>
          <Option value="OtherExpense">Other Expense</Option>
          <Option value="CurrentLiability">Current Liability</Option>
          <Option value="LongTermLiability">Long Term Liability</Option>
          <Option value="Revenue">Revenue</Option>
          <Option value="OtherIncome">Other Income</Option>
              {/* Other Options */}
            </Select>
            </Form.Item>
          
             <Form.Item label="Description"  rules={[{ required: true, message: "Please enter description" }]}>
              
              <Input.TextArea
              name="description"
              value={account.description}
              disabled={updating}
              onChange={handleChange} 
             
                
              />
          </Form.Item>
             <div style={{ display:'flex',textAlign:"right",marginLeft:"500px"}}>
             <Form.Item  style={{ marginRight:"8px"}}>
               <Button type="primary" htmlType="submit">
                 Submit
               </Button>
               </Form.Item>
               
               <Form.Item style={{ marginRight:"8px"}}> 
               <Button type="default" onClick={handleClose}>
                 Close
               </Button>
             </Form.Item>
             
             </div>
             <Divider />
             <div style={{ fontSize: '14px', fontStyle: 'italic', marginTop: '10px', textAlign: 'left' }}>
               For account openings, please add a journal entry
             </div>
           </Form>
     }
         </div>
       );
     };
          

export default AddAccount;
