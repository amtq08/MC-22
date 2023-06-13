
import React, { Component } from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class Expense extends Component {
    constructor(props){
        super(props)
        this.state={
          productCode:'Exp',  
        expenses:[]
        }
        this.addexpense=this.addexpense.bind(this);
    }

      
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/expenses');
        this.setState({ expenses: response.data });
      }
     /* async viewexpense(id) {
        this.props.history.push(`/ViewExpense/${id}`);/*/
    
        
  
      
      addexpense(){
        this.props.history.push('/add-expense/_add');/*/-1*/
    } 

    async deleteexpense(id) {
        try {
            await axios.delete(`http://localhost:8080/api/expenses/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              expenses: prevState.expenses.filter(expense => expense.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
    
    render() {
        
        const columns = [
            {
            title: 'Number',
            dataIndex: 'id',
            key: 'id',
            render: (text, expense) => {
              return (<div><a href={`/ViewExpense/${expense.id}`}>
              {`${this.state.productCode}-${expense.id}`}
            </a></div>);
             },
            },
            {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            },
            {
              title: 'Reference',
              dataIndex: 'reference',
              key: 'reference',
              },
              {
                title: 'Contact',
                dataIndex: 'contact',
                key: 'contact',
                },
            {
            title: 'Pay From',
            dataIndex: 'payfrom',
            key: 'payfrom',
            },
            {
                title: 'Net Amount',
                dataIndex: 'amount',
                key: 'amount',
                },
            
            {
            title: 'Actions',
            key: 'action',
            render: (text, expense) => (
              <Space size="middle">
              <div onClick={ () => this.deleteexpense(expense.id)}><DeleteForever/></div>
              </Space>
              ),
            }, 
 
            
            ];

        return (
            <div>
            <h2 className="text-center">Expenses</h2> 
            <Button type="primary" onClick={this.addexpense}>Add Expense</Button>          
            <div >
            <Table dataSource={this.state.expenses} columns={columns} />             
                
            </div>
            
         </div>
        );
    }
}

export default Expense;

