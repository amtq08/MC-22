// CustomerPage.js
import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';


class Product extends Component {
  constructor(props){
      super(props)
      this.state={
          
          products:[]
      }
      this.addproduct=this.addproduct.bind(this);
  }
  async componentDidMount() {
      const response = await axios.get('http://localhost:8080/api/products');
      this.setState({ products: response.data });

    }
  addproduct(){
      this.props.history.push('/add-product/_add');/*/-1*/
  }    
  async deleteproduct(id) {
      try {
          await axios.delete(`http://localhost:8080/api/products/${id}`);
          this.setState(prevState => ({ 
            ...prevState,
            products: prevState.products.filter(product => product.id !== id)
          }));
      } catch (error) {
        console.log(error);
      }
    }
    
  
  render() {
      
      const columns = [
          {
          title: 'Code',
          dataIndex: 'id',
          key: 'id',
          render: (text, product) => {
             return (<div><a href={`/ViewProduct/${product.id}`}>
             {product.id}
           </a></div>);
            },
          },
          {
          title: 'Name',
          dataIndex: 'productName',
          key: 'name',
          },
          {
          title: 'Category',
          dataIndex: 'productCategory',
          key: 'productCategory',
          },
          {
          title: 'Sales Price',
          dataIndex: 'salePrice',
          key: 'salePrice',
          },
          {
          title: 'Action',
          key: 'action',
          render: (text, product) => (
          <Space size="middle">
          <div onClick={ () => this.deleteproduct(product.id)}><DeleteForever/></div>
          </Space>
          ),
          },
          ];

      return (
          <div>
          <h2 className="text-center">Products List</h2> 
          <Button type="primary" onClick={this.addproduct}>Add product</Button>          
          
          <div >
          <Table dataSource={this.state.products} columns={columns} />             
              
          </div>
       </div>
      );
  }
}

export default Product;
