
import React, { Component } from 'react';
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { Icon } from '@material-ui/core';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Space } from 'antd';

class chartofaccounts extends Component {
    constructor(props){
        super(props)
        this.state={
            
        accounts:[]
        }
        this.addaccount=this.addaccount.bind(this);
    }

      
    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/api/accounts');
        this.setState({ accounts: response.data });
      }
      async viewaccount(id) {
        this.props.history.push(`/ViewAccount/${id}`);/*/-1*/
    } 
        
  
      
      addaccount(){
        this.props.history.push('/add-account/_add');/*/-1*/
    } 

    async deleteaccount(id) {
        try {
            await axios.delete(`http://localhost:8080/api/accounts/${id}`);
            this.setState(prevState => ({ 
              ...prevState,
              accounts: prevState.accounts.filter(account => account.id !== id)
            }));
        } catch (error) {
          console.log(error);
        }
      }
    
    render() {
        
        const columns = [
            {
            title: 'Code',
            dataIndex: 'accountCode',
            key: 'accountCode',
           
            },
            {
            title: 'Name',
            dataIndex: 'accountName',
            key: 'accountName',
            },
            
            {
            title: 'System Name',
            dataIndex: 'accountParent',
            key: 'accountParent',
            },
            {
                title: 'Balance',
                dataIndex: 'balance',
                key: 'balance',
                },
            
            {
            title: 'Actions',
            key: 'action',
            
               
                  render: (text, account) => (
                    <Space size="middle">
                      <div onClick={() => this.viewaccount(account.accountName)}>
                        <Edit />
                      </div>
                      {account.balance === 0 && (
                        <div onClick={() => this.deleteaccount(account.accountName)}>
                          <DeleteForever />
                        </div>
                      )}
                    </Space>
                  ),
                },
            
            ];

        return (
            <div>
            <h2 className="text-center">Chart Of Accounts</h2> 
            <Button type="primary" onClick={this.addaccount}>Add Account</Button>          
            <div >
            <Table dataSource={this.state.accounts} columns={columns} />             
                
            </div>
            
         </div>
        );
    }
}

export default chartofaccounts;
