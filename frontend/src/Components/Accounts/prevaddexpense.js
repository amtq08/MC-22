
import React, { useState,useEffect,useReducer } from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import AddAccount from './AddAccount';
import { type } from 'antd/es/config-provider';



const AddExpense = ({match,history}) => {
  const { register, handleSubmit, reset } = useForm();
 
  const { id } = match.params;
  const [payfromaccountnames,setpayfromaccountnames]=useState([]);
  const [expenseaccountnames,setexpensefromaccountnames]=useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
const[updating,setUpdate]=useState(false);
const [inputFields, setInputFields] = useState([
  {expenseAccount: '', amount: ''}
])


  const [expense, setExpense] = useState({});


  const [productCode, setProductCode] = useState("");
  useEffect(()=>{
            axios.get('http://localhost:8080/api/expenses/expenseaccountnames').
            then(response => setexpensefromaccountnames(response.data))
            .catch(error => console.error(error));
          axios.get('http://localhost:8080/api/expenses/payfromaccountnames').
          then(response => setpayfromaccountnames(response.data))
        .catch(error => console.error(error));
        
        
          
      
    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const [Response, productCodeResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/expenses/${id}`),
          axios.get('http://localhost:8080/api/expenses/servicecode')
        ]);
        setProductCode(productCodeResponse.data);
        setExpense(Response.data);
          
      };
      
      fetchData();
     
  } },  [id],[]);
 
 
      

    const onSubmit = async (data) => {
   
   if(id ==='_add'){
     
    try {
      const response = await axios.post('http://localhost:8080/api/expenses', {
        payfrom: expense.payfrom,
        date: expense.date,
        contact: expense.contact,
        reference: expense.reference,
        expenseList: inputFields,
        description: expense.description,
        
        
       
      });
      console.log(inputFields)
      console.log(response.data);
      console.log('Expense created successfully!');

      
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }else{
    try {
      setExpense(data); // update the entry state with the updated data
     
      await axios.put(`http://localhost:8080/api/expenses/${id}`, {  
        payfrom: expense.payfrom,
        date: expense.date,
        contact: expense.contact,
        reference: expense.reference,
        expenseList: inputFields,
        description: expense.description,
        
    });
      history.goBack();
    } catch (error) {
      console.error(error);
    }
   
      
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

  
    setExpense(prevState => ({ ...prevState, [name]: value }));
   
  };
 
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  }

  const addFields = () => {
    let newfield = { expenseAccount: '', amount: '' }
    setInputFields([...inputFields, newfield])
}

const removeFields = (index) => {
  let data = [...inputFields];
  data.splice(index, 1)
  setInputFields(data)
}
 

  return (


<div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
<h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Expense</h1>
{formSubmitted ? <div>Form submitted successfully!</div> :
       
       <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
           <label htmlFor="payfrom">Pay From:</label>

           <select
  name="payfrom"
  value={expense.payfrom}
  onChange={handleChange}>
<option value="">Select a type</option>
         {payfromaccountnames.map(type => <option key={type} value={type}>{type}</option>)}
       </select>
 
         </div>

     
         <div style={{ marginBottom: "10px", display: "flex" }}>
           <div style={{ flex: 1, textAlign: "left" }}>
             <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
               Contact :
               <input type="text" required name="contact" placeholder="Contact" value={expense.contact} onChange={handleChange} disabled={updating} style={{ fontSize: "18px", textAlign: "left" }} />
             </label>
           </div>
           <br />
           <div style={{ flex: 1, textAlign: "left" }}>
             <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
               Date:
               <input type="date" required name="date" value={convertDate(expense.date)} onChange={handleChange} disabled={updating} style={{ fontSize: "18px", textAlign: "left" }} />
             </label>
           </div>
         </div>
         <div style={{ flex: 1, textAlign: "left" }}>
             <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
               Reference :
               <input type="text" required name="reference" placeholder="Reference" value={expense.reference} onChange={handleChange} disabled={updating} style={{ fontSize: "18px", textAlign: "left" }} />
             </label>
           </div>
         <br />

         {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <div className="form-row">
           <label htmlFor="expenseaccount">Expense Account:</label>
           <select
  name="expenseAccount"
  value={input.expenseAccount}
 
  onChange={event => handleFormChange(index, event)}
>
<option value="">Select a type</option>
         {expenseaccountnames.map(type => <option key={type} value={type}>{type}</option>)}
       </select>
       </div>
       
       <div className="form-row">
           <label htmlFor=" amount">Amount :</label>
           <input
             type="number"
             id="amount"
             name="amount"
             value={input.amount}
            
             onChange={event => handleFormChange(index, event)}
           />
         </div>
         <button onClick={() => removeFields(index)}>Remove</button>
         </div>
          )
        })}
        <button onClick={addFields}>Add More..</button>
      
     
       

         
           


       
         <div style={{ flex: 1, textAlign: "left" }}>
           <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
             Description:
             <textarea
               name="description"
               value={expense.description}
               onChange={handleChange}
               placeholder="description"
               disabled={updating}
               style={{ marginLeft: "10px", fontSize: "20px", width: "80%", height: "70px" }}
             />
           </label>
         </div>
         
         <button type="submit">Submit</button>
         <button type="button" onClick={() => {history.push('/accounts/expense') }}>Close</button>
       </form>
     }
     </div>
     
     
     
         );
       };
      
export default AddExpense;

