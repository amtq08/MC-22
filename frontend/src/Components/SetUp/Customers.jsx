// CustomerPage.js
import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';


class Customers extends Component {
  constructor(props){
      super(props)
      this.state={
          
          customers:[]
      }
      this.addcustomer=this.addcustomer.bind(this);
  }
  async componentDidMount() {
      const response = await axios.get('http://localhost:8080/api/customers');
      this.setState({ customers: response.data });

    }
  addcustomer(){
      this.props.history.push('/add-customer/_add');/*/-1*/
  }    
  async deletecustomer(id) {
      try {
          await axios.delete(`http://localhost:8080/api/customers/${id}`);
          this.setState(prevState => ({ 
            ...prevState,
            entries: prevState.customers.filter(customer => customer.id !== id)
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
          render: (text, customer) => {
             return (<div><a href={`/ViewCustomer/${customer.id}`}>
             {customer.id}
           </a></div>);
            },
          },
          {
          title: 'Name',
          dataIndex: 'customerName',
          key: 'name',
          },
          {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          },
          {
          title: 'Contact',
          dataIndex: 'contact',
          key: 'contact',
          },
          {
          title: 'Action',
          key: 'action',
          render: (text, customer) => (
          <Space size="middle">
          <div onClick={ () => this.deletecustomer(customer.id)}><DeleteForever/></div>
          </Space>
          ),
          },
          ];

      return (
          <div>
          <h2 className="text-center">Customers List</h2> 
          <Button type="primary" onClick={this.addcustomer}>Add Customer</Button>          
          
          <div >
          <Table dataSource={this.state.customers} columns={columns} />             
              
          </div>
       </div>
      );
  }
}

export default Customers;
