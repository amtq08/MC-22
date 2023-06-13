import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const { Item } = Form;

const ViewProduct = ({ match, history }) => {
  const [form] = Form.useForm();
  const { id } = match.params;
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      setProduct(response.data);
    };
    fetchData();
  }, [id]);

  const handleRevise = (id) => {
    history.push(`/add-product/${id}`);
  };

  const showSalePrice = product.showSalePrice;
  const showPurchasePrice = product.showPurchasePrice;

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '50px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', color: 'steelblue', fontFamily: 'serif' }}>Product</h1>

      <Form form={form} initialValues={product}>
        <br />

        <Item label="Code">
          <Input value={product.id} />
        </Item>
        <Item label="Product Name">
          <Input value={product.productName} />
        </Item>
        <Item>
          <Checkbox value={showSalePrice} style={{ float: 'left' }}>
            Do you Sale this Product?
          </Checkbox>
        </Item>
        {showSalePrice && (
          <Item label="Sale Price">
            <Input value={product.salePrice} />
          </Item>
        )}
        <Item>
          <Checkbox value={showPurchasePrice} style={{ float: 'left' }}>
            Do you Purchase this Product?
          </Checkbox>
        </Item>
        {showPurchasePrice && (
          <Item label="Purchase Price">
            <Input value={product.purchasePrice} />
          </Item>
        )}
        <Item label="Category">
          <Input value={product.category} />
        </Item>
        <Item>
          <Button type="primary" onClick={() => handleRevise(product.id)}>
            Revise
          </Button>
          <Button type="primary" onClick={() => history.goBack()}>
            Close
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default ViewProduct;