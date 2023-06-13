
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';
const { Option } = Select;

const AddJournalEntry = ({match}) => {
  
  const { id } = match.params;
  const [accountnames,setaccountnames]=useState([]);
  const [selectedaccountname, setSelectedaccountname] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const[updating,setUpdate]=useState(false);
  const [entry, setEntry] = useState({});
  const [productCode, setProductCode] = useState("");
  const [creditTotal, setCreditTotal] = useState(0);
  const [debitTotal, setDebitTotal] = useState(0);
  const [form] = Form.useForm();
  const history = useHistory();
  useEffect(()=>{
    
    axios.get('http://localhost:8080/api/accounts/accountnames')
    .then(response => setaccountnames(response.data))
    .catch(error => console.error(error));
    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const [entryResponse, productCodeResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/journal-entries/${id}`),
          axios.get('http://localhost:8080/api/journal-entries/servicecode')
        ]);
        setProductCode(productCodeResponse.data);
        setEntry(entryResponse.data);
          
      };
      
      fetchData();
     
  } },  [id],[]);
 
 
      

    const onFinish = async values => {

      try{
   if(id ==='_add'){
     console.log(values);
    try {
      const response = await axios.post('http://localhost:8080/api/journal-entries', values);
      message.success('Journal Entry created successfully!');
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
      message.error('An error occurred. Please try again.');
    }
  }else{
    try {
      setEntry(values); // update the entry state with the updated data
     
      await axios.put(`http://localhost:8080/api/journal-entries/${match.params.id}`,values);
      message.success('Journal Entry updated successfully!');
      history.goBack();
    } catch (error) {
      console.error(error);
      message.error('An error occurred. Please try again.');
    }
  }    
  }catch (error) {
    console.error(error);
    message.error('An error occurred. Please try again.');
  }
  };
  const convertDate=(data)=>{
// Split timestamp into [ Y, M, D, h, m, s ]
if (data === undefined) {
  return '';
}
//const regex=/[- :]/;
//var t =data.split(regex);

// Apply each element to the Date function
//var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
var d=new Date(data);
const year = d.getFullYear();
 const month = String(d.getMonth() + 1).padStart(2, '0');
 const day = String(d.getDate()).padStart(2, '0');
 const formattedDate = `${year}-${month}-${day}`;
 return formattedDate;
// -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

  
    setEntry(prevState => ({ ...prevState, [name]: value }));
   
  };
  const onValuesChange = (_, allValues) => {
    const { journalentryItems } = allValues;

    const newCreditTotal = journalentryItems.reduce((total, entry) => total + parseFloat(entry.credit || 0), 0);
    const newDebitTotal = journalentryItems.reduce((total, entry) => total + parseFloat(entry.debit || 0), 0);

    setCreditTotal(newCreditTotal);
    setDebitTotal(newDebitTotal);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
 

  return (
<div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Journal Entry</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        onFinishFailed={onFinishFailed}
        initialValues={{
        
          reference:'',
          date: null,
          journalentryItems: [{ jeAccount: '', credit: '', debit: '' }],
          description:'',
          balance:creditTotal,
        }}
      >
          <Form.Item name="reference" label="Reference" rules={[{ required: true, message: 'Please enter a reference' }]}>
          <Input placeholder="Reference" />
        </Form.Item>
         {//value={convertDate(entry.date)
}
         <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      
        <Form.List name="journalentryItems">
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
         {/* Display the total credit and debit amounts */}
         <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '8px', flex: '1' }}>
         <p>Total Credit: {creditTotal}</p>
         </div>
         <div style={{ marginRight: '8px', flex: '1' }}>
        <p>Total Debit: {debitTotal}</p>
        </div>
        </div>
        {/* Display an error message if the amounts are not equal */}
        {creditTotal !== debitTotal && (
          <p style={{ color: 'red' }}>Debit and credit sides must be equal.</p>
        )}

        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Description" rows={4} />
        </Form.Item>
       

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => history.push('/accounts/journal-entry')}>
            Close
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
         
export default AddJournalEntry;