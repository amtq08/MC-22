import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect,useReducer } from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import axios from 'axios';
const{Item}=Form;

const ViewJournalEntry = ({ match, history }) => {
 
  const [form] = Form.useForm();
  const { id } = match.params;
  const [entry, setEntry] = useState({});
  const [productCode, setProductCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [entryResponse, productCodeResponse] = await Promise.all([
        axios.get(`http://localhost:8080/api/journal-entries/${id}`),
        axios.get('http://localhost:8080/api/journal-entries/servicecode')
      ]);
      setEntry(entryResponse.data);
      setProductCode(productCodeResponse.data);
    };
    fetchData();
  }, [id]);
  const handleRevise = (id) => {
    history.push(`/add-entry/${id}`);/*/-1*/
};


    return (

      <div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Journal Entry</h1>
               

      <Form form={form}  initialValues={entry}>
        
      <br></br>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Number: </label>
                            <div> {`${productCode}-${entry.id}`}</div>
                        </div>
                        <div className = "row">
                            <label> Reference: </label>
                            <div> { entry.reference}</div>
                        </div>
                        <div className = "row">
                            <label> Date: </label>
                            <div> { entry.date }</div>
                        </div>
                        
                    </div>

                    <Form.List name="journalentryItems" value={entry.journalEntryItems}>
          {(fields) => (
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
                  
                    <Select placeholder="Select a type" 
                    value={entry.journalEntryItems.jeAccount}>
                      
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
                
                </div>
              ))}
              
              
            </>
          )}
        </Form.List>     
       
        
                
       
        <Form.Item label="Description" >
          <Input.TextArea value={entry.description}/>
        </Form.Item>
        <Form.Item>
          
              
            <Button type="primary" onClick={() => handleRevise(entry.id)}>Revise</Button>
            <Button type="primary" onClick={() => {history.goBack(); }}>Close</Button>
        
        </Form.Item>
  
          
          </Form>
  </div> 
    );
  };


export default ViewJournalEntry;













