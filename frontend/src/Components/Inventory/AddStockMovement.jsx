
import { Form, Input, Select, Button, message,Table } from "antd";
import { CheckCircleOutlined,DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import React, { useState,useEffect} from 'react';

import axios from "axios";

const { Option } = Select;

const AddStockMovement = ({match,history}) => {
  const [error, setError] = useState("");
  const { id } = match.params;
  const [prouductnames,setproductnames]=useState([]);
  const [warehousenames,setwarehousenames]=useState([]);
  const[updating,setUpdate]=useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [stockmovement, setstockmovement] = useState({
    fromWarehouse:"",
    toWarehouse:"",
    date:"",
    reference:"",
    products:"",
    description:""
    
  });

  const [products, setProducts] = useState([{ product: '', quantity: '' }]);
  useEffect(()=>{
    axios.get('http://localhost:8080/api/products/productnames')
      .then(response => setproductnames(response.data))
      .catch(error => console.error(error));
      axios.get('http://localhost:8080/api/warehouses/warehousenames')
      .then(response => setwarehousenames(response.data))
      .catch(error => console.error(error));

    if((id ==='_add')){
      return;
    }
    else{
      const fetchData = async () => {
        const Response = await axios.get(`http://localhost:8080/api/stockmovements/${id}`);
       
        setstockmovement(Response.data);
          
      };
      
      fetchData();
     
  } },  [id]);





  const onFinish = async () => {
    if (
        !stockmovement.fromWarehouse ||
        !stockmovement.toWarehouse ||
        !stockmovement.date ||
        !stockmovement.reference ||
        !stockmovement.description||
        !products || // Check if products array exists
        stockmovement.products.length === 0 // Check if products array is empty
      ) {
        setError('Fill in the required fields');
      } else {
        setError('');
    const data={ 
        fromWarehouse:stockmovement.fromWarehouse,
         toWarehouse:stockmovement.toWarehouse,
         date:stockmovement.date,
          reference:stockmovement.reference,
           products:products,
            description:stockmovement.description };
            setstockmovement(data);
   if(id ==='_add'){
     try {
       const response = await axios.post('http://localhost:8080/api/stockmovements',
         
     data,
      
       
     );
 
       console.log(response.data);
       console.log('StockMovement created successfully!');
 
       setFormSubmitted(true);
      
     } catch (error) {
       console.error(error);
     }
    }   else{
        try {
           
           
            await axios.put(`http://localhost:8080/api/stockmovements/${stockmovement.id}`, 
           data,);
            history.goBack();
          } catch (error) {
            console.error(error);
          }
    }

}
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

      setstockmovement(prevState => ({ ...prevState, [name]: value }));
  

   
  };

 
  const handleClose = () => {
    history.push('/Inventory/stockmovement')
  };

  const addProduct = (product) => {
    form.setFieldsValue({ productName: product });
  };
  const addProductRow = () => {
    setProducts([...products, { product: '', quantity: '' }]);
  };
  const removeProductRow = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleProductChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].product = value;
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value;
    setProducts(updatedProducts);
  };
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (_, record, index) => (
        <Select
          placeholder="Select a product"
          value={record.product}
          onChange={(value) => handleProductChange(index, value)}
        >
          <Option value="product1">Product 1</Option>
          <Option value="product2">Product 2</Option>
        </Select>
      )
    },
    {
        title: "Quantity",
        dataIndex: "quantity",
        render: (_, record, index) => (
          <Input
            type="number"
            value={record.quantity}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
          />
        )
      },
      {
        title: "Actions",
        dataIndex: "actions",
        render: (_, record, index) => (
          <Button
            type="dashed"
            onClick={() => removeProductRow(index)}
            icon={<DeleteOutlined />}
            disabled={products.length === 1}
          />
        )
      }
    ];
  
    const dataSource = products.map((product, index) => ({
      key: index,
      ...product
    }));
  

  

 

  const [form] = Form.useForm();

  return (
    <div>
      <h1>Stock Movement</h1>
      {formSubmitted ? <div>Form submitted successfully!</div>:
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="From Warehouse"
          name="fromWarehouse"
          value={stockmovement.fromWarehouse}
          disabled={updating}
          onChange={handleChange} 
          rules={[{ required: true, message: "Please select from warehouse" }]}
        >
          <Select placeholder="Select an option">
            <Option value="RAW MATERIAL">RAW MATERIAL</Option>
            <Option value="INPROCESS GOODS">INPROCESS GOODS</Option>
            <Option value="FINISHED GOODS">FINISHED GOODS</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="To Warehouse"
          name="toWarehouse"
          value={stockmovement.toWarehouse}
          disabled={updating}
          onChange={handleChange} 
          rules={[{ required: true, message: "Please select to warehouse" }]}
        >
          <Select placeholder="Select an option">
            <Option value="RAW MATERIAL">RAW MATERIAL</Option>
            <Option value="INPROCESS GOODS">INPROCESS GOODS</Option>
            <Option value="FINISHED GOODS">FINISHED GOODS</Option>
          </Select>
        </Form.Item>


        <Form.Item
          label="Date"
          name="date"
          value={stockmovement.date}
          disabled={updating}
          onChange={handleChange} 
          rules={[{ required: true, message: "Please select date" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Reference"
          name="reference"
          value={stockmovement.reference}
          disabled={updating}
          onChange={handleChange} 
          rules={[{ required: true, message: "Please enter reference" }]}
        >
          <Input type="text" />
        </Form.Item>



  {/* ...other form items... */}
  <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
          />
  
          <Form.Item>
            <Button
              type="dashed"
              onClick={addProductRow}
              block
              icon={<PlusOutlined />}
            >
              Add Product
            </Button>
          </Form.Item>

        {/*{products.map((product, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
            <Form.Item
              label={`Product ${index + 1}`}
              name={`product-${index}`}
              rules={[{ required: true, message: 'Please select a product' }]}
              style={{ marginRight: 8 }}
            >
              <Select placeholder="Select a product">
                <Option value="product1">Product 1</Option>
                <Option value="product2">Product 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={`Quantity ${index + 1}`}
              name={`quantity-${index}`}
              rules={[{ required: true, message: 'Please enter the quantity' }]}
              style={{ marginRight: 8 }}
            >
              <Input type="number" />
            </Form.Item>

            {index === products.length - 1 && index > 0 ? (
              <Button
                type="dashed"
                onClick={addProductRow}
                icon={<PlusOutlined />}
                style={{ alignSelf: 'flex-end' }}
              />
            ) : (
              <Button
                type="dashed"
                onClick={() => removeProductRow(index-1)}
                icon={<DeleteOutlined />}
                style={{ alignSelf: 'flex-end' }}
              />
            )}
          </div>
        ))}

        {products.length === 1 && (
          <Form.Item>
            <Button type="dashed" onClick={addProductRow} block icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Form.Item>
        )}

      


        {products.map((product, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: 8 }}>
            <Form.Item
              label={`Product ${index + 1}`}
              name={`product-${index}`}
              rules={[{ required: true, message: 'Please select a product' }]}
              style={{ marginRight: 8 }}
            >
              <Select placeholder="Select a product">
                <Option value="product1">Product 1</Option>
                <Option value="product2">Product 2</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={`Quantity ${index + 1}`}
              name={`quantity-${index}`}
              rules={[{ required: true, message: 'Please enter the quantity' }]}
              style={{ marginRight: 8 }}
            >
              <Input type="number" />
            </Form.Item>

            {index === products.length - 1 && index > 0 ? (
              <Button
                type="dashed"
                onClick={addProductRow}
                icon={<PlusOutlined />}
                style={{ alignSelf: 'flex-end' }}
              />
            ) : (
                <Button
                  type="dashed"
                  onClick={() => removeProductRow(index)}
                  icon={<DeleteOutlined />}
                  style={{ alignSelf: 'flex-end' }}
                />
              )}
            </div>
          ))}
  
          {products.length === 1 && (
            <Form.Item>
              <Button type="dashed" onClick={addProductRow} block icon={<PlusOutlined />}>
                Add Product
              </Button>
            </Form.Item>
          )}*/}






<Form.Item
          label="Description:"
          name="description"
          value={stockmovement.description}
          disabled={updating}
          onChange={handleChange} 
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input type="textarea" />
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
      </Form>
}
    </div>
  );
};


export default AddStockMovement;
