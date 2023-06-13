


import React, { useState,useEffect} from 'react';

import { useForm } from "react-hook-form";
import axios from 'axios';
import Divider from "@material-ui/core/Divider";

import Spacer from 'react-spacer';


const AddProduct = ({match,history}) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;
  const Spacer = require('react-spacer');
  
 
  const [formSubmitted, setFormSubmitted] = useState(false);
const[updating,setUpdate]=useState(false);

  const [product, setproduct] = useState({
    productName:"",
    showSalePrice: false,
    salePrice:"",
    showPurchasePrice: false,
    purchasePrice:"", 
    productCategory:""
    

    
    
  });

 
  useEffect(()=>{

    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const Response = await axios.get(`http://localhost:8080/api/products/${id}`);
       
        setproduct(Response.data);
          
      };
      
      fetchData();
     
  } },  [id]);


  const onSubmit = async () => {
    const data = {
       
        productName:product.productName,
        salePrice:product.salePrice,
        purchasePrice:product.purchasePrice,
         productCategory:product.productCategory
        
        
    };
   setproduct(data);
   if(id ==='_add'){
     try {
       const response = await axios.post('http://localhost:8080/api/products',
         
     data,
      
       
     );
 
       console.log(response.data);
       console.log('Product created successfully!');
 
       
       setFormSubmitted(true);
     } catch (error) {
       console.error(error);
     }
    }else{
        try {
           
           
            await axios.put(`http://localhost:8080/api/products/${id}`,
           data,);
            history.goBack();
          } catch (error) {
            console.error(error);
          }
    }
        

    };





  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
  
    setproduct(prevState => ({ ...prevState, [name]: value }));
  };

  const Update = (event) => {
    const name = event.target.name;
    if(updating){
        if(name ==='id'){
            setUpdate(true);
          }
        else
        {
            setUpdate(false);
        };
    }
     
    

   
  };

 


 

  return (


<div style={{ textAlign: "center", backgroundColor: "white", padding: "50px" }}>
<h1 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center", color: "steelblue", fontFamily: "serif" }}>Add Product</h1>
{formSubmitted ? <div>Form submitted successfully!</div> :
       
  <form onSubmit={handleSubmit(onSubmit)}>

    <div style={{ marginBottom: "10px", display: "flex" }}>
      <div style={{ flex: 1, textAlign: "left" }}>
        <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
          Product Name:
          <input type="text" required name="productName"  placeholder="product Name" value={product.productName} onChange={handleChange}  disabled={updating} style={{ fontSize: "18px", textAlign: "left" }} />
        </label>
      </div>
    </div>
    <br />

    <div style={{ marginBottom: "10px", display: "flex" }}>
    <div style={{ marginBottom: "10px", display: "flex" }}>
  <div style={{ flex: 1, textAlign: "left" }}>
    <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
      Do you Sale this Product?
      <input type="checkbox" name="showSalePrice" checked={product.showSalePrice} onChange={handleChange} />
    </label>
  </div>
</div>
{product.showSalePrice && (
  <div style={{ marginBottom: "10px", display: "flex" }}>
    <div style={{ flex: 1, textAlign: "left" }}>
      <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
        Sale Price:
        <input type="number" required name="salePrice" placeholder="sale price" value={product.salePrice} onChange={handleChange} style={{ fontSize: "18px", textAlign: "left" }} />
      </label>
    </div>
  </div>
)}

      <br />
      <div style={{ marginBottom: "10px", display: "flex" }}>
  <div style={{ flex: 1, textAlign: "left" }}>
    <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
      Do you Purchase this product? :
      <input type="checkbox" name="showPurchasePrice" checked={product.showPurchasePrice} onChange={handleChange} />
    </label>
  </div>
</div>

{product.showPurchasePrice && (
  <div style={{ marginBottom: "10px", display: "flex" }}>
    <div style={{ flex: 1, textAlign: "left" }}>
      <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
        Purchase Price:
        <input type="number" required name="purchasePrice" placeholder="purchase price" value={product.purchasePrice} onChange={handleChange} style={{ fontSize: "18px", textAlign: "left" }} />
      </label>
    </div>
  </div>
)}

    </div>
    <div style={{ marginBottom: "10px", display: "flex" }}>
  <div style={{ flex: 1, textAlign: "left" }}>
    <label style={{ fontWeight: "bold", fontSize: "20px", fontFamily: "serif" }}>
      Product Category:
      <select name="productCategory" value={product.productCategory} onChange={handleChange} style={{ fontSize: "18px", textAlign: "left" }}>
        <option value="Finished">Finished</option>
        <option value="Service">Service</option>
        <option value="Raw Material">Raw Material</option>
      </select>
    </label>
  </div>
</div>
 
     

    <div style={{ display:"flex",justifyContent: "center" ,marginTop:"5px",marginBottom:"10px"}}>
    
  <div style={{ flex: 1,textAlign:"right",marginRight:"10px"}}>
  <button type="submit">{updating? 'Update' : 'Save'}</button>
  </div>
  <div style={{ flex: 1,textAlign:"left"}}>
    <button type="button" onClick={() => {history.push('/Users/Products') }}>Close</button>
  </div>
</div>


   
  </form>
}
</div>



    );
  };

export default AddProduct;