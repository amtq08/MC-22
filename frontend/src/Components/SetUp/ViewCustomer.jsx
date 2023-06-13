import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect,useReducer } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import axios from 'axios';
const{Item}=Form;

const ViewCustomer = ({ match, history }) => {
 
  const [form] = Form.useForm();
  const { id } = match.params;
  const [customer, setCustomer] = useState({});
  

  useEffect(() => {
    const fetchData = async () => {
      const Response = await axios.get(`http://localhost:8080/api/customers/${id}`);
       
      
      setCustomer(Response.data);
     
    };
    fetchData();
  }, [id]);
  const handleRevise = (id) => {
    history.push(`/add-customer/${id}`);/*/-1*/
};


    return (

      <div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Customer</h1>
               

      <Form form={form}  initialValues={customer}>
        
      <br></br>
                  

                
       
        
                
        <Form.Item label="Code" >
          <Input value={customer.id} />
        </Form.Item>
        <Form.Item label="Customer Name" >
          <Input  value={customer.customerName}/>
        </Form.Item>
        <Form.Item label="Contact" >
          <Input value={customer.contact} />
        </Form.Item>
        <Form.Item label="Email" >
          <Input.TextArea value={customer.email}/>
        </Form.Item>
        <Form.Item label="Opening(PKR)" >
          <Input.TextArea value={customer.opening}/>
        </Form.Item>
        <Form.Item>
          
              
            <Button type="primary" onClick={() => handleRevise(customer.id)}>Revise</Button>
            <Button type="primary" onClick={() => {history.goBack(); }}>Close</Button>
        
        </Form.Item>
  
          
          </Form>
  </div> 
    );
  };


export default ViewCustomer;













