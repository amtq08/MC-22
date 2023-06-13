


import React, { useState,useEffect} from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import Divider from "@material-ui/core/Divider";


const AddAccount = ({match,history}) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;
  
  
 
  const [formSubmitted, setFormSubmitted] = useState(false);
const[updating,setUpdate]=useState(false);

  const [account, setAccount] = useState({
    code:"",
    accountName:"",
    parentAccount:"",
    description:""
    
  });
  const [parentAccount,setparentAccount]=useState("");

  useEffect(()=>{

    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const Response = await axios.get(`http://localhost:8080/api/accounts/${id}`);
       
        setAccount(Response.data);
          
      };
      
      fetchData();
     
  } },  [id]);

  const onSubmit = async () => {
    const data = {
        code:account.code,
        accountName:account.accountName,
        parentAccount:account.parentAccount, 
        description:account.description
        
    };
   setAccount(data);
   if(id ==='_add'){
     try {
       const response = await axios.post('http://localhost:8080/api/accounts',
         
     data,
      
       
     );
 
       console.log(response.data);
       console.log('Account created successfully!');
 
       
       setFormSubmitted(true);
     } catch (error) {
       console.error(error);
     }
    }else{
      try {
         
         
          await axios.put(`http://localhost:8080/api/accounts/${account.id}`, 
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

      setAccount(prevState => ({ ...prevState, [name]: value }));
  

   
  };

  

 


 

  return (


<div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
<h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Add Account</h1>
{formSubmitted ? <div>Form submitted successfully!</div> :
       
  <form onSubmit={handleSubmit(onSubmit)}>

    <div style={{ marginBottom: "10px", display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Account Code:
          <input type="text" required name="code" placeholder="Account Code"  value={account.code} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
      <br />
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Account Name:
          <input type="text" required name="accountName"  placeholder="Account Name" value={account.accountName} disabled={updating} onChange={handleChange}  style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
    </div>
    <br />
    <div className="form-row">
      <label htmlFor="parent-account">Parent Account:</label>

        <select required name="parentAccount"  
         value={account.parentAccount} 
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


    <div style={{ flex: 1, textAlign: "left" }}>
      <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
        Description:
        <textarea
          name="description"
          
          onChange={handleChange}
          placeholder="Enter account description"
          value={account.description} 
          disabled={updating}
          style={{ marginLeft: "10px", fontSize: "20px", width: "80%", height: "70px" }}
        />
      </label>
    </div>
    <div style={{ display:"flex",justifyContent: "center" ,marginTop:"5px",marginBottom:"10px"}}>
    
  <div style={{ flex: 1,textAlign:"right",marginRight:"10px"}}>
    
    <button type="submit">Submit</button>
    </div>
    <div style={{ flex: 1,textAlign:"left"}}>
    <button type="button" onClick={() => {history.push('/accounts/chartOfaccounts') }}>Close</button>
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

export default AddAccount;