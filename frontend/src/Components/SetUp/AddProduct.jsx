import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Input, Checkbox, Select, Button } from 'antd';

const { Option } = Select;

const AddProduct = ({ match, history }) => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = match.params;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updating, setUpdate] = useState(false);

  const [product, setProduct] = useState({
    productName: '',
    showSalePrice: false,
    salePrice: '',
    showPurchasePrice: false,
    purchasePrice: '',
    productCategory: 'Finished',
  });

  useEffect(() => {
    if (id === '_add') {
      return;
    } else {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data);
      };

      fetchData();
    }
  }, [id]);

  const onSubmit = async () => {
    const data = {
      productName: product.productName,
      showSalePrice:product.showSalePrice,
      salePrice: product.salePrice,
      showPurchasePrice:product.showPurchasePrice,
      purchasePrice: product.purchasePrice,
      productCategory: product.productCategory,
    };

    setProduct(data);

    if (id === '_add') {
      try {
        const response = await axios.post('http://localhost:8080/api/products', data);
        console.log(response.data);
        console.log('Product created successfully!');
        setFormSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.put(`http://localhost:8080/api/products/${id}`, data);
        history.goBack();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleChange = (name, value) => {
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const Update = (event) => {
    const name = event.target.name;
    if (updating) {
      if (name === 'id') {
        setUpdate(true);
      } else {
        setUpdate(false);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Add Product</h1>
      {formSubmitted ? (
        <div>Form submitted successfully!</div>
      ) : (
        <Form onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Product Name">
            <Input
              name="productName"
              placeholder="Product Name"
              value={product.productName}
              onChange={(e) => handleChange('productName', e.target.value)}
              disabled={updating}
            />
          </Form.Item>

 
  <Form.Item >
  <Checkbox
    checked={product.showSalePrice}
    onChange={(e) => handleChange('showSalePrice', e.target.checked)}  style={{ float: 'left' }}>
    Do you Sale this Product?
  </Checkbox>
  </Form.Item>

          {product.showSalePrice && (
            <Form.Item label="Sale Price">
              <Input
                type="number"
                name="salePrice"
                placeholder="Sale Price"
                value={product.salePrice}
                onChange={(e) => handleChange('salePrice', e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item >
            <Checkbox
              name="showPurchasePrice"
              checked={product.showPurchasePrice}
              onChange={(e) => handleChange('showPurchasePrice', e.target.checked)}   style={{ float: 'left' }}>
            Do you Purchase this Product?
            </Checkbox>
          </Form.Item>

          {product.showPurchasePrice && (
            <Form.Item label="Purchase Price">
              <Input
                type="number"
                name="purchasePrice"
                placeholder="Purchase Price"
                value={product.purchasePrice}
                onChange={(e) => handleChange('purchasePrice', e.target.value)}
              />
            </Form.Item>
          )}

          <Form.Item label="Product Category">
            <Select
              name="productCategory"
              value={product.productCategory}
              onChange={(value) => handleChange('productCategory', value)}
            >
              <Option value="Finished">Finished</Option>
              <Option value="Service">Service</Option>
              <Option value="Raw Material">Raw Material</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {updating ? 'Update' : 'Save'}
            </Button>
            <Button type="button" onClick={() => history.push('/Users/Products')} style={{ marginLeft: '10px' }}>
              Close
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AddProduct;
