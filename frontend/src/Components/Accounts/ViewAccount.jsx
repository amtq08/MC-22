import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect,useReducer } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import axios from 'axios';
const{Item}=Form;

const ViewAccount = ({ match, history }) => {
 
  const [form] = Form.useForm();
  const { id } = match.params;
  const [account, setAccount] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      const Response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
       
      
      setAccount(Response.data);
     
    };
    fetchData();
  }, [id]);
  const handleRevise = (id) => {
    history.push(`/add-account/${id}`);/*/-1*/
};


    return (

      <div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Bank Account</h1>
               

      <Form form={form}  initialValues={account}>
        
      <br></br>
                  

                
       
        
                
        <Form.Item label="Account Code" >
          <Input value={account.code} />
        </Form.Item>
        <Form.Item label="Account Name" >
          <Input  value={account.accountName}/>
        </Form.Item>
        <Form.Item label="Parent" >
          <Input value={account.parentAccount} />
        </Form.Item>
        <Form.Item label="Description" >
          <Input.TextArea value={account.description}/>
        </Form.Item>
        <Form.Item>
          
              
            <Button type="primary" onClick={() => handleRevise(account.accountName)}>Revise</Button>
            <Button type="primary" onClick={() => {history.goBack(); }}>Close</Button>
        
        </Form.Item>
  
          
          </Form>
  </div> 
    );
  };


export default ViewAccount;













