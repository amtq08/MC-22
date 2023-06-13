
import React, { Component } from 'react';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class BankAccounts extends Component {
    constructor(props){
        super(props)
        this.state={
            
        bankaccounts:[]
        }
        this.addaccount=this.addaccount.bind(this);
    }

      
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/bankaccounts');
        this.setState({ bankaccounts: response.data });
      }
      async deleteaccount(id) {
        try {
            await axios.delete(`http://localhost:8080/api/bankaccounts/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              bankaccounts: prevState.bankaccounts.filter(account => account.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
      addaccount(){
        this.props.history.push('/add-bankaccount/_add');/*/-1*/
    } 
    
    render() {
        
        const columns = [
          {
            title: 'Account Title',
            dataIndex: 'bankAccountTitle',
            key: 'bankAccountTitle',
            render: (text, account) => {
              return (<div><a href={`/ViewBankAccount/${account.id}`}>
              {account.bankAccountTitle}
            </a></div>);
             },
            },
            {
              title: 'Account Number',
              dataIndex: 'bankAccountNumber',
              key: 'bankAccountNumber',
              },
            {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
           
            },
           
            {
            title: 'Branch Name',
            dataIndex: 'branchName',
            key: 'branchName',
            },
            
           
           
            
            {
            title: 'Actions',
            key: 'action',
            render: (text, account) => (
            <Space size="middle">
            <div onClick={ () => this.deleteaccount(account.id)}><DeleteForever/></div>
            </Space>
            ),
            },
            ];

        return (
            <div>
            <h2 className="text-center">Bank Accounts</h2> 
            <Button type="primary" onClick={this.addaccount}>Add Bank Account</Button>          
            <div >
            <Table dataSource={this.state.bankaccounts} columns={columns} />             
                
            </div>
            
         </div>
        );
    }
}

export default BankAccounts;
