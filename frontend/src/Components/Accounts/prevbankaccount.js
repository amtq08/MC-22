


import React, { useState,useEffect} from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import Divider from "@material-ui/core/Divider";

import Spacer from 'react-spacer';


const AddBankAccount = ({match,history}) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;
  const Spacer = require('react-spacer');
  
 
  const [formSubmitted, setFormSubmitted] = useState(false);
const[updating,setUpdate]=useState(false);

  const [bankAccount, setbankAccount] = useState({
    code:"",
    accountName:"",
    parentAccount:"",
    bankName:"",
    branchName:"",
    bankAccountTitle:"",
    bankAccountNumber:"",
    description:""
    
  });
 
  useEffect(()=>{

    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const Response = await axios.get(`http://localhost:8080/api/bankaccounts/${id}`);
       
        setbankAccount(Response.data);
          
      };
      
      fetchData();
     
  } },  [id]);


  const onSubmit = async () => {
    const data = {
        code:bankAccount.code,
        accountName:bankAccount.accountName,
        parentAccount:bankAccount.parentAccount,
        bankName:bankAccount.bankName,
        branchName:bankAccount.branchName,
        bankAccountTitle:bankAccount.bankAccountTitle,
        bankAccountNumber:bankAccount.bankAccountNumber,
        description:bankAccount.description
        
    };
   setbankAccount(data);
   if(id ==='_add'){
     try {
       const response = await axios.post('http://localhost:8080/api/bankaccounts',
         
     data,
      
       
     );
 
       console.log(response.data);
       console.log('Bank Account created successfully!');
 
       
       setFormSubmitted(true);
     } catch (error) {
       console.error(error);
     }
    }else{
        try {
           
           
            await axios.put(`http://localhost:8080/api/bankaccounts/${id}`, 
           data,);
            history.goBack();
          } catch (error) {
            console.error(error);
          }
    }
        

    };





  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
   
      setbankAccount(prevState => ({ ...prevState, [name]: value }));
    

   
  };

 {/* const Update = (event) => {
    const name = event.target.name;
    if(updating){
        if(name ==='code'){
            setUpdate(true);
          }
        else
        {
            setUpdate(false);
        };
    }
     
    

   
  };*/}

 


 

  return (


<div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
<h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Add Bank Account</h1>
{formSubmitted ? <div>Form submitted successfully!</div> :
       
  <form onSubmit={handleSubmit(onSubmit)}>

    <div style={{ marginBottom: "10px", display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Account Code:
          <input type="text" required name="code" placeholder="Account Code" value={bankAccount.code} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
      <br />
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Account Name:
          <input type="text" required name="accountName"  placeholder="Account Name" value={bankAccount.accountName} onChange={handleChange}  disabled={updating} style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
    </div>
    <br />
    <div className="form-row">
      <label htmlFor="parent-account">Parent Account:</label>

        <select required name="parentAccount"  
         value={bankAccount.parentAccount}
         onChange={handleChange} 
          style={{ fontSize: "18px", textAlign: "left" }}>




          <option value="">Select</option>
          <option value="CurrentAssets">Current Assets</option>
          <option value="NonCurrentAssets">Non Current Assets</option>
          <option value="Cash">Cash</option>
          <option value="Bank">Bank</option>
          <option value="Inventory">Inventory</option>
          <option value="FixedAssets">Fixed Assets</option>
          <option value="Equity">Equity</option>
          <option value="DirectCosts">Direct Costs</option>
          <option value="Depreciation">Depreciation</option>
          <option value="Expense">Expense</option>
          <option value="OtherExpense">Other Expense</option>
          <option value="CurrentLiability">Current Liability</option>
          <option value="LongTermLiability">Long Term Liability</option>
          <option value="Revenue">Revenue</option>
          <option value="OtherIncome">Other Income</option>

        </select>

    </div>
    <div style={{ marginBottom: "10px", display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Bank Name:
          <input type="text" required name="bankName" placeholder="Bank Name" value={bankAccount.bankName} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
      <br />
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Branch Name:
          <input type="text" required name="branchName"  placeholder="Branch Name" value={bankAccount.branchName} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
    </div>
    <div style={{ marginBottom: "10px", display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Bank Account Title:
          <input type="text" required name="bankAccountTitle" placeholder="Bank Account Title" value={bankAccount.bankAccountTitle} disabled={updating}  onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
      <br />
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Bank Account Number:
          <input type="text" required name="bankAccountNumber"  placeholder="Bank Account Number" value={bankAccount.bankAccountNumber} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
    </div>

    <div style={{ flex: 1, textAlign: "left" }}>
      <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
        Description:
        <textarea
          name="description"
          
          
          placeholder="Enter account description"
          value={bankAccount.description}
          disabled={updating}
          onChange={handleChange}
          style={{ marginLeft: "10px", fontSize: "20px", width: "80%", height: "70px" }}
        />
      </label>
    </div>
    <div style={{ display:"flex",justifyContent: "center" ,marginTop:"5px",marginBottom:"10px"}}>
    
  <div style={{ flex: 1,textAlign:"right",marginRight:"10px"}}>
  <button type="submit">{updating? 'Update' : 'Save'}</button>
  </div>
  <div style={{ flex: 1,textAlign:"left"}}>
    <button type="button" onClick={() => {history.push('/accounts/bank-accounts') }}>Close</button>
  </div>
</div>

<div>
  <Divider />
  
  <div style={{ fontSize: "14px", fontStyle: "italic", marginTop: "10px" ,textAlign: "left"  }}>
  For account openings, please add journal entry
</div>
</div>
   
  </form>
}
</div>



    );
  };

export default AddBankAccount;






